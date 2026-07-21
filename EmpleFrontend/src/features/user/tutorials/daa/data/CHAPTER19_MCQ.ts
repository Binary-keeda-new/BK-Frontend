export const CHAPTER19_MCQ = [
  {
    q: "What does a 'time-space tradeoff' refer to in algorithmic design?",
    options: ["Using less space by increasing time complexity.", "Using more space to decrease time complexity.", "Both A and B.", "Neither A nor B."],
    ans: 2,
    explanation: "A time-space tradeoff is a situation where memory consumption can be reduced at the cost of slower execution, or execution speed can be increased at the cost of higher memory consumption."
  },
  {
    q: "Which of the following is a classic example of trading SPACE for TIME?",
    options: ["Using Bubble Sort instead of Merge Sort.", "Using a Hash Table to look up values instead of searching an array.", "Recalculating Fibonacci numbers recursively.", "Compressing a file before sending it over a network."],
    ans: 1,
    explanation: "A Hash Table uses extra memory to store the keys/values (and empty buckets), but it reduces the lookup time from O(n) (searching an array) to O(1)."
  },
  {
    q: "In Dynamic Programming, what specific technique represents a time-space tradeoff? (GATE 2008)",
    options: ["Divide and Conquer", "Memoization", "Greedy Choice", "Backtracking"],
    ans: 1,
    explanation: "Memoization trades space (creating a table to store results) for time (avoiding exponential re-calculation of subproblems)."
  },
  {
    q: "Which sorting algorithm is heavily preferred when SPACE is the absolute most constrained resource? (GATE 2011)",
    options: ["Merge Sort", "Heap Sort", "Radix Sort", "Counting Sort"],
    ans: 1,
    explanation: "Heap sort is an in-place algorithm requiring O(1) auxiliary space, while maintaining a reliable O(n log n) time bound. Merge sort requires O(n) space, and Counting sort requires O(k) space."
  },
  {
    q: "How does caching (like a web browser cache or CPU cache) demonstrate a time-space tradeoff?",
    options: ["It uses extra CPU cycles to save hard drive space.", "It uses extra memory to store frequently accessed data, saving the time required to fetch it repeatedly.", "It reduces both memory usage and fetch time simultaneously.", "It prevents memory leaks by deleting old files."],
    ans: 1,
    explanation: "Caching intentionally consumes extra memory (space) to hold a copy of data, so that future requests for that data can be served much faster (time)."
  },
  {
    q: "Consider a problem where you must count the frequencies of words in a massive text. Using a Trie instead of a simple Array of Strings is an example of:",
    options: ["Trading Space for Time", "Trading Time for Space", "Optimizing both Time and Space", "Neither"],
    ans: 0,
    explanation: "A Trie requires significant memory (pointers for every node) compared to a dense array, but it allows for extremely fast O(length) insertions and lookups."
  },
  {
    q: "Which of the following data structures is optimized to trade TIME for SPACE (i.e., use less memory but take longer to process)?",
    options: ["Hash Table", "Unrolled Linked List", "Sparse Matrix using a Linked List", "Memoization Table"],
    ans: 2,
    explanation: "A sparse matrix implemented as a linked list (or coordinate list) uses much less memory than a 2D array (saving space), but accessing a specific (i, j) element takes O(n) time instead of O(1) (costing time)."
  },
  {
    q: "In the 0/1 Knapsack DP solution, how can the space complexity be optimized from O(n*W) to O(W)? (GATE 2016)",
    options: ["By using recursion instead of iteration.", "By keeping only the previous row (i-1) and current row (i) of the DP table in memory.", "By using a Hash Map instead of a 2D array.", "It cannot be optimized to O(W)."],
    ans: 1,
    explanation: "Since calculating the current row `dp[i]` only ever requires values from the immediately preceding row `dp[i-1]`, we can discard older rows and only maintain a 1D array of size W."
  },
  {
    q: "Data compression algorithms (like ZIP) typically demonstrate which type of tradeoff?",
    options: ["Trading Time for Space", "Trading Space for Time", "They do not involve tradeoffs.", "They increase both time and space."],
    ans: 0,
    explanation: "You spend CPU time to compress and decompress the file, in exchange for the file taking up less disk space (or network bandwidth)."
  },
  {
    q: "When is it generally NOT a good idea to trade space for time (e.g., using large Hash Maps)?",
    options: ["When processing large datasets on modern servers.", "When writing embedded systems software with strict memory limits.", "When the algorithm runs frequently.", "When CPU cycles are expensive."],
    ans: 1,
    explanation: "In environments like IoT devices or embedded systems, RAM is severely limited. An Out-Of-Memory (OOM) error will crash the system, making space optimization more critical than speed."
  }
];