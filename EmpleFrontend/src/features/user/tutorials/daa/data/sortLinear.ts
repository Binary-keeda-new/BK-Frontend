export const sortLinearContent = [
  {
    title: "1. Introduction",
    content: "Unlike comparison-based sorting algorithms (like Merge Sort, Quick Sort) that have a lower bound of $O(n \\log n)$, linear sorting algorithms can sort data in $O(n)$ time by making assumptions about the input data. The three main linear sorting algorithms are **Counting Sort**, **Radix Sort**, and **Bucket Sort**."
  },
  {
    title: "2. Counting Sort Overview",
    content: "**Counting Sort** works by counting the number of objects having distinct key values (like a hash). Then, it calculates the position of each object in the output sequence. It is highly efficient when the range of input values ($k$) is not significantly greater than the number of objects ($n$)."
  },
  {
    title: "3. Radix Sort Overview",
    content: "**Radix Sort** avoids the limitation of Counting Sort (where large numbers cause massive memory overhead) by sorting the numbers digit by digit, starting from the least significant digit (LSD) to the most significant digit (MSD). It typically uses Counting Sort as a subroutine for sorting the individual digits."
  },
  {
    title: "4. Bucket Sort Overview",
    content: "**Bucket Sort** is mainly useful when the input is uniformly distributed over a range (like floating-point numbers from 0.0 to 1.0). It divides the range into a fixed number of 'buckets'. Elements are distributed into the buckets, each bucket is sorted individually (often using Insertion Sort), and then all buckets are concatenated."
  },
  {
    title: "5. Theory & Working (Counting Sort)",
    content: "1. Find the maximum element `max` in the array.\n2. Create a count array of size `max + 1` initialized to 0.\n3. Count the occurrences of each element in the input array and store it at the corresponding index in the count array.\n4. Modify the count array by adding the previous counts (prefix sum), which gives the actual position of elements in the output array.\n5. Iterate the input array (preferably backwards for stability), place the element in the output array, and decrement the count."
  },
  {
    title: "6. Step-by-Step Dry Run (Counting Sort)",
    content: `Input: \`[4, 2, 2, 8, 3, 3, 1]\`\n- Max = 8. Count array size = 9.\n- Frequencies: \`[0, 1, 2, 2, 1, 0, 0, 0, 1]\`\n- Prefix sums: \`[0, 1, 3, 5, 6, 6, 6, 6, 7]\`\n- Build Output (Iterating backwards):\n  - 1 -> Output[Prefix[1]-1] = Output[0]. Prefix[1] becomes 0.\n  - 3 -> Output[Prefix[3]-1] = Output[4]. Prefix[3] becomes 4.\n  - 3 -> Output[Prefix[3]-1] = Output[3]. Prefix[3] becomes 3.\n  - 8 -> Output[Prefix[8]-1] = Output[6]. Prefix[8] becomes 6.\n  - 2 -> Output[Prefix[2]-1] = Output[2]. Prefix[2] becomes 2.\n  - 2 -> Output[Prefix[2]-1] = Output[1]. Prefix[2] becomes 1.\n  - 4 -> Output[Prefix[4]-1] = Output[5]. Prefix[4] becomes 5.\n- Output: \`[1, 2, 2, 3, 3, 4, 8]\``
  },
  {
    title: "7. C Implementation (Counting Sort)",
    content: `\n\`\`\`c\n#include <stdio.h>\n\nvoid countingSort(int arr[], int n) {\n    int output[100]; // Assuming max n is 100\n    int max = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] > max) max = arr[i];\n    }\n\n    int count[max + 1];\n    for (int i = 0; i <= max; ++i) count[i] = 0;\n\n    for (int i = 0; i < n; i++) count[arr[i]]++;\n    for (int i = 1; i <= max; i++) count[i] += count[i - 1];\n\n    for (int i = n - 1; i >= 0; i--) {\n        output[count[arr[i]] - 1] = arr[i];\n        count[arr[i]]--;\n    }\n\n    for (int i = 0; i < n; i++) arr[i] = output[i];\n}\n\`\`\`\n`
  },
  {
    title: "8. Java Implementation (Counting Sort)",
    content: `\n\`\`\`java\npublic class CountingSort {\n    public static void countSort(int[] arr) {\n        int max = Arrays.stream(arr).max().getAsInt();\n        int[] count = new int[max + 1];\n        int[] output = new int[arr.length];\n\n        for (int i = 0; i < arr.length; i++)\n            count[arr[i]]++;\n\n        for (int i = 1; i <= max; i++)\n            count[i] += count[i - 1];\n\n        for (int i = arr.length - 1; i >= 0; i--) {\n            output[count[arr[i]] - 1] = arr[i];\n            count[arr[i]]--;\n        }\n\n        System.arraycopy(output, 0, arr, 0, arr.length);\n    }\n}\n\`\`\`\n`
  },
  {
    title: "9. Time & Space Complexity",
    content: `- **Counting Sort:** Time is $O(n + k)$, Space is $O(n + k)$ where $k$ is the max value.\n- **Radix Sort:** Time is $O(d \\times (n + b))$, Space is $O(n + b)$ where $d$ is max digits, $b$ is base (usually 10).\n- **Bucket Sort:** Time is $O(n + k)$ average, $O(n^2)$ worst case (if all elements go to the same bucket). Space is $O(n + k)$.`
  },
  {
    title: "10. In-place & Stability",
    content: `- **Counting Sort:** Not in-place. It is Stable (which is crucial for Radix Sort).\n- **Radix Sort:** Not in-place. Stable (depends on the subroutine).\n- **Bucket Sort:** Not in-place. Stability depends on the sorting algorithm used to sort individual buckets.`
  },
  {
    title: "11. Edge Cases & Constraints",
    content: `- **Counting Sort:** Cannot sort negative numbers directly (requires offsetting the array). Horribly inefficient for sparse inputs (e.g., sorting just \`[1, 10000]\` requires a 10000-element count array).\n- **Radix Sort:** Works best for numbers and strings of fixed/similar lengths. Can handle large ranges better than Counting Sort.`
  },
  {
    title: "12. Applications",
    content: `- **Counting Sort:** Sorting arrays of small integers (e.g., exam scores from 0-100).\n- **Radix Sort:** String sorting, sorting phone numbers, or ISBN numbers.\n- **Bucket Sort:** Sorting floating point numbers distributed uniformly in a given range (e.g., probability values from 0.0 to 1.0).`
  },
  {
    title: "13. Interview Questions",
    content: `1. Why can't we use Counting Sort for all arrays?\n2. How does Radix Sort overcome the memory limitations of Counting Sort?\n3. Is Counting Sort a stable sort? Why is that important?\n4. What happens to Bucket Sort if the input elements are not uniformly distributed?`
  }
];

