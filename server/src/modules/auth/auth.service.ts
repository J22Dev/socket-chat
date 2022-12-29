import { Database } from "../common/database";
import { HttpError } from "../common/error";
import { UserLoginModel, UserRegisterModel } from "./auth.models";
import { hashString, signToken, verifyHash, verifyToken } from "./auth.utils";

const db = Database.Instance;

export const registerUser = async (userData: UserRegisterModel) => {
  try {
    const foundUser = await db.user.findUnique({
      where: { email: userData.email },
    });
    if (foundUser) throw new HttpError(400, "User Exists");
    const newUser = await db.user.create({
      data: {
        ...userData,
        password: await hashString(userData.password),
      },
    });
    const [accessToken, refreshToken] = [
      signToken({
        payload: { id: newUser.id },
        type: "ACCESS",
      }),
      signToken({
        payload: { id: newUser.id },
        type: "REFRESH",
      }),
    ];
    await db.token.create({
      data: {
        userId: newUser.id,
        refreshToken,
      },
    });
    const { password, ...rest } = newUser;
    return {
      user: rest,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    throw error;
  }
};
export const loginUser = async (userData: UserLoginModel) => {
  try {
    const foundUser = await db.user.findUnique({
      where: { email: userData.email },
    });
    if (!foundUser) throw new HttpError(404, "User Not Found");
    const { password, ...rest } = foundUser;
    const isValid = await verifyHash(password, userData.password);
    if (!isValid) throw new HttpError(401, "Not Authorized");
    const [accessToken, refreshToken] = [
      signToken({
        payload: { id: rest.id },
        type: "ACCESS",
      }),
      signToken({
        payload: { id: rest.id },
        type: "REFRESH",
      }),
    ];
    await db.token.update({
      where: { userId: rest.id },
      data: { refreshToken },
    });
    return {
      user: rest,
      tokens: { refreshToken, accessToken },
    };
  } catch (error) {
    throw error;
  }
};
export const refreshUser = async (token: string) => {
  try {
    const verifiedToken = await verifyToken({ token, type: "REFRESH" });
    if (!verifiedToken) throw new HttpError(401, "Not Authorized");
    const dbToken = await db.token.findUnique({
      where: { refreshToken: token },
    });
    if (!dbToken) throw new HttpError(401, "Not Authorized");
    const accessToken = signToken({
      payload: { id: dbToken.userId },
      type: "ACCESS",
    });
    return accessToken;
  } catch (error) {
    throw error;
  }
};
