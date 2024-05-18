import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface AlertModalProps {
  variantType: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
  dialogContent: {
    triggerWord: string
    title: string
    description: string
  }
  onClick: () => void
}

export function AlertModal({
  variantType,
  dialogContent,
  onClick
}: AlertModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={ variantType }>
          { dialogContent.triggerWord }
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ dialogContent.title }</AlertDialogTitle>
          <AlertDialogDescription>{ dialogContent.description }</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={ onClick }>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
