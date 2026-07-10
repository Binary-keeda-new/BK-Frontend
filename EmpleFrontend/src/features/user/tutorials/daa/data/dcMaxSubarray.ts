export const dcMaxSubarrayContent = [
  {
    title: "1. Introduction",
    content: "The Maximum Subarray Problem is the task of finding a contiguous subarray with the largest sum, within a given one-dimensional array of numbers containing at least one positive number. While Kadane's algorithm solves this in $O(n)$ time, the Divide and Conquer approach solves it in $O(n \\log n)$ time and is a classic example of the D&C paradigm."
  },
  {
    title: "2. Problem Statement",
    content: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum."
  },
  {
    title: "3. Theory & Working",
    content: "Using Divide and Conquer, we divide the given array into two halves. The maximum subarray must lie in one of these three places:\n1. Entirely in the **left half**.\n2. Entirely in the **right half**.\n3. **Crossing the midpoint** (spanning across the left and right halves).\n\nWe recursively find the maximum subarray in the left and right halves. To find the crossing maximum, we start from the midpoint and iterate down to the start to find the max left sum, and then iterate up to the end to find the max right sum. We then return the maximum of these three values."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: `Array: \`[-2, 1, -3, 4, -1, 2, 1, -5, 4]\`\n- Midpoint is index 4 (value -1). Left half: \`[-2, 1, -3, 4]\`, Right half: \`[2, 1, -5, 4]\`.\n- **Left Half Recursion:** Max subarray is \`[4]\` with sum 4.\n- **Right Half Recursion:** Max subarray is \`[2, 1]\` with sum 3.\n- **Crossing Subarray:** \n  - Left from mid(-1): [-1], [-1+4]=3, [3-3]=0, [0+1]=1, [1-2]=-1. Max left sum = 3.\n  - Right from mid+1(2): [2], [2+1]=3, [3-5]=-2, [-2+4]=2. Max right sum = 3.\n  - Total crossing sum = 3 + 3 = 6 (Subarray: \`[4, -1, 2, 1]\`).\n- Result: Max of (Left Max=4, Right Max=3, Crossing Max=6) is **6**.`
  },
  {
    title: "5. Pseudocode",
    content: `\n\`\`\`text\nprocedure maxSubArray(A, low, high)\n    if low == high then\n        return A[low]\n    mid = (low + high) / 2\n    left_sum = maxSubArray(A, low, mid)\n    right_sum = maxSubArray(A, mid + 1, high)\n    cross_sum = maxCrossingSum(A, low, mid, high)\n    return max(left_sum, right_sum, cross_sum)\nend procedure\n\nprocedure maxCrossingSum(A, low, mid, high)\n    left_sum = -infinity, sum = 0\n    for i = mid down to low do\n        sum = sum + A[i]\n        if sum > left_sum then left_sum = sum\n    \n    right_sum = -infinity, sum = 0\n    for j = mid + 1 to high do\n        sum = sum + A[j]\n        if sum > right_sum then right_sum = sum\n        \n    return left_sum + right_sum\nend procedure\n\`\`\`\n`
  },
  {
    title: "6. C Implementation",
    content: `\n\`\`\`c\n#include <stdio.h>\n#include <limits.h>\n\nint max(int a, int b) { return (a > b) ? a : b; }\nint max3(int a, int b, int c) { return max(max(a, b), c); }\n\nint maxCrossingSum(int arr[], int l, int m, int h) {\n    int sum = 0;\n    int left_sum = INT_MIN;\n    for (int i = m; i >= l; i--) {\n        sum = sum + arr[i];\n        if (sum > left_sum) left_sum = sum;\n    }\n\n    sum = 0;\n    int right_sum = INT_MIN;\n    for (int i = m + 1; i <= h; i++) {\n        sum = sum + arr[i];\n        if (sum > right_sum) right_sum = sum;\n    }\n    return left_sum + right_sum;\n}\n\nint maxSubArraySum(int arr[], int l, int h) {\n    if (l == h) return arr[l];\n    int m = (l + h) / 2;\n    return max3(maxSubArraySum(arr, l, m),\n                maxSubArraySum(arr, m + 1, h),\n                maxCrossingSum(arr, l, m, h));\n}\n\`\`\`\n`
  },
  {
    title: "7. Java Implementation",
    content: `\n\`\`\`java\npublic class MaxSubarray {\n    static int maxCrossingSum(int arr[], int l, int m, int h) {\n        int sum = 0;\n        int left_sum = Integer.MIN_VALUE;\n        for (int i = m; i >= l; i--) {\n            sum = sum + arr[i];\n            if (sum > left_sum)\n                left_sum = sum;\n        }\n\n        sum = 0;\n        int right_sum = Integer.MIN_VALUE;\n        for (int i = m + 1; i <= h; i++) {\n            sum = sum + arr[i];\n            if (sum > right_sum)\n                right_sum = sum;\n        }\n        return left_sum + right_sum;\n    }\n\n    static int maxSubArraySum(int arr[], int l, int h) {\n        if (l == h) return arr[l];\n        int m = (l + h) / 2;\n        return Math.max(Math.max(maxSubArraySum(arr, l, m),\n                                 maxSubArraySum(arr, m + 1, h)),\n                        maxCrossingSum(arr, l, m, h));\n    }\n}\n\`\`\`\n`
  },
  {
    title: "8. Time & Space Complexity",
    content: `- **Time Complexity:** The recurrence relation is $T(n) = 2T(n/2) + O(n)$. By Master's Theorem, this evaluates to $O(n \\log n)$.\n- **Space Complexity:** $O(\\log n)$ due to the recursive call stack.`
  },
  {
    title: "9. Edge Cases & Constraints",
    content: `- **All Negative Numbers:** The algorithm correctly handles arrays with all negative numbers because it initializes \`left_sum\` and \`right_sum\` to negative infinity, eventually returning the smallest negative number (closest to zero).\n- **Array of Size 1:** Base case handles this immediately in $O(1)$ time.`
  },
  {
    title: "10. Iterative Alternative (Kadane's)",
    content: `While the D&C approach takes $O(n \\log n)$, Kadane's algorithm solves this problem iteratively in $O(n)$ time by maintaining a running \`current_sum\` and resetting it to 0 if it drops below 0. The D&C approach is primarily taught to illustrate the divide and conquer paradigm.`
  },
  {
    title: "11. Interview Questions",
    content: `1. Compare the Divide and Conquer approach with Kadane's algorithm for the Maximum Subarray problem.\n2. Formulate the recurrence relation for the D&C Maximum Subarray algorithm.\n3. Can the Maximum Subarray problem be solved in $O(n)$ time using Divide and Conquer? (No, $O(n \\log n)$ is the limit for D&C here).`
  }
];

