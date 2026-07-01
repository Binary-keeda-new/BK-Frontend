export const asymptoticContent = {
  title: "Asymptotic Analysis",
  points: [
    {
      title: "1. Introduction",
      content: "Asymptotic Analysis is the mathematical foundation for analyzing the performance of algorithms. It focuses on how the runtime or space requirements of an algorithm grow as the input size approaches infinity, allowing us to compare the efficiency of different algorithms independently of hardware and programming language."
    },
    {
      title: "2. Problem Statement",
      content: "Given an algorithm, how can we mathematically determine its time and space efficiency as a function of the input size $n$? We need a standardized way to describe the bounds of an algorithm's performance, focusing on the most significant factors while ignoring constants and lower-order terms."
    },
    {
      title: "3. Theory & Working",
      content: "Asymptotic analysis uses three main notations to describe the growth rate of algorithms:\n\n- **Big O Notation ($\\mathcal{O}$)**: Represents the upper bound or worst-case scenario. It guarantees that the algorithm will not take more time or space than this bound.\n- **Omega Notation ($\\Omega$)**: Represents the lower bound or best-case scenario. It guarantees that the algorithm will take at least this much time or space.\n- **Theta Notation ($\\Theta$)**: Represents the tight bound or average-case scenario. It means the algorithm operates within both the upper and lower bounds asymptotically.\n\nTo perform the analysis, we express the algorithm's performance as a mathematical function $f(n)$, drop all constants (e.g., $O(2n) \\rightarrow O(n)$), and keep only the highest-order term (e.g., $O(n^2 + n) \\rightarrow O(n^2)$) as it dominates for large $n$."
    },
    {
      title: "4. Step-by-Step Dry Run",
      content: "Let's analyze a simple function $f(n) = 3n^2 + 5n + 2$ using Big O notation:\n\n1. **Identify terms**: We have three terms: $3n^2$, $5n$, and $2$.\n2. **Identify the highest-order term**: For very large $n$, $n^2$ grows much faster than $n$ or a constant. So, $3n^2$ dominates.\n3. **Drop lower-order terms**: The function is bounded by the growth of $3n^2$.\n4. **Drop the constant multiplier**: The constant $3$ does not affect the rate of growth. We drop it.\n5. **Result**: The function is bounded by $O(n^2)$.\n\nThus, any algorithm with exactly this number of operations has an asymptotic time complexity of $O(n^2)$."
    },
    {
      title: "5. Pseudocode",
      content: "Here is pseudocode for a nested loop structure commonly analyzed to have $O(n^2)$ time complexity:\n\n```text\nfunction printPairs(arr, n):\n    for i from 0 to n-1:\n        for j from 0 to n-1:\n            print arr[i], arr[j]\n```\nThe outer loop runs $n$ times. For each iteration of the outer loop, the inner loop runs $n$ times. Total iterations = $n \\times n = n^2$. Thus, the time complexity is $O(n^2)$."
    },
    {
      title: "6. C Implementation",
      content: "```c\n#include <stdio.h>\n\n// Example of O(n^2) complexity\nvoid printPairs(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            printf(\"%d %d\\n\", arr[i], arr[j]);\n        }\n    }\n}\n\nint main() {\n    int arr[] = {1, 2, 3};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    printPairs(arr, n);\n    return 0;\n}\n```"
    },
    {
      title: "7. Java Implementation",
      content: "```java\npublic class AsymptoticExample {\n    // Example of O(n) complexity\n    public static void printElements(int[] arr) {\n        for (int i = 0; i < arr.length; i++) {\n            System.out.println(arr[i]);\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        printElements(arr);\n    }\n}\n```"
    },
    {
      title: "8. Time & Space Complexity",
      content: "- **Time Complexity:** Depends on the specific algorithm being analyzed. Common classes include $O(1)$ (constant), $O(\\log n)$ (logarithmic), $O(n)$ (linear), $O(n \\log n)$ (linearithmic), $O(n^2)$ (quadratic), $O(2^n)$ (exponential), and $O(n!)$ (factorial).\n- **Space Complexity:** Measures the extra memory required by the algorithm as a function of input size. For example, sorting in-place uses $O(1)$ auxiliary space, while merge sort might use $O(n)$ auxiliary space."
    },
    {
      title: "9. Best, Worst & Average Case",
      content: "- **Best Case ($\\Omega$)**: The minimum time/space an algorithm requires for a given input size. Example: Linear search finding the element at the first position has a best-case time complexity of $\\Omega(1)$.\n- **Worst Case ($\\mathcal{O}$)**: The maximum time/space an algorithm could require. Example: Linear search searching for an element not in the array takes $O(n)$ time.\n- **Average Case ($\\Theta$)**: The expected time/space over all possible inputs of size $n$. For linear search, it's typically $\\Theta(n/2) \\equiv \\Theta(n)$."
    },
    {
      title: "10. Iterative vs Recursive",
      content: "- **Iterative Analysis:** We usually determine time complexity by counting loops and their bounds. Nested loops multiply complexities.\n- **Recursive Analysis:** We use Recurrence Relations (like $T(n) = 2T(n/2) + O(n)$) to define the time complexity. These relations can be solved using techniques like the Master Theorem, Substitution Method, or Recursion Tree Method."
    },
    {
      title: "11. Edge Cases & Constraints",
      content: "- **Small Input Sizes:** For small $n$, algorithms with worse asymptotic complexity might outperform those with better ones (e.g., Insertion Sort vs. Merge Sort for $n < 20$) due to smaller constant factors.\n- **Multiple Variables:** Sometimes complexity is based on multiple variables, e.g., graph algorithms with $V$ (vertices) and $E$ (edges) having complexities like $O(V + E)$."
    },
    {
      title: "12. Applications",
      content: "Asymptotic analysis is applied extensively to:\n- Evaluate and compare sorting and searching algorithms.\n- Choose appropriate data structures for specific operations (e.g., Hash Tables for $O(1)$ lookups vs. BSTs for ordered traversal).\n- Optimize database queries and execution plans.\n- Predict scalability of software systems under load."
    },
    {
      title: "13. Pros & Cons",
      content: "**Pros:**\n- Provides a machine-independent standard for algorithm evaluation.\n- Simplifies complex mathematical equations by ignoring minor details.\n- Highlights the fundamental scalability limits of an algorithm.\n\n**Cons:**\n- Ignores constant factors that might be significant for moderately sized inputs.\n- Does not account for specific hardware capabilities (like cache memory, vectorization).\n- Can be overly pessimistic (Big O) or theoretical."
    },
    {
      title: "14. Comparison with alternatives",
      content: "- **Asymptotic Analysis vs. Empirical Analysis (Profiling):** Asymptotic analysis is theoretical, predicting performance mathematically without running the code. Empirical analysis (profiling/benchmarking) involves running the code with test data and measuring actual execution time in milliseconds. Profiling catches constants and hardware specifics but depends heavily on the machine and input data distribution."
    },
    {
      title: "15. Common Pitfalls",
      content: "- **Ignoring Constants Too Early:** Assuming $O(n)$ is always faster than $O(n^2)$ is a mistake for small $n$. An algorithm with $1000n$ might be slower than $n^2$ for $n < 1000$.\n- **Confusing Worst-Case with Average-Case:** Using Quicksort is popular due to its $O(n \\log n)$ average case, but assuming it guarantees this time is incorrect; its worst-case is $O(n^2)$.\n- **Misinterpreting Space Complexity:** Confusing the total memory used by the input data with the *auxiliary* (extra) space required by the algorithm."
    },
    {
      title: "16. Visual Intuition",
      content: "Imagine plotting mathematical functions on a graph. The x-axis is the input size $n$ and the y-axis is the number of operations or time. \n- $O(1)$ is a flat horizontal line.\n- $O(n)$ is a straight diagonal line.\n- $O(\\log n)$ curves gently, growing very slowly as $n$ increases.\n- $O(n^2)$ forms a steep parabola, growing rapidly.\n- $O(2^n)$ shoots almost vertically upwards for even moderate values of $n$.\nThis visual comparison instantly shows why logarithmic algorithms are preferred over exponential ones."
    }
  ]
};

