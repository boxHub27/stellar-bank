"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import Image from "next/image";
import { api } from "@/trpc/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useSession, signIn } from "next-auth/react";
import bcrypt from "bcryptjs";

// import bcrypt from "bcryptjs";

const FormHolder = () => {
  const session = useSession();
  const [loading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(3).max(50),
    password: z.string().max(50).min(5, {
      message: "password must be at least 8 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const loginFormSchema = z.object({
    email: z
      .string()
      .min(3, {
        message: "enter a valid email address",
      })
      .max(50),
    password: z.string().max(50).min(5, {
      message: "password must be at least 8 characters.",
    }),
  });
  const lForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const pathname = usePathname();
  const route = useRouter();
  const { toast } = useToast();

  // Api to register user
  const { mutate: regUser, isLoading: regLoading } =
    api.auth.registerUser.useMutation({
      onSuccess(data) {
        toast({
          description: data?.message,
          className:
            "bottom-0 left-0  flex fixed md:max-w-[420px] md:bottom-4 md:left-4",
        });
        console.log(data?.message);
      },
      onError(error) {
        console.log(error.message);
        toast({
          className:
            "bottom-0 left-0  flex fixed md:max-w-[420px] md:bottom-4 md:left-4",
          description: error.message,
        });
      },
    });

  //  submit handler for Registering user.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const hashedPassword: string = bcrypt.hashSync(values.password, 10);
    regUser({ ...values });
    console.log({ ...values });
  }

  const loginApi = api.auth.loginUser.useMutation({
    async onSuccess(data, variables, context) {
      try {
        await signIn("credentials", {
          email: variables.email,
          password: variables.password,
          redirect: true,
          callbackUrl: "/account",
        });
        console.log(`Logged in ${variables.email}`);
      } catch (error) {
        console.error("Login error:", error);
        setIsLoading(false);
      }
    },
    onError(error, variables, context) {
      setIsLoading(false);
      console.error("Login error:", error);
      toast({
        className:
          "bottom-0 left-0  flex fixed md:max-w-[420px] md:bottom-4 md:left-4",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function Login(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    loginApi.mutate(values);

    console.log(values);
  }

  if (loading || regLoading || session.status == "loading") {
    return <>loading...</>;
  }
  if (session.status == "authenticated") {
    route.push("/account");
    console.log(session.data);
  }

  return (
    <div className="flex w-full flex-col gap-10 px-12 md:px-16 xl:px-40">
      <div className="flex flex-col gap-4">
        <Image
          alt="logo"
          width={200}
          height={100}
          className="h-auto  w-32 object-contain"
          src={"/logoColored1.svg"}
        ></Image>
        <p className="text-md">
          {" "}
          {pathname == "/sign-up" ? (
            <span>Create your an account </span>
          ) : (
            <span>Login into your account? </span>
          )}
        </p>
      </div>
      {pathname == "/sign-in" && (
        <Form {...lForm}>
          <SignInForm form={lForm} onSubmit={Login} />
        </Form>
      )}
      {pathname == "/sign-up" && (
        <Form {...form}>
          <SignUpForm form={form} onSubmit={onSubmit} />
        </Form>
      )}
      {/* <p className="text-sm font-light">
        {pathname == "/sign-up" ? (
          <span>Already have an account? </span>
        ) : (
          <span>{`Don't have an account?`} </span>
        )}
        <Link
          className="text-secondary underline"
          href={pathname == "/sign-up" ? "/sign-in" : "/sign-up"}
        >
          {" "}
          {pathname == "/sign-up" ? "sign-in" : "sign-up"}
        </Link>
      </p> */}
      <p className="text-xs">
        {`Don't Have an Account?`}{" "}
        <Link href={"/"} className="text-primary">
          apply for an account
        </Link>
      </p>
    </div>
  );
};

type FormData = {
  email: string;
  password: string;
  // Add other form fields and their types here
};

type SignInFormProps = {
  form: UseFormReturn<FormData>; // Adjust the type based on your useForm return type
  onSubmit: SubmitHandler<FormData>; // Adjust the type based on your onSubmit function
};

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  // Add other form fields and their types here
};

type SignUpFormProps = {
  form: UseFormReturn<SignUpFormData>; // Adjust the type based on your useForm return type
  onSubmit: SubmitHandler<SignUpFormData>; // Adjust the type based on your onSubmit function
};

const SignInForm: React.FC<SignInFormProps> = ({ form, onSubmit }) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal">Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal">Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                // placeholder="stellerInvest"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <button className="btn btn-primary w-full md:w-auto" type="submit">
        Sign In
      </button>
    </form>
  );
};
const SignUpForm: React.FC<SignUpFormProps> = ({ form, onSubmit }) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal">name</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal">Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal">Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                // placeholder="stellerInvest"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <button className="btn btn-secondary w-full md:w-auto" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default FormHolder;
