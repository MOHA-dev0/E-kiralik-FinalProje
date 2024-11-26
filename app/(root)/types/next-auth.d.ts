import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string; // إضافة الحقل المخصص
      isLandlord?: boolean; // إضافة الحقل المخصص
    };
  }

  interface User {
    id: string;
    username: string; // الحقل المخصص
    isLandlord: boolean; // الحقل المخصص
  }
}