export const asymptoticMcqs = [
  {
    question: "What does Big O notation primarily represent?",
    options: ["Lower bound", "Tight bound", "Upper bound", "Exact time"],
    correctAnswer: 2,
    explanation: "Big O notation represents the upper bound or worst-case scenario of an algorithm's performance."
  },
  {
    question: "What is the time complexity of an algorithm with performance function f(n) = 5n^3 + 2n^2 + 10?",
    options: ["O(n^2)", "O(n^3)", "O(n)", "O(1)"],
    correctAnswer: 1,
    explanation: "We drop the constants and lower-order terms. The highest order term is n^3, so the complexity is O(n^3)."
  },
  {
    question: "Which of the following complexities represents a logarithmic growth rate?",
    options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"],
    correctAnswer: 3,
    explanation: "O(log n) denotes logarithmic time complexity, which grows very slowly as the input size increases."
  },
  {
    question: "What does Omega (Ω) notation describe?",
    options: ["Best-case scenario (lower bound)", "Worst-case scenario", "Average-case scenario", "Error bound"],
    correctAnswer: 0,
    explanation: "Omega (Ω) notation provides an asymptotic lower bound, often associated with the best-case execution time."
  },
  {
    question: "Theta (Θ) notation is used when:",
    options: [
      "The upper bound and lower bound are different",
      "The upper bound and lower bound are exactly the same",
      "The algorithm has no worst-case",
      "Space complexity is zero"
    ],
    correctAnswer: 1,
    explanation: "Theta (Θ) notation is a tight bound, meaning the algorithm is bounded both from above and below by the same function (e.g., O(n) and Ω(n))."
  },
  {
    question: "Why do we ignore constants in asymptotic analysis?",
    options: [
      "They are impossible to calculate",
      "They do not significantly affect the growth rate for large inputs",
      "They depend solely on the input data",
      "They cause algorithms to crash"
    ],
    correctAnswer: 1,
    explanation: "Constants become negligible compared to the growth rate of the variable terms as the input size 'n' approaches infinity."
  },
  {
    question: "Which of the following indicates an algorithm that grows exponentially?",
    options: ["O(n log n)", "O(n^2)", "O(n!)", "O(2^n)"],
    correctAnswer: 3,
    explanation: "O(2^n) represents exponential time complexity. O(n!) is factorial, which grows even faster."
  },
  {
    question: "If algorithm A has time complexity O(n) and algorithm B has O(n^2), which is generally faster for VERY LARGE values of n?",
    options: ["Algorithm A", "Algorithm B", "They are the same", "Cannot be determined"],
    correctAnswer: 0,
    explanation: "For very large 'n', a linear growth rate O(n) will result in fewer operations than a quadratic growth rate O(n^2)."
  },
  {
    question: "What is the space complexity of an algorithm that only uses a few constant size variables regardless of input size?",
    options: ["O(n)", "O(n^2)", "O(1)", "O(log n)"],
    correctAnswer: 2,
    explanation: "When the space required does not depend on the input size, it is constant space complexity, denoted as O(1)."
  },
  {
    question: "Recurrence relations are typically used to analyze the time complexity of:",
    options: ["Iterative algorithms", "Greedy algorithms", "Recursive algorithms", "Object-oriented programs"],
    correctAnswer: 2,
    explanation: "Recurrence relations express the time complexity of a recursive function in terms of its calls to smaller inputs."
  }
];

