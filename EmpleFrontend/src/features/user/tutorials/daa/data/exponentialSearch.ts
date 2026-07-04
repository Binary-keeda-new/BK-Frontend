export const exponentialSearchContent = {
  title: "Exponential Search",
  points: [
    {
      title: "1. Introduction",
      content: "Exponential Search (also known as doubling or galloping search) is an algorithm created for searching sorted, unbounded/infinite lists. It involves two main steps: first, finding a range where the search key may reside, and second, performing a standard binary search within that identified range."
    },
    {
      title: "2. Problem Statement",
      content: "Given a sorted array of $n$ elements, find the index of a target element $x$. The array can potentially be unbounded. Return the index of $x$ if it is found, else return `-1`."
    },
    {
      title: "3. Theory & Working",
      content: "The algorithm starts by verifying if the target is at the `0`th index. If not, it initializes an index `i = 1`. It then continually doubles `i` ($1, 2, 4, 8, \\dots$) as long as `arr[i]` is less than or equal to the target and `i` is within the array boundaries. Once a value greater than the target is encountered (or bounds are exceeded), we know the target must lie in the range from the previous power of 2 to the current index, i.e., `[i / 2, min(i, n - 1)]`. Finally, a binary search is executed on this specific block."
    },
    {
      title: "4. Step-by-Step Dry Run",
      content: "Let the array be `arr = [2, 3, 4, 10, 40, 50, 60, 70]` and `target = 50`.\n\n1. Check `arr[0]`: `2 != 50`.\n2. Initialize `i = 1`.\n3. `arr[1] = 3 <= 50`, so double `i` to `2`.\n4. `arr[2] = 4 <= 50`, so double `i` to `4`.\n5. `arr[4] = 40 <= 50`, so double `i` to `8`.\n6. `i = 8` exceeds the bounds of the array (size 8, max index 7). The loop terminates.\n7. The range for binary search is `left = i / 2 = 4`, and `right = min(8, 7) = 7`.\n8. Perform Binary Search on indices `4` to `7`:\n   - `mid = (4 + 7) / 2 = 5`.\n   - `arr[5] = 50 == target`. We found our element!"
    },
    {
      title: "5. Pseudocode",
      content: "```text\nfunction exponentialSearch(arr, n, x):\n    if arr[0] == x:\n        return 0\n    \n    i = 1\n    while i < n and arr[i] <= x:\n        i = i * 2\n        \n    return binarySearch(arr, i / 2, min(i, n - 1), x)\n```"
    },
    {
      title: "6. C Implementation",
      content: "```c\n#include <stdio.h>\n\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n\nint binarySearch(int arr[], int l, int r, int x) {\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (arr[mid] == x) return mid;\n        if (arr[mid] < x) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}\n\nint exponentialSearch(int arr[], int n, int x) {\n    if (arr[0] == x) return 0;\n    \n    int i = 1;\n    while (i < n && arr[i] <= x) {\n        i = i * 2;\n    }\n    \n    return binarySearch(arr, i / 2, MIN(i, n - 1), x);\n}\n```"
    },
    {
      title: "7. Java Implementation",
      content: "```java\nclass ExponentialSearch {\n    static int binarySearch(int arr[], int l, int r, int x) {\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (arr[mid] == x) return mid;\n            if (arr[mid] < x) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n\n    static int exponentialSearch(int arr[], int n, int x) {\n        if (arr[0] == x) return 0;\n        \n        int i = 1;\n        while (i < n && arr[i] <= x) {\n            i = i * 2;\n        }\n        \n        return binarySearch(arr, i / 2, Math.min(i, n - 1), x);\n    }\n}\n```"
    },
    {
      title: "8. Time & Space Complexity",
      content: "**Time Complexity:** $O(\\log i)$, where $i$ is the index of the element being searched. Finding the range via repeated doubling takes $O(\\log i)$ iterations. The subsequent binary search on an array segment of size $i/2$ takes another $O(\\log i)$ time.\n\n**Space Complexity:** $O(1)$ when using an iterative binary search method, making it highly memory efficient. If implemented recursively, space complexity rises to $O(\\log i)$ due to the call stack."
    },
    {
      title: "9. Best, Worst & Average Case",
      content: "- **Best Case:** $O(1)$, which occurs when the target element is situated at the very first index (`0`).\n- **Worst Case:** $O(\\log i)$ (or $O(\\log n)$ for a bounded array), when the target is positioned at the very end of the array, or isn't present at all.\n- **Average Case:** $O(\\log i)$, as identifying the interval logarithmically converges on bounds, followed by a logarithmically bounded binary search."
    },
    {
      title: "10. Iterative vs Recursive",
      content: "The initial step (finding the bound) is most commonly implemented iteratively. For the binary search phase, either an iterative or recursive approach can be employed. However, an iterative binary search is highly recommended as it preserves the $O(1)$ space complexity."
    },
    {
      title: "11. Edge Cases & Constraints",
      content: "- **Empty array:** The algorithm expects an initial size validation, otherwise it may result in index out of bounds during the initial `arr[0]` check.\n- **Target smaller than first element:** The first condition `arr[0] == x` fails, and the loop quickly passes. Binary search handles the missing element correctly by returning `-1`.\n- **Target vastly larger than all elements:** `i` simply surpasses `n`, but the usage of `min(i, n - 1)` safely limits the upper bound for binary search."
    },
    {
      title: "12. Applications",
      content: "- **Infinite / Unbounded Search:** Essential for unbounded arrays or data streams where the length is completely unknown.\n- **Skewed Searches:** Effective in situations where elements to be searched are heavily skewed towards the beginning of the collection.\n- **File System Searching:** Used internally by certain file systems and databases when scanning sequential blocks."
    },
    {
      title: "13. Pros & Cons",
      content: "**Pros:**\n- Extremely fast for elements residing near the front of a large dataset ($O(\\log i)$ instead of $O(\\log n)$).\n- Solves the problem of searching in infinite streams effectively.\n\n**Cons:**\n- Slightly higher overhead compared to pure binary search if the target is always towards the back.\n- Explicitly requires the dataset to be pre-sorted."
    },
    {
      title: "14. Comparison with alternatives",
      content: "- **Binary Search:** Fixed $O(\\log n)$ time, requiring the exact size in advance. Exponential Search adapts in $O(\\log i)$ time, making it better for early elements.\n- **Linear Search:** Simple but prohibitively slow at $O(n)$ for large datasets.\n- **Jump Search:** Moves in blocks of size $\\sqrt{n}$ giving $O(\\sqrt{n})$ time, which is strictly worse than Exponential Search's $O(\\log i)$ behavior."
    },
    {
      title: "15. Common Pitfalls",
      content: "- Forgetting to handle the `arr[0]` check. If you start with `i = 0`, multiplying by `2` leaves it at `0`, resulting in a fatal infinite loop.\n- Passing an out-of-bounds upper limit to the binary search. Always cap the right limit with `min(i, n - 1)`.\n- Accidentally skipping exactly one element in the lower bound (`i/2 + 1`). The correct inclusive start is precisely `i/2`."
    },
    {
      title: "16. Visual Intuition",
      content: "Visualize leaping forward with exponentially increasing strides. You start standing on index `1` and jump to `2, 4, 8, 16...`. The moment you land on a value greater than what you're seeking (or fall off the known list), you realize you've jumped too far. You then pull out a magnifying glass (Binary Search) and closely inspect only the region between your previous footprint and your current footprint."
    }
  ]
};

