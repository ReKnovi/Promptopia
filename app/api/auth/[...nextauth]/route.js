import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";

import { connectTODB } from "@utils/database";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email
    })
    session.user.id = sessionUser._id.toString();
  },
  async signin({ profile }) {
    try {
      await connectTODB();

//CHECK IF THE USER EXISTS
      const user = await User.findOne({ email: profile.email });
//IF NOT CREATE
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.username.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
