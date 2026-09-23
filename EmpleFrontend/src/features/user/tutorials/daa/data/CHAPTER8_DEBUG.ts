export const CHAPTER8_DEBUG = [
  {
    instructions: "Fix the helper function used by many sorting algorithms to correctly swap elements.",
    buggy: "void swap(int* x, int* y) {\n    int temp = x;\n    x = y;\n    y = temp;\n}",
    fixed: "void swap(int* x, int* y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}",
    hints: ["You are assigning the pointers themselves, not the values they point to.", "Dereference the pointers using *."],
    expectedOutput: "Memory values correctly swapped."
  },
  {
    instructions: "Fix the stability check logic for a sorting algorithm.",
    buggy: "bool is_stable(Item a, Item b) {\n    if(a.value == b.value) {\n        return a.original_index < b.original_index;\n    }\n    return a.value < b.value;\n}",
    fixed: "bool is_stable(Item a, Item b) {\n    if(a.value == b.value) {\n        return a.original_index <= b.original_index;\n    }\n    return a.value <= b.value;\n}",
    hints: ["Stability requires relative order to be maintained.", "If a appeared before b, it must remain before b (<=)."],
    expectedOutput: "Stability evaluated correctly."
  },
  {
    instructions: "Fix the verification function to check if an array is sorted.",
    buggy: "bool is_sorted(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        if(arr[i] < arr[i+1]) return false;\n    }\n    return true;\n}",
    fixed: "bool is_sorted(int arr[], int n) {\n    for(int i=0; i<n-1; i++) {\n        if(arr[i] > arr[i+1]) return false;\n    }\n    return true;\n}",
    hints: ["The current logic checks if the array is in strictly descending order.", "For ascending sort, an element should NOT be greater than the next element."],
    expectedOutput: "Correctly identifies a sorted array."
  }
];