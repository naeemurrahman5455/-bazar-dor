import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const databaseUrl = process.env.BETTER_AUTH_DB_URL;

if (!databaseUrl) {
  throw new Error("BETTER_AUTH_DB_URL is missing from .env.local");
}

const client = new MongoClient(databaseUrl);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },

  socialProviders:{
            google: { 
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID, 
            clientSecret: process.env.BETTER_AUTH_CLIENT_SECRET, 
        }, 
         github: { 
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID, 
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET, 
        }, 
  },
  
});