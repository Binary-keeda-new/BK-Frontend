export const sortLinearContent = [
  {
    title: "1. Introduction",
    content: "Unlike comparison-based sorting algorithms (like Merge Sort, Quick Sort) that have a lower bound of $O(n \\log n)$, linear sorting algorithms can sort data in $O(n)$ time by making assumptions about the input data. The three main linear sorting algorithms are **Counting Sort**, **Radix Sort**, and **Bucket Sort**."
  },
  {
    title: "2. Counting Sort Overview",
    content: "**Counting Sort** works by counting the number of objects having distinct key values (like a hash). Then, it calculates the position of each object in the output sequence. It is highly efficient when the range of input values ($k$) is not significantly greater than the number of objects ($n$)."
  },
  {
    title: "3. Radix Sort Overview",
    content: "**Radix Sort** avoids the limitation of Counting Sort (where large numbers cause massive memory overhead) by sorting the numbers digit by digit, starting from the least significant digit (LSD) to the most significant digit (MSD). It typically uses Counting Sort as a subroutine for sorting the individual digits."
  },
  {
    title: "4. Bucket Sort Overview",
    content: "**Bucket Sort** is mainly useful when the input is uniformly distributed over a range (like floating-point numbers from 0.0 to 1.0). It divides the range into a fixed number of 'buckets'. Elements are distributed into the buckets, each bucket is sorted individually (often using Insertion Sort), and then all buckets are concatenated."
  },
  {
    title: "5. Theory & Working (Counting Sort)",
    content: "1. Find the maximum element `max` in the array.\n2. Create a count array of size `max + 1` initialized to 0.\n3. Count the occurrences of each element in the input array and store it at the corresponding index in the count array.\n4. Modify the count array by adding the previous counts (prefix sum), which gives the actual position of elements in the output array.\n5. Iterate the input array (preferably backwards for stability), place the element in the output array, and decrement the count."
  },
  {
    title: "6. Step-by-Step Dry Run (Counting Sort)",
    content: `Input: \`[4, 2, 2, 8, 3, 3, 1]\`\n- Max = 8. Count array size = 9.\n- Frequencies: \`[0, 1, 2, 2, 1, 0, 0, 0, 1]\`\n- Prefix sums: \`[0, 1, 3, 5, 6, 6, 6, 6, 7]\`\n- Build Output (Iterating backwards):\n  - 1 -> Output[Prefix[1]-1] = Output[0]. Prefix[1] becomes 0.\n  - 3 -> Output[Prefix[3]-1] = Output[4]. Prefix[3] becomes 4.\n  - 3 -> Output[Prefix[3]-1] = Output[3]. Prefix[3] becomes 3.\n  - 8 -> Output[Prefix[8]-1] = Output[6]. Prefix[8] becomes 6.\n  - 2 -> Output[Prefix[2]-1] = Output[2]. Prefix[2] becomes 2.\n  - 2 -> Output[Prefix[2]-1] = Output[1]. Prefix[2] becomes 1.\n  - 4 -> Output[Prefix[4]-1] = Output[5]. Prefix[4] becomes 5.\n- Output: \`[1, 2, 2, 3, 3, 4, 8]\``
  },
  {
    title: "7. C Implementation (Counting Sort)",
    content: `\n\`\`\`c\n#include <stdio.h>\n\nvoid countingSort(int arr[], int n) {\n    int output[100]; // Assuming max n is 100\n    int max = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] > max) max = arr[i];\n    }\n\n    int count[max + 1];\n    for (int i = 0; i <= max; ++i) count[i] = 0;\n\n    for (int i = 0; i < n; i++) count[arr[i]]++;\n    for (int i = 1; i <= max; i++) count[i] += count[i - 1];\n\n    for (int i = n - 1; i >= 0; i--) {\n        output[count[arr[i]] - 1] = arr[i];\n        count[arr[i]]--;\n    }\n\n    for (int i = 0; i < n; i++) arr[i] = output[i];\n}\n\`\`\`\n`
  },
  {
    title: "8. Java Implementation (Counting Sort)",
    content: `\n\`\`\`java\npublic class CountingSort {\n    public static void countSort(int[] arr) {\n        int max = Arrays.stream(arr).max().getAsInt();\n        int[] count = new int[max + 1];\n        int[] output = new int[arr.length];\n\n        for (int i = 0; i < arr.length; i++)\n            count[arr[i]]++;\n\n        for (int i = 1; i <= max; i++)\n            count[i] += count[i - 1];\n\n        for (int i = arr.length - 1; i >= 0; i--) {\n            output[count[arr[i]] - 1] = arr[i];\n            count[arr[i]]--;\n        }\n\n        System.arraycopy(output, 0, arr, 0, arr.length);\n    }\n}\n\`\`\`\n`
  },
  {
    title: "9. Time & Space Complexity",
    content: `- **Counting Sort:** Time is $O(n + k)$, Space is $O(n + k)$ where $k$ is the max value.\n- **Radix Sort:** Time is $O(d \\times (n + b))$, Space is $O(n + b)$ where $d$ is max digits, $b$ is base (usually 10).\n- **Bucket Sort:** Time is $O(n + k)$ average, $O(n^2)$ worst case (if all elements go to the same bucket). Space is $O(n + k)$.`
  },
  {
    title: "10. In-place & Stability",
    content: `- **Counting Sort:** Not in-place. It is Stable (which is crucial for Radix Sort).\n- **Radix Sort:** Not in-place. Stable (depends on the subroutine).\n- **Bucket Sort:** Not in-place. Stability depends on the sorting algorithm used to sort individual buckets.`
  },
  {
    title: "11. Edge Cases & Constraints",
    content: `- **Counting Sort:** Cannot sort negative numbers directly (requires offsetting the array). Horribly inefficient for sparse inputs (e.g., sorting just \`[1, 10000]\` requires a 10000-element count array).\n- **Radix Sort:** Works best for numbers and strings of fixed/similar lengths. Can handle large ranges better than Counting Sort.`
  },
  {
    title: "12. Applications",
    content: `- **Counting Sort:** Sorting arrays of small integers (e.g., exam scores from 0-100).\n- **Radix Sort:** String sorting, sorting phone numbers, or ISBN numbers.\n- **Bucket Sort:** Sorting floating point numbers distributed uniformly in a given range (e.g., probability values from 0.0 to 1.0).`
  },
  {
    title: "13. Interview Questions",
    content: `1. Why can't we use Counting Sort for all arrays?\n2. How does Radix Sort overcome the memory limitations of Counting Sort?\n3. Is Counting Sort a stable sort? Why is that important?\n4. What happens to Bucket Sort if the input elements are not uniformly distributed?`
  }
];

