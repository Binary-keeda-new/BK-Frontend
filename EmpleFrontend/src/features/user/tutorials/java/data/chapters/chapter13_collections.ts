// Chapter 13

export const chapter13_CONTENT = {
  "title": "Collections",
  "description": "The Java Collections Framework provides an architecture to store and manipulate groups of objects. It includes lists, sets, and maps.",
  "points": [
    {
      "heading": "ArrayList",
      "body": "A resizable array implementation of the `List` interface. Elements can be dynamically added, accessed, and removed."
    },
    {
      "heading": "HashMap",
      "body": "A map implementation that stores key-value pairs. Offers constant-time `O(1)` performance for insert and lookup operations."
    },
    {
      "heading": "Generics",
      "body": "Specify the type of objects collections store (e.g. `ArrayList<String>`). Prevents typecast errors at runtime."
    },
    {
      "heading": "Wrapper Classes",
      "body": "Primitives cannot be stored in collections. Java autoboxes primitives into Wrapper objects (e.g., `int` -> `Integer`)."
    },
    {
      "heading": "HashSet",
      "body": "A collection that stores unique elements only. Backed by a `HashMap`, duplicate element insertions are ignored."
    },
    {
      "heading": "Iterating Collections",
      "body": "Use an enhanced `for` loop, `Iterator` class, or Lambda expressions (`.forEach()`) to traverse collection elements."
    }
  ],
  "code": "import java.util.ArrayList;\nimport java.util.HashMap;\n\npublic class CollectionsExample {\n    public static void main(String[] args) {\n        // ArrayList\n        ArrayList<String> list = new ArrayList<>();\n        list.add(\"Java\");\n        list.add(\"C++\");\n        System.out.println(\"List: \" + list);\n\n        // HashMap\n        HashMap<String, Integer> map = new HashMap<>();\n        map.put(\"Java\", 1);\n        map.put(\"Python\", 2);\n        System.out.println(\"Java Rank: \" + map.get(\"Java\"));\n    }\n}"
};

export const chapter13_DEBUG = {
  "instructions": "Fix the 3 collection ArrayList and primitive storage errors in this method.",
  "buggy": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<int> list = new ArrayList<int>();\n        list.add(10);\n        int val = list.get[0];\n        System.out.println(val);\n    }\n}",
  "fixed": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<Integer>();\n        list.add(10);\n        int val = list.get(0);\n        System.out.println(val);\n    }\n}",
  "hints": [
    "Collections store objects — use wrapper class Integer instead of primitive int",
    "Retrieve elements from an ArrayList using method get(0), not index brackets",
    "Ensure all collection packages are imported"
  ],
  "expectedOutput": "10"
};

export const chapter13_DRAG_DROP = {
  "instructions": "Arrange these lines to add and retrieve an item from an ArrayList.",
  "lines": [
    {
      "id": "a",
      "text": "import java.util.ArrayList;"
    },
    {
      "id": "b",
      "text": "public class Main {"
    },
    {
      "id": "c",
      "text": "    public static void main(String[] args) {"
    },
    {
      "id": "d",
      "text": "        ArrayList<String> list = new ArrayList<>();"
    },
    {
      "id": "e",
      "text": "        list.add(\"Java\");"
    },
    {
      "id": "f",
      "text": "        String item = list.get(0);"
    },
    {
      "id": "g",
      "text": "        System.out.println(item);"
    },
    {
      "id": "h",
      "text": "    }"
    },
    {
      "id": "i",
      "text": "}"
    }
  ],
  "order": [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i"
  ]
};

