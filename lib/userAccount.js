import { UserModel } from "../models/user";
import { sendVerificationCode } from "./emails";
import { generateOTP, hashPassword } from "./backendUtils";

export const loginWithOTP = async (email, OTP) => {
  const [existingUser] = await UserModel.find({
    email,
  });
  if (!existingUser) {
    return { status: "failed" };
  }
  const validOTP = existingUser.OTP === OTP;
  if (validOTP) {
    await UserModel.updateOne(
      {
        email,
      },
      {
        $set: {
          OTP: await hashPassword(Date.now() + ""),
          isVerified: true,
        },
      }
    );
    return {
      status: "success",
    };
  }
  return { status: "failed" };
};

export const login = async (email, password) => {
  const [existingUser] = await UserModel.find({
    email: email,
  });
  if (!existingUser) {
    await newUser(email, await hashPassword(password));
    return {
      status: "newUser",
    };
  }
  const validPassword = await verifyPassword(existingUser.password, password);
  if (!validPassword) {
    // TODO: Move them to enum
    return { status: "failed" };
  }
  if (!existingUser.isVerified) {
    return { status: "verification" };
  }
  return {
    status: "success",
  };
};

export const newUser = async (email, password) => {
  const OTP = generateOTP();
  await UserModel.create({ email, password, OTP });
  await sendVerificationCode(email, OTP);
};
