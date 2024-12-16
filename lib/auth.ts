// lib/auth.ts
import { sanityClient } from "@/sanity/lib/sanity";
import CredentialsProvider from "next-auth/providers/credentials";

// تكوين خيارات NextAuth
export const authOptions = {
  providers: [
    // مزود بيانات المستخدم باستخدام Credentials (البريد وكلمة المرور أو TC)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        tc: { label: "TC Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await sanityClient.fetch(
          `*[_type == "user" && tc == $tc && password == $password][0]`,
          {
            tc: credentials?.tc,
            password: credentials?.password,
          }
        );

        if (user) {
          return {
            id: user._id || user.tc, // تأكد من تضمين id (أو استخدم tc كمعرف فريد إذا لم يكن هناك id)
            tc: user.tc,
            username: user.username,
            isLandlord: user.isLandlord,
          };
        } else {
          return null; // إذا لم يتم العثور على المستخدم // إذا لم يتم العثور على المستخدم
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // تخصيص الصفحة الخاصة بتسجيل الدخول
    error: "/auth/error", // تخصيص صفحة الخطأ
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id; // إضافة id إلى التوكن
        token.tc = user.tc;
        token.username = user.username;
        token.isLandlord = user.isLandlord;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id; // تضمين id في الجلسة
      session.user.tc = token.tc;
      session.user.username = token.username;
      session.user.isLandlord = token.isLandlord;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // تأكد من أن لديك NEXTAUTH_SECRET في ملف .env
};
