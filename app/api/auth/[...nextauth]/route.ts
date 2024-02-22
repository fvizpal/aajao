import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database";
import { createUser } from "@/lib/actions/user.actions";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async session({ session }) {

    }
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        const userExists = User.findOne({ email: profile?.email });
        
        const user = {
          email: profile?.email,
          firstName: profile?.name,
          photo: profile?.picture,
        }
        if(!userExists) {
          await createUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
})