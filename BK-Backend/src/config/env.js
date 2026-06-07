import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env");
}

if (!process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID) {
  throw new Error("DESCOPE_PROJECT_ID is missing in .env");
}

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  DESCOPE_PROJECT_ID: process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID
};
