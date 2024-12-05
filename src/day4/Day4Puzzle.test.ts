import { Day4Puzzle } from "./Day4Puzzle";
import { expect } from "chai";
import fs from "node:fs";

describe("Day4Puzzle", () => {
  describe("solution", () => {
    it("should result in the correct wordcount for the example", () => {
      const exampleInput = `
      MMMSXXMASM
      MSAMXMSMSA
      AMXSXMAAMM
      MSAMASMSMX
      XMASAMXAMM
      XXAMMXXAMA
      SMSMSASXSS
      SAXAMASAAA
      MAMMMXMMMM
      MXMXAXMASX
    `;

      const puzzle = new Day4Puzzle(exampleInput);
      const solution = puzzle.solution();

      expect(solution.forwardsCount).to.equal(3);
      expect(solution.backwardsCount).to.equal(2);
      expect(solution.verticalForwardsCount).to.equal(1);
      expect(solution.verticalBackwardsCount).to.equal(2);
      expect(solution.diagonalForwardsCount).to.equal(2);
      expect(solution.diagonalBackwardsCount).to.equal(8);

      expect(solution.totalCount).to.equal(18);
    });

    it("should result in the correct totalCount for the actual input", () => {
      const actualInput = fs.readFileSync("./src/day4/input.txt", "utf8");

      const puzzle = new Day4Puzzle(actualInput);
      const solution = puzzle.solution();

      expect(solution.totalCount).to.equal(2532);
    });
  });

  describe("countHorizontal", () => {
    it("should find one occurrence of XMAS", () => {
      const puzzle = new Day4Puzzle(".XMAS.");
      const solution = puzzle.countHorizontal("XMAS");

      expect(solution).to.equal(1);
    });

    it("should find all occurrences of XMAS", () => {
      const puzzle = new Day4Puzzle(".XMAS.XMAS\nXMAS..XMAS");
      const solution = puzzle.countHorizontal("XMAS");

      expect(solution).to.equal(4);
    });

    it("should find no occurrences of XMAS when there are none", () => {
      const puzzle = new Day4Puzzle("......");
      const solution = puzzle.countHorizontal("XMAS");

      expect(solution).to.equal(0);
    });

    it("should find one occurrence of XMAS backwards", () => {
      const puzzle = new Day4Puzzle(".SAMX.");
      const solution = puzzle.countHorizontal("SAMX");

      expect(solution).to.equal(1);
    });

    it("should find all occurrences of XMAS backwards", () => {
      const puzzle = new Day4Puzzle(".SAMX.SAMX\nSAMX......");
      const solution = puzzle.countHorizontal("SAMX");

      expect(solution).to.equal(3);
    });

    it("should find no occurrences of XMAS backwards when there are none", () => {
      const puzzle = new Day4Puzzle(".XMAS.");
      const solution = puzzle.countHorizontal("SAMX");

      expect(solution).to.equal(0);
    });
  });

  describe("countDiagonal", () => {
    it("should find one occurrence of XMAS diagonally", () => {
      const input = `
        X...
        .M..
        ..A.
        ...S
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countDiagonal("XMAS");

      expect(solution).to.equal(1);
    });

    it("should find all occurrences of XMAS diagonally", () => {
      const input = `
        X.X.....
        .M.M....
        ..A.A...
        ...S.S..
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countDiagonal("XMAS");

      expect(solution).to.equal(2);
    });

    it("should find one occurrence of SAMX diagonally", () => {
      const input = `
        S...
        .A..
        ..M.
        ...X
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countDiagonal("SAMX");

      expect(solution).to.equal(1);
    });

    it("should find all occurrences of SAMX diagonally", () => {
      const input = `
        S.S.....
        .A.A....
        ..M.M...
        ...X.X..
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countDiagonal("SAMX");

      expect(solution).to.equal(2);
    });
  });

  describe("countDiagonalBackwards", () => {
    it("should find one occurrence of XMAS diagonally backwards", () => {
      const input = `
        ...X
        ..M.
        .A..
        S...
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countDiagonalBackwards("XMAS");

      expect(solution).to.equal(1);
    });

    it("should find all occurrences of XMAS diagonally", () => {
      const input = `
        .....X.X
        ....M.M.
        ...A.A..
        ..S.S...
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countDiagonalBackwards("XMAS");

      expect(solution).to.equal(2);
    });

    it("should find one occurrence of SAMX diagonally", () => {
      const input = `
        ...S
        ..A.
        .M..
        X...
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countDiagonalBackwards("SAMX");

      expect(solution).to.equal(1);
    });

    it("should find all occurrences of SAMX diagonally", () => {
      const input = `
        .....S.S
        ....A.A.
        ...M.M..
        ..X.X...
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countDiagonalBackwards("SAMX");

      expect(solution).to.equal(2);
    });
  });

  describe("countVertical", () => {
    it("should find one occurrence of XMAS vertically forwards", () => {
      const input = `
        X...
        M...
        A...
        S...
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countVertical("XMAS");

      expect(solution).to.equal(1);
    });

    it("should find all occurrences of XMAS vertically forwards", () => {
      const input = `
        X...X
        M...M
        A...A
        S...S
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countVertical("XMAS");

      expect(solution).to.equal(2);
    });

    it("should find one occurrence of XMAS vertically backwards", () => {
      const input = `
        S...
        A...
        M...
        X...
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countVertical("SAMX");

      expect(solution).to.equal(1);
    });

    it("should find all occurrences of XMAS vertically backwards", () => {
      const input = `
        S...S
        A...A
        M...M
        X...X
      `;

      const puzzle = new Day4Puzzle(input);
      const solution = puzzle.countVertical("SAMX");

      expect(solution).to.equal(2);
    });
  });
});