export const sortLinearMcqs = [
  {
    question: "Which recurrence relation best models the recursive behavior of Sort Linear (if it is recursive)? **GATE 2014**",
    options: [
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant",
      "T(n) = 2T(n/2) + O(n)",
      "T(n) = T(n/2) + O(1)"
    ],
    correctAnswerIndex: 3,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "In a distributed computing environment, how easily can Sort Linear be parallelized? **GATE 2014**",
    options: [
      "Easily, it is embarrassingly parallel.",
      "Moderately, requires synchronization.",
      "Impossible.",
      "Difficult, highly sequential."
    ],
    correctAnswerIndex: 1,
    explanation: "Parallelizing Sort Linear depends on data dependencies."
  },
  {
    question: "In the context of Sort Linear, what does the term 'optimal substructure' imply if applicable? **GATE 2022**",
    options: [
      "It runs in linear time.",
      "The solution is always optimal.",
      "The algorithm uses optimal memory.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Sort Linear."
  },
  {
    question: "Which algorithmic paradigm does Sort Linear primarily utilize? **GATE 2018**",
    options: [
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Sort Linear."
  },
  {
    question: "If Sort Linear is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2017**",
    options: [
      "Decreased time complexity",
      "Increased time complexity",
      "No impact",
      "Reduced stack space overhead"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which of the following is a direct application of Sort Linear? **GATE 2007**",
    options: [
      "All of the above",
      "Network routing",
      "Cryptographic hashing",
      "Database indexing"
    ],
    correctAnswerIndex: 2,
    explanation: "Sort Linear has widespread applications across computer science domains."
  },
  {
    question: "When comparing Sort Linear with naive approaches, what is the primary advantage? **GATE 2008**",
    options: [
      "Simpler implementation",
      "No advantage",
      "Reduced time complexity",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 0,
    explanation: "Advanced algorithms like Sort Linear are designed to optimize resource usage."
  },
  {
    question: "Which real-world scenario best models the problem solved by Sort Linear? **GATE 2017**",
    options: [
      "Resource allocation",
      "Sorting data",
      "Pattern matching",
      "Finding shortest paths"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "What is the primary trade-off when optimizing Sort Linear? **GATE 2007**",
    options: [
      "Accuracy vs. Speed",
      "Time vs. Space",
      "None",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Sort Linear."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Sort Linear? **GATE 2013**",
    options: [
      "Probability",
      "Graph theory",
      "Combinatorics",
      "Loop invariants"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Sort Linear often rely on establishing invariants."
  },
  {
    question: "How does Sort Linear behave under memory-constrained environments? **GATE 2011**",
    options: [
      "It crashes.",
      "It runs normally.",
      "It requires an out-of-core adaptation.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 3,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Sort Linear? **GATE 2013**",
    options: [
      "Queue",
      "Depends on implementation details",
      "Set",
      "Stack"
    ],
    correctAnswerIndex: 2,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Sort Linear? **GATE 2006**",
    options: [
      "O(N)",
      "O(N log N)",
      "It depends on the input structure.",
      "O(N^2)"
    ],
    correctAnswerIndex: 3,
    explanation: "The time complexity is a fundamental property of Sort Linear."
  },
  {
    question: "What happens to Sort Linear if the input is already sorted (best-case)? **GATE 2020**",
    options: [
      "Behavior remains unchanged.",
      "It degrades to worst-case.",
      "It achieves its theoretical lower bound.",
      "It performs optimally."
    ],
    correctAnswerIndex: 3,
    explanation: "Input permutations can heavily affect Sort Linear."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Sort Linear? **GATE 2014**",
    options: [
      "All of the above",
      "Empty input",
      "Extremely large inputs",
      "Negative numbers"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Sort Linear must handle boundary conditions."
  }
];

export const sortLinearDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-1; j++) // Bug: redundant comparisons
                if (arr[j] > arr[j+1]) { int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }
    }
    public static void main(String[] args) {
        int[] arr = {5, 3, 1, 4, 2};
        process(arr);
        for(int x: arr) System.out.print(x + " ");
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-i-1; j++) // Fixed
                if (arr[j] > arr[j+1]) { int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }
    }
    public static void main(String[] args) {
        int[] arr = {5, 3, 1, 4, 2};
        process(arr);
        for(int x: arr) System.out.print(x + " ");
    }
}`,
  hints: ["Inner loop should decrease by i"],
  expectedOutput: "1 2 3 4 5 "
};


export const sortLinearDrag = {
  instructions: "Drag and drop to match the algorithm with its core mechanism.",
  lines: [
    { id: "1", text: "Counting Sort" },
    { id: "2", text: "Radix Sort" },
    { id: "3", text: "Bucket Sort" },
    { id: "4", text: "Uses array values as indices to count frequencies." },
    { id: "5", text: "Sorts digit by digit using a stable subroutine." },
    { id: "6", text: "Distributes elements into ranges, then sorts each range." }
  ],
  order: ["1", "4", "2", "5", "3", "6"]
};

export const sortLinearComplete = {
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
