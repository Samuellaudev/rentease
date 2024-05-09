import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';
import { Profile, Session } from '@/utils/authOptions';

interface AuthOptions {
  providers: []
  callbacks: {
    signIn: (profile: Profile) => void;
    session: (session: Session) => void;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };