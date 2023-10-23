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
        console.log(credentials.email, credentials.password);

        const user = await axios.post("http://3.27.132.94/api/Auth/login", {
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // console.log(user);
        console.log(user.data);
        // console.log(user.data.token);

        return user.data;

        // return {
        //   ...user.data,
        //   token: user.data.token,
        // };
      },

      // try {
      //   const response = await axios.post(
      //     "http://3.27.132.94/api/Auth/login",
      //     {
      //       email: credentials.email,
      //       password: credentials.password,
      //     }
      //   );

      //   if (!response.data) {
      //     throw new Error("Invalid credentials");
      //   }

      //   return {
      //     ...response.data, // This assumes your response contains user data
      //     accessToken: response.data.token, // Adjust this based on your API response
      //   };
      // } catch (error) {
      //   throw new Error("Invalid credentials");
      // }
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
      console.log(token);
      console.log(session);
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
