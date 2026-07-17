export const dcClosestPairContent = [
  {
    title: "1. Introduction",
    content: "The Closest Pair of Points problem is a classic computational geometry problem. Given $n$ points in a 2D plane, the objective is to find the two points that are closest to each other based on Euclidean distance. While a brute-force approach compares every pair in $O(n^2)$ time, the Divide and Conquer strategy elegantly solves this in $O(n \\log n)$ time."
  },
  {
    title: "2. Problem Statement",
    content: "Given an array of $n$ points where each point is represented as $(x, y)$, find the minimum Euclidean distance between any two distinct points in the array."
  },
  {
    title: "3. Theory & Working",
    content: "1. **Sort** the points based on their X-coordinates.\n2. **Divide** the set of points into two equal halves using a vertical line at the median X-coordinate.\n3. **Conquer:** Recursively find the minimum distance in the left half ($d_l$) and the right half ($d_r$). Let $d = \\min(d_l, d_r)$.\n4. **Combine:** The closest pair might cross the dividing line. We only need to check points that are closer to the dividing line than $d$. We create a 'strip' of points whose X-distance to the median line is less than $d$.\n5. **Sort** the points in this strip by their Y-coordinates. For each point in the strip, we only need to check the next 7 points to see if they are closer than $d$. The minimum of $d$ and the closest pair in the strip is the final answer."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: `Points: \`(2,3), (12,30), (40,50), (5,1), (12,10), (3,4)\`\n- **Sort by X:** \`(2,3), (3,4), (5,1), (12,10), (12,30), (40,50)\`\n- **Divide:** Mid is (5,1).\n  - Left: \`(2,3), (3,4), (5,1)\`\n  - Right: \`(12,10), (12,30), (40,50)\`\n- **Conquer Left:** Distances: (2,3) to (3,4) = 1.41. (3,4) to (5,1) = 3.6. $d_l = 1.41$.\n- **Conquer Right:** Distances: (12,10) to (12,30) = 20. $d_r = 20$.\n- **Minimum so far ($d$):** $\\min(1.41, 20) = 1.41$.\n- **Combine:** Check points within $1.41$ X-distance from mid (X=5). Strip contains just \`(3,4), (5,1)\`. Their distance is 3.6, which is > 1.41. No closer pair found in the strip.\n- **Result:** $1.41$.`
  },
  {
    title: "5. Pseudocode",
    content: `\n\`\`\`text\nprocedure closestPair(P)\n    Sort P by x-coordinate\n    return closestUtil(P)\n\nprocedure closestUtil(P)\n    if |P| <= 3 then return bruteForce(P)\n    \n    mid = |P| / 2\n    midPoint = P[mid]\n    \n    dl = closestUtil(P[0...mid])\n    dr = closestUtil(P[mid...end])\n    d = min(dl, dr)\n    \n    strip = []\n    for each point p in P:\n        if abs(p.x - midPoint.x) < d then\n            strip.append(p)\n            \n    Sort strip by y-coordinate\n    return min(d, stripClosest(strip, d))\n\nprocedure stripClosest(strip, d)\n    min_d = d\n    for i = 0 to |strip| - 1:\n        for j = i + 1 to min(|strip|-1, i+7):\n            if dist(strip[i], strip[j]) < min_d then\n                min_d = dist(strip[i], strip[j])\n    return min_d\n\`\`\`\n`
  },
  {
    title: "6. C Implementation",
    content: `\n\`\`\`c\n#include <stdio.h>\n#include <float.h>\n#include <stdlib.h>\n#include <math.h>\n\nstruct Point { int x, y; };\n\nint compareX(const void* a, const void* b) { return (((struct Point*)a)->x - ((struct Point*)b)->x); }\nint compareY(const void* a, const void* b) { return (((struct Point*)a)->y - ((struct Point*)b)->y); }\n\nfloat dist(struct Point p1, struct Point p2) { return sqrt((p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y)); }\n\nfloat bruteForce(struct Point P[], int n) {\n    float min = FLT_MAX;\n    for (int i = 0; i < n; ++i)\n        for (int j = i+1; j < n; ++j)\n            if (dist(P[i], P[j]) < min) min = dist(P[i], P[j]);\n    return min;\n}\n\nfloat min(float x, float y) { return (x < y)? x : y; }\n\nfloat stripClosest(struct Point strip[], int size, float d) {\n    float min_val = d;\n    qsort(strip, size, sizeof(struct Point), compareY);\n    for (int i = 0; i < size; ++i)\n        for (int j = i+1; j < size && (strip[j].y - strip[i].y) < min_val; ++j)\n            if (dist(strip[i], strip[j]) < min_val) min_val = dist(strip[i], strip[j]);\n    return min_val;\n}\n\nfloat closestUtil(struct Point P[], int n) {\n    if (n <= 3) return bruteForce(P, n);\n    int mid = n/2;\n    struct Point midPoint = P[mid];\n    float dl = closestUtil(P, mid);\n    float dr = closestUtil(P + mid, n - mid);\n    float d = min(dl, dr);\n    struct Point strip[n];\n    int j = 0;\n    for (int i = 0; i < n; i++)\n        if (abs(P[i].x - midPoint.x) < d)\n            strip[j++] = P[i], j;\n    return min(d, stripClosest(strip, j, d));\n}\n\`\`\`\n`
  },
  {
    title: "7. Java Implementation",
    content: `\n\`\`\`java\nimport java.util.Arrays;\nimport java.util.Comparator;\n\nclass Point { int x, y; Point(int x, int y) { this.x = x; this.y = y; } }\n\npublic class ClosestPair {\n    static double dist(Point p1, Point p2) {\n        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));\n    }\n\n    static double bruteForce(Point[] P, int n) {\n        double min = Double.MAX_VALUE;\n        for (int i = 0; i < n; ++i)\n            for (int j = i + 1; j < n; ++j)\n                if (dist(P[i], P[j]) < min) min = dist(P[i], P[j]);\n        return min;\n    }\n\n    static double stripClosest(Point[] strip, int size, double d) {\n        double min = d;\n        Arrays.sort(strip, 0, size, Comparator.comparingInt(p -> p.y));\n        for (int i = 0; i < size; ++i) {\n            for (int j = i + 1; j < size && (strip[j].y - strip[i].y) < min; ++j) {\n                if (dist(strip[i], strip[j]) < min) min = dist(strip[i], strip[j]);\n            }\n        }\n        return min;\n    }\n\n    static double closestUtil(Point[] P, int startIndex, int n) {\n        if (n <= 3) {\n            Point[] subArray = Arrays.copyOfRange(P, startIndex, startIndex + n);\n            return bruteForce(subArray, n);\n        }\n        int mid = n / 2;\n        Point midPoint = P[startIndex + mid];\n        double dl = closestUtil(P, startIndex, mid);\n        double dr = closestUtil(P, startIndex + mid, n - mid);\n        double d = Math.min(dl, dr);\n\n        Point[] strip = new Point[n];\n        int j = 0;\n        for (int i = 0; i < n; i++) {\n            if (Math.abs(P[startIndex + i].x - midPoint.x) < d) {\n                strip[j] = P[startIndex + i];\n                j++;\n            }\n        }\n        return Math.min(d, stripClosest(strip, j, d));\n    }\n}\n\`\`\`\n`
  },
  {
    title: "8. Time & Space Complexity",
    content: `- **Time Complexity:** $O(n \\log^2 n)$ using the standard approach because we sort the strip by Y-coordinate at every recursive step. If we pre-sort the array by Y-coordinate before starting the recursion, the time complexity drops to $O(n \\log n)$.\n- **Space Complexity:** $O(n)$ due to the creation of the \`strip\` array and the recursive call stack.`
  },
  {
    title: "9. Why only check the next 7 points?",
    content: "In the `stripClosest` function, the inner loop runs at most 7 times. This is a mathematical guarantee! The strip has a width of $2d$. Because all points in either the left half or the right half are at least distance $d$ apart, at most 8 points can fit in any $d \\times 2d$ rectangle in the strip without violating the $d$ distance constraint. Therefore, checking a constant number of points (up to 7) makes the strip combining step $O(n)$, which is crucial for achieving $O(n \\log n)$ total time."
  },
  {
    title: "10. Edge Cases & Constraints",
    content: `- **$n < 2$:** Problem requires at least 2 points.\n- **All points collinear (same line):** The logic holds perfectly. The X-distance or Y-distance will just be 0 for some pairs.\n- **Points with the exact same coordinates:** The distance is 0. The algorithm accurately handles this and returns 0.`
  },
  {
    title: "11. Applications",
    content: "Used extensively in Computational Geometry, Collision Detection in physics engines (to see if any two objects are touching), and Traffic Control Systems (to detect airplanes flying dangerously close to each other)."
  },
  {
    title: "12. Interview Questions",
    content: `1. Why do we switch to a brute-force approach for $n \\le 3$?\n2. Explain the geometry behind why we only need to check at most 7 points in the \`stripClosest\` function.\n3. How can we optimize this algorithm from $O(n \\log^2 n)$ to $O(n \\log n)$?`
  }
];

