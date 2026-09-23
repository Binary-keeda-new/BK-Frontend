export const CHAPTER10_DEBUG = [
  {
    instructions: "Fix the inner loop of Selection Sort that finds the minimum element.",
    buggy: "void selection_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        int min_idx = i;\n        for(int j=0; j<n; j++) {\n            if(arr[j] < arr[min_idx]) min_idx = j;\n        }\n        swap(&arr[min_idx], &arr[i]);\n    }\n}",
    fixed: "void selection_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        int min_idx = i;\n        for(int j=i+1; j<n; j++) {\n            if(arr[j] < arr[min_idx]) min_idx = j;\n        }\n        swap(&arr[min_idx], &arr[i]);\n    }\n}",
    hints: ["The inner loop should only scan the UNSORTED portion of the array.", "Start j from i + 1, not 0."],
    expectedOutput: "Array sorted correctly."
  },
  {
    instructions: "Fix the conditional swap to prevent unnecessary self-swaps in Selection Sort.",
    buggy: "void selection_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        int min_idx = i;\n        for(int j=i+1; j<n; j++) {\n            if(arr[j] < arr[min_idx]) min_idx = j;\n        }\n        swap(&arr[min_idx], &arr[i]);\n    }\n}",
    fixed: "void selection_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        int min_idx = i;\n        for(int j=i+1; j<n; j++) {\n            if(arr[j] < arr[min_idx]) min_idx = j;\n        }\n        if(min_idx != i) swap(&arr[min_idx], &arr[i]);\n    }\n}",
    hints: ["Swapping an element with itself is inefficient.", "Check if min_idx has actually changed from i before swapping."],
    expectedOutput: "Minimizes memory writes (O(n) swaps)."
  },
  {
    instructions: "Correct the min_idx initialization.",
    buggy: "void selection_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        int min_idx = 0;\n        for(int j=i+1; j<n; j++) {\n            if(arr[j] < arr[min_idx]) min_idx = j;\n        }\n        swap(&arr[min_idx], &arr[i]);\n    }\n}",
    fixed: "void selection_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        int min_idx = i;\n        for(int j=i+1; j<n; j++) {\n            if(arr[j] < arr[min_idx]) min_idx = j;\n        }\n        swap(&arr[min_idx], &arr[i]);\n    }\n}",
    hints: ["min_idx should be initialized to the start of the current unsorted window.", "Initialize min_idx to i, not 0."],
    expectedOutput: "Correct minimum element found for each window."
  }
];