export const dcMaxSubarrayMcqs = [
  {
    q: "What is the time complexity of solving the Maximum Subarray problem using Divide and Conquer?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    ans: 1,
    explanation: "The recurrence is T(n) = 2T(n/2) + O(n), which resolves to O(n log n) by Master's Theorem."
  },
  {
    q: "In the D&C approach, the maximum subarray must lie in one of three places. Which of the following is NOT one of them?",
    options: ["Entirely in the left half", "Entirely in the right half", "Crossing the midpoint", "At the very end of the array independently"],
    ans: 3,
    explanation: "The three possibilities are entirely in the left half, entirely in the right half, or spanning across the midpoint."
  },
  {
    q: "Which faster iterative algorithm solves the Maximum Subarray problem in O(n) time?",
    options: ["Dijkstra's Algorithm", "Kadane's Algorithm", "Kruskal's Algorithm", "Floyd's Algorithm"],
    ans: 1,
    explanation: "Kadane's Algorithm uses dynamic programming/greedy concepts to solve the problem in O(n) time."
  },
  {
    q: "What is the time complexity of finding the maximum crossing subarray?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    ans: 2,
    explanation: "Finding the crossing subarray requires iterating from the midpoint to the start, and from the midpoint to the end, touching every element exactly once, taking O(n) time."
  },
  {
    q: "How does the base case of the D&C Maximum Subarray algorithm behave?",
    options: ["If the array has 0 elements, return 0.", "If low == high, return arr[low].", "If low > high, return infinity.", "It doesn't need a base case."],
    ans: 1,
    explanation: "The base case occurs when the subarray is reduced to a single element (low == high), at which point it returns that element."
  }
];

export const dcMaxSubarrayDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const dcMaxSubarrayDrag = {
  instructions: "Drag and drop the steps to find the Maximum Crossing Subarray.",
  lines: [
    { id: "1", text: "Initialize left_sum and right_sum to negative infinity." },
    { id: "2", text: "Iterate from mid down to low, tracking the running sum." },
    { id: "3", text: "If the running sum exceeds left_sum, update left_sum." },
    { id: "4", text: "Iterate from mid+1 up to high, tracking the running sum." },
    { id: "5", text: "If the running sum exceeds right_sum, update right_sum." },
    { id: "6", text: "Return left_sum + right_sum." }
  ],
  order: ["1", "2", "3", "4", "5", "6"]
};

export const dcMaxSubarrayComplete = {
  instruction: "Fill in the blanks to complete the maxCrossingSum logic for the left side.",
  template: `int sum = 0;
int left_sum = INT_MIN;
for (int i = ___1___; i >= ___2___; i--) {
    sum = sum + arr[i];
    if (___3___ > left_sum) {
        left_sum = sum;
    }
}`,
  answer: `int sum = 0;
int left_sum = INT_MIN;
for (int i = m; i >= l; i--) {
    sum = sum + arr[i];
    if (sum > left_sum) {
        left_sum = sum;
    }
}`,
  blanks: ["m", "l", "sum"]
};
