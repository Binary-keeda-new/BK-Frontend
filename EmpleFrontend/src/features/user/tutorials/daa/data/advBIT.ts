export const advBITContent = [
  {
    title: "1. Introduction",
    content: "A Binary Indexed Tree (BIT), also known as a Fenwick Tree, is a highly space-efficient and fast data structure used to compute prefix sums and perform point updates on an array of numbers. It was proposed by Peter Fenwick in 1994. Unlike an ordinary array where updates are $O(1)$ but prefix sums are $O(N)$, or a prefix sum array where prefix sums are $O(1)$ but updates are $O(N)$, a BIT performs both in $O(\\log N)$ time."
  },
  {
    title: "2. Problem Statement",
    content: "Given an array of $N$ elements, we need to efficiently support two operations:\n1. **Point Update:** Add a value $v$ to the element at index $i$.\n2. **Prefix Sum Query:** Find the sum of elements from index $1$ to $i$.\n\nFurthermore, we can extend this to answer **Range Sum Queries** from $L$ to $R$ by computing `query(R) - query(L-1)`."
  },
  {
    title: "3. Theory & Working",
    content: "A Fenwick Tree conceptually builds a tree using the binary representation of array indices. The core idea relies on the Least Significant Bit (LSB) of an index. In two's complement arithmetic, the LSB of a number `x` can be isolated using `x & (-x)`.\n\nEvery index $i$ in the BIT stores the sum of a specific range of elements. Specifically, the element at index $i$ is responsible for the range `[i - (i & -i) + 1, i]`. The length of this range is exactly `i & -i`.\n\n- To **query** the prefix sum up to $i$, we add the value at BIT[$i$], and then strip the LSB from $i$ (`i = i - (i & -i)`) to find the next relevant range.\n- To **update** the element at $i$, we update BIT[$i$], and then add the LSB to $i$ (`i = i + (i & -i)`) to update all subsequent ranges that encompass $i$."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider an array `A = [0, 3, 2, -1, 6]` (1-based index). We want to build a BIT of size 4.\nInitially `BIT = [0, 0, 0, 0, 0]`.\n\n**Update index 1 with 3:**\n- `i = 1 (001)`: `BIT[1] += 3` -> `BIT = [0, 3, 0, 0, 0]`\n- `i = 1 + (1 & -1) = 2 (010)`: `BIT[2] += 3` -> `BIT = [0, 3, 3, 0, 0]`\n- `i = 2 + (2 & -2) = 4 (100)`: `BIT[4] += 3` -> `BIT = [0, 3, 3, 0, 3]`\n\n**Update index 2 with 2:**\n- `i = 2 (010)`: `BIT[2] += 2` -> `BIT = [0, 3, 5, 0, 3]`\n- `i = 4 (100)`: `BIT[4] += 2` -> `BIT = [0, 3, 5, 0, 5]`\n\n**Query prefix sum at index 3:**\n- `ans = 0`\n- `i = 3 (011)`: `ans += BIT[3]` (which is 0)\n- `i = 3 - (3 & -3) = 2 (010)`: `ans += BIT[2]` (which is 5)\n- `i = 2 - (2 & -2) = 0`. End loop.\nResult = 5. (Matches `3 + 2`)."
  },
  {
    title: "5. Pseudocode",
    content: "```text\n// 1-based indexing is assumed for the BIT array of size N+1\n\nfunction update(index, val):\n    while index <= N:\n        BIT[index] = BIT[index] + val\n        index = index + (index & (-index))\n\nfunction query(index):\n    sum = 0\n    while index > 0:\n        sum = sum + BIT[index]\n        index = index - (index & (-index))\n    return sum\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n\nvoid update(int* BIT, int N, int index, int val) {\n    while (index <= N) {\n        BIT[index] += val;\n        index += index & (-index);\n    }\n}\n\nint query(int* BIT, int index) {\n    int sum = 0;\n    while (index > 0) {\n        sum += BIT[index];\n        index -= index & (-index);\n    }\n    return sum;\n}\n\nint main() {\n    int N = 4;\n    int* BIT = (int*)calloc(N + 1, sizeof(int));\n    \n    update(BIT, N, 1, 5);\n    update(BIT, N, 2, 3);\n    update(BIT, N, 3, -1);\n    update(BIT, N, 4, 7);\n    \n    printf(\"Prefix sum up to 3: %d\\n\", query(BIT, 3));\n    free(BIT);\n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\npublic class FenwickTree {\n    private int[] BIT;\n    private int n;\n\n    public FenwickTree(int size) {\n        this.n = size;\n        BIT = new int[n + 1];\n    }\n\n    public void update(int index, int val) {\n        while (index <= n) {\n            BIT[index] += val;\n            index += index & (-index);\n        }\n    }\n\n    public int query(int index) {\n        int sum = 0;\n        while (index > 0) {\n            sum += BIT[index];\n            index -= index & (-index);\n        }\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        FenwickTree bit = new FenwickTree(4);\n        bit.update(1, 5);\n        bit.update(2, 3);\n        bit.update(3, -1);\n        bit.update(4, 7);\n        System.out.println(\"Prefix sum up to 3: \" + bit.query(3));\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:**\n- **Update:** $O(\\log N)$. At each step, we add a power of 2, so the index increases and can at most undergo $\\approx \\log_2 N$ transitions before exceeding $N$.\n- **Query:** $O(\\log N)$. At each step, we drop the lowest set bit, and an integer $\\le N$ has at most $\\approx \\log_2 N$ set bits.\n- **Build:** Iteratively updating each element takes $O(N \\log N)$. A faster approach exists to build it in $O(N)$ by propagating values to immediate parents.\n\n**Space Complexity:** $O(N)$, as we only need an array of size $N+1$."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "Because Fenwick Tree operations depend strictly on the binary representation of the indices:\n- **Worst Case:** Operations take exactly $O(\\log N)$ steps (e.g., querying an index like $2^k - 1$ which has all bits set, or updating $1$ which cascades up).\n- **Best Case:** Operations can take $O(1)$ steps (e.g., querying index $2^k$ only takes 1 step because it has only one set bit, or updating $N$ where it immediately exits bounds).\n- **Average Case:** Both update and query average $\\approx \\frac{\\log_2 N}{2}$ operations, which is still $O(\\log N)$ asymptotically."
  },
  {
    title: "10. In-place & Stability",
    content: "These concepts traditionally apply to sorting algorithms.\nFor a Fenwick Tree:\n- **In-place:** You technically require an additional array of size $N+1$ (the BIT itself). However, if the original array is not needed after initialization, the BIT can be constructed in-place within the given 1-indexed array in $O(N)$ time.\n- **Stability:** Not applicable, as Fenwick Tree is a data structure for prefix aggregates, not a sorting algorithm."
  },
  {
    title: "11. Edge Cases",
    content: "- **0-indexing:** The algorithm fundamentally breaks down if index $0$ is used because `0 & -0` is $0$. Attempting to update or query at index $0$ results in an infinite loop (`index += 0`). Thus, the BIT must always be 1-indexed.\n- **Out of Bounds:** The update function loops while `index <= N`. Ensure $N$ is accurately passed or stored to prevent writing out of bounds.\n- **Negative Values:** Fenwick Tree handles negative array values perfectly fine since it relies on addition/subtraction, which are commutative and invertible."
  },
  {
    title: "12. Applications",
    content: "1. **Dynamic Prefix Sums:** Extremely useful when array elements change over time and prefix queries are frequent.\n2. **Counting Inversions:** In an array, we can use a BIT to keep track of element frequencies and efficiently count elements smaller/larger than the current element as we iterate.\n3. **Range Updates and Point Queries:** By maintaining a Difference Array instead of the original array, BIT can process range updates in $O(\\log N)$ and point queries in $O(\\log N)$.\n4. **Range Updates and Range Queries:** Achievable using two synchronized Fenwick Trees."
  },
  {
    title: "13. Common Mistakes",
    content: "- **Using 0-based indexing:** Forgetting to convert a 0-indexed array from the problem input to a 1-indexed BIT.\n- **Incorrect LSB isolation:** Writing `index & (~index)` or similar flawed logic instead of `index & (-index)`.\n- **Re-initializing lazily:** Forgetting to clear the BIT array between test cases, leading to leftover garbage values.\n- **Querying `L to R` incorrectly:** It must be `query(R) - query(L - 1)`, often people mistakenly use `query(R) - query(L)`."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Segment Tree:** A more versatile but heavier tree that can handle non-invertible range queries (like Range Minimum/Maximum). BIT is lighter, easier to code, and faster in practice for sums.\n- **Prefix Sum Array:** $O(1)$ query but $O(N)$ update. BIT is a dynamic version of this.\n- **Square Root Decomposition:** Handles dynamic queries in $O(\\sqrt{N})$. Much slower than BIT but can accommodate queries that BIT cannot.\n- **Difference Arrays:** Used alongside BIT to extend its functionality to range updates."
  },
  {
    title: "15. Interview Questions",
    content: "1. How does a Fenwick Tree handle updates efficiently compared to an ordinary array?\n2. Explain the intuition behind the expression `x & (-x)`.\n3. How would you modify a Fenwick Tree to handle Range Updates instead of Point Updates?\n4. Can a Fenwick Tree be used for Range Minimum Queries (RMQ)? Why or why not?\n5. Explain an algorithm to count the number of inversions in an array using a Fenwick Tree."
  },
  {
    title: "16. Summary",
    content: "The Binary Indexed Tree (Fenwick Tree) is an elegant, implicitly defined tree structure stored in a simple array. By leveraging the bitwise representation of indices, it enables both point updates and prefix sum queries in $O(\\log N)$ time with only $O(N)$ space. Its small constant factor, minimal memory overhead, and brief implementation make it a preferred tool in competitive programming and system optimizations over heavier structures like Segment Trees when dealing with cumulative frequency tables or dynamic prefix sums."
  }
];

