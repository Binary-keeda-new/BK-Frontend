export const CHAPTER5_DEBUG = [
  {
    instructions: "This binary search function is resulting in an infinite loop for certain target values. Fix the logic.",
    buggy: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        // Bug: Failing to move the boundary past 'mid' causes an infinite loop
        if (arr[mid] < target) {
            left = mid; 
        } else {
            right = mid;
        }
    }
    return -1;
}`,
    fixed: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        // Fix: Adjust boundaries to mid + 1 and mid - 1
        if (arr[mid] < target) {
            left = mid + 1; 
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    hints: [
      "Look at how 'left' and 'right' are updated.",
      "If arr[mid] is not the target, should we include 'mid' in the next search window?",
      "No! Update left to mid + 1, and right to mid - 1."
    ],
    expectedOutput: "Binary search terminates and returns the correct index."
  },
  {
    instructions: "This linear search function is supposed to return the index of the FIRST occurrence of the target, but it returns the LAST occurrence instead. Fix it.",
    buggy: `int linearSearch(int arr[], int n, int target) {
    int foundIndex = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            // Bug: It keeps searching and overwriting the index!
            foundIndex = i;
        }
    }
    return foundIndex;
}`,
    fixed: `int linearSearch(int arr[], int n, int target) {
    int foundIndex = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            // Fix: Return immediately upon finding the first occurrence
            return i;
        }
    }
    return foundIndex;
}`,
    hints: [
      "What happens when the loop finds the target at index 2, but the target also exists at index 5?",
      "The loop continues running until the end of the array.",
      "Add a 'break' statement or return 'i' immediately to stop searching."
    ],
    expectedOutput: "Returns the index of the first match."
  },
  {
    instructions: "This binary search attempts to calculate the midpoint, but it uses integer overflow-prone arithmetic. Fix it.",
    buggy: `int binarySearchMid(int left, int right) {
    // Bug: If left and right are huge, left + right will overflow
    // before the division happens!
    int mid = (left + right) / 2;
    return mid;
}`,
    fixed: `int binarySearchMid(int left, int right) {
    // Fix: Use subtraction to avoid overflow
    int mid = left + (right - left) / 2;
    return mid;
}`,
    hints: [
      "What is the maximum value of a 32-bit signed integer?",
      "If left is 2 billion and right is 2 billion, left + right is 4 billion (overflow!).",
      "Calculate the distance (right - left), halve it, and add it to left."
    ],
    expectedOutput: "Safely calculates midpoints for large arrays."
  }
];