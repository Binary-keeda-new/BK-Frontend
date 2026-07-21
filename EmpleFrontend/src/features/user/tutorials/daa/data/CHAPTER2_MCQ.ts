export const CHAPTER2_MCQ = [
  {
    q: "If an algorithm's running time is described by the recurrence T(n) = 2T(n/2) + O(n), solving this recurrence typically requires dealing with which mathematical concept? (GATE 2004)",
    options: [
      "Trigonometry",
      "Logarithms Base 2",
      "Prime numbers",
      "Modular arithmetic"
    ],
    ans: 1,
    explanation: "Divide and conquer algorithms like this use Base-2 logarithms because the problem space is continuously halved (n/2, n/4, n/8, ...). Log_2(n) determines the depth of the recursion tree."
  },
  {
    q: "Which of the following identities is true for logarithmic functions, assuming a, b, and c are positive constants? (GATE 2006)",
    options: [
      "log(a * b) = log(a) * log(b)",
      "log(a / b) = log(a) - log(b)",
      "log(a^b) = (log a)^b",
      "log(a + b) = log(a) + log(b)"
    ],
    ans: 1,
    explanation: "By logarithm properties, the log of a quotient is the difference of their logs: log(a/b) = log(a) - log(b). This is heavily used in complexity transformations."
  },
  {
    q: "What is the ceiling of 3.14? i.e., ⌈3.14⌉ (GATE 2011)",
    options: [
      "3",
      "4",
      "3.1",
      "3.5"
    ],
    ans: 1,
    explanation: "The ceiling function maps a real number to the smallest succeeding integer. The smallest integer greater than or equal to 3.14 is 4."
  },
  {
    q: "Consider the function f(n) = 2^(log_2 n). What does this evaluate to? (GATE 2014)",
    options: [
      "n",
      "2^n",
      "log_2 n",
      "n^2"
    ],
    ans: 0,
    explanation: "By the fundamental property of logarithms, b^(log_b x) = x. Therefore, 2^(log_2 n) simplifies exactly to n."
  },
  {
    q: "In an array of length 9, calculating the middle index for binary search as mid = floor((0 + 8) / 2) results in which index? (GATE 2013)",
    options: [
      "3",
      "4",
      "4.5",
      "5"
    ],
    ans: 1,
    explanation: "floor(8 / 2) = floor(4.0) = 4."
  },
  {
    q: "The expression log_a(n) can be converted to base b using which of the following formulas? (GATE 2002)",
    options: [
      "log_b(n) * log_a(b)",
      "log_b(n) / log_b(a)",
      "log_a(b) / log_n(b)",
      "It cannot be converted"
    ],
    ans: 1,
    explanation: "The base change formula is log_a(n) = log_b(n) / log_b(a). In Big-O notation, since log_b(a) is a constant, log_a(n) and log_b(n) are asymptotically equivalent."
  },
  {
    q: "Which grows faster asymptotically as n approaches infinity? n^2 or 2^n? (GATE 2008)",
    options: [
      "n^2 grows faster",
      "2^n grows faster",
      "They grow at the same rate",
      "Depends on the constant factors"
    ],
    ans: 1,
    explanation: "Exponential functions (like 2^n) always eventually outgrow polynomial functions (like n^2)."
  },
  {
    q: "Which mathematical formula correctly calculates the sum of a geometric series 1 + r + r^2 + ... + r^k (where r ≠ 1)? (GATE 2017)",
    options: [
      "(r^(k+1) - 1) / (r - 1)",
      "k * (k+1) / 2",
      "r^k",
      "(r^k - 1) / (r + 1)"
    ],
    ans: 0,
    explanation: "The formula for the sum of a geometric progression is (r^(k+1) - 1) / (r - 1). This is crucial for evaluating recursion trees in Master's Theorem."
  },
  {
    q: "If an array length n is repeatedly divided by 3 until length 1 is reached, how many divisions occur? (GATE 2010)",
    options: [
      "n/3",
      "log_2(n)",
      "log_3(n)",
      "3^n"
    ],
    ans: 2,
    explanation: "Dividing a number by 'b' until it reaches 1 takes log_b(n) steps. Here, it is log_3(n)."
  },
  {
    q: "What is the floor of -2.5? i.e., ⌊-2.5⌋ (GATE 2015)",
    options: [
      "-2",
      "-3",
      "-2.5",
      "2"
    ],
    ans: 1,
    explanation: "The floor function maps x to the largest integer less than or equal to x. For negative numbers, -3 is less than -2.5, whereas -2 is greater."
  }
];