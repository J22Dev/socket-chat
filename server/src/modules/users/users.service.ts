import { hashString, verifyHash } from "../auth/auth.utils";
import { Database } from "../common/database";
import { HttpError } from "../common/error";
import { GetUsersModel, UpdateUserModel } from "./users.models";

const db = Database.Instance;

export const getUser = async (userId: number) => {
  try {
    const foundUser = await db.user.findUnique({
      where: { id: userId },
      include: { Profile: true },
    });
    if (!foundUser) throw new HttpError(404, "User Not Found");
    const { password, ...rest } = foundUser;
    return rest;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (p: GetUsersModel) => {
  try {
    const { limit, page, term } = p;
    const take = limit ? Math.max(10, Math.min(10, Number(limit))) : 10;
    const skip = page ? (Number(page) - 1) * take : 0;
    if (term) {
      const searchTerm = `%${term}%`;
      const foundUsers = await db.$queryRaw`
      SELECT DISTINCT id,
                      firstname,
                      lastname,
                      email,
                      username,
                      datecreated,
                      dateupdated
      FROM            User
      WHERE           username LIKE ${searchTerm}
      OR              email LIKE ${searchTerm}
      OR              firstname LIKE ${searchTerm}
      OR              lastname LIKE ${searchTerm}
      ORDER BY        username ASC limit ${take} offset ${skip}
    `;
      return foundUsers;
    } else {
      const foundUsers = await db.user.findMany({
        take,
        skip,
        orderBy: { userName: "asc" },
      });
      return foundUsers;
    }
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (p: UpdateUserModel & { userId: number }) => {
  try {
    const { userId, newPassword, ...updatePayload } = p;
    const foundUser = await db.user.findUnique({ where: { id: userId } });
    if (!foundUser) throw new HttpError(404, "User Not Found");
    const { password, ...rest } = foundUser;
    const isValid = await verifyHash(password, p.password);
    if (!isValid) throw new HttpError(401, "Not Authorized");
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: updatePayload.firstName ?? foundUser.firstName,
        lastName: updatePayload.lastName ?? foundUser.lastName,
        email: updatePayload.email ?? foundUser.email,
        userName: updatePayload.userName ?? foundUser.userName,
        password: newPassword
          ? await hashString(newPassword)
          : foundUser.password,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await db.user.delete({ where: { id: userId } });
  } catch (error) {
    throw error;
  }
};
