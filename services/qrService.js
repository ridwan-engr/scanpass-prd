import crypto from "crypto";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

import { env } from "../config/env.js";

export function signQrToken(payload) {
  return jwt.sign(
    {
      type: "scanpass-ticket",

      eventId: payload.eventId,

      attendeeEmail:
        payload.attendeeEmail,

      code: payload.code
    },

    env.qrTokenSecret,

    {
      expiresIn: `${env.qrTokenExpiresInMinutes}m`
    }
  );
}

export function verifyQrToken(token) {
  return jwt.verify(
    token,
    env.qrTokenSecret
  );
}

export function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function createQrDataUrl(
  token
) {
  return QRCode.toDataURL(token, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 320
  });
}