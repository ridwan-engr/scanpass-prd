import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Missing MONGODB_URI inside .env"
  );
}

if (!process.env.JWT_SECRET) {
  throw new Error(
    "Missing JWT_SECRET inside .env"
  );
}

if (!process.env.QR_TOKEN_SECRET) {
  throw new Error(
    "Missing QR_TOKEN_SECRET inside .env"
  );
}

export const env = {
  port: Number(process.env.PORT || 3000),

  mongodbUri: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,

  jwtExpiresIn:
    process.env.JWT_EXPIRES_IN || "2d",

  qrTokenSecret:
    process.env.QR_TOKEN_SECRET,

  qrTokenExpiresInMinutes:
    Number(
      process.env.QR_TOKEN_EXPIRES_IN_MINUTES ||
        1440
    ),

  clientOrigin:
    process.env.CLIENT_ORIGIN || "*"
};