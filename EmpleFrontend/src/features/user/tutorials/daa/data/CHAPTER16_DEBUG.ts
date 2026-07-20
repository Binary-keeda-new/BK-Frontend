export const CHAPTER16_DEBUG = [
  {
    instructions: "This Divide and Conquer algorithm calculates power(x, n). It works for positive n, but causes a Stack Overflow for n = 0. Fix the base case.",
    buggy: `int power(int x, int n) {
    // Bug: Missing base case for n == 0
    if (n == 1) return x;
    
    int half = power(x, n / 2);
    if (n % 2 == 0)
        return half * half;
    else
        return x * half * half;
}`,
    fixed: `int power(int x, int n) {
    // Fix: Add base case for n == 0
    if (n == 0) return 1;
    if (n == 1) return x;
    
    int half = power(x, n / 2);
    if (n % 2 == 0)
        return half * half;
    else
        return x * half * half;
}`,
    hints: [
      "If n is initially 0, the code attempts to calculate n/2 (which is 0) and recurse infinitely.",
      "What is any number x raised to the power of 0?",
      "It is 1. Add 'if (n == 0) return 1;'."
    ],
    expectedOutput: "Safely handles power(x, 0) and returns 1."
  },
  {
    instructions: "This Divide and Conquer approach finds the maximum element in an array but gets the 'Combine' step wrong.",
    buggy: `int findMax(int arr[], int l, int r) {
    if (l == r) return arr[l];
    
    int m = l + (r - l) / 2;
    int max1 = findMax(arr, l, m);
    int max2 = findMax(arr, m + 1, r);
    
    // Bug: Combining the answers incorrectly
    return max1 + max2;
}`,
    fixed: `int findMax(int arr[], int l, int r) {
    if (l == r) return arr[l];
    
    int m = l + (r - l) / 2;
    int max1 = findMax(arr, l, m);
    int max2 = findMax(arr, m + 1, r);
    
    // Fix: Return the maximum of the two halves
    if (max1 > max2) return max1;
    else return max2;
}`,
    hints: [
      "The function is called findMax, not sumArray.",
      "If the left half's max is 10 and the right half's max is 15, the overall max is 15.",
      "Change 'return max1 + max2' to return the larger of the two variables."
    ],
    expectedOutput: "Returns the maximum element in the array."
  },
  {
    instructions: "This algorithm tries to count the number of 1s in a sorted binary array (e.g. [0,0,1,1,1]) using Divide and Conquer, but the recursion doesn't divide the problem correctly.",
    buggy: `int countOnes(int arr[], int l, int r) {
    if (l > r) return 0;
    if (l == r) return arr[l] == 1 ? 1 : 0;
    
    int m = l + (r - l) / 2;
    // Bug: It recursively calls on the SAME bounds! Infinite loop!
    return countOnes(arr, l, m) + countOnes(arr, m, r);
}`,
    fixed: `int countOnes(int arr[], int l, int r) {
    if (l > r) return 0;
    if (l == r) return arr[l] == 1 ? 1 : 0;
    
    int m = l + (r - l) / 2;
    // Fix: The right half must start at m + 1
    return countOnes(arr, l, m) + countOnes(arr, m + 1, r);
}`,
    hints: [
      "Look at the recursive calls: countOnes(arr, l, m) and countOnes(arr, m, r).",
      "The element at index 'm' is being included in BOTH halves!",
      "Change the second call to start at 'm + 1'."
    ],
    expectedOutput: "Correctly counts the number of 1s in O(n) without infinite loops."
  }
];