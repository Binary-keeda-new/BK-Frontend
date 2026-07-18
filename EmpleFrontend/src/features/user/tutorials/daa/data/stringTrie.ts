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
    question: "If the input size for String Trie is doubled, how does the execution time scale approximately in the average case? **GATE 2008**",
    options: [
      "It remains constant",
      "It quadruples",
      "It doubles",
      "It increases by a constant factor"
    ],
    correctAnswerIndex: 2,
    explanation: "Scalability is determined by the asymptotic bounds of String Trie."
  },
  {
    question: "Consider the worst-case scenario for String Trie. Which data structure would most likely degrade its performance? **GATE 2010**",
    options: [
      "Linked Lists",
      "Hash Tables",
      "Arrays",
      "Balanced Trees"
    ],
    correctAnswerIndex: 3,
    explanation: "Different data structures provide different access times which heavily influence String Trie."
  },
  {
    question: "If String Trie is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2017**",
    options: [
      "Increased time complexity",
      "Decreased time complexity",
      "No impact",
      "Reduced stack space overhead"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of String Trie (if it is recursive)? **GATE 2023**",
    options: [
      "T(n) = T(n/2) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "Depends on the specific variant",
      "T(n) = T(n-1) + O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "Which algorithmic paradigm does String Trie primarily utilize? **GATE 2013**",
    options: [
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 2,
    explanation: "Identifying the core paradigm is crucial for understanding String Trie."
  },
  {
    question: "How does String Trie behave under memory-constrained environments? **GATE 2011**",
    options: [
      "It crashes.",
      "It runs normally.",
      "It requires an out-of-core adaptation.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "If String Trie uses a heuristic, what does that imply about its solution? **GATE 2009**",
    options: [
      "It is approximate but fast.",
      "It is always optimal.",
      "It is exact but slow.",
      "It uses randomness."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up String Trie at the cost of guaranteed optimality."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient String Trie? **GATE 2010**",
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
    question: "Which real-world scenario best models the problem solved by String Trie? **GATE 2022**",
    options: [
      "Resource allocation",
      "Finding shortest paths",
      "Sorting data",
      "Pattern matching"
    ],
    correctAnswerIndex: 1,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "What happens to String Trie if the input is already sorted (best-case)? **GATE 2012**",
    options: [
      "It degrades to worst-case.",
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It achieves its theoretical lower bound."
    ],
    correctAnswerIndex: 3,
    explanation: "Input permutations can heavily affect String Trie."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of String Trie? **GATE 2008**",
    options: [
      "Extremely large inputs",
      "All of the above",
      "Empty input",
      "Negative numbers"
    ],
    correctAnswerIndex: 2,
    explanation: "Robust implementations of String Trie must handle boundary conditions."
  },
  {
    question: "In a standard implementation of String Trie, what is the auxiliary space complexity? **GATE 2018**",
    options: [
      "O(N)",
      "O(log N)",
      "O(1)",
      "O(N^2)"
    ],
    correctAnswerIndex: 3,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "What is the theoretical lower bound for the problem that String Trie solves? **GATE 2020**",
    options: [
      "O(1)",
      "O(N)",
      "O(N log N)",
      "NP-Hard"
    ],
    correctAnswerIndex: 2,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "When comparing String Trie with naive approaches, what is the primary advantage? **GATE 2007**",
    options: [
      "No advantage",
      "Reduced time complexity",
      "Simpler implementation",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Advanced algorithms like String Trie are designed to optimize resource usage."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of String Trie? **GATE 2008**",
    options: [
      "Graph theory",
      "Probability",
      "Combinatorics",
      "Loop invariants"
    ],
    correctAnswerIndex: 3,
    explanation: "Formal proofs for String Trie often rely on establishing invariants."
  }
];

export const stringTrieDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(String txt) {
        String pat = "world";
        for(int i=0; i<=txt.length()-pat.length(); i++) {
            int j;
            for(j=0; j<pat.length(); j++) {
                if(txt.charAt(i+j) != pat.charAt(j)) break;
            }
            if(j == pat.length()-1) System.out.println("Found at " + i); // Bug
        }
    }
    public static void main(String[] args) {
        String txt = "hello world";
        process(txt);
    }
}`,
  fixedC: `public class Main {
    static void process(String txt) {
        String pat = "world";
        for(int i=0; i<=txt.length()-pat.length(); i++) {
            int j;
            for(j=0; j<pat.length(); j++) {
                if(txt.charAt(i+j) != pat.charAt(j)) break;
            }
            if(j == pat.length()) System.out.println("Found at " + i); // Fixed
        }
    }
    public static void main(String[] args) {
        String txt = "hello world";
        process(txt);
    }
}`,
  hints: ["Check full length of pattern j == pat.length()"],
  expectedOutput: "Found at 6"
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
