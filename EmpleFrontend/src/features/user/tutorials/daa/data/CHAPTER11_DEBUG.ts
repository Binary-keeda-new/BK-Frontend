export const CHAPTER11_DEBUG = [
  {
    instructions: "Fix the shifting logic in Insertion Sort so elements are not overwritten.",
    buggy: "void insertion_sort(int arr[], int n) {\n    for(int i=1; i<n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while(j >= 0 && arr[j] > key) {\n            arr[j] = arr[j+1];\n            j--;\n        }\n        arr[j+1] = key;\n    }\n}",
    fixed: "void insertion_sort(int arr[], int n) {\n    for(int i=1; i<n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while(j >= 0 && arr[j] > key) {\n            arr[j+1] = arr[j];\n            j--;\n        }\n        arr[j+1] = key;\n    }\n}",
    hints: ["You are trying to shift elements to the RIGHT to make room for the key.", "arr[j] should be moved to arr[j+1], not the other way around."],
    expectedOutput: "Elements shifted correctly without data loss."
  },
  {
    instructions: "Correct the while loop condition to prevent out-of-bounds access.",
    buggy: "void insertion_sort(int arr[], int n) {\n    for(int i=1; i<n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while(arr[j] > key && j >= 0) {\n            arr[j+1] = arr[j];\n            j--;\n        }\n        arr[j+1] = key;\n    }\n}",
    fixed: "void insertion_sort(int arr[], int n) {\n    for(int i=1; i<n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while(j >= 0 && arr[j] > key) {\n            arr[j+1] = arr[j];\n            j--;\n        }\n        arr[j+1] = key;\n    }\n}",
    hints: ["In C, conditions are evaluated left-to-right.", "If you check arr[j] before checking if j >= 0, you might access arr[-1]."],
    expectedOutput: "No segmentation faults on edge cases."
  },
  {
    instructions: "Fix the placement of the key after the shifting is done.",
    buggy: "void insertion_sort(int arr[], int n) {\n    for(int i=1; i<n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while(j >= 0 && arr[j] > key) {\n            arr[j+1] = arr[j];\n            j--;\n        }\n        arr[j] = key;\n    }\n}",
    fixed: "void insertion_sort(int arr[], int n) {\n    for(int i=1; i<n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while(j >= 0 && arr[j] > key) {\n            arr[j+1] = arr[j];\n            j--;\n        }\n        arr[j+1] = key;\n    }\n}",
    hints: ["When the while loop terminates, j is decremented one step past the insertion point.", "Insert the key at j + 1."],
    expectedOutput: "Key inserted in the correct sorted position."
  }
];