export const advBITMcqs = [
  {
    question: "What is the time complexity of the most optimal algorithm to build a Binary Indexed Tree from an array of size $N$?",
    options: [
      "O(1)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 1,
    explanation: "While inserting elements one by one takes $O(N \\log N)$, a BIT can be built in $O(N)$ time by initializing the BIT array with the original values and then adding each node's value to its immediate parent in a single pass."
  },
  {
    question: "Which of the following bitwise operations correctly extracts the lowest set bit (Least Significant Bit) of an integer `x` in a system using 2's complement representation?",
    options: [
      "x & (x - 1)",
      "x ^ (x - 1)",
      "x & (-x)",
      "x | (-x)"
    ],
    correctAnswerIndex: 2,
    explanation: "`x & (-x)` isolates the rightmost set bit because in 2's complement, `-x` is equivalent to `~x + 1`, which flips all bits up to the lowest set bit."
  },
  {
    question: "In a 1-based indexed Binary Indexed Tree, which range of elements from the original array does the node at index 12 (binary 1100) cover?",
    options: [
      "Elements 9 to 12",
      "Elements 8 to 12",
      "Elements 1 to 12",
      "Elements 11 to 12"
    ],
    correctAnswerIndex: 0,
    explanation: "The node at index $i$ is responsible for $i - (i \\& -i) + 1$ to $i$. For $i = 12$ (1100), the LSB is 4 (0100). The range length is 4. Thus, it covers $(12 - 4 + 1)$ to $12$, which is 9 to 12."
  },
  {
    question: "Let $N = 10^5$. In the worst case, approximately how many array accesses are made during a single `query` operation in a Fenwick Tree?",
    options: [
      "100,000",
      "316",
      "17",
      "5"
    ],
    correctAnswerIndex: 2,
    explanation: "The maximum number of steps is the maximum number of set bits in an index $\\le N$. $\\lceil \\log_2(10^5) \\rceil = 17$, so at most 17 operations are performed."
  },
  {
    question: "If a Fenwick Tree is queried at index 0, what is the expected outcome based on the standard `update` and `query` algorithms?",
    options: [
      "It returns 0.",
      "It correctly returns the first element.",
      "It causes an infinite loop.",
      "It causes a compilation error."
    ],
    correctAnswerIndex: 2,
    explanation: "For index 0, $0 \\& -0 = 0$. If an update is called on 0, `index += index & (-index)` becomes `0 += 0`, leading to an infinite loop. BIT must be 1-indexed."
  },
  {
    question: "Given a Fenwick Tree array `BIT`, how is the sum of elements in the original array from index $L$ to $R$ (inclusive) evaluated?",
    options: [
      "query(R) - query(L)",
      "query(R) - query(L - 1)",
      "query(R) + query(L - 1)",
      "BIT[R] - BIT[L - 1]"
    ],
    correctAnswerIndex: 1,
    explanation: "To get the sum of the range $[L, R]$, we take the prefix sum up to $R$ and subtract the prefix sum up to $L-1$, which removes elements before $L$."
  },
  {
    question: "Suppose the current index in a BIT `update` traversal is 10 (binary 1010). What will be the next index updated in the tree?",
    options: [
      "11",
      "12",
      "14",
      "8"
    ],
    correctAnswerIndex: 1,
    explanation: "The next index is $i + (i \\& -i)$. For 10, the lowest set bit is 2 (0010). $10 + 2 = 12$."
  },
  {
    question: "Suppose the current index in a BIT `query` traversal is 14 (binary 1110). What will be the next index queried in the tree?",
    options: [
      "15",
      "12",
      "13",
      "10"
    ],
    correctAnswerIndex: 1,
    explanation: "The next index is $i - (i \\& -i)$. For 14, the lowest set bit is 2 (0010). $14 - 2 = 12$."
  },
  {
    question: "Which of the following problems CANNOT be solved efficiently (in $O(\\log N)$ time per query) using a standard one-dimensional Fenwick Tree?",
    options: [
      "Range Sum Query with Point Updates",
      "Point Query with Range Updates (using Difference Array)",
      "Range Minimum Query with Point Updates",
      "Counting Inversions in an Array"
    ],
    correctAnswerIndex: 2,
    explanation: "A standard Fenwick Tree relies on the operation being invertible (like addition and subtraction). Finding the minimum is not strictly invertible (you cannot 'subtract' a minimum to reverse an update), making standard BIT unsuitable for generic RMQ. Segment Trees are used instead."
  },
  {
    question: "Which of the following correctly describes the relationship between nodes in a Fenwick Tree?",
    options: [
      "Every node at index $i$ stores the sum of a prefix starting strictly at index 1.",
      "The tree is represented as an explicit binary tree using pointers.",
      "A node at index $i$ is logically the parent of $i - 2^k$, where $2^k$ is less than the LSB of $i$.",
      "A node at index $i$ is logically the parent of $i - (i \\& -i)$."
    ],
    correctAnswerIndex: 2,
    explanation: "Structurally, a node at index $i$ is the parent of nodes $i - 2^0, i - 2^1, \\dots, i - 2^{k-1}$ where $2^k$ is the LSB of $i$."
  }
];

export const advBITDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const advBITDrag = {
  instructions: "Drag the mathematical expression or operation to its correct role in a Fenwick Tree.",
  options: [
    "x & (-x)",
    "i += i & (-i)",
    "i -= i & (-i)",
    "query(R) - query(L - 1)"
  ],
  correctOrder: [
    { text: "Extracting the Least Significant Bit", option: "x & (-x)" },
    { text: "Finding the next node to update", option: "i += i & (-i)" },
    { text: "Finding the next node to query", option: "i -= i & (-i)" },
    { text: "Computing sum of range [L, R]", option: "query(R) - query(L - 1)" }
  ]
};

export const advBITComplete = {
  instructions: "Complete the Java implementation of the Fenwick Tree `update` and `query` functions.",
  code: `
class FenwickTree {
    int[] BIT;
    int n;

    public FenwickTree(int size) {
        n = size;
        BIT = new int[n + 1];
    }

    public void update(int index, int val) {
        while (index <= n) {
            BIT[index] += val;
            index += index & (~~-index~~);
        }
    }

    public int query(int index) {
        int sum = 0;
        while (index ~~> 0~~) {
            sum += BIT[index];
            index -= ~~index & (-index)~~;
        }
        return sum;
    }
}
`
};
