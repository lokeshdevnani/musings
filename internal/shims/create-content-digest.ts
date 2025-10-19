type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
};

const stableSerialize = (input: unknown, seen = new WeakSet<object>()): JSONValue => {
  if (input === null || typeof input === "undefined") {
    return null;
  }

  if (Array.isArray(input)) {
    return input.map((item) => stableSerialize(item, seen)) as JSONValue;
  }

  if (isPlainObject(input)) {
    if (seen.has(input)) {
      return null;
    }

    seen.add(input);

    const entries = Object.keys(input)
      .sort()
      .map((key) => [key, stableSerialize((input as Record<string, unknown>)[key], seen)] as const);

    return entries.reduce<Record<string, JSONValue>>((accumulator, [key, value]) => {
      if (typeof value !== "undefined") {
        accumulator[key] = value;
      }
      return accumulator;
    }, {});
  }

  if (typeof input === "bigint") {
    return Number(input) as JSONValue;
  }

  if (typeof input === "symbol") {
    return String(input.description ?? "");
  }

  if (typeof input === "function") {
    return String(input.name ?? "anonymous");
  }

  if (typeof input === "object") {
    // For non-plain objects (like Date, Map, etc.) fall back to string representation.
    return String(input) as JSONValue;
  }

  return input as JSONValue;
};

const stringHash = (value: string): string => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash).toString(16);
};

const createContentDigest = (input: unknown): string => {
  const serialized = stableSerialize(input);
  return stringHash(JSON.stringify(serialized));
};

export { createContentDigest };
export default createContentDigest;
