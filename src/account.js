/** NEAR account id rules: 2 to 64 characters, lowercase letters and digits, separated by - _ or . (no separator at the start or end, and never two in a row). */
const ACCOUNT_RE = /^(?=.{2,64}$)(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

/** True when `id` is a valid NEAR account id. */
export function isValidAccountId(id) {
  return typeof id === "string" && ACCOUNT_RE.test(id);
}

/** True for an implicit account: 64 lowercase hex characters. */
export function isImplicitAccount(id) {
  return typeof id === "string" && /^[0-9a-f]{64}$/.test(id);
}

/** True for a valid account on testnet, such as alice.testnet. */
export function isTestnetAccount(id) {
  return isValidAccountId(id) && id.endsWith(".testnet");
}

/** The parent account: "app.alice.testnet" gives "alice.testnet". Null for a top-level or invalid id. */
export function parentAccount(id) {
  if (!isValidAccountId(id) || !id.includes(".")) return null;
  return id.slice(id.indexOf(".") + 1);
}