export const exponentialSearchMcqs = [
  {
    question: "What is the time complexity of Exponential Search, where 'i' is the index of the element being searched?",
    options: ["O(log n)", "O(n)", "O(log i)", "O(i)"],
    correctAnswer: 2,
    explanation: "Exponential Search takes O(log i) time to find the range and another O(log i) time for the binary search."
  },
  {
    question: "For which type of arrays is Exponential Search particularly useful?",
    options: ["Unbounded / infinite sorted arrays", "Unsorted arrays", "Small bounded arrays", "Arrays with negative numbers only"],
    correctAnswer: 0,
    explanation: "Since it finds the upper bound by doubling the index, it does not strictly need the array size beforehand, making it ideal for unbounded arrays."
  },
  {
    question: "In Exponential Search, how does the index 'i' grow while finding the upper bound?",
    options: ["i = i + 1", "i = i + 2", "i = i * 2", "i = i * i"],
    correctAnswer: 2,
    explanation: "The index 'i' is multiplied by 2 in each step, growing exponentially (1, 2, 4, 8, ...)."
  },
  {
    question: "When the exponential loop terminates with index 'i', what is the upper bound passed to the binary search?",
    options: ["i", "i / 2", "min(i, n - 1)", "n - 1"],
    correctAnswer: 2,
    explanation: "The upper bound must not exceed the last valid index of the array, so min(i, n - 1) is used."
  },
  {
    question: "What is the lower bound passed to the binary search after the exponential loop terminates?",
    options: ["0", "i / 2", "i - 1", "1"],
    correctAnswer: 1,
    explanation: "Since the element wasn't found at i/2 (or it wouldn't have doubled to i), the target must be at or after i/2."
  },
  {
    question: "What happens if the target element is located at the 0th index in Exponential Search?",
    options: ["It takes O(log n) time", "It takes O(n) time", "It takes O(1) time", "It results in an infinite loop"],
    correctAnswer: 2,
    explanation: "The algorithm starts by checking if the element is at index 0. If yes, it returns immediately in O(1) time."
  },
  {
    question: "Why is the 0th index explicitly checked before starting the doubling loop?",
    options: ["To save memory", "Because multiplying 0 by 2 is 0, which would cause an infinite loop", "To improve worst-case complexity", "It is not checked explicitly"],
    correctAnswer: 1,
    explanation: "If we started with i = 0, i * 2 would remain 0, leading to an infinite loop. So we check index 0 first and start the loop at i = 1."
  },
  {
    question: "Which algorithm is internally used in the second phase of Exponential Search?",
    options: ["Linear Search", "Jump Search", "Binary Search", "Interpolation Search"],
    correctAnswer: 2,
    explanation: "Once the range [i/2, min(i, n-1)] is identified, Binary Search is used to find the exact position."
  },
  {
    question: "What space complexity does an iterative implementation of Exponential Search have?",
    options: ["O(n)", "O(log n)", "O(1)", "O(i)"],
    correctAnswer: 2,
    explanation: "An iterative Exponential Search (and iterative Binary Search) requires only a few variables, taking O(1) space."
  },
  {
    question: "When would Exponential Search be strictly faster than Binary Search?",
    options: ["When the element is close to the end of a very large array", "When the array is unsorted", "When the element is close to the beginning of a very large array", "It is never faster"],
    correctAnswer: 2,
    explanation: "Because it operates in O(log i) time, it examines fewer elements if the target is near the beginning (i is small) compared to Binary Search's O(log n) time."
  }
];

