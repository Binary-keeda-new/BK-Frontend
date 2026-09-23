export const CHAPTER3_DEBUG = [
  {
    instructions: "Fix the complexity analysis logic by correcting the nested loop bounds.",
    buggy: "void nested_loops(int n) {\n    for(int i = 0; i < n; i++) {\n        for(int j = 0; j < n; i++) {\n            // O(1) operation\n        }\n    }\n}",
    fixed: "void nested_loops(int n) {\n    for(int i = 0; i < n; i++) {\n        for(int j = 0; j < n; j++) {\n            // O(1) operation\n        }\n    }\n}",
    hints: ["Look closely at the increment of the inner loop.", "It increments i instead of j."],
    expectedOutput: "Loops execute in exactly O(n^2) time."
  },
  {
    instructions: "Fix the logarithmic step loop to correctly run in O(log n) time.",
    buggy: "void log_loop(int n) {\n    for(int i = 1; i < n; i += 2) {\n        // O(1) op\n    }\n}",
    fixed: "void log_loop(int n) {\n    for(int i = 1; i < n; i *= 2) {\n        // O(1) op\n    }\n}",
    hints: ["i += 2 makes it run in O(n) time.", "To halve the remaining distance or double the step, use multiplication."],
    expectedOutput: "Loop executes in O(log n) time."
  },
  {
    instructions: "Fix the condition that evaluates Best Case vs Worst Case.",
    buggy: "bool is_best_case(int* arr, int n) {\n    // Check if array is sorted\n    for(int i=0; i<n; i++) {\n        if(arr[i] > arr[i+1]) return false;\n    }\n    return true;\n}",
    fixed: "bool is_best_case(int* arr, int n) {\n    // Check if array is sorted\n    for(int i=0; i<n-1; i++) {\n        if(arr[i] > arr[i+1]) return false;\n    }\n    return true;\n}",
    hints: ["Array bounds check.", "arr[i+1] will go out of bounds if i < n."],
    expectedOutput: "Correctly identifies the best case without crashing."
  }
];