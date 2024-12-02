import {
  validateReport,
  ReactorMode,
  solution,
  switchReactorMode,
  getReactorReportMutations,
} from "./solution";
import { expect } from "chai";
import fs from "node:fs";

describe("Day 2 solution", () => {
  const exampleInput = `
      7 6 4 2 1
      1 2 7 8 9
      9 7 6 2 1
      1 3 2 4 5
      8 6 4 4 1
      1 3 6 7 9
    `;

  it("should yield the correct solution with example data", () => {
    const result = solution(exampleInput);
    expect(result.safeReports).to.equal(2);
  });

  it("should yield the correct solution with example data and problemDampener enabled", () => {
    const result = solution(exampleInput, true);
    expect(result.safeReports).to.equal(4);
  });

  it("should result in the correct totalDistance with actual input", () => {
    const actualInput = fs.readFileSync("./src/day2/input.txt", "utf8");
    const result = solution(actualInput);

    expect(result.safeReports).to.equal(631);
  });

  it("should result in the correct totalDistance with actual input and problemDampener enabled", () => {
    const actualInput = fs.readFileSync("./src/day2/input.txt", "utf8");
    const result = solution(actualInput, true);

    expect(result.safeReports).to.equal(665);
  });
});

describe("checkIsReportSafe", () => {
  it("should report 7 6 4 2 1 as safe", () => {
    expect(() => validateReport([7, 6, 4, 2, 1])).not.to.throw();
  });

  it("should report 1 2 7 8 9 as unsafe", () => {
    expect(() => validateReport([1, 2, 7, 8, 9])).to.throw(
      "Report increased from 2 to 7",
    );
  });

  it("should report 9 7 6 2 1 as unsafe", () => {
    expect(() => validateReport([9, 7, 6, 2, 1])).to.throw(
      "Report decreased from 6 to 2",
    );
  });

  it("should report 1 3 2 4 5 as unsafe", () => {
    expect(() => validateReport([1, 3, 2, 4, 5])).to.throw(
      "Values are decreasing but reactor is in INCREASING mode",
    );
  });

  it("should report 8 6 4 4 1 as unsafe", () => {
    expect(() => validateReport([8, 6, 4, 4, 1])).to.throw(
      "Value is neither increasing nor decreasing",
    );
  });

  it("should report 1 3 6 7 9 as unsafe", () => {
    expect(() => validateReport([1, 3, 6, 7, 9])).not.to.throw();
  });
});

describe("switchReactorMode", () => {
  it("should throw an error when both values are the same", () => {
    expect(() => switchReactorMode(ReactorMode.UNKNOWN, 1, 1)).to.throw(
      "Value is neither increasing nor decreasing",
    );
  });

  it("should throw an error when reactor is in DECREASING mode but values are INCREASING", () => {
    expect(() => switchReactorMode(ReactorMode.DECREASING, 2, 1)).to.throw(
      "Values are increasing but reactor is in DECREASING mode",
    );
  });

  it("should throw an error when reactor is in INCREASING mode but values are DECREASING", () => {
    expect(() => switchReactorMode(ReactorMode.INCREASING, 1, 2)).to.throw(
      "Values are decreasing but reactor is in INCREASING mode",
    );
  });

  it("should return ReactorMode.INCREASING when values are increasing", () => {
    expect(switchReactorMode(ReactorMode.UNKNOWN, 2, 1)).to.equal(
      ReactorMode.INCREASING,
    );
  });

  it("should return ReactorMode.DECREASING when values are decreasing", () => {
    expect(switchReactorMode(ReactorMode.UNKNOWN, 1, 2)).to.equal(
      ReactorMode.DECREASING,
    );
  });
});

describe("getReactorReportMutations", () => {
  it("should mutate a number array by removing all values once", () => {
    expect(getReactorReportMutations([1, 2, 3])).to.deep.equal([
      [2, 3],
      [1, 3],
      [1, 2],
    ]);
  });
});
