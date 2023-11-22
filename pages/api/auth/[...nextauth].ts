import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";

import bcrypt from "bcrypt";

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

// temporary i change the password to username to make example
interface IUser {
  email: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // const user = await getEmailUser(credentials.email);
        // const user = await getEmailUser(credentials.email);

        // console.log(user);
        // console.log(credentials.email, credentials.password);

        // 3.27.132.94

        // const user = await axios.post("http://13.210.56.232/api/Auth/login", {
        const user = await axios.post("https://housevn.azurewebsites.net/api/Auth/login", {
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user.data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.accessToken = user.accessToken;
    //   }
    //   return token;
    // },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",

  // encode
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
