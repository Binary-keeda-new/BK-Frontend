export const stringTrieContent = [
  {
    title: "Introduction",
    content: "A **Trie** (derived from re**trie**val), also known as a prefix tree or digital tree, is a specialized tree-based data structure that is used for efficient retrieval of a key in a large dataset of strings. Unlike a binary search tree, nodes in a trie do not store their associated key. Instead, a node's position in the tree defines the key with which it is associated. All the descendants of a node have a common prefix of the string associated with that node, and the root is associated with the empty string."
  },
  {
    title: "Problem Statement",
    content: "Given a collection of strings, the objective is to implement a data structure that supports efficient operations such as: inserting a word, searching for a complete word, and finding whether any word starts with a given prefix. The data structure must optimize for time complexity, typically $\\mathcal{O}(L)$ where $L$ is the length of the string, while minimizing space overhead by sharing common prefixes."
  },
  {
    title: "Theory & Working",
    content: "A Trie represents strings where each edge (or child link) corresponds to a character. \n\n**Structure:**\n1. **Root Node:** Represents an empty string.\n2. **Edges/Children:** Each node contains an array or map of pointers to child nodes, one for each possible character (e.g., 26 for lowercase English letters).\n3. **End of Word Marker:** A boolean flag in each node indicates if the node represents the end of a valid word.\n\n**Operations:**\n- **Insertion:** Start at the root. For each character in the string, if a child node for the character doesn't exist, create it. Move to that child node. After processing all characters, mark the last node as the end of a word.\n- **Search:** Start at the root. Traverse child links matching each character of the string. If a link is missing, the word is not in the Trie. If all characters are found, check the 'end of word' flag at the final node.\n- **Prefix Search (StartsWith):** Similar to Search, but return true if the traversal completes successfully, without checking the 'end of word' flag."
  },
  {
    title: "Step-by-Step Dry Run",
    content: "Let's insert words: `cat`, `car`, and `dog`.\n\n1. **Insert 'cat':**\n   - Root -> create 'c' node -> move to 'c'.\n   - 'c' -> create 'a' node -> move to 'a'.\n   - 'a' -> create 't' node -> move to 't'. Mark 't' as end of word.\n\n2. **Insert 'car':**\n   - Root -> 'c' exists -> move to 'c'.\n   - 'c' -> 'a' exists -> move to 'a'.\n   - 'a' -> create 'r' node -> move to 'r'. Mark 'r' as end of word.\n\n3. **Insert 'dog':**\n   - Root -> create 'd' node -> move to 'd'.\n   - 'd' -> create 'o' node -> move to 'o'.\n   - 'o' -> create 'g' node -> move to 'g'. Mark 'g' as end of word.\n\n**Search 'cat':** Root -> 'c' -> 'a' -> 't' (isEndOfWord = true) => Found!\n**Search 'can':** Root -> 'c' -> 'a' -> 'n' (missing) => Not Found!"
  },
  {
    title: "Pseudocode",
    content: "```text\nclass TrieNode:\n    children[26]\n    isEndOfWord = false\n\nclass Trie:\n    root = new TrieNode()\n\n    function insert(word):\n        current = root\n        for char in word:\n            index = char - 'a'\n            if current.children[index] is null:\n                current.children[index] = new TrieNode()\n            current = current.children[index]\n        current.isEndOfWord = true\n\n    function search(word):\n        current = root\n        for char in word:\n            index = char - 'a'\n            if current.children[index] is null:\n                return false\n            current = current.children[index]\n        return current.isEndOfWord\n```"
  },
  {
    title: "C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n#include <string.h>\n\n#define ALPHABET_SIZE 26\n\nstruct TrieNode {\n    struct TrieNode *children[ALPHABET_SIZE];\n    bool isEndOfWord;\n};\n\nstruct TrieNode *getNode(void) {\n    struct TrieNode *pNode = (struct TrieNode *)malloc(sizeof(struct TrieNode));\n    pNode->isEndOfWord = false;\n    for (int i = 0; i < ALPHABET_SIZE; i++)\n        pNode->children[i] = NULL;\n    return pNode;\n}\n\nvoid insert(struct TrieNode *root, const char *key) {\n    int length = strlen(key);\n    struct TrieNode *pCrawl = root;\n    for (int level = 0; level < length; level++) {\n        int index = key[level] - 'a';\n        if (!pCrawl->children[index])\n            pCrawl->children[index] = getNode();\n        pCrawl = pCrawl->children[index];\n    }\n    pCrawl->isEndOfWord = true;\n}\n\nbool search(struct TrieNode *root, const char *key) {\n    int length = strlen(key);\n    struct TrieNode *pCrawl = root;\n    for (int level = 0; level < length; level++) {\n        int index = key[level] - 'a';\n        if (!pCrawl->children[index])\n            return false;\n        pCrawl = pCrawl->children[index];\n    }\n    return (pCrawl != NULL && pCrawl->isEndOfWord);\n}\n```"
  },
  {
    title: "Java Implementation",
    content: "```java\nclass TrieNode {\n    TrieNode[] children = new TrieNode[26];\n    boolean isEndOfWord;\n    \n    TrieNode() {\n        isEndOfWord = false;\n        for (int i = 0; i < 26; i++)\n            children[i] = null;\n    }\n}\n\npublic class Trie {\n    static TrieNode root;\n    \n    static void insert(String key) {\n        TrieNode pCrawl = root;\n        int length = key.length();\n        for (int level = 0; level < length; level++) {\n            int index = key.charAt(level) - 'a';\n            if (pCrawl.children[index] == null)\n                pCrawl.children[index] = new TrieNode();\n            pCrawl = pCrawl.children[index];\n        }\n        pCrawl.isEndOfWord = true;\n    }\n    \n    static boolean search(String key) {\n        TrieNode pCrawl = root;\n        int length = key.length();\n        for (int level = 0; level < length; level++) {\n            int index = key.charAt(level) - 'a';\n            if (pCrawl.children[index] == null)\n                return false;\n            pCrawl = pCrawl.children[index];\n        }\n        return (pCrawl != null && pCrawl.isEndOfWord);\n    }\n}\n```"
  },
  {
    title: "Time & Space Complexity",
    content: "**Time Complexity:**\n- **Insertion:** $\\mathcal{O}(L)$, where $L$ is the length of the string to be inserted.\n- **Search:** $\\mathcal{O}(L)$, where $L$ is the length of the string being searched.\n- **Deletion:** $\\mathcal{O}(L)$ to traverse the depth of the trie.\n\n**Space Complexity:**\n- $\\mathcal{O}(N \\times L \\times \\Sigma)$ where $N$ is the number of words, $L$ is the average length of words, and $\\Sigma$ is the alphabet size (e.g., 26). The space overhead is significant due to storing an array of size $\\Sigma$ at each node, although this can be optimized using hash maps or compressed tries (Radix Trees)."
  },
  {
    title: "Best/Worst/Avg Case",
    content: "Unlike comparison-based trees (like BSTs) where performance depends on the order of insertion (height can degrade to $\\mathcal{O}(N)$), a Trie's performance is strictly tied to the length of the string $L$.\n\n- **Best Case:** $\\mathcal{O}(L)$ for search/insert. Even if the Trie contains millions of words, finding a word of length $L$ takes exactly $L$ steps.\n- **Worst Case:** $\\mathcal{O}(L)$. The time complexity remains constant relative to the number of words in the Trie.\n- **Average Case:** $\\mathcal{O}(L)$.\n\nThe trade-off is entirely in space, which can grow rapidly in the worst case if there are very few shared prefixes among the inserted words."
  },
  {
    title: "In-place & Stability",
    content: "**In-place:** No. The Trie is an explicitly allocated linked data structure, requiring dynamically allocated nodes with substantial memory overhead for each character insertion that isn't already part of a prefix.\n\n**Stability:** Stability usually applies to sorting algorithms. However, Tries can be used to stably sort strings (e.g., Lexicographical sorting or Radix sort variants), as traversing the Trie from 'a' to 'z' naturally yields words in lexicographical order."
  },
  {
    title: "Edge Cases",
    content: "When implementing a Trie, consider these edge cases:\n1. **Empty String:** Inserting or searching for an empty string `\"\"` (if valid, root node's `isEndOfWord` should be true).\n2. **Case Sensitivity:** If input strings contain mixed cases, the alphabet size must increase (e.g., to 52 or 256 for ASCII) or characters must be normalized before insertion/search.\n3. **Duplicate Insertions:** Inserting the same word twice shouldn't alter the structure but just ensure `isEndOfWord` remains true.\n4. **Prefixes as Words:** Inserting \"car\" and \"cart\". \"car\" is a valid word terminating at an intermediate node of \"cart\"."
  },
  {
    title: "Applications",
    content: "1. **Autocomplete / Typeahead:** Suggesting words that share a common prefix with the user's input.\n2. **Spell Checkers:** Efficiently checking if a word exists in a dictionary.\n3. **IP Routing (Longest Prefix Matching):** Routers use variations of tries (like Radix Trees) to match IP addresses to routing tables.\n4. **Lempel-Ziv-Welch (LZW) Data Compression:** Tries are used to store the dictionary of string patterns.\n5. **Boggle / Word Games:** Quickly verifying if a path of letters forms a valid dictionary word."
  },
  {
    title: "Common Mistakes",
    content: "1. **Memory Leaks:** Forgetting to free dynamically allocated Trie nodes in languages like C/C++.\n2. **Over-allocating Alphabet:** Using arrays of size 256 or 65536 when only lowercase English letters (26) are needed, leading to massive memory wastage.\n3. **Searching Prefix vs Exact Word:** Confusing `startsWith` logic with `search`. For exact search, you must check `isEndOfWord` at the last node.\n4. **Handling Deletion Poorly:** Leaving dangling nodes when a word is deleted. If a node has no children and isn't the end of another word, it should be physically deleted."
  },
  {
    title: "Related Algorithms",
    content: "1. **Radix Tree (Compressed Trie):** An optimized Trie where nodes with a single child are merged to save space.\n2. **Ternary Search Tree (TST):** A hybrid between a BST and a Trie. It reduces the memory overhead by having only 3 pointers per node (left, middle, right) instead of an array for the entire alphabet.\n3. **Aho-Corasick Algorithm:** Builds an automaton on top of a Trie for efficient multi-pattern string search.\n4. **Suffix Trie / Suffix Tree:** Used for advanced string operations like finding the longest repeated substring."
  },
  {
    title: "Interview Questions",
    content: "1. Implement a Trie with insert, search, and startsWith methods. (Classic problem)\n2. Design a data structure that supports adding new words and finding if a string matches any previously added string, where the search string can contain `'.'` to represent any one letter.\n3. Find the maximum XOR of two numbers in an array using a Trie.\n4. Given a 2D board of characters and a list of words, find all words on the board (Word Search II).\n5. How would you optimize the memory of a standard Trie?"
  },
  {
    title: "Summary",
    content: "A Trie is a powerful tree data structure optimized for string operations. It provides extremely fast $\\mathcal{O}(L)$ insertion and search times, independent of the number of words stored, making it superior to Hash Tables or BSTs for prefix-based operations like autocomplete. Its main drawback is the substantial space complexity, which can be mitigated by using Maps instead of Arrays for children, or by upgrading to Compressed Tries or Ternary Search Trees."
  }
];

