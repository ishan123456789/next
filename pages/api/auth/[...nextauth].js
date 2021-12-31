import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import { login, loginWithOTP } from "../../../lib/userAccount";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        await dbConnect();
        console.log("credentials", credentials);
        if (credentials.OTP) {
          const result = await loginWithOTP(credentials.email, credentials.OTP);
          if (result && result.status === "failed") {
            throw new Error("Verification failed");
          }
          return { email: credentials.email };
        }
        const result = await login(credentials.email, credentials.password);

        if (result.status === "newUser") {
          throw new Error("Please verify with OTP send on mail");
        }

        if (result.status === "verification") {
          throw new Error("Please verify with OTP sent already");
        }

        if (result.status === "failed") {
          throw new Error("Wrong password");
        }

        return { email: credentials.email };
      },
    }),
  ],
});
