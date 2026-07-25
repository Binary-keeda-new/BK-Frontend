export const CHAPTER5_DEBUG = [
  {
    instructions: "Fix the Linear Search implementation to return the correct index.",
    buggy: "int linear_search(int arr[], int n, int target) {\n    for(int i=0; i<n; i++) {\n        if(arr[i] == target) return target;\n    }\n    return -1;\n}",
    fixed: "int linear_search(int arr[], int n, int target) {\n    for(int i=0; i<n; i++) {\n        if(arr[i] == target) return i;\n    }\n    return -1;\n}",
    hints: ["The function is supposed to return the index of the target.", "Returning 'target' just returns the value we already know."],
    expectedOutput: "Algorithm returns the correct index of the target."
  },
  {
    instructions: "Correct the loop bounds to ensure Linear Search checks all elements.",
    buggy: "int linear_search(int arr[], int n, int key) {\n    for(int i=1; i<n; i++) {\n        if(arr[i] == key) return i;\n    }\n    return -1;\n}",
    fixed: "int linear_search(int arr[], int n, int key) {\n    for(int i=0; i<n; i++) {\n        if(arr[i] == key) return i;\n    }\n    return -1;\n}",
    hints: ["Arrays are 0-indexed in C.", "The loop is skipping the very first element!"],
    expectedOutput: "Target is found even if it is at the 0th index."
  },
  {
    instructions: "Fix the return statement for when the element is NOT found.",
    buggy: "int linear_search(int arr[], int n, int x) {\n    for(int i=0; i<n; i++) {\n        if(arr[i] == x) return i;\n        else return -1;\n    }\n}",
    fixed: "int linear_search(int arr[], int n, int x) {\n    for(int i=0; i<n; i++) {\n        if(arr[i] == x) return i;\n    }\n    return -1;\n}",
    hints: ["The loop terminates immediately after checking the first element.", "Only return -1 AFTER the loop has completely finished checking all elements."],
    expectedOutput: "Correctly identifies absence of target after full traversal."
  }
];