export const stringTrieMcqs = [
  {
    question: "What is the time complexity to search for a string of length L in a Trie containing N strings?",
    options: [
      "O(N)",
      "O(L)",
      "O(N * L)",
      "O(log N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The search time in a Trie is proportional only to the length of the string being searched (L), regardless of the number of strings (N) present in the Trie."
  },
  {
    question: "A Trie is primarily advantageous over a Binary Search Tree (BST) for storing strings because:",
    options: [
      "It requires less space in the worst case.",
      "It allows for faster prefix-based searches and matching.",
      "It allows in-place operations.",
      "It eliminates the need for dynamic memory allocation."
    ],
    correctAnswerIndex: 1,
    explanation: "Tries inherently structure data by prefixes, making operations like autocomplete or prefix matching highly efficient compared to a BST where string comparisons take longer and don't natively group by prefix."
  },
  {
    question: "Consider a Trie where each node uses an array of size 26 for children. If 5 words of length 4 are inserted, and they share no common prefix, how many nodes will the Trie contain (including the root)?",
    options: [
      "21",
      "20",
      "26",
      "5"
    ],
    correctAnswerIndex: 0,
    explanation: "The root node is 1. Since none of the 5 words share a prefix, each word will create 4 unique nodes. Total nodes = 1 (root) + 5 * 4 = 21."
  },
  {
    question: "In a standard Trie representing a dictionary of words, what does a node with `isEndOfWord == false` indicate?",
    options: [
      "The node is a leaf node.",
      "The string formed from the root to this node is not a valid word in the dictionary.",
      "The node has no children.",
      "The Trie is empty."
    ],
    correctAnswerIndex: 1,
    explanation: "The `isEndOfWord` flag distinguishes between valid words and prefixes that just exist as a path to a longer valid word."
  },
  {
    question: "Which of the following data structures is a space-optimized version of a standard Trie where nodes with only one child are merged?",
    options: [
      "Suffix Tree",
      "Ternary Search Tree",
      "Radix Tree (Patricia Trie)",
      "B-Tree"
    ],
    correctAnswerIndex: 2,
    explanation: "A Radix Tree (or Patricia Trie) compresses the standard Trie by merging nodes that have only one child, saving significant memory."
  },
  {
    question: "Which of the following is NOT a typical application of a Trie data structure?",
    options: [
      "Autocomplete / Typeahead",
      "IP Routing (Longest Prefix Match)",
      "Finding the shortest path in a weighted graph",
      "Spell checking"
    ],
    correctAnswerIndex: 2,
    explanation: "Finding the shortest path in a weighted graph is typically solved using algorithms like Dijkstra's or Bellman-Ford, not Tries."
  },
  {
    question: "If the alphabet size is heavily increased (e.g., full Unicode), what is the most appropriate way to represent children in a Trie node to save space?",
    options: [
      "A fixed-size array of pointers",
      "A linked list or hash map of pointers",
      "A boolean array",
      "A stack"
    ],
    correctAnswerIndex: 1,
    explanation: "Using a fixed-size array for a large alphabet results in huge memory waste because most pointers will be null. A hash map or linked list allocates space only for the children that actually exist."
  },
  {
    question: "When deleting a word from a Trie, when is it safe to delete a node?",
    options: [
      "When the node has no children and is not marked as the end of another word.",
      "Immediately when `isEndOfWord` is set to false.",
      "Only if it is a leaf node, regardless of other conditions.",
      "When the node has children but `isEndOfWord` is false."
    ],
    correctAnswerIndex: 0,
    explanation: "A node can only be safely physically deleted if it is no longer part of any other valid word's prefix (has no children) and is not a valid word itself."
  },
  {
    question: "Let T be a standard Trie for storing lowercase English strings. Which traversal of T yields the words in sorted lexicographical order?",
    options: [
      "Breadth-First Search (BFS)",
      "Depth-First Search (DFS) visiting children from 'z' to 'a'",
      "Depth-First Search (DFS) visiting children from 'a' to 'z'",
      "Post-order traversal without specific child ordering"
    ],
    correctAnswerIndex: 2,
    explanation: "A pre-order or standard DFS traversal that systematically visits children in alphabetical order ('a' to 'z') will output the strings in lexicographical order."
  },
  {
    question: "What is the worst-case space complexity of a Trie storing N words, where the maximum length of a word is L and the alphabet size is Σ?",
    options: [
      "O(N * L)",
      "O(N * L * Σ)",
      "O(N + L)",
      "O(Σ^L)"
    ],
    correctAnswerIndex: 1,
    explanation: "In the worst case (no shared prefixes), there are N*L nodes, and each node allocates an array of size Σ. Therefore, space complexity is O(N * L * Σ)."
  },
  {
    question: "In the context of the Aho-Corasick algorithm, a Trie is enhanced with:",
    options: [
      "Balanced rotations",
      "Failure links (or suffix links)",
      "Hash functions at each node",
      "Binary search capabilities"
    ],
    correctAnswerIndex: 1,
    explanation: "Aho-Corasick builds an automaton on a Trie by adding failure links (suffix links) to allow rapid transitions between states upon character mismatches."
  },
  {
    question: "Consider a Ternary Search Tree (TST) and a standard Trie. Which of the following statements is true?",
    options: [
      "TST generally consumes more memory than a standard Trie for large alphabets.",
      "TST search time is faster than standard Trie search time.",
      "Standard Trie guarantees O(L) search time, whereas TST search time can depend on the number of keys.",
      "Standard Trie only has 3 pointers per node."
    ],
    correctAnswerIndex: 2,
    explanation: "A standard Trie guarantees strictly O(L) search time. A TST acts partially like a BST, so traversing it can take O(L + log N) time depending on how balanced it is, but it uses significantly less memory."
  }
];

export const stringTrieDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
};

export const stringTrieDrag = {
  data: [
    {
      description: "Build a Trie insertion step inside the loop",
      code: `for (int level = 0; level < strlen(key); level++) {
    int index = key[level] - 'a';
    if (!pCrawl->children[index])
        _______________________;
    _______________________;
}`,
      options: ["pCrawl->children[index] = getNode()", "pCrawl = pCrawl->children[index]", "pCrawl->isEndOfWord = true", "return false"],
      correctOrder: ["pCrawl->children[index] = getNode()", "pCrawl = pCrawl->children[index]"]
    }
  ]
};

export const stringTrieComplete = {
  data: [
    {
      description: "Complete the definition of a Trie Node in C",
      code: `struct TrieNode {
    struct TrieNode *children[______];
    ______ isEndOfWord;
};`,
      solution: ["26", "bool"]
    }
  ]
};
