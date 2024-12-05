import { Puzzle } from "../puzzle";

interface Day4PuzzleSolution {
  totalCount: number;
  forwardsCount: number;
  backwardsCount: number;
  verticalForwardsCount: number;
  verticalBackwardsCount: number;
  diagonalForwardsCount: number;
  diagonalBackwardsCount: number;
}

export class Day4Puzzle extends Puzzle<Day4PuzzleSolution> {
  private matrix: string[] = [];

  constructor(input: string) {
    super(input);

    for (const line of this.input.split("\n")) {
      const strippedWhitespace = line.replaceAll(/\s/g, "");
      if (strippedWhitespace != "") {
        this.matrix.push(strippedWhitespace);
      }
    }
  }

  override solution(): Day4PuzzleSolution {
    console.log(
      `Processing matrix of height ${this.matrix.length} width ${this.matrix[0].length}`,
    );

    const forwardsCount = this.countHorizontal("XMAS");
    const backwardsCount = this.countHorizontal("SAMX");
    const verticalForwardsCount = this.countVertical("XMAS");
    const verticalBackwardsCount = this.countVertical("SAMX");
    const diagonalForwardsCount =
      this.countDiagonal("XMAS") + this.countDiagonalBackwards("XMAS");
    const diagonalBackwardsCount =
      this.countDiagonal("SAMX") + this.countDiagonalBackwards("SAMX");

    return {
      totalCount:
        forwardsCount +
        backwardsCount +
        verticalForwardsCount +
        verticalBackwardsCount +
        diagonalForwardsCount +
        diagonalBackwardsCount,
      forwardsCount,
      backwardsCount,
      verticalForwardsCount,
      verticalBackwardsCount,
      diagonalForwardsCount,
      diagonalBackwardsCount,
    };
  }

  public countDiagonal(word: "XMAS" | "SAMX"): number {
    let diagonalCount = 0;

    for (let i = 0; i < this.matrix.length - 3; i++) {
      for (let j = 0; j < this.matrix[i].length - 3; j++) {
        if (this.matrix[i][j] != word[0]) {
          continue;
        }

        if (this.matrix[i + 1][j + 1] != word[1]) {
          continue;
        }

        if (this.matrix[i + 2][j + 2] != word[2]) {
          continue;
        }

        if (this.matrix[i + 3][j + 3] != word[3]) {
          continue;
        }

        diagonalCount++;
      }
    }

    return diagonalCount;
  }

  public countDiagonalBackwards(word: "XMAS" | "SAMX"): number {
    let diagonalCount = 0;

    for (let i = 0; i < this.matrix.length - 3; i++) {
      for (let j = this.matrix[0].length; j >= 3; j--) {
        if (this.matrix[i][j] != word[0]) {
          continue;
        }

        if (this.matrix[i + 1][j - 1] != word[1]) {
          continue;
        }

        if (this.matrix[i + 2][j - 2] != word[2]) {
          continue;
        }

        if (this.matrix[i + 3][j - 3] != word[3]) {
          continue;
        }

        diagonalCount++;
      }
    }

    return diagonalCount;
  }

  public countVertical(word: "XMAS" | "SAMX"): number {
    let verticalForwardCount = 0;
    for (let i = 0; i < this.matrix.length - 3; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] != word[0]) {
          continue;
        }

        if (this.matrix[i + 1][j] != word[1]) {
          continue;
        }

        if (this.matrix[i + 2][j] != word[2]) {
          continue;
        }

        if (this.matrix[i + 3][j] != word[3]) {
          continue;
        }

        verticalForwardCount++;
      }
    }

    return verticalForwardCount;
  }

  public countHorizontal(word: "XMAS" | "SAMX"): number {
    let forwardsCount = 0;
    for (const line of this.matrix) {
      const matches = line.matchAll(new RegExp(word, "g"));
      forwardsCount += [...matches].length;
    }

    return forwardsCount;
  }
}
