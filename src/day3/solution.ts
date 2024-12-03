export function solution(input: string) {
  let multiplicationResult = 0;

  const multiplicationOperations = input.matchAll(/(mul\(\d+,\d+\))/g);

  for (const [, multiplicationOperation] of multiplicationOperations) {
    const operands = multiplicationOperation.match(/mul\((\d+),(\d+)\)/);
    if (!operands || operands.length < 3) continue;

    const a = operands[1];
    const b = operands[2];
    multiplicationResult += parseInt(a) * parseInt(b);
  }

  return { multiplicationResult };
}