export const asymptoticDebug = {
  title: "Debug Duplicates Finder (O(n^2))",
  description: "The following C function checks if an array has duplicate elements. It is intended to run in O(n^2) time by comparing every pair. However, there's a logical flaw causing it to always return 1 (true) on the first iteration. Fix the inner loop initialization.",
  code: `int hasDuplicates(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            if (arr[i] == arr[j]) {
                return 1;
            }
        }
    }
    return 0;
}`,
  solution: `int hasDuplicates(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                return 1;
            }
        }
    }
    return 0;
}`
};

export const asymptoticDrag = {
  title: "Order of Growth",
  description: "Drag and drop the time complexities to order them from fastest (lowest growth rate) to slowest (highest growth rate).",
  options: [
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "O(n^2)",
    "O(2^n)",
    "O(n!)"
  ]
};

export const asymptoticComplete = {
  title: "Complete the Binary Search (O(log n))",
  description: "Fill in the missing statements to complete the binary search algorithm, which has a time complexity of O(log n).",
  code: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x)
            return m;
        if (arr[m] < x)
            // Search right half
            l = ______;
        else
            // Search left half
            r = ______;
    }
    return -1;
}`,
  solution: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x)
            return m;
        if (arr[m] < x)
            // Search right half
            l = m + 1;
        else
            // Search left half
            r = m - 1;
    }
    return -1;
}`
};
