import { toBase64, toUtf8 } from "@cosmjs/encoding";

export const toWasmMsg = (msg: any): string => {
  return toBase64(toUtf8(JSON.stringify(msg)));
};

const protectAgainstNaN = (value: number): string =>
  isNaN(value) ? "0" : String(value);

export const convertMicroDenomToDenom = (
  value: string = "0",
  decimals: number = 0
): string => {
  if (decimals === 0) return value;

  return protectAgainstNaN(Number(value) / Math.pow(10, decimals));
};

export const convertDenomToMicroDenom = (
  value: string = "0",
  decimals: number = 0
): string => {
  if (decimals === 0) return value;

  return protectAgainstNaN(
    parseInt(String(Number(value) * Math.pow(10, decimals)), 10)
  );
};