export const exponentialSearchDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const exponentialSearchDrag = {
  title: "Order the Steps of Exponential Search",
  steps: [
    "Check if the target element is present at the first index (index 0).",
    "Initialize the search index 'i' to 1.",
    "While 'i' is within bounds and arr[i] <= target, double the value of 'i' (i = i * 2).",
    "Identify the search range as [i / 2, min(i, n - 1)].",
    "Perform binary search within the identified range.",
    "Return the index if found, or -1 if the element is absent."
  ]
};

export const exponentialSearchComplete = {
  title: "Complete the Exponential Search Implementation",
  code: `int exponentialSearch(int arr[], int n, int x) {
    if (arr[0] == x) return 0;
    
    int i = 1;
    while (i < n && arr[i] <= x) {
        // Double the index
        i = _________;
    }
    
    // Perform binary search in the identified range
    int rightBound = (i < n) ? i : _________;
    return binarySearch(arr, _________, rightBound, x);
}`,
  solution: `int exponentialSearch(int arr[], int n, int x) {
    if (arr[0] == x) return 0;
    
    int i = 1;
    while (i < n && arr[i] <= x) {
        // Double the index
        i = i * 2;
    }
    
    // Perform binary search in the identified range
    int rightBound = (i < n) ? i : n - 1;
    return binarySearch(arr, i / 2, rightBound, x);
}`,
  explanation: "1. \`i = i * 2\` scales the search space exponentially.\n2. The right bound ensures we don't access an out-of-bounds index, so if \`i >= n\`, the bound is \`n - 1\`.\n3. The lower bound for the search is the previous power of 2, which is \`i / 2\`."
};
