"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/dashboard/button";
import { DateInput } from "@/components/ui/date-input";
import { createClientWithContract } from "@/actions/clients";
import {
  addClientSchema,
  AddClientFormValues,
} from "@/lib/validation/add-client-form.schema";
import { toast } from "sonner";
import countries from "i18n-iso-countries";
import frLocale from "i18n-iso-countries/langs/fr.json";
import ReactCountryFlag from "react-country-flag";
import { postcodeValidator } from "postcode-validator";

type FormValues = AddClientFormValues;

interface AddClientFormProps {
  onCancel?: () => void;
}

export default function AddClientForm({ onCancel }: AddClientFormProps) {
  // Register French locale for country names
  countries.registerLocale(frLocale as any);
  const { entries, priorityList, otherList } = React.useMemo(() => {
    const entries = countries.getNames("fr", { select: "official" }) as Record<
      string,
      string
    >;
    const priorityCodes = ["GF", "MQ", "GP", "RE", "FR"]; // Guyane, Martinique, Guadeloupe, Réunion, France
    const priorityList = priorityCodes
      .map((code) => ({ code, name: entries[code] }))
      .filter((x): x is { code: string; name: string } => Boolean(x.name));
    const otherList = Object.entries(entries)
      .filter(([code]) => !priorityCodes.includes(code))
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return { entries, priorityList, otherList };
  }, []);
  const form = useForm<FormValues>({
    resolver: zodResolver(addClientSchema),
    defaultValues: {
      firstName: "Dylann",
      lastName: "Xavero",
      email: "d.xavero@gmail.com",
      phone: "0606848484",
      birthDate: undefined as unknown as Date,
      address: "1189 avenue de la république",
      city: "Cayenne",
      zipCode: "97300",
      country: "GF",
      investedAmount: 500,
      yieldRate: 10,
      amountAlreadyPaid: 2500,
      frequency: "monthly",
      contractStartDate: undefined as unknown as Date,
    },
    // defaultValues: {
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   phone: "",
    //   birthDate: undefined as unknown as Date,
    //   address: "",
    //   city: "",
    //   zipCode: "",
    //   country: undefined,
    //   investedAmount: 0 as unknown as any,
    //   yieldRate: 0 as unknown as any,
    //   amountAlreadyPaid: 0 as unknown as any,
    //   frequency: "weekly",
    //   contractStartDate: undefined as unknown as Date,
    // },
  });

  async function onSubmit(values: FormValues) {
    // Validate postcode against selected country (values.country is ISO code)
    if (values.country && values.zipCode) {
      const isValidPostcode = postcodeValidator(values.zipCode, values.country);
      if (!isValidPostcode) {
        form.setError("zipCode", {
          type: "manual",
          message: "Code postal invalide pour le pays sélectionné",
        });
        toast.error("Code postal invalide");
        return;
      }
    }
    const result = await createClientWithContract({
      ...values,
      // dates déjà en Date via zod
    });

    if (result.success) {
      toast.success("Client créé avec succès");
      form.reset();
      if (onCancel) onCancel();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
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
                      <Input placeholder="Nom" {...field} className="w-full" />
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
                    Date de naissance <span className="text-red-500">*</span>
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
        </div>

        <div className="space-y-8">
          <h3 className="text-lg font-semibold">Informations contrat</h3>
          <div className="grid grid-cols-1 gap-2 w-full">
            <FormField
              control={form.control}
              name="investedAmount"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-row items-start gap-10 w-full">
                  <FormLabel className="w-36">
                    Montant investi (€) <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
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
              name="yieldRate"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-row items-start gap-10 w-full">
                  <FormLabel className="w-36">
                    Taux de rendement (ex: 10%){" "}
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
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
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
              name="amountAlreadyPaid"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-row items-start gap-10 w-full">
                  <FormLabel className="w-36 whitespace-nowrap">
                    Montant déjà payé (€){" "}
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
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
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
              name="frequency"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-row items-start gap-10 w-full">
                  <FormLabel className="w-36">
                    Fréquence de paiement{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex-1">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une fréquence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
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
                      value={field.value}
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

        <div className="flex items-center justify-end gap-3">
          <Button
            size="lg"
            type="button"
            variant="outline"
            onClick={() => (onCancel ? onCancel() : form.reset())}
          >
            Annuler
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
