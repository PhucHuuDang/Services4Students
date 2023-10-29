import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
      email: string;
      token: string;
      userIdInTableDb: string;
      sub: string;
    };
  }
}
