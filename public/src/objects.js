export function newToken(type = "EOF", value = "") {
  return {
    internalType: "Token",
    type: type,
    value: value,
  };
}
export function newNode(op = "", left = {}, right = {}) {
  return {
    internalType: "Node",
    left: left,
    right: right,
    op: op, // MUL, ADD, POW, EXP, etc...
  };
}
export function newAtom(type = "", value = "") {
  return {
    internalType: "Atom",
    type: type, // VAR or NUM
    value: value,
  };
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
