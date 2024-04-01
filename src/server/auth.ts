import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/server/db";

// interface Credentials {
//   email: string;
//   password: string;
// }

// type Credentials = {
//   Record<"email" | "password", string>
//   // Add any other properties if needed
// };

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;

      // ...other properties
      role: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    // session: async ({ session, user, token }) => {
    //   const i = user;
    //   console.log(user);
    // },
    jwt({ token, user, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        // token.accessToken = to
        console.log(user, "next auth checking");
        // token.role = user?.role ?? "";
        token.id = user.id;
        // token.
      }
      return token;
    },
    session: ({ session, user, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        role: token.role,
      },
      // Set expiration to 2 hours (2 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    }),
  },

  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith#email.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // const email: string = req.body?.email;
        const email = credentials?.email;
        const user = await db.user.findUnique({ where: { email } });

        console.log(email);

        if (user) {
          console.log(user.id);
          return user;
        } else {
          console.log("User not found or ID is undefined.");
          return null;
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  // jwt: {},
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
