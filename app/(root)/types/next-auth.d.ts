import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      username?: string;
      isLandlord?: boolean;
      tc?: string;
      id?: string; // إضافة الحقل المخصص id
    };
  }

  interface User {
    id: string; // إضافة الحقل المخصص id
    tc: string;
    username: string;
    isLandlord: boolean;
  }
}
