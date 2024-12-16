import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      username?: string; // إضافة الحقل المخصص
      isLandlord?: boolean; // إضافة الحقل المخصص
      tc?: string;
    };
  }

  interface User {
    tc: string;
    username: string; // الحقل المخصص
    isLandlord: boolean; // الحقل المخصص
  }
}
