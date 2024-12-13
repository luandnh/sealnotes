import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
  
  export function CreateNotepadButton() {
    return (
      <Dialog>
        <DialogTrigger className="text-lg font-medium text-black hover:text-zinc-700">Create</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Create a new notepad</DialogTitle>
            <DialogDescription className="mb-4">
              This name needs to be unique globally. You can also create a new notepad by simply going to https://www.sealnotes.com/name-here
            </DialogDescription>
            <Input className="mt-4" type="text" placeholder="Name" />
            <Button>Create</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  