import crypto from "crypto";

const alphabet =
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateTicketCode() {
  let code = "SP-";

  for (
    let i = 0;
    i < 12;
    i++
  ) {
    code +=
      alphabet[
        crypto.randomInt(
          0,
          alphabet.length
        )
      ];
  }

  return code;
}