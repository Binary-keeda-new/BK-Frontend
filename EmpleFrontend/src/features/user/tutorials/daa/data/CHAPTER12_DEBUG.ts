export const CHAPTER12_DEBUG = [
  {
    instructions: "This Merge function merges two sorted arrays but loses stability. Fix the comparison.",
    buggy: `void merge(int arr[], int l, int m, int r) {
    // ... setup temporary arrays L and R ...
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        // Bug: Using '<' instead of '<=' destroys stability
        if (L[i] < R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    // ... copy remaining elements ...
}`,
    fixed: `void merge(int arr[], int l, int m, int r) {
    // ... setup temporary arrays L and R ...
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        // Fix: Use '<=' to favor the left array for equal elements
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    // ... copy remaining elements ...
}`,
    hints: [
      "Stability means equal elements retain their original relative order.",
      "If L[i] == R[j], which one came first in the original array?",
      "The one in L (the left half) came first! You must pick L[i] if they are equal."
    ],
    expectedOutput: "The array is correctly sorted and remains stable."
  },
  {
    instructions: "This recursive mergeSort function causes a Stack Overflow due to a missing base case.",
    buggy: `void mergeSort(int arr[], int l, int r) {
    // Bug: No base case! It will endlessly divide.
    int m = l + (r - l) / 2;
    
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    
    merge(arr, l, m, r);
}`,
    fixed: `void mergeSort(int arr[], int l, int r) {
    // Fix: Base case to stop recursion when the sub-array has 1 or 0 elements.
    if (l >= r) return;
    
    int m = l + (r - l) / 2;
    
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    
    merge(arr, l, m, r);
}`,
    hints: [
      "Recursive functions must have a condition to stop calling themselves.",
      "When is an array conceptually 'sorted'?",
      "When it has only 1 element (l == r)."
    ],
    expectedOutput: "Terminates successfully and sorts the array."
  },
  {
    instructions: "This merge function copies remaining elements from L, but forgets to copy remaining elements from R.",
    buggy: `void merge(int arr[], int l, int m, int r) {
    // ... while loop merges elements ...
    
    // Copy remaining elements of L[]
    while (i < n1) {
        arr[k] = L[i];
        i++; k++;
    }
    
    // Bug: Missing logic to copy remaining elements of R[]!
}`,
    fixed: `void merge(int arr[], int l, int m, int r) {
    // ... while loop merges elements ...
    
    // Copy remaining elements of L[]
    while (i < n1) {
        arr[k] = L[i];
        i++; k++;
    }
    
    // Fix: Copy remaining elements of R[]
    while (j < n2) {
        arr[k] = R[j];
        j++; k++;
    }
}`,
    hints: [
      "The first while loop stops as soon as ONE of the arrays (L or R) is exhausted.",
      "What if R has elements left over?",
      "You must have a while loop for R just like you do for L."
    ],
    expectedOutput: "All elements are merged, none are left behind."
  }
];