export const greedyHuffmanContent = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: "Huffman Coding is a popular and effective data compression algorithm used to compress data without losing any information (lossless compression). Developed by David A. Huffman in 1952, the algorithm is based on the frequency of occurrence of a data item. The core idea is to assign variable-length codes to input characters, with shorter codes assigned to more frequent characters and longer codes to less frequent ones."
  },
  {
    id: "problem-statement",
    title: "2. Problem Statement",
    content: "Given a set of $n$ characters and their corresponding frequencies, construct a prefix-free binary code (where no code is a prefix of another) that minimizes the total expected length of a compressed message. Formally, construct a binary tree that minimizes $\\sum_{i=1}^{n} f_i \\cdot d_i$, where $f_i$ is the frequency of character $i$ and $d_i$ is its depth in the tree."
  },
  {
    id: "theory-and-working",
    title: "3. Theory & Working",
    content: "Huffman coding employs a greedy strategy. It builds a strictly binary tree (Huffman Tree) from the bottom up. \n\n**Steps:**\n1. Create a leaf node for each character and add them to a priority queue (min-heap) based on their frequency.\n2. While there is more than one node in the queue:\n   a. Extract the two nodes with the lowest frequency from the priority queue.\n   b. Create a new internal node with a frequency equal to the sum of the two nodes' frequencies. Make the first extracted node its left child and the second extracted node its right child.\n   c. Insert this new node back into the priority queue.\n3. The remaining node is the root of the Huffman Tree.\n\nTo assign codes, traverse from the root to each leaf, appending '0' for a left branch and '1' for a right branch. This guarantees a prefix-free code because characters are only stored at the leaves."
  },
  {
    id: "step-by-step-dry-run",
    title: "4. Step-by-Step Dry Run",
    content: "Let's dry run with characters: A (5), B (9), C (12), D (13), E (16), F (45).\n\n**Initialization:** Min-heap contains {A:5, B:9, C:12, D:13, E:16, F:45}.\n\n**Step 1:** Extract A(5), B(9). Create N1(14). \nHeap: {C:12, D:13, N1:14, E:16, F:45}\n\n**Step 2:** Extract C(12), D(13). Create N2(25).\nHeap: {N1:14, E:16, N2:25, F:45}\n\n**Step 3:** Extract N1(14), E(16). Create N3(30).\nHeap: {N2:25, N3:30, F:45}\n\n**Step 4:** Extract N2(25), N3(30). Create N4(55).\nHeap: {F:45, N4:55}\n\n**Step 5:** Extract F(45), N4(55). Create Root(100).\nHeap: {Root:100}\n\n**Tree Structure:**\n- Root(100) -> Left: F(45), Right: N4(55)\n- N4(55) -> Left: N2(25), Right: N3(30)\n- N2(25) -> Left: C(12), Right: D(13)\n- N3(30) -> Left: N1(14), Right: E(16)\n- N1(14) -> Left: A(5), Right: B(9)\n\n**Codes:** F: 0, C: 100, D: 101, A: 1100, B: 1101, E: 111."
  },
  {
    id: "pseudocode",
    title: "5. Pseudocode",
    content: "```text\nfunction Huffman(C):\n    n = |C|\n    Q = C // Initialize min-priority queue with characters C\n    for i = 1 to n-1:\n        allocate a new node z\n        z.left = x = Extract-Min(Q)\n        z.right = y = Extract-Min(Q)\n        z.freq = x.freq + y.freq\n        Insert(Q, z)\n    return Extract-Min(Q) // Return the root of the tree\n```"
  },
  {
    id: "c-implementation",
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n\n#define MAX_TREE_HT 100\n\nstruct MinHeapNode {\n    char data;\n    unsigned freq;\n    struct MinHeapNode *left, *right;\n};\n\nstruct MinHeap {\n    unsigned size;\n    unsigned capacity;\n    struct MinHeapNode** array;\n};\n\n// A utility function to allocate a new min heap node\nstruct MinHeapNode* newNode(char data, unsigned freq) {\n    struct MinHeapNode* temp = (struct MinHeapNode*)malloc(sizeof(struct MinHeapNode));\n    temp->left = temp->right = NULL;\n    temp->data = data;\n    temp->freq = freq;\n    return temp;\n}\n\n// A utility function to create a min heap of given capacity\nstruct MinHeap* createMinHeap(unsigned capacity) {\n    struct MinHeap* minHeap = (struct MinHeap*)malloc(sizeof(struct MinHeap));\n    minHeap->size = 0;\n    minHeap->capacity = capacity;\n    minHeap->array = (struct MinHeapNode**)malloc(minHeap->capacity * sizeof(struct MinHeapNode*));\n    return minHeap;\n}\n\nvoid swapMinHeapNode(struct MinHeapNode** a, struct MinHeapNode** b) {\n    struct MinHeapNode* t = *a;\n    *a = *b;\n    *b = t;\n}\n\nvoid minHeapify(struct MinHeap* minHeap, int idx) {\n    int smallest = idx;\n    int left = 2 * idx + 1;\n    int right = 2 * idx + 2;\n    if (left < minHeap->size && minHeap->array[left]->freq < minHeap->array[smallest]->freq)\n        smallest = left;\n    if (right < minHeap->size && minHeap->array[right]->freq < minHeap->array[smallest]->freq)\n        smallest = right;\n    if (smallest != idx) {\n        swapMinHeapNode(&minHeap->array[smallest], &minHeap->array[idx]);\n        minHeapify(minHeap, smallest);\n    }\n}\n\nint isSizeOne(struct MinHeap* minHeap) {\n    return (minHeap->size == 1);\n}\n\nstruct MinHeapNode* extractMin(struct MinHeap* minHeap) {\n    struct MinHeapNode* temp = minHeap->array[0];\n    minHeap->array[0] = minHeap->array[minHeap->size - 1];\n    --minHeap->size;\n    minHeapify(minHeap, 0);\n    return temp;\n}\n\nvoid insertMinHeap(struct MinHeap* minHeap, struct MinHeapNode* minHeapNode) {\n    ++minHeap->size;\n    int i = minHeap->size - 1;\n    while (i && minHeapNode->freq < minHeap->array[(i - 1) / 2]->freq) {\n        minHeap->array[i] = minHeap->array[(i - 1) / 2];\n        i = (i - 1) / 2;\n    }\n    minHeap->array[i] = minHeapNode;\n}\n\nvoid buildMinHeap(struct MinHeap* minHeap) {\n    int n = minHeap->size - 1;\n    for (int i = (n - 1) / 2; i >= 0; --i)\n        minHeapify(minHeap, i);\n}\n\nvoid printArr(int arr[], int n) {\n    for (int i = 0; i < n; ++i)\n        printf(\"%d\", arr[i]);\n    printf(\"\\\\n\");\n}\n\nint isLeaf(struct MinHeapNode* root) {\n    return !(root->left) && !(root->right);\n}\n\nstruct MinHeap* createAndBuildMinHeap(char data[], int freq[], int size) {\n    struct MinHeap* minHeap = createMinHeap(size);\n    for (int i = 0; i < size; ++i)\n        minHeap->array[i] = newNode(data[i], freq[i]);\n    minHeap->size = size;\n    buildMinHeap(minHeap);\n    return minHeap;\n}\n\nstruct MinHeapNode* buildHuffmanTree(char data[], int freq[], int size) {\n    struct MinHeapNode *left, *right, *top;\n    struct MinHeap* minHeap = createAndBuildMinHeap(data, freq, size);\n    while (!isSizeOne(minHeap)) {\n        left = extractMin(minHeap);\n        right = extractMin(minHeap);\n        top = newNode('$', left->freq + right->freq);\n        top->left = left;\n        top->right = right;\n        insertMinHeap(minHeap, top);\n    }\n    return extractMin(minHeap);\n}\n\nvoid printCodes(struct MinHeapNode* root, int arr[], int top) {\n    if (root->left) {\n        arr[top] = 0;\n        printCodes(root->left, arr, top + 1);\n    }\n    if (root->right) {\n        arr[top] = 1;\n        printCodes(root->right, arr, top + 1);\n    }\n    if (isLeaf(root)) {\n        printf(\"%c: \", root->data);\n        printArr(arr, top);\n    }\n}\n\nvoid HuffmanCodes(char data[], int freq[], int size) {\n    struct MinHeapNode* root = buildHuffmanTree(data, freq, size);\n    int arr[MAX_TREE_HT], top = 0;\n    printCodes(root, arr, top);\n}\n\nint main() {\n    char arr[] = { 'a', 'b', 'c', 'd', 'e', 'f' };\n    int freq[] = { 5, 9, 12, 13, 16, 45 };\n    int size = sizeof(arr) / sizeof(arr[0]);\n    HuffmanCodes(arr, freq, size);\n    return 0;\n}\n```"
  },
  {
    id: "java-implementation",
    title: "7. Java Implementation",
    content: "```java\nimport java.util.PriorityQueue;\nimport java.util.Comparator;\n\nclass HuffmanNode {\n    int data;\n    char c;\n    HuffmanNode left;\n    HuffmanNode right;\n}\n\nclass MyComparator implements Comparator<HuffmanNode> {\n    public int compare(HuffmanNode x, HuffmanNode y) {\n        return x.data - y.data;\n    }\n}\n\npublic class Huffman {\n    public static void printCode(HuffmanNode root, String s) {\n        if (root.left == null && root.right == null && Character.isLetter(root.c)) {\n            System.out.println(root.c + \": \" + s);\n            return;\n        }\n        printCode(root.left, s + \"0\");\n        printCode(root.right, s + \"1\");\n    }\n\n    public static void main(String[] args) {\n        int n = 6;\n        char[] charArray = { 'a', 'b', 'c', 'd', 'e', 'f' };\n        int[] charFreq = { 5, 9, 12, 13, 16, 45 };\n\n        PriorityQueue<HuffmanNode> q = new PriorityQueue<HuffmanNode>(n, new MyComparator());\n\n        for (int i = 0; i < n; i++) {\n            HuffmanNode hn = new HuffmanNode();\n            hn.c = charArray[i];\n            hn.data = charFreq[i];\n            hn.left = null;\n            hn.right = null;\n            q.add(hn);\n        }\n\n        HuffmanNode root = null;\n\n        while (q.size() > 1) {\n            HuffmanNode x = q.peek();\n            q.poll();\n            HuffmanNode y = q.peek();\n            q.poll();\n\n            HuffmanNode f = new HuffmanNode();\n            f.data = x.data + y.data;\n            f.c = '-';\n            f.left = x;\n            f.right = y;\n            root = f;\n            q.add(f);\n        }\n\n        printCode(root, \"\");\n    }\n}\n```"
  },
  {
    id: "time-and-space-complexity",
    title: "8. Time & Space Complexity",
    content: "### Time Complexity\n- **Building the priority queue (min-heap):** $O(n)$ if built using a bottom-up `build_heap` function, or $O(n \\\\log n)$ if using repeated insertions.\n- **Extract-Min operations:** The loop runs $n-1$ times. In each iteration, we do two `extract-min` and one `insert` operation. Each operation takes $O(\\\\log n)$ time. Thus, the loop takes $O(n \\\\log n)$ time.\n- **Overall Time Complexity:** $O(n \\\\log n)$ where $n$ is the number of unique characters.\n*Note: If the input array is already sorted by frequencies, we can build the Huffman Tree in $O(n)$ time using two queues.* \n\n### Space Complexity\n- **Space Complexity:** $O(n)$ to store the nodes in the priority queue and the Huffman Tree."
  },
  {
    id: "best-worst-avg-case",
    title: "9. Best/Worst/Avg Case",
    content: "### Best, Worst, and Average Cases\nThe algorithmic complexity does not vary with the distribution of frequencies; it strictly depends on the number of unique characters $n$.\n- **Best Case:** $O(n \\\\log n)$\n- **Average Case:** $O(n \\\\log n)$\n- **Worst Case:** $O(n \\\\log n)$\n\nHowever, the *compression ratio* varies greatly. \n- **Best Compression:** Occurs when one character is extremely frequent and others are very rare.\n- **Worst Compression:** Occurs when all characters have equal frequencies (uniform distribution). In this case, Huffman coding creates a balanced tree, yielding fixed-length codes."
  },
  {
    id: "in-place-stability",
    title: "10. In-place & Stability",
    content: "- **In-place:** No. The algorithm requires additional data structures like a priority queue and a tree to keep track of the frequencies and the codes. Thus, it is not an in-place algorithm.\n- **Stability:** Huffman Coding is not a sorting algorithm, so the concept of stability does not directly apply. However, if there's a tie in frequencies, the choice of which node to extract can vary based on priority queue implementation. Breaking ties consistently ensures the same code output, but tie-breaking does not affect the optimal prefix code property or total expected length."
  },
  {
    id: "edge-cases",
    title: "11. Edge Cases",
    content: "1. **Single Character:** If the input consists of only one unique character, the loop won't execute, and typical implementation assigns a single bit (like '0') or needs a special check to avoid empty codes.\n2. **All Same Frequencies:** Handled properly, but it creates a completely balanced tree with codes of approximately equal length, providing little to no compression over fixed-width coding.\n3. **Large number of characters (e.g., all Unicode):** Can be slow ($O(n \\\\log n)$ where $n$ is large). Typically Huffman is applied per block or chunk."
  },
  {
    id: "applications",
    title: "12. Applications",
    content: "1. **File Compression:** Widely used in compression formats like ZIP, GZIP, and PKZIP.\n2. **Multimedia Codecs:** Used as a backend compression step in image and video formats such as JPEG, PNG, and MP3.\n3. **Data Transmission:** Efficient encoding mechanism in networking protocols for minimizing bandwidth usage."
  },
  {
    id: "common-mistakes",
    title: "13. Common Mistakes",
    content: "- **Assuming it's $O(n)$ without sorted input:** A common mistake is thinking the algorithm is linear without recognizing the priority queue operations dictate $O(n \\\\log n)$.\n- **Not using a Min-Heap:** Using an array and sorting it every time leads to $O(n^2 \\\\log n)$ time, which is highly inefficient.\n- **Confusing Prefix Codes:** Forgetting that Huffman Codes must be prefix-free and manually assigning codes that violate this rule.\n- **Incorrect Tie Handling:** Not handling duplicate frequencies consistently can lead to mismatched encoder and decoder trees."
  },
  {
    id: "related-algorithms",
    title: "14. Related Algorithms",
    content: "- **Shannon-Fano Coding:** An earlier, top-down approach for constructing prefix codes. It's often sub-optimal compared to Huffman coding.\n- **Arithmetic Coding:** Offers better compression rates than Huffman because it doesn't encode each character into an integer number of bits. It encodes the entire message into a single fractional number.\n- **Lempel-Ziv (LZ77/LZ78):** Dictionary-based compression often used in conjunction with Huffman Coding (e.g., DEFLATE algorithm)."
  },
  {
    id: "interview-questions",
    title: "15. Interview Questions",
    content: "**Q1. Why are Huffman codes prefix-free?**\n*A:* Because characters are only placed at the leaf nodes of the Huffman tree. Since no leaf is an ancestor of another leaf, no code can be a prefix of another code.\n\n**Q2. Can we optimize Huffman Coding to $O(n)$?**\n*A:* Yes, if the input array is already sorted by frequencies, we can use two simple queues to process the elements in $O(n)$ time without needing a heap.\n\n**Q3. Does a greedy algorithm always yield the optimal prefix code?**\n*A:* Yes, Huffman's greedy strategy is mathematically proven to generate an optimal prefix code that minimizes the expected encoded message length."
  },
  {
    id: "summary",
    title: "16. Summary",
    content: "Huffman Coding is a cornerstone of data compression, utilizing a greedy algorithm to build an optimal prefix-free code. By assigning shorter binary sequences to more frequent characters, it minimizes the average code length. Operating in $O(n \\\\log n)$ time using a min-priority queue, it guarantees optimal symbol-by-symbol encoding and forms the basis for numerous modern compression standards."
  }
];

