export const CHAPTER7_DEBUG = [
  {
    instructions: "Fix the Interpolation Search probe",
    buggy: "pos = low + (key - arr[low]) * (high - low);",
    fixed: "pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (key - arr[low]));",
    hints: ["Ensure correct proportional scaling."],
    expectedOutput: "Proportional index"
  }
];