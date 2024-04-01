// components/ProfileForm.js
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GrUpdate } from "react-icons/gr";
import { MdArrowBackIos, MdOutlineUpdate } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import { date, z } from "zod";

const ProfileForm = () => {
  const {
    data: userData,
    isError: getUserDetailsError,
    isLoading: getUserDetailsLoading,
    failureReason,
    refetch: refetchUserDetail,
  } = api.auth.getUserDetails.useQuery();

  const transferStepOneForm = z.object({
    number: z.string().min(2).max(10),
    Address: z
      .string()
      .min(3)
      .max(90000000 * 25),
  });

  const stepOneForm = useForm<z.infer<typeof transferStepOneForm>>({
    resolver: zodResolver(transferStepOneForm),
    defaultValues: {
      number: userData?.number ?? undefined,
      Address: userData?.Address ?? undefined,
    },
  });

  const { mutate, isLoading, isSuccess, isError } =
    api.auth.updateUserDetails.useMutation({
      onSuccess(data, variables, context) {
        void refetchUserDetail();
        toast({
          description: data.message,
          className: "bg-base-100",
        });
      },
      onError(error, variables, context) {
        console.log(error);
        toast({
          variant: "destructive",
          description: error.message,
          className: "bg-error",
        });
      },
    });

  const onSubmit = (formData: z.infer<typeof transferStepOneForm>) => {
    console.log(formData);
    mutate(formData);
  };

  // if (isError) {
  //   return (
  //     <>
  //       {toast({
  //         variant: "destructive",
  //         description: failureReason,
  //         className: "bg-error",
  //       })}
  //     </>
  //   );
  // }

  return (
    <>
      <Form {...stepOneForm}>
        <form
          className="card flex w-full flex-col gap-6 border border-base-200 p-4 "
          onSubmit={stepOneForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={stepOneForm.control}
            name="number"
            render={({ field }) => (
              <FormItem className="flex flex-col  justify-between gap-0">
                <FormLabel className="font-normal">{` ${"Phone number"} `}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>

                <FormMessage className="text-xs text-secondary" />
              </FormItem>
            )}
          />
          <FormField
            control={stepOneForm.control}
            name="Address"
            render={({ field }) => (
              <FormItem className="flex flex-col  justify-between gap-0">
                <FormLabel className="font-normal">{` ${"Address"} `}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage className="text-xs text-secondary" />
              </FormItem>
            )}
          />
          <button
            className=" btn rounded-full bg-green-500 text-black hover:bg-green-600"
            type={isLoading ? "button" : "submit"}
          >
            {isLoading ? (
              <BeatLoader size={10} />
            ) : (
              <>
                <MdOutlineUpdate size={20} />
                Update Profile
              </>
            )}
          </button>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
