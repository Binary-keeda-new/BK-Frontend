export const CHAPTER9_DEBUG = [
  {
    instructions: "Fix the inner loop of Bubble Sort to avoid comparing out of bounds and redundant checks.",
    buggy: "void bubble_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        for(int j=0; j<n; j++) {\n            if(arr[j] > arr[j+1]) swap(&arr[j], &arr[j+1]);\n        }\n    }\n}",
    fixed: "void bubble_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        for(int j=0; j<n-i-1; j++) {\n            if(arr[j] > arr[j+1]) swap(&arr[j], &arr[j+1]);\n        }\n    }\n}",
    hints: ["If j goes up to n-1, j+1 is n, which is out of bounds.", "The last i elements are already sorted, so subtract i."],
    expectedOutput: "Array sorted successfully without segmentation faults."
  },
  {
    instructions: "Correct the early-exit optimization (adaptive nature) in Bubble Sort.",
    buggy: "void opt_bubble_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        bool swapped = false;\n        for(int j=0; j<n-i-1; j++) {\n            if(arr[j] > arr[j+1]) { swap(&arr[j], &arr[j+1]); }\n        }\n        if(swapped) break;\n    }\n}",
    fixed: "void opt_bubble_sort(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        bool swapped = false;\n        for(int j=0; j<n-i-1; j++) {\n            if(arr[j] > arr[j+1]) { swap(&arr[j], &arr[j+1]); swapped = true; }\n        }\n        if(!swapped) break;\n    }\n}",
    hints: ["You need to set swapped = true when a swap occurs.", "You should break if NO swaps occurred (!swapped)."],
    expectedOutput: "Optimized Bubble Sort runs in O(n) for sorted arrays."
  },
  {
    instructions: "Fix the logic to ensure Bubble Sort handles equal elements stably.",
    buggy: "void bubble_sort_stable(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        for(int j=0; j<n-i-1; j++) {\n            if(arr[j] >= arr[j+1]) swap(&arr[j], &arr[j+1]);\n        }\n    }\n}",
    fixed: "void bubble_sort_stable(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        for(int j=0; j<n-i-1; j++) {\n            if(arr[j] > arr[j+1]) swap(&arr[j], &arr[j+1]);\n        }\n    }\n}",
    hints: [">= will swap elements even if they are equal.", "Swapping equal elements destroys stability."],
    expectedOutput: "Bubble sort remains stable."
  }
];