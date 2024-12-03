import { Day3Puzzle } from "./solution";
import { expect } from "chai";
import fs from "node:fs";

describe("Day 3", () => {
  describe("solution", () => {
    it("should yield the correct multiplicationResult with example data", () => {
      const result = new Day3Puzzle(
        "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
      ).solution();
      expect(result.multiplicationResult).to.equal(161);
    });

    it("should result in the correct multiplicationResult with actual input", () => {
      const actualInput = fs.readFileSync("./src/day3/input.txt", "utf8");
      const result = new Day3Puzzle(actualInput).solution();

      expect(result.multiplicationResult).to.equal(188192787);
    });

    it("should yield the correct multiplicationResult with example data and extra instructions", () => {
      const result = new Day3Puzzle(
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
        { extraInstructions: true },
      ).solution();
      expect(result.multiplicationResult).to.equal(48);
    });

    it("should result in the correct multiplicationResult with actual input and extra instructions", () => {
      const actualInput = fs.readFileSync("./src/day3/input.txt", "utf8");
      const result = new Day3Puzzle(actualInput, {
        extraInstructions: true,
      }).solution();

      expect(result.multiplicationResult).to.equal(113965544);
    });
  });

  describe("createInstructionStateMap", () => {
    it("should construct an instruction state map to quickly check whether to execute an instruction or not", () => {
      const result = new Day3Puzzle(
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
      ).createInstructionStates();

      expect(result).to.deep.equal([
        { instructionsEnabled: true, start: 0, end: 20 },
        { instructionsEnabled: false, start: 20, end: 59 },
        { instructionsEnabled: true, start: 59, end: 73 },
      ]);
    });
  });
});