export const chapter13_MCQ = [
  {
    "q": "(GATE CS 2017) Which of the following data structures is most suitable for implementing a dictionary (where lookups, insertions, and deletions need to be fast)?",
    "options": [
      "Linked List",
      "Hash Table",
      "Stack",
      "Queue"
    ],
    "ans": 1,
    "explanation": "A Hash Table (like Java's `HashMap`) provides O(1) average time complexity for insertions, deletions, and lookups, making it ideal for dictionary implementations."
  },
  {
    "q": "(GATE CS 2004) The time complexity of searching for an element in a collection backed by a balanced binary search tree (like Java's `TreeSet`) containing `n` elements is:",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    "ans": 2,
    "explanation": "`TreeSet` and `TreeMap` in Java are implemented using Red-Black trees (a type of balanced binary search tree). The time complexity for searching, inserting, and deleting is O(log n)."
  },
  {
    "q": "(GATE CS 2008) Which of the following is TRUE about a hash table that uses chaining to resolve collisions?",
    "options": [
      "The load factor cannot exceed 1",
      "It requires open addressing",
      "Worst-case search time can be O(n)",
      "It is slower than arrays for sequential access"
    ],
    "ans": 2,
    "explanation": "In the worst case (e.g., all keys hash to the same bucket), chaining degenerates into a linked list, making the search time O(n)."
  },
  {
    "q": "(GATE IT 2006) Which of the following Java collections allows random access to its elements in O(1) time?",
    "options": [
      "LinkedList",
      "ArrayList",
      "HashSet",
      "TreeSet"
    ],
    "ans": 1,
    "explanation": "`ArrayList` is backed by a dynamic array, which supports O(1) random access using an index. `LinkedList` requires O(n) traversal."
  },
  {
    "q": "(GATE CS 1999) A data structure is required for storing a set of integers such that each of the following operations can be done in O(log n) time: deletion of the smallest element and insertion of an element. Which structure is best?",
    "options": [
      "Sorted array",
      "Balanced binary search tree (e.g. TreeSet)",
      "Hash table (e.g. HashSet)",
      "Unsorted linked list"
    ],
    "ans": 1,
    "explanation": "A balanced BST supports both finding/deleting the minimum and inserting an element in O(log n) time. (A Priority Queue/Min-Heap also supports these, but among the options, a balanced BST works)."
  },
  {
    "q": "(GATE CS 2015) In a hash table, the load factor is defined as:",
    "options": [
      "Number of elements divided by the table size",
      "Table size divided by the number of elements",
      "Maximum number of collisions in any bucket",
      "Average chain length"
    ],
    "ans": 0,
    "explanation": "Load factor (α) = n / m, where n is the number of elements currently stored in the hash table, and m is the number of slots (table size)."
  },
  {
    "q": "(GATE CS 2005) Which of the following data structures is most appropriate for a priority queue (which Java's `PriorityQueue` implements)?",
    "options": [
      "Binary Search Tree",
      "Heap",
      "Hash Table",
      "Doubly Linked List"
    ],
    "ans": 1,
    "explanation": "A heap data structure (specifically a min-heap or max-heap) is the most efficient and standard way to implement a priority queue."
  },
  {
    "q": "(GATE CS 2010) The worst-case time complexity of searching for an element in a standard singly `LinkedList` is:",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "ans": 2,
    "explanation": "In a linked list, you must traverse nodes sequentially from the head, resulting in an O(n) worst-case search time."
  },
  {
    "q": "(GATE CS 2013) Which of the following traversals of a Binary Search Tree (like the one underlying `TreeSet`) outputs the elements in sorted order?",
    "options": [
      "Pre-order",
      "In-order",
      "Post-order",
      "Level-order"
    ],
    "ans": 1,
    "explanation": "An in-order traversal of a binary search tree visits the nodes in ascending sorted order."
  },
  {
    "q": "(GATE CS 2014) What is the fundamental difference between a `HashSet` and a `TreeSet` in Java?",
    "options": [
      "HashSet allows duplicates, TreeSet does not.",
      "TreeSet maintains elements in sorted order, HashSet does not guarantee any order.",
      "HashSet is thread-safe, TreeSet is not.",
      "TreeSet uses a dynamic array, HashSet uses a hash table."
    ],
    "ans": 1,
    "explanation": "Both are Sets and disallow duplicates. However, `TreeSet` is backed by a NavigableMap (Red-Black tree) which keeps elements sorted, whereas `HashSet` provides no ordering guarantees."
  },
  {
    "q": "(GATE IT 2004) Which collection interface should be implemented when you need to store elements that must not contain duplicates?",
    "options": [
      "List",
      "Set",
      "Queue",
      "Map"
    ],
    "ans": 1,
    "explanation": "The `Set` interface in the Java Collections Framework models the mathematical set abstraction, which strictly prohibits duplicate elements."
  },
  {
    "q": "(GATE CS 2018) If we use a `HashMap` to store key-value pairs, what is required for the objects used as keys to ensure correct behavior?",
    "options": [
      "They must implement the Comparable interface.",
      "They must be primitives.",
      "They must properly override equals() and hashCode() methods.",
      "They must be declared as final."
    ],
    "ans": 2,
    "explanation": "For an object to function correctly as a key in a `HashMap`, its `hashCode()` must remain consistent and its `equals()` method must correctly determine object equality."
  },
  {
    "q": "(GATE CS 2003) Which of the following is an advantage of using a Linked List over a contiguous Array?",
    "options": [
      "Faster random access to elements",
      "Dynamic size and easier insertion/deletion in the middle",
      "Less memory overhead per element",
      "Better cache locality"
    ],
    "ans": 1,
    "explanation": "Linked lists can easily grow and shrink without reallocation, and inserting or deleting elements (once the node is found) involves simple pointer updates rather than shifting elements."
  },
  {
    "q": "(GATE CS 2011) The `Stack` collection in Java is based on which data structure principle?",
    "options": [
      "FIFO (First In First Out)",
      "LIFO (Last In First Out)",
      "Priority Ordering",
      "Random Access"
    ],
    "ans": 1,
    "explanation": "A Stack operates on the Last-In-First-Out (LIFO) principle, where the last element added is the first one to be removed."
  },
  {
    "q": "(GATE IT 2008) In a `HashMap`, if two different keys generate the same hashcode, what happens?",
    "options": [
      "The second key overwrites the first key.",
      "A collision occurs, and both are stored in the same bucket (e.g. via chaining).",
      "An exception is thrown.",
      "The HashMap resizes immediately."
    ],
    "ans": 1,
    "explanation": "This is known as a hash collision. Java's `HashMap` handles this by storing the entries in a linked list (or balanced tree if the bin gets too large) at the corresponding bucket index."
  }
];

export const chapter13_COMPLETE_EXERCISES = [
  {
    template: `import java.util.ArrayList;
public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.___("Apple");
    }
}`,
    blanks: [
      "add"
    ]
  }
];
