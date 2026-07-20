export const CHAPTER4_MCQ = [
  {
    q: "According to the Master Theorem, the running time of an algorithm T(n) = aT(n/b) + f(n) depends on comparing f(n) with n^(log_b(a)). If f(n) = O(n^c) where c < log_b(a), what is the time complexity? (GATE 2011)",
    options: [
      "Θ(n^c)",
      "Θ(n^(log_b a))",
      "Θ(n^c log n)",
      "Θ(n^(log_b a) log n)"
    ],
    ans: 1,
    explanation: "This is Case 1 of the Master Theorem. The work done at the leaves dominates the tree, so the complexity is Θ(n^(log_b a))."
  },
  {
    q: "Consider the recurrence relation T(n) = 8T(n/2) + O(n). What is the time complexity? (GATE 2008)",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(n^3)"
    ],
    ans: 3,
    explanation: "Using Master Theorem: a=8, b=2, f(n)=O(n^1). n^(log_2 8) = n^3. Since 1 < 3, it falls in Case 1, so the complexity is O(n^3)."
  },
  {
    q: "The recurrence relation T(n) = 2T(n/2) + O(n) describes the time complexity of which algorithm? (GATE 2007)",
    options: [
      "Binary Search",
      "Merge Sort",
      "Quick Sort (Worst Case)",
      "Insertion Sort"
    ],
    ans: 1,
    explanation: "Merge Sort recursively divides the array into 2 halves and merges them in O(n) time."
  },
  {
    q: "What is the time complexity of the recurrence T(n) = T(n/3) + O(1)? (GATE 2015)",
    options: [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n log n)"
    ],
    ans: 1,
    explanation: "This is similar to Binary Search but dividing by 3. Using Master Theorem: a=1, b=3, f(n)=O(n^0). n^(log_3 1) = n^0 = 1. Since f(n) = n^0, Case 2 applies, resulting in O(log n)."
  },
  {
    q: "When is the Master Theorem NOT applicable? (GATE 2018)",
    options: [
      "When a < 1",
      "When f(n) is not polynomial",
      "When T(n) is not monotonically increasing",
      "All of the above"
    ],
    ans: 3,
    explanation: "Master theorem requires a >= 1, b > 1, f(n) to be asymptotically positive and polynomially separated from the leaves. It fails if any condition is breached."
  },
  {
    q: "Solve the recurrence T(n) = T(n-1) + n using the Iteration Method. What is the time complexity? (GATE 2013)",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(2^n)"
    ],
    ans: 2,
    explanation: "T(n) = n + (n-1) + (n-2) + ... + 1, which is the sum of the first n natural numbers = n(n+1)/2 = O(n^2)."
  },
  {
    q: "Consider the recurrence relation T(n) = T(n-1) + 1. The time complexity is: (GATE 2010)",
    options: [
      "O(n)",
      "O(log n)",
      "O(n^2)",
      "O(1)"
    ],
    ans: 0,
    explanation: "Unrolling the recurrence yields T(n) = 1 + 1 + 1 ... n times. Thus, the time complexity is O(n)."
  },
  {
    q: "In the Recursion Tree method, if the sum of costs across the levels forms a decreasing geometric series, the total time complexity is bounded by: (GATE 2021)",
    options: [
      "The cost of the leaves",
      "The cost of the root",
      "The height of the tree",
      "The number of nodes"
    ],
    ans: 1,
    explanation: "If the series is decreasing geometrically, the root level does the most work, dominating the total cost."
  },
  {
    q: "Which recurrence relation correctly models Binary Search? (GATE 2003)",
    options: [
      "T(n) = 2T(n/2) + O(1)",
      "T(n) = T(n/2) + O(1)",
      "T(n) = T(n-1) + O(1)",
      "T(n) = 2T(n-1) + O(n)"
    ],
    ans: 1,
    explanation: "Binary search makes one recursive call on half the array (a=1, b=2) and does O(1) comparison work at each step."
  },
  {
    q: "Consider T(n) = 4T(n/2) + n^2. According to Master Theorem, what is the complexity? (GATE 2012)",
    options: [
      "O(n^2)",
      "O(n^2 log n)",
      "O(n^3)",
      "O(n log n)"
    ],
    ans: 1,
    explanation: "a=4, b=2. n^(log_2 4) = n^2. Since f(n) = n^2, they are equal. This is Case 2 of the Master Theorem, resulting in O(n^2 log n)."
  }
];