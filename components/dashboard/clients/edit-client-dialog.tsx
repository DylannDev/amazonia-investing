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
import { Input } from "@/components/ui/input";
import { DateInput } from "@/components/ui/date-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  addClientSchema,
  AddClientFormValues,
} from "@/lib/validation/add-client-form.schema";
import { toast } from "sonner";
import { updateClient } from "@/actions/clients";
import { postcodeValidator } from "postcode-validator";
import countries from "i18n-iso-countries";
import frLocale from "i18n-iso-countries/langs/fr.json";
import ReactCountryFlag from "react-country-flag";
import { Separator } from "@/components/ui/separator";

export interface EditClientDialogProps {
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
    contractStartDate?: Date | null;
  };
}

interface EditFormValues
  extends Pick<
    AddClientFormValues,
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "birthDate"
    | "address"
    | "city"
    | "zipCode"
    | "country"
    | "investedAmount"
    | "yieldRate"
    | "frequency"
    | "contractStartDate"
  > {}

export function EditClientDialog({
  open,
  onOpenChange,
  client,
}: EditClientDialogProps) {
  countries.registerLocale(frLocale as any);
  const { priorityList, otherList } = React.useMemo(() => {
    const entries = countries.getNames("fr", { select: "official" }) as Record<
      string,
      string
    >;
    const priorityCodes = ["GF", "MQ", "GP", "RE", "FR"];
    const priorityList = priorityCodes
      .map((code) => ({ code, name: entries[code] }))
      .filter((x): x is { code: string; name: string } => Boolean(x?.name));
    const otherList = Object.entries(entries)
      .filter(([code]) => !priorityCodes.includes(code))
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return { priorityList, otherList };
  }, []);
  const { firstName, lastName } = {
    firstName: client.firstName,
    lastName: client.lastName,
  };
  const form = useForm<EditFormValues>({
    resolver: zodResolver(
      addClientSchema.pick({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        birthDate: true,
        address: true,
        city: true,
        zipCode: true,
        country: true,
        investedAmount: true,
        yieldRate: true,
        frequency: true,
        contractStartDate: true,
      })
    ),
    values: {
      firstName,
      lastName,
      email: client.email,
      phone: client.phone,
      birthDate: client.birthDate
        ? new Date(client.birthDate)
        : (undefined as unknown as Date),
      address: client.address ?? null,
      city: client.city ?? null,
      zipCode: client.zipCode ?? null,
      country: client.country ?? undefined,
      investedAmount:
        client.investedAmount != null
          ? Number(client.investedAmount)
          : (undefined as unknown as number),
      yieldRate:
        client.yieldRate != null
          ? Number(client.yieldRate)
          : (undefined as unknown as number),
      frequency: client.frequency ?? (undefined as unknown as any),
      contractStartDate:
        client.contractStartDate ?? (undefined as unknown as Date),
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function onSubmit(values: EditFormValues) {
    setIsSubmitting(true);
    try {
      if (values.country && values.zipCode) {
        const isValidPostcode = postcodeValidator(
          values.zipCode,
          values.country
        );
        if (!isValidPostcode) {
          form.setError("zipCode", {
            type: "manual",
            message: "Code postal invalide pour le pays sélectionné",
          });
          toast.error("Code postal invalide");
          return;
        }
      }
      const res = await updateClient({
        id: client.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate,
        address: values.address ?? null,
        city: values.city ?? null,
        zipCode: values.zipCode ?? null,
        country: values.country ?? null,
        investedAmount: values.investedAmount,
        yieldRate: values.yieldRate,
        frequency: values.frequency,
        contractStartDate: values.contractStartDate,
      });
      if (res.success) {
        toast.success("Client mis à jour");
        onOpenChange(false);
      } else {
        toast.error(res.error || "Échec de la mise à jour");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="edit-client-description"
        className="max-h-[80vh] min-w-[800px] overflow-hidden flex flex-col"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Modifier le client
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex-1 overflow-y-auto pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <h3 className="text-lg font-semibold">Informations client</h3>
              <div className="space-y-2 w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-row items-start gap-10 w-full">
                      <FormLabel className="w-36">
                        Prénom <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Prénom"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-row items-start gap-10 w-full">
                      <FormLabel className="w-36">
                        Nom <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Nom"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-row items-start gap-10 w-full">
                      <FormLabel className="w-36">
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@exemple.com"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-row items-start gap-10 w-full">
                      <FormLabel className="w-36">
                        Téléphone <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input
                            inputMode="tel"
                            placeholder="Téléphone"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-row items-start gap-10 w-full">
                      <FormLabel className="w-36">
                        Date de naissance{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex-1">
                        <DateInput
                          value={field.value}
                          onChange={field.onChange}
                          defaultMonth={new Date()}
                          startMonth={new Date(1920, 0)}
                          endMonth={new Date()}
                        />
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-row items-start gap-10 w-full">
                      <FormLabel className="w-36">Adresse</FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Adresse"
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-row items-start gap-10 w-full">
                      <FormLabel className="w-36">Ville</FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Ville"
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-row items-start gap-10 w-full">
                      <FormLabel className="w-36">Code postal</FormLabel>
                      <div className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Code postal"
                            {...field}
                            value={field.value ?? ""}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-row items-start gap-10 w-full">
                      <FormLabel className="w-36">Pays</FormLabel>
                      <div className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un pays" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-72">
                            {priorityList.map(({ code, name }) => (
                              <SelectItem key={code} value={code}>
                                <span className="inline-flex items-center gap-2">
                                  <ReactCountryFlag
                                    countryCode={code.toUpperCase()}
                                    svg
                                    style={{ width: "1em", height: "1em" }}
                                    aria-label={code}
                                  />
                                  <span>{name}</span>
                                </span>
                              </SelectItem>
                            ))}
                            <div className="my-1 border-t" />
                            {otherList.map(({ code, name }) => (
                              <SelectItem key={code} value={code}>
                                <span className="inline-flex items-center gap-2">
                                  <ReactCountryFlag
                                    countryCode={code.toUpperCase()}
                                    svg
                                    style={{ width: "1em", height: "1em" }}
                                    aria-label={code}
                                  />
                                  <span>{name}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-8">
                <h3 className="text-lg font-semibold">Informations contrat</h3>
                <div className="space-y-2 w-full">
                  <FormField
                    control={form.control}
                    name="investedAmount"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex flex-row items-start gap-10 w-full">
                        <FormLabel className="w-36">
                          Montant investi (€){" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex-1">
                          <FormControl>
                            <Input
                              type="number"
                              inputMode="decimal"
                              step="0.01"
                              placeholder="0"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yieldRate"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex flex-row items-start gap-10 w-full">
                        <FormLabel className="w-36 whitespace-nowrap">
                          Taux de rendement (%){" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex-1">
                          <FormControl>
                            <Input
                              type="number"
                              inputMode="decimal"
                              step="0.01"
                              placeholder="0"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex flex-row items-start gap-10 w-full">
                        <FormLabel className="w-36">
                          Fréquence de paiement{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex-1">
                          <Select
                            onValueChange={field.onChange}
                            value={field.value ?? undefined}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une fréquence" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="weekly">
                                Hebdomadaire
                              </SelectItem>
                              <SelectItem value="monthly">Mensuelle</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contractStartDate"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex flex-row items-start gap-10 w-full">
                        <FormLabel className="w-36">
                          Date de début du contrat{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex-1">
                          <DateInput
                            value={field.value ?? undefined}
                            onChange={field.onChange}
                            endMonth={new Date()}
                          />
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button size="lg" type="button" variant="outline">
                    Annuler
                  </Button>
                </DialogClose>
                <Button size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditClientDialog;
