import { Database } from "../common/database";
import { HttpError } from "../common/error";

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

export const getUsers = async ({
  term,
  take,
  index,
}: {
  term: string;
  take: number;
  index: number;
}) => {
  try {
    const foundUsers = await db.user.findMany({
      where: {
        userName: { startsWith: term },
      },
      orderBy: {
        userName: "desc",
      },
      take,
      skip: index,
      select: {
        dateCreated: true,
        dateUpdated: true,
        firstName: true,
        lastName: true,
        email: true,
        id: true,
        userName: true,
      },
    });
    if (!foundUsers) throw new HttpError(404, "Users Not Found");
    return foundUsers;
  } catch (error) {
    throw error;
  }
};