export const greedyHuffmanMcqs = [
  {
    question: "Which of the following is a direct application of Greedy Huffman? **GATE 2011**",
    options: [
      "Database indexing",
      "Cryptographic hashing",
      "Network routing",
      "All of the above"
    ],
    correctAnswerIndex: 3,
    explanation: "Greedy Huffman has widespread applications across computer science domains."
  },
  {
    question: "If Greedy Huffman uses a heuristic, what does that imply about its solution? **GATE 2017**",
    options: [
      "It is exact but slow.",
      "It is approximate but fast.",
      "It is always optimal.",
      "It uses randomness."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up Greedy Huffman at the cost of guaranteed optimality."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Greedy Huffman? **GATE 2009**",
    options: [
      "Stack",
      "Depends on implementation details",
      "Set",
      "Queue"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "In the context of Greedy Huffman, what does the term 'optimal substructure' imply if applicable? **GATE 2015**",
    options: [
      "The solution is always optimal.",
      "The algorithm uses optimal memory.",
      "The problem can be broken down into smaller, similar subproblems.",
      "It runs in linear time."
    ],
    correctAnswerIndex: 3,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Greedy Huffman."
  },
  {
    question: "In a standard implementation of Greedy Huffman, what is the auxiliary space complexity? **GATE 2005**",
    options: [
      "O(log N)",
      "O(1)",
      "O(N^2)",
      "O(N)"
    ],
    correctAnswerIndex: 3,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "In a distributed computing environment, how easily can Greedy Huffman be parallelized? **GATE 2005**",
    options: [
      "Easily, it is embarrassingly parallel.",
      "Impossible.",
      "Moderately, requires synchronization.",
      "Difficult, highly sequential."
    ],
    correctAnswerIndex: 1,
    explanation: "Parallelizing Greedy Huffman depends on data dependencies."
  },
  {
    question: "Which real-world scenario best models the problem solved by Greedy Huffman? **GATE 2016**",
    options: [
      "Finding shortest paths",
      "Sorting data",
      "Resource allocation",
      "Pattern matching"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "If Greedy Huffman is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2010**",
    options: [
      "Decreased time complexity",
      "Increased time complexity",
      "No impact",
      "Reduced stack space overhead"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Greedy Huffman? **GATE 2023**",
    options: [
      "Loop invariants",
      "Probability",
      "Graph theory",
      "Combinatorics"
    ],
    correctAnswerIndex: 3,
    explanation: "Formal proofs for Greedy Huffman often rely on establishing invariants."
  },
  {
    question: "What happens to Greedy Huffman if the input is already sorted (best-case)? **GATE 2017**",
    options: [
      "It performs optimally.",
      "Behavior remains unchanged.",
      "It degrades to worst-case.",
      "It achieves its theoretical lower bound."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Greedy Huffman."
  },
  {
    question: "Consider the worst-case scenario for Greedy Huffman. Which data structure would most likely degrade its performance? **GATE 2022**",
    options: [
      "Hash Tables",
      "Arrays",
      "Linked Lists",
      "Balanced Trees"
    ],
    correctAnswerIndex: 0,
    explanation: "Different data structures provide different access times which heavily influence Greedy Huffman."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Greedy Huffman? **GATE 2014**",
    options: [
      "Extremely large inputs",
      "Empty input",
      "All of the above",
      "Negative numbers"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Greedy Huffman must handle boundary conditions."
  },
  {
    question: "If the input size for Greedy Huffman is doubled, how does the execution time scale approximately in the average case? **GATE 2013**",
    options: [
      "It increases by a constant factor",
      "It remains constant",
      "It quadruples",
      "It doubles"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Greedy Huffman."
  },
  {
    question: "Which algorithmic paradigm does Greedy Huffman primarily utilize? **GATE 2019**",
    options: [
      "Backtracking",
      "Dynamic Programming",
      "Greedy Approach",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Greedy Huffman."
  },
  {
    question: "What is the primary trade-off when optimizing Greedy Huffman? **GATE 2020**",
    options: [
      "None",
      "Accuracy vs. Speed",
      "Time vs. Space",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Greedy Huffman."
  }
];

export const greedyHuffmanDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int target = 42;
        int count = 0;
        for(int i=0; i<arr.length; i++) { // Bug: Starts with smallest
            while(target >= arr[i]) { target -= arr[i]; count++; }
        }
        System.out.println(count);
    }
    public static void main(String[] args) {
        int[] arr = {1, 5, 10, 20};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int target = 42;
        int count = 0;
        for(int i=arr.length-1; i>=0; i--) { // Fixed: Starts with largest
            while(target >= arr[i]) { target -= arr[i]; count++; }
        }
        System.out.println(count);
    }
    public static void main(String[] args) {
        int[] arr = {1, 5, 10, 20};
        process(arr);
    }
}`,
  hints: ["Greedy should pick the largest coin first"],
  expectedOutput: "5"
};

export const greedyHuffmanDrag = {
  initialItems: [
    "Insert new node to Min-Heap",
    "Return Min-Heap root",
    "Extract 1st min from Min-Heap",
    "Create new internal node with sum of freqs",
    "Extract 2nd min from Min-Heap"
  ],
  targetOrder: [
    "Extract 1st min from Min-Heap",
    "Extract 2nd min from Min-Heap",
    "Create new internal node with sum of freqs",
    "Insert new node to Min-Heap",
    "Return Min-Heap root"
  ],
  question: "Order the steps performed inside the main loop of building a Huffman Tree."
};

export const greedyHuffmanComplete = {
  codeSnippet: `void processAlgorithm(int n) {
    for(int i = 0; i < n; i++) {
        // Perform core step
        if (/*[BLANK]*/) {
            break;
        }
    }
}`,
  blanks: [
    {
      id: "blank1",
      text: "i == n - 1"
    }
  ]
};