export const sortLinearMcqs = [
  {
    q: "Which sorting algorithm sorts elements digit by digit?",
    options: ["Counting Sort", "Bucket Sort", "Radix Sort", "Heap Sort"],
    ans: 2,
    explanation: "Radix Sort groups elements by individual digits, sorting them from the least significant digit to the most significant digit."
  },
  {
    q: "What is the time complexity of Counting Sort where n is the number of elements and k is the range of input?",
    options: ["O(n log n)", "O(n + k)", "O(n^2)", "O(k log n)"],
    ans: 1,
    explanation: "Counting Sort takes O(n) to count elements and O(k) to iterate through the count array, giving O(n + k)."
  },
  {
    q: "Why is Counting Sort not suitable for sorting floating point numbers?",
    options: ["It requires indices based on the values, and arrays cannot have float indices.", "It takes O(n^2) time for floats.", "It is unstable for floats.", "It requires a tree structure."],
    ans: 0,
    explanation: "Counting Sort uses the array values as array indices to count frequencies. Array indices must be integers, making it unsuitable for floating point numbers directly."
  },
  {
    q: "Which sorting algorithm is typically used inside Bucket Sort to sort individual buckets?",
    options: ["Merge Sort", "Insertion Sort", "Radix Sort", "Selection Sort"],
    ans: 1,
    explanation: "Insertion Sort is typically used because buckets are usually small, and Insertion Sort is very fast for small or nearly sorted datasets."
  },
  {
    q: "If you have 1 million elements but they are all integers between 1 and 10, which sort is the fastest?",
    options: ["Merge Sort", "Quick Sort", "Counting Sort", "Heap Sort"],
    ans: 2,
    explanation: "Since the range (k=10) is extremely small compared to n (1,000,000), Counting Sort will run in practically O(n) time, making it significantly faster than O(n log n) algorithms."
  }
];

export const sortLinearDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const sortLinearDrag = {
  instructions: "Drag and drop to match the algorithm with its core mechanism.",
  lines: [
    { id: "1", text: "Counting Sort" },
    { id: "2", text: "Radix Sort" },
    { id: "3", text: "Bucket Sort" },
    { id: "4", text: "Uses array values as indices to count frequencies." },
    { id: "5", text: "Sorts digit by digit using a stable subroutine." },
    { id: "6", text: "Distributes elements into ranges, then sorts each range." }
  ],
  order: ["1", "4", "2", "5", "3", "6"]
};

export const sortLinearComplete = {
  instruction: "Fill in the prefix sum calculation in Counting Sort.",
  template: `for (int i = 0; i < n; i++) {
    count[arr[i]]++;
}
// Prefix sum
for (int i = 1; i <= max; i++) {
    count[___1___] = count[___2___] + count[___3___];
}`,
  answer: `for (int i = 0; i < n; i++) {
    count[arr[i]]++;
}
// Prefix sum
for (int i = 1; i <= max; i++) {
    count[i] = count[i] + count[i - 1];
}`,
  blanks: ["i", "i", "i - 1"]
};