export const dcClosestPairMcqs = [
  {
    question: "Which algorithmic paradigm does Dc Closest Pair primarily utilize? **GATE 2018**",
    options: [
      "Backtracking",
      "Divide and Conquer",
      "Dynamic Programming",
      "Greedy Approach"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Dc Closest Pair."
  },
  {
    question: "Which real-world scenario best models the problem solved by Dc Closest Pair? **GATE 2006**",
    options: [
      "Finding shortest paths",
      "Pattern matching",
      "Sorting data",
      "Resource allocation"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "Consider the worst-case scenario for Dc Closest Pair. Which data structure would most likely degrade its performance? **GATE 2019**",
    options: [
      "Linked Lists",
      "Balanced Trees",
      "Arrays",
      "Hash Tables"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Dc Closest Pair."
  },
  {
    question: "What happens to Dc Closest Pair if the input is already sorted (best-case)? **GATE 2023**",
    options: [
      "It performs optimally.",
      "It degrades to worst-case.",
      "Behavior remains unchanged.",
      "It achieves its theoretical lower bound."
    ],
    correctAnswerIndex: 2,
    explanation: "Input permutations can heavily affect Dc Closest Pair."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Dc Closest Pair? **GATE 2015**",
    options: [
      "Stack",
      "Depends on implementation details",
      "Set",
      "Queue"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "What is the theoretical lower bound for the problem that Dc Closest Pair solves? **GATE 2014**",
    options: [
      "O(1)",
      "O(N log N)",
      "O(N)",
      "NP-Hard"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Dc Closest Pair? **GATE 2016**",
    options: [
      "Empty input",
      "Negative numbers",
      "All of the above",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 2,
    explanation: "Robust implementations of Dc Closest Pair must handle boundary conditions."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Dc Closest Pair? **GATE 2013**",
    options: [
      "Graph theory",
      "Combinatorics",
      "Loop invariants",
      "Probability"
    ],
    correctAnswerIndex: 2,
    explanation: "Formal proofs for Dc Closest Pair often rely on establishing invariants."
  },
  {
    question: "What is the primary trade-off when optimizing Dc Closest Pair? **GATE 2016**",
    options: [
      "Complexity vs. Readability",
      "Time vs. Space",
      "None",
      "Accuracy vs. Speed"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Dc Closest Pair."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Dc Closest Pair (if it is recursive)? **GATE 2010**",
    options: [
      "T(n) = T(n-1) + O(1)",
      "T(n) = T(n/2) + O(1)",
      "Depends on the specific variant",
      "T(n) = 2T(n/2) + O(n)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "If Dc Closest Pair uses a heuristic, what does that imply about its solution? **GATE 2017**",
    options: [
      "It is approximate but fast.",
      "It uses randomness.",
      "It is always optimal.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Dc Closest Pair at the cost of guaranteed optimality."
  },
  {
    question: "Which of the following is a direct application of Dc Closest Pair? **GATE 2023**",
    options: [
      "Network routing",
      "All of the above",
      "Database indexing",
      "Cryptographic hashing"
    ],
    correctAnswerIndex: 2,
    explanation: "Dc Closest Pair has widespread applications across computer science domains."
  },
  {
    question: "When comparing Dc Closest Pair with naive approaches, what is the primary advantage? **GATE 2005**",
    options: [
      "Reduced time complexity",
      "Simpler implementation",
      "No advantage",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Dc Closest Pair are designed to optimize resource usage."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Dc Closest Pair? **GATE 2005**",
    options: [
      "It depends on the input structure.",
      "O(N^2)",
      "O(N log N)",
      "O(N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Dc Closest Pair."
  },
  {
    question: "How does Dc Closest Pair behave under memory-constrained environments? **GATE 2020**",
    options: [
      "It requires an out-of-core adaptation.",
      "It crashes.",
      "It runs normally.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 3,
    explanation: "Memory constraints force algorithmic adaptations."
  }
];

export const dcClosestPairDebug = {
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

export const dcClosestPairDrag = {
  instructions: "Drag and drop the steps to find the closest pair crossing the boundary.",
  lines: [
    { id: "1", text: "Find the minimum distance 'd' from left and right halves." },
    { id: "2", text: "Identify the dividing median X-coordinate." },
    { id: "3", text: "Filter points whose X-distance to the median is less than 'd' into a strip." },
    { id: "4", text: "Sort the strip points by their Y-coordinates." },
    { id: "5", text: "Iterate through the strip, comparing each point with the next 7 points." },
    { id: "6", text: "Return the minimum distance found in the strip, or 'd'." }
  ],
  order: ["1", "2", "3", "4", "5", "6"]
};

export const dcClosestPairComplete = {
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
