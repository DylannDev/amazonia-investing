"use client";

import React from "react";
import { Button } from "@/components/dashboard/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import AddClientForm from "@/components/dashboard/add-client-form";
import { Separator } from "@/components/ui/separator";

export function AddClientDialogButton() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="blue">
          <UserPlus strokeWidth={2} size={20} className="mr-1" /> Ajouter un
          client
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] min-w-[800px] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Ajouter un client
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex-1 overflow-y-auto pr-4">
          <AddClientForm onCancel={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddClientDialogButton;
