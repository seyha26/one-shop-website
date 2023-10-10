import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { compare } from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// console.log("nextauth: ");

const options = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToMongoDB().catch((error) => {
          throw new Error(error);
        });
        // console.log(req);

        const user = await User.findOne({
          username: credentials.username,
        }).select("+password");

        if (!user) {
          throw new Error("Invalid credetials");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }
        // console.log("credentials: ", user);
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // console.log("jwt new", token);
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user;
      session.user = user;
      // console.log("session: ", session);
      return session;
    },
  },
};

export default NextAuth(options);
