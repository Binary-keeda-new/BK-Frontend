export const CHAPTER12_COMPLETE = [
  {
    instruction: "Complete the base case condition for the recursive mergeSort function.",
    template: `void mergeSort(int arr[], int l, int r) {
    // Stop recursion if left index is greater than or equal to right index
    if (l ________ r) {
        return;
    }
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
    answer: ">=",
    blanks: [">="]
  },
  {
    instruction: "Complete the statement to calculate the sizes of the two temporary subarrays in the Merge function.",
    template: `void merge(int arr[], int l, int m, int r) {
    // n1 is the size of the left subarray
    int n1 = m - l + 1;
    // n2 is the size of the right subarray
    int n2 = ________;
    
    // ...
}`,
    answer: "r - m",
    blanks: ["r - m", "r-m"]
  }
];