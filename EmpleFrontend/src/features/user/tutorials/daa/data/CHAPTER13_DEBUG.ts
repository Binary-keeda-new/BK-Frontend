export const CHAPTER13_DEBUG = [
  {
    instructions: "Fix the partition function so it places the pivot in the correct final position.",
    buggy: "int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for(int j=low; j<high; j++) {\n        if(arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    return i + 1;\n}",
    fixed: "int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for(int j=low; j<high; j++) {\n        if(arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return i + 1;\n}",
    hints: ["You successfully moved all smaller elements to the left of index i+1.", "You forgot to actually swap the pivot (at high) into its correct spot at i+1!"],
    expectedOutput: "Pivot placed precisely at its sorted index."
  },
  {
    instructions: "Correct the recursive bounds in Quick Sort after partitioning.",
    buggy: "void quick_sort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quick_sort(arr, low, pi);\n        quick_sort(arr, pi, high);\n    }\n}",
    fixed: "void quick_sort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quick_sort(arr, low, pi - 1);\n        quick_sort(arr, pi + 1, high);\n    }\n}",
    hints: ["The pivot 'pi' is already in its correct sorted position.", "Do not include the pivot in the recursive subproblem calls."],
    expectedOutput: "Prevents infinite recursion and sorts successfully."
  },
  {
    instructions: "Fix the swap pointer logic inside Lomuto partition.",
    buggy: "void swap(int a, int b) {\n    int t = a;\n    a = b;\n    b = t;\n}\nint partition(...) {\n    //...\n    swap(arr[i], arr[j]);\n}",
    fixed: "void swap(int* a, int* b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\nint partition(...) {\n    //...\n    swap(&arr[i], &arr[j]);\n}",
    hints: ["Pass-by-value in C does not alter the original array.", "Use pass-by-reference (pointers) to swap actual array elements."],
    expectedOutput: "Elements swapped properly in memory."
  }
];