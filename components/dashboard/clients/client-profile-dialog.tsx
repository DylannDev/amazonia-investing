"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/dashboard/button";
import { Separator } from "@/components/ui/separator";
import { getCountryDisplayName, capitalizeWords } from "@/lib/utils";

export interface ClientProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate?: Date | null;
    address?: string | null;
    city?: string | null;
    zipCode?: string | null;
    country?: string | null;
    investedAmount?: number | null;
    yieldRate?: number | null; // percentage
    frequency?: "weekly" | "monthly" | null;
    amountAlreadyPaid?: number | null;
    contractStartDate?: Date | null;
  };
}

function formatDate(value?: Date | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("fr-FR").format(new Date(value));
  } catch {
    return "—";
  }
}

export function ClientProfileDialog({
  open,
  onOpenChange,
  client,
}: ClientProfileDialogProps) {
  const fullName = capitalizeWords(
    `${client.firstName} ${client.lastName}`.trim()
  );
  const freqLabel = client.frequency
    ? client.frequency === "weekly"
      ? "Hebdomadaire"
      : "Mensuelle"
    : "—";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Profil client
          </DialogTitle>
        </DialogHeader>
        <Separator />

        <div className="space-y-6">
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Informations personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium">
              <div>
                <div className="text-blue-500">Nom complet</div>
                <div>{fullName || "—"}</div>
              </div>
              <div>
                <div className="text-blue-500">Email</div>
                <div>{client.email}</div>
              </div>
              <div>
                <div className="text-blue-500">Téléphone</div>
                <div>{client.phone}</div>
              </div>
              <div>
                <div className="text-blue-500">Date de naissance</div>
                <div>{formatDate(client.birthDate)}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-blue-500">Adresse</div>
                {[
                  client.address,
                  client.zipCode,
                  client.city,
                  client.country,
                ].some((v) => Boolean(v)) ? (
                  <div className="space-y-0.5">
                    {client.address ? (
                      <div>{capitalizeWords(client.address)}</div>
                    ) : null}
                    {client.zipCode || client.city ? (
                      <div>
                        {[client.zipCode, capitalizeWords(client.city)]
                          .filter(Boolean)
                          .join(" ")}
                      </div>
                    ) : null}
                    {client.country ? (
                      <div>{getCountryDisplayName(client.country)}</div>
                    ) : null}
                  </div>
                ) : (
                  <div>—</div>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Informations contrat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium">
              <div>
                <div className="text-blue-500">Montant investi</div>
                <div>
                  {client.investedAmount != null
                    ? `${client.investedAmount.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })}`
                    : "—"}
                </div>
              </div>
              <div>
                <div className="text-blue-500">Taux de rendement</div>
                <div>
                  {client.yieldRate != null
                    ? `${Number(client.yieldRate).toFixed(1)}%`
                    : "—"}
                </div>
              </div>
              <div>
                <div className="text-blue-500">Fréquence</div>
                <div>{freqLabel}</div>
              </div>
              <div>
                <div className="text-blue-500">Début du contrat</div>
                <div>{formatDate(client.contractStartDate)}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-blue-500">Montant déjà payé</div>
                <div>
                  {client.amountAlreadyPaid != null
                    ? `${Number(client.amountAlreadyPaid).toLocaleString(
                        "fr-FR",
                        { style: "currency", currency: "EUR" }
                      )}`
                    : "—"}
                </div>
              </div>
            </div>
          </section>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline_red" type="button">
              Fermer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ClientProfileDialog;
