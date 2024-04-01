import { error } from "console";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import bcrypt from "bcryptjs";

export const authRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existingUser = await ctx.db.user.findUnique({
          where: {
            email: input.email,
          },
        });

        if (existingUser) {
          throw new Error("User with this email already exists.");
        }

        // Securely hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const newUser = await ctx.db.user.create({
          data: {
            email: input.email,
            name: input.name,
            number: "add number",
            Address: "set address",
            password: hashedPassword,
          },
        });

        return {
          ...newUser,
          message: `Your account has been registered, ${newUser.name}`,
        };
      } catch (error) {
        console.log(error);
        if (error) throw new Error(`An error occurred during registration.`);
      }
    }),

  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user
        .findUnique({
          where: {
            email: input.email,
          },
        })
        .then((user) => {
          if (user) {
            console.log(user), "return user";
            // let uPass = "";
            // uPass = user?.password ?? "";
            // console.log(uPass);
            // await bcrypt.compare(input.password, uPass).then((pass) => {
            //   if (pass === true) {
            //     console.log("password correct", pass);
            //     // try {
            //     //   await signIn("credentials", {
            //     //     email: user.email,
            //     //     password: user.password,
            //     //     callbackUrl: "http://localhost/3000",
            //     //   });
            //     // } catch (error: string) {
            //     //   console.log(error, "Auth not fuvioning");
            //     //   // throw new Error(error);
            //     // }
            //   } else {
            //     console.log(pass, "passwrong");
            //     throw new Error("password incorrect");
            //   }
            //   return pass;
            // });
            return user;
          }
          throw new Error(" Email is not registed ");
        })
        .catch((error: string) => {
          console.log(error);
          throw new Error(error);
        });
    }),

  // get user details

  getUserDetails: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      console.log(user);
      const sUser = JSON.stringify(user);
      return user; // For debugging purposes
    } catch (error) {
      console.error(error); // Log the error
      throw new Error("Failed to fetch user details");
    }
  }),

  updateUserDetails: protectedProcedure
    .input(
      z.object({
        number: z.string(),
        Address: z.string(),
        // password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { number, Address } = input;
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.session.user.id },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const updateUser = await ctx.db.user.update({
          where: { id: user.id },
          data: {
            number,
            Address,
            // You can add more fields here as needed
          },
        });

        console.log(updateUser);
        const res = {
          message: "Your Profile has been succesfully Updated",
          user: {
            ...updateUser,
          },
        };
        return res; // Returning the updated user if needed
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user details");
      }
    }),
});
