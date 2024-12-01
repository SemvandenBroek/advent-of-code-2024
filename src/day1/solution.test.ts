import { solution } from "./solution";
import { expect } from "chai";
import * as fs from "node:fs";

describe("solution", () => {
  const exampleInput = `
      3   4
      4   3
      2   5
      1   3
      3   9
      3   3
    `;

  it("should result in the correct totalDistance with exampleInput", () => {
    const result = solution(exampleInput);
    expect(result.totalDistance).to.equal(11);
  });

  it("should result in the correct similarity score with exampleInput", () => {
    const result = solution(exampleInput);
    expect(result.similarityScore).to.equal(31);
  });

  it("should result in the correct totalDistance with actual input", () => {
    const actualInput = fs.readFileSync("./src/day1/input.txt", "utf8");
    const result = solution(actualInput);
    expect(result.totalDistance).to.equal(1970720);
  });

  it("should result in the correct similarityScore with actual input", () => {
    const actualInput = fs.readFileSync("./src/day1/input.txt", "utf8");
    const result = solution(actualInput);
    expect(result.similarityScore).to.equal(17191599);
  });
});
