import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteNotes } from "@/app/actions/delete"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

type DeleteProps = {
  params: string;
};

export function DeleteSite({ params }: DeleteProps) {
  const { toast } = useToast()
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await deleteNotes(params);
      toast({
        title: "Success!",
        description: response.message,
        variant: "default",
      });
      router.push("/")
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please contact harsh121102@gmail.com",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">X</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Proceed with deletion?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" className="w-full" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
