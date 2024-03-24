"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

interface PriceFormProps {
  courseName?: string;
}

interface CertificateFields {
  certNum: string;
  fullName?: string;
  dateOfBirth: string;
  countryOfBirth: string;
  courseName: string;
  // Date now
  completionDate: string;
}

const enforceDateFormat = (input: string) => {
  // Remove any characters that are not numbers
  let inputValue = input.replace(/[^\d\s]/g, "");

  // Check if the input value is in the format of DDMMYYYY
  if (/^\d{8}$/.test(inputValue)) {
    // Reformat the value to DD MM YYYY
    inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, "$1 $2 $3");
  }
  return inputValue;
};

const formSchema = z.object({
  fullName: z.coerce.string().min(3),
  dateOfBirth: z.coerce.string().min(9),
  countryOfBirth: z.coerce.string().min(4),
});

const CertificateDetailForm = ({ courseName }: PriceFormProps) => {
  const { user } = useUser();
  const [metadataUpdated, setMetadataUpdated] = useState<boolean>(false);
  const router = useRouter();

  console.log(user?.unsafeMetadata);
  console.log("metadataUpdated", metadataUpdated);
  const form = useForm<Partial<CertificateFields>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: undefined,
      dateOfBirth: "",
      countryOfBirth: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: Partial<CertificateFields>) => {
    try {
      await (user as any)?.update({
        unsafeMetadata: {
          additionalDetails: "filled",
          ...values,
        },
      });
      toast.success("Details updated");
    } catch (error) {
      toast.error(`Failed to update additional details: ${error}`);
    }
    router.push("/");
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex items-center flex-col justify-between rounded-2xl shadow-2xl px-8 py-9 max-w-[400px]">
        <Image
          height={24}
          width={55}
          alt="logo"
          src="/logo.svg"
          className="mb-8 self-start"
        />
        <div className="mb-6">
          <h1 className="text-xl font-semibold">Additional details</h1>
          <p className="text-base text-black/[0.65]">
            this information is used for your future certificates
          </p>
        </div>
        <div className="h-[1px] bg-black/[0.16] w-full mb-2"></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 w-full ">
            <span className="text-[13px] font-medium ">Full name</span>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="mb-4 mt-2"
                      type="text"
                      required
                      disabled={isSubmitting}
                      // placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-[13px] font-medium">Country of birth</span>
            <FormField
              control={form.control}
              name="countryOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className="mb-4 mt-2"
                      disabled={isSubmitting}
                      // placeholder="Some country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-[13px] font-medium">
              Date of birth (DD MM YYYY)
            </span>
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className="mb-4 mt-2"
                      disabled={isSubmitting}
                      // placeholder="Day Month Year"
                      maxLength={10}
                      {...field}
                      value={enforceDateFormat(
                        form.getValues("dateOfBirth") || ""
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button className="w-full" disabled={!isValid} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CertificateDetailForm;
