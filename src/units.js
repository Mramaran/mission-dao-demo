const DECIMALS = 24;

/** Converts a NEAR amount such as "0.2" to yoctoNEAR as a string. */
export function nearToYocto(near) {
  const str = String(near).trim();
  if (str.startsWith("-")) throw new Error("amount must not be negative");
  if (!/^(\d+(\.\d*)?|\.\d+)$/.test(str)) throw new Error(`not a NEAR amount: ${near}`);
  const [whole, frac = ""] = str.split(".");
  if (frac.length > DECIMALS) throw new Error("too many decimal places");
  return (BigInt(whole || "0") * 10n ** BigInt(DECIMALS) + BigInt(frac.padEnd(DECIMALS, "0") || "0")).toString();
}

/** Converts yoctoNEAR to a NEAR amount string, trimming trailing zeros. */
export function yoctoToNear(yocto) {
  const str = String(yocto).trim();
  if (!/^\d+$/.test(str)) throw new Error("yocto must be a non-negative whole number");
  const s = str.padStart(DECIMALS + 1, "0");
  const whole = s.slice(0, -DECIMALS);
  const frac = s.slice(-DECIMALS).replace(/0+$/, "");
  return frac ? `${whole}.${frac}` : whole;
}
