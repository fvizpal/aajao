'use client'

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
import { deleteEvent } from "@/lib/actions/event.actions"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTransition } from "react"

type DeleteEventProp = {
  eventId: string,
}
const DeleteConfirm = ({ eventId }: DeleteEventProp) => {
  const pathname = usePathname()
  let [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    try {
      startTransition(async () => {
        await deleteEvent({ eventId, path: pathname })
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Image src="/assets/icons/delete.svg" alt="delte" width={20} height={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This event will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirm