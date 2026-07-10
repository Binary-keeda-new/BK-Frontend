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
    q: "What is the time complexity of a purely brute-force approach to the Closest Pair problem?",
    options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    ans: 1,
    explanation: "Brute force checks every possible pair. For n points, there are n(n-1)/2 pairs, leading to O(n^2) time complexity."
  },
  {
    q: "In the optimal D&C approach, why is the strip closest loop O(n) instead of O(n^2)?",
    options: ["Because the strip is sorted.", "Because the strip contains very few points.", "Because for any given point in the strip, we only check at most 7 subsequent points.", "Because we use binary search on the strip."],
    ans: 2,
    explanation: "Geometrically, points in the strip are sparsely packed (they are at least distance d apart on their respective sides). We mathematically only need to check a constant number (7) of neighboring points, making the loop linear O(n)."
  },
  {
    q: "Why do we use brute-force for small base cases (like n <= 3) in this algorithm?",
    options: ["Because D&C cannot physically divide arrays smaller than 3.", "To avoid the overhead of recursion for trivially small sizes.", "Because distance formula doesn't work on small arrays.", "Because it is required for stability."],
    ans: 1,
    explanation: "Recursive function calls carry overhead. For very small n, a simple nested loop is faster than setting up new recursive frames and creating strip arrays."
  },
  {
    q: "If the algorithm takes O(n log^2 n), what step is causing the extra log n factor?",
    options: ["Sorting points by X before recursion.", "Sorting the strip by Y inside the recursion.", "The recursive calls themselves.", "Building the strip array."],
    ans: 1,
    explanation: "Sorting the strip by Y takes O(n log n) time at each recursive level. Since there are log n levels, this adds up to O(n log^2 n)."
  },
  {
    q: "How wide is the 'strip' we create in the combine phase?",
    options: ["d", "2d", "d/2", "n/2"],
    ans: 1,
    explanation: "The strip includes points that are horizontally within distance 'd' to the left and 'd' to the right of the dividing line. Total width is 2d."
  }
];

export const dcClosestPairDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  instruction: "Complete the inner loop condition for the strip closest calculation.",
  template: `float min_val = d;
for (int i = 0; i < size; ++i) {
    for (int j = i+1; j < size && (strip[j].___1___ - strip[i].___2___) < ___3___; ++j) {
        if (dist(strip[i], strip[j]) < min_val) {
            min_val = dist(strip[i], strip[j]);
        }
    }
}`,
  answer: `float min_val = d;
for (int i = 0; i < size; ++i) {
    for (int j = i+1; j < size && (strip[j].y - strip[i].y) < min_val; ++j) {
        if (dist(strip[i], strip[j]) < min_val) {
            min_val = dist(strip[i], strip[j]);
        }
    }
}`,
  blanks: ["y", "y", "min_val"]
};
