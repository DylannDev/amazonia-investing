"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/dashboard/button";
import { deleteClient } from "@/actions/clients";
import { toast } from "sonner";

export interface DeleteClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  fullName: string;
}

export function DeleteClientDialog({
  open,
  onOpenChange,
  clientId,
  fullName,
}: DeleteClientDialogProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function onConfirm() {
    setIsSubmitting(true);
    try {
      const res = await deleteClient(clientId);
      if (res.success) {
        toast.success("Client supprimé");
        onOpenChange(false);
      } else {
        toast.error(res.error || "Échec de la suppression");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer {fullName} ?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Cette action est irréversible. Les contrats et paiements associés
          seront également supprimés.
        </p>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Annuler
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="red"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteClientDialog;
