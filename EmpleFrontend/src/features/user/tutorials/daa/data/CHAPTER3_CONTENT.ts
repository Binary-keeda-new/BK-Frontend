export const CHAPTER3_CONTENT = {
  title: "Asymptotic Analysis",
  description: "Dive deep into Asymptotic Analysis to evaluate algorithm efficiency. Explore Best, Worst, and Average case scenarios, and Amortized Analysis. You will thoroughly master asymptotic notations like Big-O, Big-Omega, Big-Theta, Little-o, and Little-omega. Through complexity comparison charts and practical analysis of loops and recursion, you will learn to calculate both time and auxiliary space complexities.",
  points: [
    {
      heading: "Best Case",
      body: "The best-case complexity of an algorithm is the function defined by the minimum number of steps taken on any instance of size $n$. It represents the optimal conditions for the algorithm. For example, in a linear search, the best case occurs when the target element is the very first item in the array, resulting in an $O(1)$ time complexity."
    },
    {
      heading: "Worst Case",
      body: "The worst-case complexity represents the maximum running time required for an input of size $n$. It provides an upper bound on the running time, guaranteeing that the algorithm will never take longer than this. This is the most commonly used metric in algorithm analysis because it prepares us for the most demanding scenarios."
    },
    {
      heading: "Average Case",
      body: "The average-case complexity provides a measure of the algorithm's performance over all possible inputs of size $n$, usually assuming a uniform probability distribution over the inputs. Calculating this requires a solid understanding of probability theory and is often much harder to compute than the worst case."
    },
    {
      heading: "Amortized Analysis (Introduction)",
      body: "Amortized analysis averages the time required to perform a sequence of data-structure operations over all the operations performed. It guarantees the average performance of each operation in the worst case. For example, inserting into a dynamically resizing array (like Java's ArrayList) takes $O(n)$ in the worst case when the array resizes, but the amortized cost per insertion over many operations is $O(1)$."
    },
    {
      heading: "Asymptotic Notations",
      body: "Asymptotic notations are mathematical tools used to represent the time and space complexity of an algorithm in relation to the input size ($n$). They describe how the runtime scales as $n$ tends towards infinity, allowing us to drop lower-order terms and constant factors to focus on the dominant growth rate."
    },
    {
      heading: "Big-O",
      body: "Big-O notation ($O$) provides an asymptotic **upper bound**. If $f(n) = O(g(n))$, it means $f(n)$ grows at most as fast as $g(n)$ for large values of $n$. We use it to describe the worst-case scenario. Formally, $f(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$."
    },
    {
      heading: "Big-Ω",
      body: "Big-Omega notation ($\\Omega$) provides an asymptotic **lower bound**. If $f(n) = \\Omega(g(n))$, it means $f(n)$ grows at least as fast as $g(n)$. It is used to define the best-case scenario or the absolute minimum time an algorithm must take. Formally, $f(n) \\ge c \\cdot g(n)$ for all $n \\ge n_0$."
    },
    {
      heading: "Big-Θ",
      body: "Big-Theta notation ($\\Theta$) provides an asymptotic **tight bound**. If $f(n) = \\Theta(g(n))$, it means $f(n)$ grows exactly at the same rate as $g(n)$. It implies that both $O$ and $\\Omega$ bounds hold. Formally, $c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n)$."
    },
    {
      heading: "Little-o",
      body: "Little-o notation ($o$) provides a **strict upper bound**. If $f(n) = o(g(n))$, it means $f(n)$ grows strictly slower than $g(n)$. Unlike Big-O, the bound cannot be tight. For example, $2n = o(n^2)$, but $2n^2 \\neq o(n^2)$."
    },
    {
      heading: "Little-ω",
      body: "Little-omega notation ($\\omega$) provides a **strict lower bound**. If $f(n) = \\omega(g(n))$, it means $f(n)$ grows strictly faster than $g(n)$. For example, $n^2 = \\omega(n)$."
    },
    {
      heading: "Growth of Functions",
      body: "Understanding the growth of functions is key to comparing algorithms. As the input size $n$ increases, algorithms with slower-growing functions perform significantly better. We ignore constant multipliers and lower-order terms (e.g., $3n^2 + 5n + 2$ is treated simply as $n^2$) because, at large scales, the highest-order term dictates performance."
    },
    {
      heading: "O(1)",
      body: "**Constant Time:** The runtime is independent of the input size. Examples include accessing an array element by index, inserting at the head of a linked list, or checking a dictionary for a key."
    },
    {
      heading: "O(log n)",
      body: "**Logarithmic Time:** The runtime increases logarithmically with the input size. The algorithm typically halves the dataset in each step. Binary Search on a sorted array is the classic example."
    },
    {
      heading: "O(√n)",
      body: "**Square Root Time:** The runtime grows proportionally to the square root of $n$. Commonly seen in algorithms dealing with prime factorizations, like checking if a number $n$ is prime by iterating up to $\\sqrt{n}$."
    },
    {
      heading: "O(n)",
      body: "**Linear Time:** The runtime scales proportionally with the input size. You must touch or examine every element once. Example: Linear search or finding the maximum element in an unsorted array."
    },
    {
      heading: "O(n log n)",
      body: "**Linearithmic Time:** Slightly worse than linear time but much better than quadratic. Most efficient comparison-based sorting algorithms fall into this category, including Merge Sort, Heap Sort, and Quick Sort (average case)."
    },
    {
      heading: "O(n²)",
      body: "**Quadratic Time:** The runtime scales quadratically. Usually the result of a nested loop over the data. Examples include simple sorting algorithms like Bubble Sort, Insertion Sort, and Selection Sort."
    },
    {
      heading: "O(n³)",
      body: "**Cubic Time:** Often the result of three nested loops. Standard matrix multiplication (without optimization like Strassen's) operates in $O(n^3)$ time."
    },
    {
      heading: "O(2ⁿ)",
      body: "**Exponential Time:** The runtime doubles with each addition to the input size. Algorithms with exponential time become extremely slow even for small input values. Example: naive recursive solution for generating the Fibonacci sequence or the Traveling Salesperson Problem."
    },
    {
      heading: "O(n!)",
      body: "**Factorial Time:** The slowest standard time complexity. Occurs when an algorithm generates all possible permutations of an input. Example: finding all permutations of a string."
    },
    {
      heading: "Complexity comparison chart",
      body: "The relative growth rates from fastest to slowest:\n$O(1) < O(\\log n) < O(\\sqrt{n}) < O(n) < O(n \\log n) < O(n^2) < O(n^3) < O(2^n) < O(n!)$\n\nAlways aim for algorithms on the left side of this chart!"
    },
    {
      heading: "Complexity Analysis",
      body: "To analyze complexity, we break down the code into its core operations, identify loops, determine how many times they run relative to $n$, and combine the bounds using addition (for sequential code) or multiplication (for nested code)."
    },
    {
      heading: "Loops",
      body: "A simple loop running from $1$ to $n$ does $n$ operations. Therefore, its time complexity is $O(n)$.\n\n```c\nfor(int i = 0; i < n; i++) {\n    // O(1) operations\n}\n// Total: O(n)\n```"
    },
    {
      heading: "Nested loops",
      body: "When loops are nested, their complexities multiply. If an outer loop runs $n$ times and an inner loop runs $n$ times for each outer iteration, the total complexity is $O(n \\times n) = O(n^2)$.\n\n```c\nfor(int i = 0; i < n; i++) {\n    for(int j = 0; j < n; j++) {\n        // O(1) operations\n    }\n}\n// Total: O(n^2)\n```"
    },
    {
      heading: "Consecutive loops",
      body: "For consecutive loops, we add the complexities and keep the dominant term. If you have an $O(n)$ loop followed by an $O(n^2)$ loop, the total time is $O(n + n^2)$, which simplifies to $O(n^2)$.\n\n```c\nfor(int i=0; i<n; i++) { ... } // O(n)\nfor(int j=0; j<n; j++) {\n    for(int k=0; k<n; k++) { ... } \n} // O(n^2)\n// Total: O(n^2)\n```"
    },
    {
      heading: "Recursive algorithms",
      body: "Recursive complexities are determined by defining a Recurrence Relation (e.g., $T(n) = 2T(n/2) + O(n)$). This relation is then solved using techniques like the Master Theorem or a Recursion Tree to find the asymptotic bound."
    },
    {
      heading: "Space Complexity",
      body: "Space complexity is the total amount of memory space required by an algorithm to run to completion, as a function of the input size $n$. It includes both the space needed for the input data and any extra space needed during execution."
    },
    {
      heading: "Auxiliary Space",
      body: "Auxiliary space refers strictly to the temporary or extra space used by an algorithm during execution, *excluding* the space used by the input itself. For instance, an in-place sort like Heap Sort has $O(1)$ auxiliary space, but the total space complexity is $O(n)$ because it holds an array of size $n$."
    },
    {
      heading: "Time-Space Tradeoff",
      body: "Often, the fastest algorithm uses a large amount of memory, while an algorithm that uses minimal memory is slow. Dynamic programming perfectly illustrates this: by storing the results of subproblems in a table (using extra space), we can drastically reduce the execution time from exponential to polynomial."
    }
  ],
  code: "// Example demonstrating Time-Space Tradeoff (Fibonacci)\n#include <stdio.h>\n\n// Time: O(2^n), Space: O(n) due to call stack\nint fib_recursive(int n) {\n    if (n <= 1) return n;\n    return fib_recursive(n - 1) + fib_recursive(n - 2);\n}\n\n// Time: O(n), Space: O(n) array\nint fib_dp(int n) {\n    int dp[n+2];\n    dp[0] = 0; dp[1] = 1;\n    for(int i = 2; i <= n; i++)\n        dp[i] = dp[i-1] + dp[i-2];\n    return dp[n];\n}\n"
};