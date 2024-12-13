import { useEffect, useState } from "react";
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
import { decrypt } from "@/app/utils/vault";
import { fetchData } from "../actions/refresh";

const noteSchema = z.object({
  description: z.string(),
});

interface ClientProps {
  params: string;
  decryptedData: string;
  hash: string;
}

type NoteValues = z.infer<typeof noteSchema>;

export function Client({ params, decryptedData, hash }: ClientProps) {
  const { toast } = useToast();
  const [isDirty, setIsDirty] = useState(false);
  const [editorContentKey, setEditorContentKey] = useState(0);

  const form = useForm<NoteValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: { description: decryptedData },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    getValues,
    setValue,
  } = form;

  async function onRefresh() {
    try {
      const currentData = await fetchData(params);
      const decrypted = decrypt(currentData as string, hash);
      toast({
        title: "Refreshed!",
        description: "Data has been successfully refreshed.",
        variant: "default",
      });
      setValue("description", decrypted);
      setIsDirty(false);
      setEditorContentKey((prevKey) => prevKey + 1); 
    } catch (error) {
      console.error("Decryption error:", error);
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again later.",
        variant: "destructive",
      });
    }
  }

  async function onSubmit(values: NoteValues) {
    try {
      const response = await saveNotes(params, values.description, hash);
      toast({
        title: "Success!",
        description: response.message,
        variant: "default",
      });
      setIsDirty(false);
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
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <div className="flex justify-center w-full h-[100vh]">
      <Form {...form}>
        <div className="space-y-6 p-4 w-full max-w-4xl">
          <ButtonGroup
            onSubmit={handleSubmit(onSubmit)}
            onRefresh={onRefresh}
            isSubmitting={isSubmitting}
            params={params}
            values={getValues("description")}
          />
          <div className="mt-6">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor
                      key={editorContentKey} // Re-render the editor with new content
                      initialContent={getValues("description")}
                      onChange={(value) => {
                        field.onChange(value);
                        setIsDirty(true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
