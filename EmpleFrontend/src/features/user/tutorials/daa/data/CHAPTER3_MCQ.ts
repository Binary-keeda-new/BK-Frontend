export const CHAPTER3_MCQ = [
  {
    q: "Consider the following functions: f(n) = n and g(n) = n^(1+sin(n)). Which of the following is true? (GATE 2011)",
    options: [
      "f(n) = O(g(n))",
      "f(n) = Ω(g(n))",
      "f(n) = Θ(g(n))",
      "None of the above"
    ],
    ans: 3,
    explanation: "Because sin(n) oscillates between -1 and 1, the exponent of g(n) oscillates between 0 and 2. Thus g(n) oscillates between 1 and n^2, meaning neither function bounds the other in the limit."
  },
  {
    q: "What is the time complexity of the following code? `for(i=1; i<=n; i*=2)` (GATE 2007)",
    options: [
      "O(n)",
      "O(n^2)",
      "O(log n)",
      "O(n log n)"
    ],
    ans: 2,
    explanation: "The loop variable 'i' doubles in every iteration: 1, 2, 4, 8, 16... The loop terminates when 2^k = n, which means k = log_2(n) iterations."
  },
  {
    q: "Two main measures for the efficiency of an algorithm are: (GATE 2004)",
    options: [
      "Processor and Memory",
      "Complexity and Capacity",
      "Time and Space",
      "Data and Space"
    ],
    ans: 2,
    explanation: "Time complexity (how fast it runs) and Space complexity (how much memory it uses) are the two core efficiency measures."
  },
  {
    q: "Which of the following sorting algorithms has the lowest worst-case time complexity? (GATE 2013)",
    options: [
      "Merge Sort",
      "Bubble Sort",
      "Quick Sort",
      "Selection Sort"
    ],
    ans: 0,
    explanation: "Merge Sort has a worst-case time complexity of O(n log n), whereas Bubble, Quick, and Selection Sort have worst-case complexities of O(n^2)."
  },
  {
    q: "Which of the given asymptotic notations represents the upper bound of a function? (GATE 2018)",
    options: [
      "Big-O",
      "Big-Omega",
      "Big-Theta",
      "Little-Omega"
    ],
    ans: 0,
    explanation: "Big-O notation gives an asymptotic upper bound on a function. It guarantees the algorithm will not take longer than this bound."
  },
  {
    q: "If f(n) = 3n^2 + 4n + 2, which of the following is FALSE? (GATE 2001)",
    options: [
      "f(n) = O(n^2)",
      "f(n) = O(n^3)",
      "f(n) = Ω(n)",
      "f(n) = O(n)"
    ],
    ans: 3,
    explanation: "f(n) is quadratic, so it grows strictly faster than O(n). Therefore, f(n) = O(n) is false."
  },
  {
    q: "What is the worst-case time complexity of inserting a node into a Binary Search Tree (BST)? (GATE 2005)",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    ans: 2,
    explanation: "In the worst case (a skewed tree), you must traverse every node to reach the bottom, resulting in O(n) time."
  },
  {
    q: "Let f(n) and g(n) be asymptotically positive functions. Which of the following is true? (GATE 2014)",
    options: [
      "f(n) = O(g(n)) implies g(n) = O(f(n))",
      "f(n) = Θ(g(n)) implies g(n) = Θ(f(n))",
      "f(n) = O(g(n)) implies g(n) = Ω(f(n))",
      "Both (2) and (3) are true"
    ],
    ans: 3,
    explanation: "If f(n) is upper bounded by g(n), then g(n) is lower bounded by f(n). Theta implies they bound each other, making it symmetric."
  },
  {
    q: "What is the complexity of nested loops where the outer loop runs n times and the inner loop runs i times? (GATE 2012)",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(2^n)"
    ],
    ans: 2,
    explanation: "The inner loop runs 1 + 2 + 3 + ... + n times. The sum of this arithmetic progression is n(n+1)/2, which simplifies to O(n^2)."
  },
  {
    q: "Which analysis accounts for an operation that is occasionally expensive but usually very fast? (GATE 2009)",
    options: [
      "Worst-case analysis",
      "Best-case analysis",
      "Amortized analysis",
      "Average-case analysis"
    ],
    ans: 2,
    explanation: "Amortized analysis averages the time required to perform a sequence of operations over all operations, softening the blow of rare expensive operations (like array resizing)."
  }
];