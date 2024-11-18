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
        // تحقق من رقم الـ TC وكلمة المرور في Sanity
        const user = await sanityClient.fetch(
          `*[_type == "user" && tc == $tc && password == $password][0]`,
          {
            tc: credentials?.tc,
            password: credentials?.password,
          }
        );

        if (user) {
          return {
            id: user._id,
            username: user.username, // تضمين اسم المستخدم
            isLandlord: user.isLandlord, // تضمين دور المستخدم
          };
        } else {
          return null; // إذا لم يتم العثور على المستخدم
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
      // إضافة بيانات المستخدم إلى التوكن
      if (user) {
        token.isLandlord = user.isLandlord;
        token.username = user.username; // تضمين اسم المستخدم
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // إضافة بيانات المستخدم إلى الجلسة
      session.user.isLandlord = token.isLandlord;
      session.user.username = token.username; // تضمين اسم المستخدم
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // تأكد من أن لديك NEXTAUTH_SECRET في ملف .env
};
