import { toBase64, toUtf8 } from "@cosmjs/encoding";

export const toWasmMsg = (msg: any) => {
  return toBase64(toUtf8(JSON.stringify(msg)));
};
