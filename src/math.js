import { nearToYocto, yoctoToNear } from "./units.js";

/**
 * Adds NEAR amounts exactly, e.g. addNear("0.1", "0.2") -> "0.3".
 * Works in yoctoNEAR with BigInt, so there is no floating-point error.
 */
export function addNear(...amounts) {
  if (amounts.length === 0) throw new Error("addNear needs at least one amount");
  const total = amounts.reduce((sum, a) => sum + BigInt(nearToYocto(a)), 0n);
  return yoctoToNear(total.toString());
}

/** Subtracts `b` from `a` exactly. Throws when the result would be negative. */
export function subNear(a, b) {
  const diff = BigInt(nearToYocto(a)) - BigInt(nearToYocto(b));
  if (diff < 0n) throw new Error(`cannot subtract ${b} NEAR from ${a} NEAR`);
  return yoctoToNear(diff.toString());
}
