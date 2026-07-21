export const CHAPTER5_MCQ = [
  {
    q: "In the worst-case scenario, what is the time complexity of searching an unsorted array of length n using Linear Search? (GATE 2010)",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    ans: 2,
    explanation: "Linear search must check every element one by one. In the worst case (the element is at the end or not present), it takes O(n) time."
  },
  {
    q: "Which of the following is an essential pre-condition for Binary Search to work correctly on an array? (GATE 2004)",
    options: ["The array must be reversed.", "The array must be sorted.", "The array must contain only positive integers.", "The array length must be a power of 2."],
    ans: 1,
    explanation: "Binary search relies on the array being sorted so it can confidently discard half of the remaining elements at each step."
  },
  {
    q: "What is the worst-case time complexity of Binary Search? (GATE 2006)",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    ans: 2,
    explanation: "Binary search halves the search space at every step. The number of times you can halve N until reaching 1 is log_2(N), giving O(log n) complexity."
  },
  {
    q: "If an array has 1024 elements, what is the maximum number of comparisons Binary Search will make? (GATE 2015)",
    options: ["10", "11", "512", "1024"],
    ans: 1,
    explanation: "log_2(1024) is 10. Depending on the implementation, it may take up to 11 comparisons (floor(log_2(N)) + 1) in the worst case."
  },
  {
    q: "Which search algorithm is generally faster for very small arrays (e.g., length 5)?",
    options: ["Binary Search", "Linear Search", "Jump Search", "Fibonacci Search"],
    ans: 1,
    explanation: "For very small arrays, the overhead of calculating midpoints in Binary Search makes Linear Search faster due to simplicity and memory caching."
  },
  {
    q: "What is the best-case time complexity of both Linear Search and Binary Search? (GATE 2002)",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    ans: 2,
    explanation: "In the best case, the target element is found on the very first comparison (index 0 for Linear, midpoint for Binary), which takes O(1) time."
  },
  {
    q: "If you have a sorted linked list, which search algorithm is most efficient? (GATE 2012)",
    options: ["Binary Search", "Linear Search", "Interpolation Search", "Exponential Search"],
    ans: 1,
    explanation: "Binary Search requires random access (finding the midpoint in O(1) time). Linked lists do not support random access, so you must use Linear Search (O(n))."
  },
  {
    q: "In Binary Search, how is the midpoint usually calculated to prevent integer overflow for large arrays? (GATE 2017)",
    options: ["(low + high) / 2", "low + (high - low) / 2", "high - (low + high) / 2", "(low * high) / 2"],
    ans: 1,
    explanation: "If low and high are very large integers, (low + high) can exceed the maximum integer limit. low + (high - low) / 2 mathematically equals the midpoint but prevents overflow."
  },
  {
    q: "Which algorithm uses the divide and conquer paradigm?",
    options: ["Linear Search", "Bubble Sort", "Binary Search", "Insertion Sort"],
    ans: 2,
    explanation: "Binary search divides the problem into smaller subproblems (halves) and conquers them by recursively searching the appropriate half."
  },
  {
    q: "When is Linear Search preferable over Binary Search?",
    options: ["When the array is very large.", "When the array is unsorted.", "When space complexity must be O(1).", "Never."],
    ans: 1,
    explanation: "If the array is unsorted, you cannot use Binary Search. Sorting it first would take O(n log n), which is slower than just running a Linear Search O(n)."
  }
];