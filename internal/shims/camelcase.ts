// Some Gatsby packages expect `camelcase` to expose both default and named exports.
// When the ESM build is picked up, the default import goes missing. This shim
// normalises the behaviour.

/* eslint-disable @typescript-eslint/no-var-requires */
const camelcaseModule = require("camelcase");
const camelcase = typeof camelcaseModule === "function" ? camelcaseModule : camelcaseModule.default;

export { camelcase };
export default camelcase;
