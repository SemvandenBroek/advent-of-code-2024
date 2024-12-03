import { Puzzle } from "../puzzle";

interface InstructionState {
  instructionsEnabled: boolean;
  start: number;
  end: number;
}

export class Day3Puzzle extends Puzzle<{ multiplicationResult: number }> {
  constructor(
    input: string,
    private props?: { extraInstructions: boolean },
  ) {
    super(input);
  }

  public createInstructionStates(): InstructionState[] {
    const doOperations = [...this.input.matchAll(/(do\(\))/g)].map(
      (match) => match.index,
    );
    const dontOperations = [...this.input.matchAll(/(don't\(\))/g)].map(
      (match) => match.index,
    );

    const instructionStates: InstructionState[] = [];
    let instructionState = {
      instructionsEnabled: true,
      start: 0,
    };

    for (let i = 0; i < this.input.length; i++) {
      if (instructionState.instructionsEnabled && dontOperations.includes(i)) {
        instructionStates.push({ ...instructionState, end: i });
        instructionState = {
          instructionsEnabled: false,
          start: i,
        };
      } else if (
        !instructionState.instructionsEnabled &&
        doOperations.includes(i)
      ) {
        instructionStates.push({ ...instructionState, end: i });
        instructionState = {
          instructionsEnabled: true,
          start: i,
        };
      }
    }

    instructionStates.push({ ...instructionState, end: this.input.length });
    return instructionStates;
  }

  solution() {
    let multiplicationResult = 0;

    const multiplicationOperations = this.input.matchAll(/(mul\(\d+,\d+\))/g);

    const instructionStates = this.createInstructionStates();

    for (const match of multiplicationOperations) {
      const operands = match[1].match(/mul\((\d+),(\d+)\)/);
      if (!operands || operands.length < 3) continue;

      const instructionState = instructionStates.find(
        (state) => state.start <= match.index && state.end > match.index,
      );

      if (
        this.props?.extraInstructions &&
        !instructionState?.instructionsEnabled
      ) {
        continue;
      }

      const a = operands[1];
      const b = operands[2];
      multiplicationResult += parseInt(a) * parseInt(b);
    }

    return { multiplicationResult };
  }
}
