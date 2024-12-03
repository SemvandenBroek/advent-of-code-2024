import { solution } from "./solution";
import { expect } from "chai";
import fs from "node:fs";

describe("Day 3 solution", () => {
  it("should yield the correct multiplicationResult with example data", () => {
    const result = solution(
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
    );
    expect(result.multiplicationResult).to.equal(161);
  });

  it("should result in the correct multiplicationResult with actual input", () => {
    const actualInput = fs.readFileSync("./src/day3/input.txt", "utf8");
    const result = solution(actualInput);

    expect(result.multiplicationResult).to.equal(188192787);
  });
});
