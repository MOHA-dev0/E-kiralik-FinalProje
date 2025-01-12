import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      username?: string;
      isLandlord?: boolean;
      tc?: string;
      id?: string;
    };
  }

  interface User {
    id: string;
    tc: string;
    username: string;
    isLandlord: boolean;
  }
}
