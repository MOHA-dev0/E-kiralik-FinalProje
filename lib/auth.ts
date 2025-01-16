import { sanityClient } from "@/sanity/lib/sanity";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
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
            id: user._id || user.tc,
            tc: user.tc,
            username: user.username,
            isLandlord: user.isLandlord,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.tc = user.tc;
        token.username = user.username;
        token.isLandlord = user.isLandlord;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.tc = token.tc;
      session.user.username = token.username;
      session.user.isLandlord = token.isLandlord;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
