import { NextAuthOptions } from "next-auth";
import { Session, Profile } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User';
import connectDB from '@/config/db';
import { User as UserType } from "@/types/user.type";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({profile}) {
      await connectDB();

      const { email, name, picture } = profile as Profile
      const userExists = await User.findOne({ email: email });

      if (!userExists) {
        // Truncate user name if too long
        const username = name!.slice(0, 20);

        await User.create({
          email: email,
          username,
          image: picture,
        });
      }
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }: { session: Session}) {
      const user = await User.findOne({ email: session.user.email }) as UserType

      session.user.id = user._id.toString();

      return session;
    }
  },
};