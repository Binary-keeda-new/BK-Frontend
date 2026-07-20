export const CHAPTER1_MCQ = [
  {
    q: "Which of the following characteristics is NOT essential for an algorithm? (GATE 2011)",
    options: [
      "Finiteness",
      "Definiteness",
      "Language Independence",
      "Written in C++"
    ],
    ans: 3,
    explanation: "An algorithm is a logical sequence of steps. It must be language independent, finite, and definite. It does not need to be written in a specific language like C++."
  },
  {
    q: "The time complexity of an algorithm is most commonly expressed in terms of: (GATE 2008)",
    options: [
      "The language used for implementation",
      "The input size 'n'",
      "The operating system",
      "The number of variables"
    ],
    ans: 1,
    explanation: "Time complexity measures the growth of execution time relative to the input size (n)."
  },
  {
    q: "An algorithm that always gives the correct answer but occasionally takes exponential time is preferred over an algorithm that runs in polynomial time but gives incorrect answers. (GATE 2015)",
    options: [
      "True",
      "False",
      "Depends on the input",
      "Only for small inputs"
    ],
    ans: 0,
    explanation: "Correctness is the absolute most critical characteristic of an algorithm. A fast but incorrect algorithm is useless."
  },
  {
    q: "Which of the following algorithm design techniques is typically used to solve optimization problems by making the locally best choice? (GATE 2012)",
    options: [
      "Divide and Conquer",
      "Dynamic Programming",
      "Greedy Method",
      "Backtracking"
    ],
    ans: 2,
    explanation: "The Greedy Method makes locally optimal choices at each step with the hope of finding a global optimum."
  },
  {
    q: "What is the primary difference between an Algorithm and a Program? (GATE 2005)",
    options: [
      "A program is finite, an algorithm can be infinite",
      "An algorithm is language independent, a program is language dependent",
      "An algorithm requires a compiler",
      "They are exactly the same"
    ],
    ans: 1,
    explanation: "Algorithms are abstract logic (language independent), whereas a program is the concrete implementation in a specific language."
  },
  {
    q: "Which component of an algorithm ensures that it terminates after a specific number of steps? (GATE 2018)",
    options: [
      "Definiteness",
      "Input",
      "Finiteness",
      "Effectiveness"
    ],
    ans: 2,
    explanation: "Finiteness dictates that the algorithm must stop after executing a finite number of instructions."
  },
  {
    q: "When analyzing algorithm performance, which case gives the upper bound on time? (GATE 2010)",
    options: [
      "Best case",
      "Average case",
      "Worst case",
      "Amortized case"
    ],
    ans: 2,
    explanation: "The worst case guarantees that the algorithm will never take longer than this specified time bound."
  },
  {
    q: "If an algorithm requires extra memory that scales linearly with the input size, its Auxiliary Space complexity is: (GATE 2021)",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    ans: 2,
    explanation: "If the extra memory required grows in direct proportion to 'n', it is O(n) auxiliary space."
  },
  {
    q: "Which of the following is NOT a standard way to represent an algorithm? (GATE 2017)",
    options: [
      "Flowchart",
      "Pseudocode",
      "Natural Language",
      "Assembly Machine Code"
    ],
    ans: 3,
    explanation: "Assembly code is a low-level programming language format for execution by hardware, not a high-level representation of an algorithm."
  },
  {
    q: "In a flowchart, what shape is typically used to represent a decision-making branch (like an if-statement)? (GATE 2009)",
    options: [
      "Rectangle",
      "Diamond",
      "Parallelogram",
      "Oval"
    ],
    ans: 1,
    explanation: "Diamonds are standard in flowcharts for representing conditional logic where the flow splits based on a True/False decision."
  }
];