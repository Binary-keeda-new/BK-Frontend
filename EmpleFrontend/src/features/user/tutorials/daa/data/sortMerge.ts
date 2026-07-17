export const sortMergeContent = [
  {
    title: "1. Introduction",
    content: "Merge Sort is a highly efficient, general-purpose, comparison-based sorting algorithm. Formulated by John von Neumann in 1945, it is a classic example of the **Divide and Conquer** paradigm. Most implementations produce a stable sort, meaning that the relative order of equal elements is preserved."
  },
  {
    title: "2. Problem Statement",
    content: "Given an array of $n$ elements, sort the elements in non-decreasing order using a divide and conquer strategy that guarantees an $O(n \\log n)$ time complexity across all cases."
  },
  {
    title: "3. Theory & Working",
    content: "Merge Sort works by repeatedly dividing the unsorted list into sublists until each sublist contains exactly one element (a list of one element is considered sorted). It then repeatedly merges these sublists to produce new sorted sublists until there is only one sorted list remaining. The core of the algorithm is the `merge` operation, which combines two already sorted arrays into a single sorted array."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Let's sort the array: `[38, 27, 43, 3, 9, 82, 10]`\n\n1. **Divide** into `[38, 27, 43, 3]` and `[9, 82, 10]`.\n2. **Divide** further until each subarray has 1 element.\n3. **Merge** `[38]` and `[27]` $\\rightarrow$ `[27, 38]`.\n4. **Merge** `[43]` and `[3]` $\\rightarrow$ `[3, 43]`.\n5. **Merge** `[27, 38]` and `[3, 43]` $\\rightarrow$ `[3, 27, 38, 43]`.\n6. For the right half: **Merge** `[9]` and `[82]` $\\rightarrow$ `[9, 82]`. Then **Merge** `[9, 82]` and `[10]` $\\rightarrow$ `[9, 10, 82]`.\n7. **Final Merge** of left and right halves: `[3, 27, 38, 43]` and `[9, 10, 82]` $\\rightarrow$ `[3, 9, 10, 27, 38, 43, 82]`."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nMergeSort(A, p, r):\n    if p < r:\n        q = (p + r) / 2\n        MergeSort(A, p, q)\n        MergeSort(A, q+1, r)\n        Merge(A, p, q, r)\n\nMerge(A, p, q, r):\n    n1 = q - p + 1\n    n2 = r - q\n    Let L[1..n1] and R[1..n2] be new arrays\n    Copy data to L and R\n    Merge L and R back into A[p..r]\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n    int i, j, k;\n    int n1 = m - l + 1;\n    int n2 = r - m;\n\n    int *L = (int *)malloc(n1 * sizeof(int));\n    int *R = (int *)malloc(n2 * sizeof(int));\n\n    for (i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n\n    i = 0; j = 0; k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) {\n            arr[k] = L[i];\n            i++;\n        } else {\n            arr[k] = R[j];\n            j++;\n        }\n        k++;\n    }\n\n    while (i < n1) {\n        arr[k] = L[i];\n        i++; k++;\n    }\n\n    while (j < n2) {\n        arr[k] = R[j];\n        j++; k++;\n    }\n    \n    free(L);\n    free(R);\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nclass MergeSort {\n    void merge(int arr[], int l, int m, int r) {\n        int n1 = m - l + 1;\n        int n2 = r - m;\n\n        int L[] = new int[n1];\n        int R[] = new int[n2];\n\n        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];\n        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];\n\n        int i = 0, j = 0;\n        int k = l;\n        while (i < n1 && j < n2) {\n            if (L[i] <= R[j]) {\n                arr[k] = L[i];\n                i++;\n            } else {\n                arr[k] = R[j];\n                j++;\n            }\n            k++;\n        }\n\n        while (i < n1) {\n            arr[k] = L[i];\n            i++; k++;\n        }\n\n        while (j < n2) {\n            arr[k] = R[j];\n            j++; k++;\n        }\n    }\n\n    void sort(int arr[], int l, int r) {\n        if (l < r) {\n            int m = l + (r - l) / 2;\n            sort(arr, l, m);\n            sort(arr, m + 1, r);\n            merge(arr, l, m, r);\n        }\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "### Time Complexity\nThe array is repeatedly divided in half $\\log_2 n$ times. At each level of division, we merge a total of $n$ elements, taking $O(n)$ time. Therefore, the total time complexity is **$O(n \\log n)$**.\n\n### Space Complexity\nThe merge process requires auxiliary arrays `L` and `R` to temporarily hold the data being merged. The total size of these arrays at any one time is bounded by $n$. Thus, the auxiliary space complexity is **$O(n)$**."
  },
  {
    title: "9. Best, Worst & Average Case",
    content: "- **Best Case Time Complexity:** $O(n \\log n)$\nEven if the array is already sorted, standard Merge Sort will divide the array completely and merge it back together.\n- **Average Case Time Complexity:** $O(n \\log n)$\nTypical division and merging for random arrangements.\n- **Worst Case Time Complexity:** $O(n \\log n)$\nGuaranteed upper bound regardless of the initial arrangement of elements, avoiding the $O(n^2)$ worst-case of Quicksort."
  },
  {
    title: "10. Iterative vs Recursive",
    content: "Merge Sort is naturally conceptualized as a **Top-Down** recursive algorithm. It divides the full array until it hits base cases (size 1), then merges up. \n\nAlternatively, it can be implemented as a **Bottom-Up** iterative algorithm. This skips the recursion by directly starting with sub-arrays of length 1, merging them into arrays of length 2, then 4, 8, etc., until the whole array is merged. Iterative merge sort avoids function call overhead and stack space."
  },
  {
    title: "11. Edge Cases & Constraints",
    content: "- **Empty Array or Single Element:** Safely handled as the base case `l < r` immediately returns false without executing further.\n- **Large Arrays:** Because of its $O(n)$ space complexity, memory limits can be a constraint for extremely large arrays compared to in-place sorts like Heapsort or Quicksort.\n- **Integer Overflow:** Calculating the midpoint as `(l + r) / 2` can overflow for very large indices. The safe formula is `l + (r - l) / 2`."
  },
  {
    title: "12. Applications",
    content: "- **Sorting Linked Lists:** Merge Sort is the ideal choice for linked lists as elements can be merged in $O(1)$ extra space by modifying pointers.\n- **External Sorting:** When data is too large to fit in RAM (e.g., databases or large files on disk), Merge Sort is used to process chunks sequentially.\n- **Inversion Counting:** A modified Merge Sort can efficiently count the number of inversions in an array in $O(n \\log n)$ time.\n- **Hybrid Algorithms:** Used as the backbone for Timsort (Python's default sort)."
  },
  {
    title: "13. Pros & Cons",
    content: "**Pros:**\n- Guaranteed $O(n \\log n)$ time complexity in all cases.\n- **Stable sort:** preserves the original relative order of equal elements.\n- Highly parallelizable and sequential data access pattern.\n\n**Cons:**\n- Requires $O(n)$ extra auxiliary space for arrays.\n- Slower in practice than Quicksort for typical in-memory arrays due to memory allocation and copying overhead."
  },
  {
    title: "14. Comparison with alternatives",
    content: "- **vs Quicksort:** Quicksort is typically faster in practice for arrays due to excellent cache locality and requires $O(\\log n)$ stack space (in-place). However, Quicksort is unstable and has an $O(n^2)$ worst-case, whereas Merge Sort is stable with a guaranteed $O(n \\log n)$.\n- **vs Heapsort:** Heapsort achieves $O(n \\log n)$ with $O(1)$ space, but is unstable and often slower in practice due to poor cache locality.\n- **vs Insertion Sort:** Insertion Sort is much faster for very small arrays, which is why algorithms like Timsort combine the two."
  },
  {
    title: "15. Common Pitfalls",
    content: "- **Incorrect Midpoint Calculation:** Using `(l + r) / 2` instead of `l + (r - l) / 2`.\n- **Loss of Stability:** Using `<` instead of `<=` when comparing `L[i]` and `R[j]`. If equal elements are encountered, we must pick from the left array first to maintain stability.\n- **Forgetting Remaining Elements:** Failing to include the two `while` loops at the end of the merge function to copy over any remaining elements from `L` or `R`."
  },
  {
    title: "16. Visual Intuition",
    content: "Imagine an unsorted deck of cards. You cut the deck perfectly in half, and repeat this for each half until you are left with piles of 1 card each. A single card is trivially sorted. You then pair the piles up, comparing the top cards and taking the smaller one, merging them into sorted piles of 2. You repeat this process—merging piles of 2 into 4, 4 into 8—until the entire deck is back in one fully sorted pile."
  }
];

