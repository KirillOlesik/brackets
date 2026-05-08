module.exports = function check(str, bracketsConfig) {
  const stack = [];

  const pairs = new Map(bracketsConfig.map((b) => [b[1], b[0]]));

  const same = new Set(
    bracketsConfig.filter((b) => b[0] === b[1]).map((b) => b[0])
  );

  str.split('').forEach((char) => {
    if (same.has(char)) {
      if (stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
      return;
    }

    const isOpen = bracketsConfig.some((b) => b[0] === char);

    if (isOpen) {
      stack.push(char);
      return;
    }

    const expected = pairs.get(char);
    const last = stack.pop();

    if (last !== expected) {
      stack.push('ERROR');
    }
  });

  return stack.length === 0;
};
