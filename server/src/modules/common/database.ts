import { PrismaClient } from "@prisma/client";

export class Database {
  private static _instance: PrismaClient;
  private constructor() {}
  public static get Instance() {
    return (Database._instance = Database._instance || new PrismaClient());
  }
}
