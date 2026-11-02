"use client";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

const DeleteDestination = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/destination/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log("ertyuiop[", data);
    // router.back();
    redirect("/")
    router.refresh();
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              variant="outline"
              className="h-9 rounded-[4px] border-red-300 px-4 text-sm text-red-500 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="mr-2 size-4" />
              Cancel
            </Button>
          }
        >
          Show Dialog
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteDestination;
