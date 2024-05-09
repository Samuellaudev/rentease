import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User';
import connectDB from '@/config/db';

export interface Profile {
  profile: {
    email: string;
    name: string;
    picture: string;
  }
}

export interface Session {
  session: {
    user: {
      email: string;
      id: string;
    }
  }
}
export const authOptions = {
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
    async signIn({profile}: Profile) {
      await connectDB();

      const { email, name, picture } = profile
      const userExists = await User.findOne({ email: email });

      if (!userExists) {
        // Truncate user name if too long
        const username = name.slice(0, 20);

        await User.create({
          email: email,
          username,
          image: picture,
        });
      }
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }: Session) {
      const user = await User.findOne({ email: session.user.email });

      session.user.id = user._id.toString();

      return session;
    }
  },
};