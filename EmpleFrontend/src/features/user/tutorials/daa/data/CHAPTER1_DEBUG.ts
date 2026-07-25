export const CHAPTER1_DEBUG = [
  {
    instructions: "Fix the syntax error in this basic algorithm pseudocode implementation.",
    buggy: "void init_algorithm(int arr[], int n) {\n    for(int i = 0 i < n; i++) {\n        arr[i] = 0;\n    }\n}",
    fixed: "void init_algorithm(int arr[], int n) {\n    for(int i = 0; i < n; i++) {\n        arr[i] = 0;\n    }\n}",
    hints: ["Check the for loop syntax.", "Missing semicolon in the loop declaration."],
    expectedOutput: "Algorithm initialized correctly."
  },
  {
    instructions: "Correct the logic to properly swap two variables, a fundamental algorithmic step.",
    buggy: "void swap(int* a, int* b) {\n    int temp = *a;\n    *a = *b;\n    *a = temp;\n}",
    fixed: "void swap(int* a, int* b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}",
    hints: ["Look at the last assignment.", "You are assigning temp back to a instead of b."],
    expectedOutput: "Variables swapped successfully."
  },
  {
    instructions: "Fix the correctness issue where the algorithm fails to return the minimum value.",
    buggy: "int find_min(int arr[], int n) {\n    int min = 0;\n    for(int i=1; i<n; i++) {\n        if(arr[i] < min) min = arr[i];\n    }\n    return min;\n}",
    fixed: "int find_min(int arr[], int n) {\n    int min = arr[0];\n    for(int i=1; i<n; i++) {\n        if(arr[i] < min) min = arr[i];\n    }\n    return min;\n}",
    hints: ["What if all numbers in the array are positive?", "Initialize min to the first element of the array."],
    expectedOutput: "Correct minimum value returned."
  }
];