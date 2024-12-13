import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Corrected import path
import { useState } from "react";
import { z } from "zod";

// Define the Zod schema for name validation
const nameSchema = z.string().regex(/^[a-zA-Z0-9]+$/, {
  message: "Name must be alphanumeric with no spaces or special characters.",
});

export function OpenNotepadButton() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleOpenClick = () => {
    try {
      nameSchema.parse(name);
      setError("");
      alert(`Opening notepad with name: ${name}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message ?? "Invalid name");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-lg font-medium text-black hover:text-zinc-700">
        Open
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Open your notepad</DialogTitle>
          <DialogDescription className="mb-4">
            This name needs to be unique globally. You can also open your
            notepad by simply going to{" "}
            <span className="text-blue-500">https://www.sealnotes.com/name-here</span>
          </DialogDescription>
          <Input
            className="mt-4"
            type="text"
            placeholder="Enter notepad name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button className="mt-4" onClick={handleOpenClick}>
            Open
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
