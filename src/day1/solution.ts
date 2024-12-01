import _ from "lodash";

export function solution(input: string) {
  const lines = input.split("\n");

  const leftList: number[] = [];
  const rightList: number[] = [];
  let totalDistance = 0;
  let similarityScore = 0;

  const numberCount = new Map<number, number>();

  for (const line of lines) {
    const match = line.match(/(\d+)\s+(\d+)/);
    if (!match) continue;

    const left = match[1];
    const right = match[2];

    leftList.push(parseInt(left, 10));
    rightList.push(parseInt(right, 10));
  }

  leftList.sort();
  rightList.sort();

  for (const [left, right] of _.zip(leftList, rightList)) {
    if (!left || !right) continue;

    totalDistance += Math.abs(left - right);
  }

  for (const right of rightList) {
    numberCount.set(right, (numberCount.get(right) ?? 0) + 1);
  }

  for (const left of leftList) {
    similarityScore += left * (numberCount.get(left) ?? 0);
  }

  return { totalDistance, similarityScore };
}
