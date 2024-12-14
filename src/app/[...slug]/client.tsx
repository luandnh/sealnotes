'use client'

import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { saveNotes } from "@/app/actions/save";
import RichTextEditor from "@/components/editor/Tiptap";
import ButtonGroup from "./ButtonGroup";
import { decrypt, encrypt } from "@/app/utils/vault";
import { fetchData } from "../actions/refresh";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const noteSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const tabsSchema = z.array(noteSchema);

interface ClientProps {
  params: string;
  decryptedData: string;
  hash: string;
}

type TabsValues = z.infer<typeof tabsSchema>;

export function Client({ params, decryptedData, hash }: ClientProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(0);
  const [isDirty, setIsDirty] = useState<boolean[]>([]);
  const [editorContentKeys, setEditorContentKeys] = useState<number[]>([]);
  const tabsListRef = useRef<HTMLDivElement>(null);

  const initialTabs: TabsValues = (() => {
    try {
      const parsed = JSON.parse(decryptedData) as string;
      return tabsSchema.parse(parsed);
    } catch {
      return [{ title: "New Note", description: decryptedData || "" }];
    }
  })();
  
  const form = useForm<{ tabs: TabsValues }>({
    resolver: zodResolver(z.object({ tabs: tabsSchema })),
    defaultValues: { tabs: initialTabs },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    getValues,
    setValue,
  } = form;

  useEffect(() => {
    setIsDirty(new Array(initialTabs.length).fill(false));
    setEditorContentKeys(new Array(initialTabs.length).fill(0));
  }, [initialTabs.length]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = tabsListRef.current.clientWidth / 2;
      tabsListRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  async function onRefresh() {
    try {
      const currentData = await fetchData(params);
      const decrypted = decrypt(currentData as string, hash);
      const refreshedTabs = JSON.parse(decrypted) as { title: string; description: string }[];
      toast({
        title: "Refreshed!",
        description: "Data has been successfully refreshed.",
        variant: "default",
      });
      setValue("tabs", refreshedTabs);
      setIsDirty(new Array(refreshedTabs.length).fill(false));
      setEditorContentKeys((prevKeys) => prevKeys.map((key) => key + 1));
    } catch (error) {
      console.error("Refresh error:", error);
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again later.",
        variant: "destructive",
      });
    }
  }

  async function onSubmit(values: { tabs: TabsValues }) {
    try {
      const encryptedNotes = encrypt(JSON.stringify(values.tabs), hash)
      const response = await saveNotes(params, encryptedNotes);
      toast({
        title: "Success!",
        description: response.message,
        variant: "default",
      });
      setIsDirty(new Array(values.tabs.length).fill(false));
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "An unexpected error occurred. Please contact harsh121102@gmail.com",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (isDirty.some(Boolean)) {
        event.preventDefault();
        event.returnValue = "";
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const addNewTab = () => {
    const currentTabs = getValues("tabs");
    setValue("tabs", [...currentTabs, { title: "New Note", description: "" }]);
    setActiveTab(currentTabs.length);
    setIsDirty((prev) => [...prev, false]);
    setEditorContentKeys((prev) => [...prev, 0]);
  };

  const removeTab = (indexToRemove: number) => {
    const currentTabs = getValues("tabs");
    if (currentTabs.length > 1) {
      setValue("tabs", currentTabs.filter((_, index) => index !== indexToRemove));
      setIsDirty((prev) => prev.filter((_, index) => index !== indexToRemove));
      setEditorContentKeys((prev) => prev.filter((_, index) => index !== indexToRemove));
      if (activeTab >= indexToRemove && activeTab > 0) {
        setActiveTab(activeTab - 1);
      }
    }
  };

  return (
    <div className="flex justify-center w-full h-[100vh]">
      <Form {...form}>
        <div className="space-y-6 p-4 w-full max-w-4xl">
          <ButtonGroup
            onSubmit={handleSubmit(onSubmit)}
            onRefresh={onRefresh}
            isSubmitting={isSubmitting}
            params={params}
            values={JSON.stringify(getValues("tabs"))}
          />
          <Tabs 
              value={activeTab.toString()} 
              onValueChange={(value: string) => setActiveTab(parseInt(value))}
            >
            <div className="relative flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollTabs('left')}
                className="flex-shrink-0"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <div className="flex-grow overflow-hidden" ref={tabsListRef}>
                <TabsList className="inline-flex w-max space-x-1 p-1">
                  {getValues("tabs").map((tab, index) => (
                    <TabsTrigger key={index} value={index.toString()} className="flex items-center whitespace-nowrap">
                      <span className="truncate max-w-[100px]">{tab.title}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-4 w-4 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTab(index);
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Close tab</span>
                      </Button>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollTabs('right')}
                className="flex-shrink-0"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Scroll right</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={addNewTab}
                className="flex-shrink-0"
              >
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">Add new tab</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {getValues("tabs").map((tab, index) => (
                    <DropdownMenuItem key={index} onSelect={() => setActiveTab(index)}>
                      {tab.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {getValues("tabs").map((tab, index) => (
              <TabsContent key={index} value={index.toString()}>
                <FormField
                  control={control}
                  name={`tabs.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Note Title"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setIsDirty((prev) => {
                              const newDirty = [...prev];
                              newDirty[index] = true;
                              return newDirty;
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`tabs.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RichTextEditor
                          key={editorContentKeys[index]}
                          initialContent={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            setIsDirty((prev) => {
                              const newDirty = [...prev];
                              newDirty[index] = true;
                              return newDirty;
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Form>
    </div>
  );
}

