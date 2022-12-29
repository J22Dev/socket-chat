import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV as string;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
export const PORT = parseInt(process.env.PORT as string);
export const BUCKET_URL = process.env.BUCKET_URL as string;
export const BUCKET_REGION = process.env.BUCKET_REGION as string;
export const BUCKET_SECRET = process.env.BUCKET_SECRET as string;
export const BUCKET_KEY = process.env.BUCKET_KEY as string;
