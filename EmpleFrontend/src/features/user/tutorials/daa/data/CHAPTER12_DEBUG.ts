export const CHAPTER12_DEBUG = [
  {
    instructions: "Fix the bounds calculation in the Divide step of Merge Sort.",
    buggy: "void merge_sort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = (l + r) / 2;\n        merge_sort(arr, l, m);\n        merge_sort(arr, m, r);\n        merge(arr, l, m, r);\n    }\n}",
    fixed: "void merge_sort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        merge_sort(arr, l, m);\n        merge_sort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}",
    hints: ["The second recursive call is overlapping with the first one by including 'm'.", "Pass m + 1 to the right subarray."],
    expectedOutput: "Subarrays divide evenly without infinite recursion."
  },
  {
    instructions: "Correct the merging logic to properly exhaust elements from both subarrays.",
    buggy: "void merge(int arr[], int l, int m, int r) {\n    // Arrays L and R created and filled...\n    int i=0, j=0, k=l;\n    while(i < n1 && j < n2) {\n        if(L[i] <= R[j]) { arr[k] = L[i]; i++; }\n        else { arr[k] = R[j]; j++; }\n    }\n    // Missing remainder copy loops\n}",
    fixed: "void merge(int arr[], int l, int m, int r) {\n    // Arrays L and R created and filled...\n    int i=0, j=0, k=l;\n    while(i < n1 && j < n2) {\n        if(L[i] <= R[j]) { arr[k] = L[i]; i++; }\n        else { arr[k] = R[j]; j++; }\n        k++;\n    }\n    while(i < n1) { arr[k] = L[i]; i++; k++; }\n    while(j < n2) { arr[k] = R[j]; j++; k++; }\n}",
    hints: ["First, k is never incremented in the while loop!", "Second, if one array is exhausted, the remaining elements of the other must be copied over."],
    expectedOutput: "Elements merge correctly into the original array."
  },
  {
    instructions: "Fix the memory allocation step inside the merge function.",
    buggy: "void merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int L[n1], R[n2];\n    for(int i=0; i<n1; i++) L[i] = arr[l + i + 1];\n    for(int j=0; j<n2; j++) R[j] = arr[m + 1 + j];\n    // ... merge logic\n}",
    fixed: "void merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int L[n1], R[n2];\n    for(int i=0; i<n1; i++) L[i] = arr[l + i];\n    for(int j=0; j<n2; j++) R[j] = arr[m + 1 + j];\n    // ... merge logic\n}",
    hints: ["L array should copy elements starting from index l, not l+1."],
    expectedOutput: "Temporary arrays constructed accurately."
  }
];