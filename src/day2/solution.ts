export function solution(input: string) {
  const lines = input.split("\n");
  let safeReports = 0;

  for (const line of lines) {
    const reactorReport = line
      .split(/\s/)
      .map((value) => parseInt(value))
      .filter((value) => !isNaN(value));

    if (!reactorReport.length) continue;

    try {
      validateReport(reactorReport);
      safeReports++;
    } catch {
      /* empty */
    }
  }

  return { safeReports };
}

export enum ReactorMode {
  UNKNOWN,
  INCREASING,
  DECREASING,
}

export function validateReport(report: number[]) {
  let reactorMode = ReactorMode.UNKNOWN;

  for (let i = 1; i < report.length; ++i) {
    reactorMode = switchReactorMode(reactorMode, report[i], report[i - 1]);

    if (report[i - 1] - report[i] > 3) {
      throw Error(`Report decreased from ${report[i - 1]} to ${report[i]}`);
    }

    if (report[i] - report[i - 1] > 3) {
      throw Error(`Report increased from ${report[i - 1]} to ${report[i]}`);
    }
  }
}

export function switchReactorMode(
  reactorMode: ReactorMode,
  currentValue: number,
  previousValue: number,
): ReactorMode {
  if (currentValue === previousValue) {
    throw Error("Value is neither increasing nor decreasing");
  }

  if (currentValue > previousValue && reactorMode === ReactorMode.DECREASING) {
    throw Error("Values are increasing but reactor is in DECREASING mode");
  }

  if (previousValue > currentValue && reactorMode === ReactorMode.INCREASING) {
    throw Error("Values are decreasing but reactor is in INCREASING mode");
  }

  if (currentValue > previousValue) {
    return ReactorMode.INCREASING;
  }

  return ReactorMode.DECREASING;
}
