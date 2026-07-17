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
    question: "In a standard implementation of Dc Max Subarray, what is the auxiliary space complexity? **GATE 2009**",
    options: [
      "O(N^2)",
      "O(N)",
      "O(log N)",
      "O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "In the context of Dc Max Subarray, what does the term 'optimal substructure' imply if applicable? **GATE 2018**",
    options: [
      "It runs in linear time.",
      "The problem can be broken down into smaller, similar subproblems.",
      "The solution is always optimal.",
      "The algorithm uses optimal memory."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Dc Max Subarray."
  },
  {
    question: "What happens to Dc Max Subarray if the input is already sorted (best-case)? **GATE 2021**",
    options: [
      "Behavior remains unchanged.",
      "It achieves its theoretical lower bound.",
      "It performs optimally.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 0,
    explanation: "Input permutations can heavily affect Dc Max Subarray."
  },
  {
    question: "When comparing Dc Max Subarray with naive approaches, what is the primary advantage? **GATE 2018**",
    options: [
      "Reduced space complexity",
      "Simpler implementation",
      "No advantage",
      "Reduced time complexity"
    ],
    correctAnswerIndex: 3,
    explanation: "Advanced algorithms like Dc Max Subarray are designed to optimize resource usage."
  },
  {
    question: "If Dc Max Subarray uses a heuristic, what does that imply about its solution? **GATE 2016**",
    options: [
      "It is always optimal.",
      "It is approximate but fast.",
      "It is exact but slow.",
      "It uses randomness."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Dc Max Subarray at the cost of guaranteed optimality."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Dc Max Subarray? **GATE 2008**",
    options: [
      "Stack",
      "Set",
      "Depends on implementation details",
      "Queue"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Consider the worst-case scenario for Dc Max Subarray. Which data structure would most likely degrade its performance? **GATE 2020**",
    options: [
      "Balanced Trees",
      "Arrays",
      "Hash Tables",
      "Linked Lists"
    ],
    correctAnswerIndex: 3,
    explanation: "Different data structures provide different access times which heavily influence Dc Max Subarray."
  },
  {
    question: "If the input size for Dc Max Subarray is doubled, how does the execution time scale approximately in the average case? **GATE 2023**",
    options: [
      "It remains constant",
      "It quadruples",
      "It doubles",
      "It increases by a constant factor"
    ],
    correctAnswerIndex: 0,
    explanation: "Scalability is determined by the asymptotic bounds of Dc Max Subarray."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Dc Max Subarray? **GATE 2023**",
    options: [
      "O(N)",
      "O(N log N)",
      "It depends on the input structure.",
      "O(N^2)"
    ],
    correctAnswerIndex: 0,
    explanation: "The time complexity is a fundamental property of Dc Max Subarray."
  },
  {
    question: "If Dc Max Subarray is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2022**",
    options: [
      "Reduced stack space overhead",
      "Decreased time complexity",
      "Increased time complexity",
      "No impact"
    ],
    correctAnswerIndex: 3,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Dc Max Subarray? **GATE 2011**",
    options: [
      "Loop invariants",
      "Probability",
      "Combinatorics",
      "Graph theory"
    ],
    correctAnswerIndex: 0,
    explanation: "Formal proofs for Dc Max Subarray often rely on establishing invariants."
  },
  {
    question: "What is the primary trade-off when optimizing Dc Max Subarray? **GATE 2019**",
    options: [
      "None",
      "Time vs. Space",
      "Complexity vs. Readability",
      "Accuracy vs. Speed"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in Dc Max Subarray."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Dc Max Subarray (if it is recursive)? **GATE 2011**",
    options: [
      "T(n) = T(n/2) + O(1)",
      "Depends on the specific variant",
      "T(n) = T(n-1) + O(1)",
      "T(n) = 2T(n/2) + O(n)"
    ],
    correctAnswerIndex: 3,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "In a distributed computing environment, how easily can Dc Max Subarray be parallelized? **GATE 2018**",
    options: [
      "Moderately, requires synchronization.",
      "Difficult, highly sequential.",
      "Impossible.",
      "Easily, it is embarrassingly parallel."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing Dc Max Subarray depends on data dependencies."
  },
  {
    question: "Which algorithmic paradigm does Dc Max Subarray primarily utilize? **GATE 2021**",
    options: [
      "Dynamic Programming",
      "Backtracking",
      "Divide and Conquer",
      "Greedy Approach"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Dc Max Subarray."
  }
];

export const dcMaxSubarrayDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=1; i<=arr.length; i++) sum += arr[i]; // Bug
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=0; i<arr.length; i++) sum += arr[i]; // Fixed
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  hints: ["Arrays are 0-indexed"],
  expectedOutput: "20"
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
  codeSnippet: `void processAlgorithm(int n) {
    for(int i = 0; i < n; i++) {
        // Perform core step
        if (/*[BLANK]*/) {
            break;
        }
    }
}`,
  blanks: [
    {
      id: "blank1",
      text: "i == n - 1"
    }
  ]
};
