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
    question: "What is the worst-case time complexity of Merge Sort?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    correctAnswer: 1,
    explanation: "Merge sort guarantees an O(n log n) time complexity in all cases because it always divides the array into two equal halves and takes linear time to merge them."
  },
  {
    question: "Which algorithmic paradigm does Merge Sort utilize?",
    options: ["Dynamic Programming", "Greedy Algorithm", "Divide and Conquer", "Backtracking"],
    correctAnswer: 2,
    explanation: "Merge Sort uses the Divide and Conquer paradigm, recursively breaking the problem into smaller subproblems and merging their solutions."
  },
  {
    question: "Is standard Merge Sort a stable sorting algorithm?",
    options: ["Yes", "No", "Only for integers", "Only when implemented recursively"],
    correctAnswer: 0,
    explanation: "Yes, standard Merge Sort is stable. Equal elements maintain their relative order as long as the merge step prefers the left array's element when a tie occurs."
  },
  {
    question: "What is the auxiliary space complexity of standard Merge Sort for arrays?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 2,
    explanation: "Standard array implementations require O(n) auxiliary space for temporary arrays to hold the divided halves during the merge step."
  },
  {
    question: "Why is Merge Sort often preferred over Quicksort for sorting linked lists?",
    options: ["It has a better worst-case time complexity.", "It requires O(1) auxiliary space for linked lists.", "It accesses elements sequentially without needing random access.", "Both B and C"],
    correctAnswer: 3,
    explanation: "Merge Sort accesses elements sequentially (ideal for linked lists) and can be implemented with O(1) extra space by simply updating pointers, making it highly efficient for linked lists."
  },
  {
    question: "Which of the following recurrence relations accurately represents standard Merge Sort?",
    options: ["T(n) = T(n-1) + O(n)", "T(n) = 2T(n/2) + O(1)", "T(n) = 2T(n/2) + O(n)", "T(n) = T(n/2) + O(n log n)"],
    correctAnswer: 2,
    explanation: "Merge Sort divides the array into two halves (2T(n/2)) and then takes linear time to merge them (O(n))."
  },
  {
    question: "Who is credited with inventing the Merge Sort algorithm?",
    options: ["Tony Hoare", "John von Neumann", "Donald Knuth", "Edsger Dijkstra"],
    correctAnswer: 1,
    explanation: "Merge Sort was formulated by John von Neumann in 1945."
  },
  {
    question: "In the merge phase, if we merge two sorted arrays of sizes M and N, what is the maximum number of comparisons needed?",
    options: ["M * N", "M + N", "M + N - 1", "min(M, N)"],
    correctAnswer: 2,
    explanation: "In the worst case, every element except the largest one triggers a comparison, leading to exactly M + N - 1 comparisons."
  },
  {
    question: "What happens if we replace `L[i] <= R[j]` with `L[i] < R[j]` in the merge function?",
    options: ["The algorithm will not sort the array correctly.", "The algorithm will crash with an out-of-bounds error.", "The sorting algorithm loses its stability.", "The time complexity degrades to O(n^2)."],
    correctAnswer: 2,
    explanation: "Using `<` instead of `<=` means that when elements are equal, the one from the right array is picked first. This ruins the stability of the sort."
  },
  {
    question: "Which popular hybrid sorting algorithm relies heavily on a combination of Merge Sort and Insertion Sort?",
    options: ["Introsort", "Timsort", "Shellsort", "Smoothsort"],
    correctAnswer: 1,
    explanation: "Timsort, used as the default sort in Python and Java, is a hybrid algorithm derived from Merge Sort and Insertion Sort."
  },
  {
    question: "Why is `m = l + (r - l) / 2` preferred over `m = (l + r) / 2` when calculating the midpoint?",
    options: ["It executes faster on modern CPUs.", "It prevents potential integer overflow for large indices.", "It works for negative indices as well.", "It ensures the left half is always strictly smaller."],
    correctAnswer: 1,
    explanation: "For very large arrays, `l + r` can exceed the maximum value of a 32-bit signed integer, causing an overflow. `l + (r - l) / 2` safely avoids this."
  },
  {
    question: "What is the best-case time complexity of standard Merge Sort without any optimizations?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(n^2)"],
    correctAnswer: 2,
    explanation: "Standard Merge Sort blindly divides the array and merges it back, even if it is already sorted, resulting in an O(n log n) best-case time complexity."
  }
];

export const sortMergeDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  instruction: "Fill in the blanks to complete the implementation.",
  template: "void sort() {\n  {{blank1}}\n}",
  answer: "void sort() {\n  int x = 0;\n}",
  blanks: ["int x = 0;"]
};
