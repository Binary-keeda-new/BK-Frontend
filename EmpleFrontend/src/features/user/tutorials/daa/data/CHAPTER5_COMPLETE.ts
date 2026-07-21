export const CHAPTER5_COMPLETE = [
  {
    instruction: "Complete the while loop condition for Binary Search.",
    template: `int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    // The loop must run as long as the search space is valid
    while (left ________ right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    answer: "<=",
    blanks: ["<="]
  },
  {
    instruction: "Complete the Linear Search statement to check if the current element matches the target.",
    template: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[________] == target) {
            return i;
        }
    }
    return -1;
}`,
    answer: "i",
    blanks: ["i"]
  }
];