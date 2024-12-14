import { saveNotes } from "@/app/actions/save"
import { hashPassword, encrypt } from "@/app/utils/vault"
import { Button } from "@/components/ui/button"
import LoadingBtn from "@/components/LoadingBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

type ChangePasswordProps = {
  params: string;
  values: string;
};

export function ChangePassword({ params, values }: ChangePasswordProps) {
  const { toast } = useToast()
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false) 

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const isPasswordsMatch = newPassword === confirmPassword
  const isFormValid = newPassword && confirmPassword && isPasswordsMatch

  const handleSubmit = async () => {
    if (!isFormValid) {
      return
    }

    setIsSubmitting(true) 

    try {
      const hash = hashPassword(newPassword) 
      const encryptedNotes = encrypt(values, hash)
      await saveNotes(params, encryptedNotes)
      
      toast({
        title: "Success!",
        description: "Password has been successfully changed.",
        variant: "default",
      })
      
    } catch (error) {
      console.error("Error saving notes:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please contact harsh121102@gmail.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false) 
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change your password</DialogTitle>
          <DialogDescription>
            Enter your new password below and confirm it to save the changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
          />
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
          />
        </div>
        <DialogFooter>
          <LoadingBtn 
            disabled={!isFormValid || isSubmitting} 
            onClick={handleSubmit} 
            loading={isSubmitting} // Show spinner when submitting
            className="w-full"
          >
            Save Changes
          </LoadingBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