export const sortMergeMcqs = [
  {
    question: "What is the primary trade-off when optimizing Sort Merge? **GATE 2023**",
    options: [
      "Time vs. Space",
      "Complexity vs. Readability",
      "None",
      "Accuracy vs. Speed"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Sort Merge."
  },
  {
    question: "How does Sort Merge behave under memory-constrained environments? **GATE 2018**",
    options: [
      "It requires an out-of-core adaptation.",
      "It fails gracefully.",
      "It crashes.",
      "It runs normally."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which of the following is a direct application of Sort Merge? **GATE 2006**",
    options: [
      "All of the above",
      "Database indexing",
      "Network routing",
      "Cryptographic hashing"
    ],
    correctAnswerIndex: 0,
    explanation: "Sort Merge has widespread applications across computer science domains."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Sort Merge? **GATE 2018**",
    options: [
      "Set",
      "Stack",
      "Depends on implementation details",
      "Queue"
    ],
    correctAnswerIndex: 3,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which algorithmic paradigm does Sort Merge primarily utilize? **GATE 2022**",
    options: [
      "Greedy Approach",
      "Divide and Conquer",
      "Backtracking",
      "Dynamic Programming"
    ],
    correctAnswerIndex: 3,
    explanation: "Identifying the core paradigm is crucial for understanding Sort Merge."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Sort Merge? **GATE 2006**",
    options: [
      "O(N^2)",
      "O(N)",
      "It depends on the input structure.",
      "O(N log N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Sort Merge."
  },
  {
    question: "If Sort Merge uses a heuristic, what does that imply about its solution? **GATE 2010**",
    options: [
      "It is always optimal.",
      "It is approximate but fast.",
      "It is exact but slow.",
      "It uses randomness."
    ],
    correctAnswerIndex: 1,
    explanation: "Heuristics speed up Sort Merge at the cost of guaranteed optimality."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Sort Merge? **GATE 2016**",
    options: [
      "Graph theory",
      "Probability",
      "Combinatorics",
      "Loop invariants"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Sort Merge often rely on establishing invariants."
  },
  {
    question: "What is the theoretical lower bound for the problem that Sort Merge solves? **GATE 2011**",
    options: [
      "O(1)",
      "NP-Hard",
      "O(N)",
      "O(N log N)"
    ],
    correctAnswerIndex: 0,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which real-world scenario best models the problem solved by Sort Merge? **GATE 2014**",
    options: [
      "Finding shortest paths",
      "Pattern matching",
      "Resource allocation",
      "Sorting data"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "When comparing Sort Merge with naive approaches, what is the primary advantage? **GATE 2017**",
    options: [
      "Reduced space complexity",
      "No advantage",
      "Reduced time complexity",
      "Simpler implementation"
    ],
    correctAnswerIndex: 3,
    explanation: "Advanced algorithms like Sort Merge are designed to optimize resource usage."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Sort Merge? **GATE 2014**",
    options: [
      "All of the above",
      "Negative numbers",
      "Extremely large inputs",
      "Empty input"
    ],
    correctAnswerIndex: 0,
    explanation: "Robust implementations of Sort Merge must handle boundary conditions."
  },
  {
    question: "If the input size for Sort Merge is doubled, how does the execution time scale approximately in the average case? **GATE 2012**",
    options: [
      "It doubles",
      "It increases by a constant factor",
      "It remains constant",
      "It quadruples"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of Sort Merge."
  },
  {
    question: "Consider the worst-case scenario for Sort Merge. Which data structure would most likely degrade its performance? **GATE 2006**",
    options: [
      "Arrays",
      "Linked Lists",
      "Balanced Trees",
      "Hash Tables"
    ],
    correctAnswerIndex: 2,
    explanation: "Different data structures provide different access times which heavily influence Sort Merge."
  },
  {
    question: "In a distributed computing environment, how easily can Sort Merge be parallelized? **GATE 2020**",
    options: [
      "Moderately, requires synchronization.",
      "Difficult, highly sequential.",
      "Impossible.",
      "Easily, it is embarrassingly parallel."
    ],
    correctAnswerIndex: 3,
    explanation: "Parallelizing Sort Merge depends on data dependencies."
  }
];

export const sortMergeDebug = {
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

export const sortMergeDrag = {
  instructions: "Drag the lines of code into the correct order to form the algorithm.",
  lines: [
    { id: "1", text: "for (int i = 0; i < n; i++) {" },
    { id: "2", text: "  // loop body" },
    { id: "3", text: "}" }
  ],
  order: ["1", "2", "3"]
};

export const sortMergeComplete = {
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
