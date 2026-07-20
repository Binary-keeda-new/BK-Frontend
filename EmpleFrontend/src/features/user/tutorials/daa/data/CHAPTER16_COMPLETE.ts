export const CHAPTER16_COMPLETE = [
  {
    instruction: "Complete the combine step for a Divide and Conquer sum algorithm.",
    template: `int sumArray(int arr[], int l, int r) {
    if (l == r) return arr[l];
    
    int m = l + (r - l) / 2;
    int leftSum = sumArray(arr, l, m);
    int rightSum = sumArray(arr, m + 1, r);
    
    // Combine step
    return leftSum ________ rightSum;
}`,
    answer: "+",
    blanks: ["+"]
  },
  {
    instruction: "Complete the Master Theorem recurrence for Binary Search.",
    template: `// Binary search divides the array into 2 halves, 
// but only makes 1 recursive call on one of those halves.
// The cost to split/combine is O(1).
// T(n) = ________ T(n/2) + O(1)`,
    answer: "1",
    blanks: ["1"]
  }
];