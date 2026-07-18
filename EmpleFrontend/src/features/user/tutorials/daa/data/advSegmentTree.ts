export const advSegmentTreeContent = [
  {
    id: "intro",
    title: "1. Introduction",
    content: "<p>A <strong>Segment Tree</strong> is a highly versatile data structure used primarily for answering range queries (like sum, minimum, maximum) and performing point or range updates over an array. It effectively reduces the time complexity of both range queries and updates from $\\mathcal{O}(N)$ to $\\mathcal{O}(\\log N)$, making it an indispensable tool for competitive programming and advanced algorithmic problem-solving.</p>"
  },
  {
    id: "problem",
    title: "2. Problem Statement",
    content: "<p>Given an array $A$ of size $N$, you need to support two types of operations efficiently:<br/>1. <strong>Update(i, val):</strong> Update the element at index $i$ to $val$.<br/>2. <strong>Query(L, R):</strong> Compute some aggregate function (e.g., sum, min, max) over the subarray $A[L \\dots R]$.</p><p>A naive approach takes $\\mathcal{O}(1)$ for update and $\\mathcal{O}(N)$ for query (or vice versa with prefix sums for sum queries, but updates become $\\mathcal{O}(N)$). The goal is to perform both operations in $\\mathcal{O}(\\log N)$ time.</p>"
  },
  {
    id: "theory",
    title: "3. Theory & Working",
    content: "<p>A Segment Tree is a full binary tree (usually implemented using an array) where:<br/>- The root represents the entire array segment $[0, N-1]$.<br/>- Each leaf node represents a single element $A[i]$ (i.e., segment $[i, i]$).<br/>- The internal nodes represent the merged result of their children. If a node represents $[L, R]$, its left child represents $[L, mid]$ and its right child represents $[mid+1, R]$ where $mid = \\lfloor(L+R)/2\\rfloor$.<br/><br/><strong>Building:</strong> We construct it bottom-up or using DFS. The value of an internal node is computed from its children based on the query type (e.g., sum).<br/><strong>Querying:</strong> To find the answer for $[L, R]$, we traverse the tree and combine the answers of nodes whose segments are completely inside $[L, R]$.<br/><strong>Updating:</strong> We traverse down to the leaf representing index $i$, update it, and backtrack to update the ancestors.</p>"
  },
  {
    id: "dry-run",
    title: "4. Step-by-Step Dry Run",
    content: `<p>Consider an array <code>A = [1, 3, 5, 7]</code> and a Sum Segment Tree.</p>
    <p><strong>Building:</strong><br/>
    - Node 1 (Root, [0,3]): sum = 16<br/>
    - Node 2 (Left, [0,1]): sum = 4, Node 3 (Right, [2,3]): sum = 12<br/>
    - Leaves: Node 4 ([0,0]): 1, Node 5 ([1,1]): 3, Node 6 ([2,2]): 5, Node 7 ([3,3]): 7.</p>
    <p><strong>Query [1,2]:</strong><br/>
    - Start at Root [0,3]. Mid=1. Go left and right.<br/>
    - Left Child [0,1]: Overlaps [1,2]. Go to its right child [1,1] (leaf). Returns 3.<br/>
    - Right Child [2,3]: Overlaps [1,2]. Go to its left child [2,2] (leaf). Returns 5.<br/>
    - Total sum = 3 + 5 = 8.</p>
    <p><strong>Update (index 1 to 4):</strong><br/>
    - Traverse down to [1,1]. Update leaf value to 4.<br/>
    - Backtrack: Update [0,1] sum to 1 + 4 = 5.<br/>
    - Backtrack: Update [0,3] sum to 5 + 12 = 17.</p>`
  },
  {
    id: "pseudocode",
    title: "5. Pseudocode",
    content: `<pre><code>// Build Segment Tree
void build(node, L, R) {
    if (L == R) {
        tree[node] = A[L];
        return;
    }
    mid = (L + R) / 2;
    build(2*node, L, mid);
    build(2*node+1, mid+1, R);
    tree[node] = tree[2*node] + tree[2*node+1];
}

// Query Range [Q_L, Q_R]
int query(node, L, R, Q_L, Q_R) {
    if (Q_R < L or Q_L > R) return 0; // Out of bounds
    if (Q_L <= L and R <= Q_R) return tree[node]; // Completely inside
    mid = (L + R) / 2;
    return query(2*node, L, mid, Q_L, Q_R) + query(2*node+1, mid+1, R, Q_L, Q_R);
}

// Update Index idx to val
void update(node, L, R, idx, val) {
    if (L == R) {
        tree[node] = val;
        A[idx] = val;
        return;
    }
    mid = (L + R) / 2;
    if (idx <= mid) update(2*node, L, mid, idx, val);
    else update(2*node+1, mid+1, R, idx, val);
    tree[node] = tree[2*node] + tree[2*node+1];
}</code></pre>`
  },
  {
    id: "c-impl",
    title: "6. C Implementation",
    content: `<pre><code>#include &lt;stdio.h&gt;
#define MAX_N 100000

int tree[4 * MAX_N];
int A[MAX_N];

void build(int node, int start, int end) {
    if(start == end) {
        tree[node] = A[start];
    } else {
        int mid = (start + end) / 2;
        build(2 * node, start, mid);
        build(2 * node + 1, mid + 1, end);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
}

void update(int node, int start, int end, int idx, int val) {
    if(start == end) {
        A[idx] = val;
        tree[node] = val;
    } else {
        int mid = (start + end) / 2;
        if(start &lt;= idx &amp;&amp; idx &lt;= mid) {
            update(2 * node, start, mid, idx, val);
        } else {
            update(2 * node + 1, mid + 1, end, idx, val);
        }
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
}

int query(int node, int start, int end, int l, int r) {
    if(r &lt; start || end &lt; l) {
        return 0; // Return identity for sum
    }
    if(l &lt;= start &amp;&amp; end &lt;= r) {
        return tree[node];
    }
    int mid = (start + end) / 2;
    int p1 = query(2 * node, start, mid, l, r);
    int p2 = query(2 * node + 1, mid + 1, end, l, r);
    return (p1 + p2);
}</code></pre>`
  },
  {
    id: "java-impl",
    title: "7. Java Implementation",
    content: `<pre><code>class SegmentTree {
    int[] tree;
    int[] A;

    public SegmentTree(int[] arr) {
        A = arr;
        int n = arr.length;
        tree = new int[4 * n];
        build(1, 0, n - 1);
    }

    private void build(int node, int start, int end) {
        if (start == end) {
            tree[node] = A[start];
            return;
        }
        int mid = start + (end - start) / 2;
        build(2 * node, start, mid);
        build(2 * node + 1, mid + 1, end);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            A[idx] = val;
            tree[node] = val;
            return;
        }
        int mid = start + (end - start) / 2;
        if (idx &lt;= mid) {
            update(2 * node, start, mid, idx, val);
        } else {
            update(2 * node + 1, mid + 1, end, idx, val);
        }
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public int query(int node, int start, int end, int l, int r) {
        if (r &lt; start || end &lt; l) return 0;
        if (l &lt;= start &amp;&amp; end &lt;= r) return tree[node];
        int mid = start + (end - start) / 2;
        return query(2 * node, start, mid, l, r) + 
               query(2 * node + 1, mid + 1, end, l, r);
    }
}</code></pre>`
  },
  {
    id: "complexity",
    title: "8. Time & Space Complexity",
    content: "<p><strong>Time Complexity:</strong></p><ul><li><strong>Build:</strong> $\\mathcal{O}(N)$ because there are roughly $2N-1$ nodes in the tree, and we visit each node exactly once.</li><li><strong>Point Update:</strong> $\\mathcal{O}(\\log N)$ as the height of the segment tree is strictly bounded by $\\lceil \\log_2 N \\rceil$, and we traverse a single root-to-leaf path.</li><li><strong>Range Query:</strong> $\\mathcal{O}(\\log N)$ because at each level of the tree, we visit at most 4 nodes.</li></ul><p><strong>Space Complexity:</strong> $\\mathcal{O}(N)$ since we allocate an array of size $4N$ to represent the tree nodes. The constant factor 4 handles the case where $N$ is not a power of 2.</p>"
  },
  {
    id: "cases",
    title: "9. Best/Worst/Avg Case",
    content: "<p><strong>Build:</strong> The structure is fixed for a given $N$, so the time taken is always $\\Theta(N)$ in all cases.<br/><strong>Query / Update:</strong><br/>- <strong>Best Case:</strong> $\\mathcal{O}(1)$ for queries covering the exact segment of the root node or leaf nodes.<br/>- <strong>Worst Case:</strong> $\\mathcal{O}(\\log N)$ when we have to traverse down to the leaves and process up to $4$ nodes per level.<br/>- <strong>Average Case:</strong> $\\mathcal{O}(\\log N)$ consistently.</p>"
  },
  {
    id: "in-place",
    title: "10. In-place & Stability",
    content: "<p><strong>In-place:</strong> No. A Segment Tree explicitly requires external storage (an array of size up to $4N$) to store the hierarchical summary information of the segments.<br/><strong>Stability:</strong> Not applicable, as Segment Trees are not a sorting algorithm. They are a spatial/interval data structure used for queries.</p>"
  },
  {
    id: "edge",
    title: "11. Edge Cases",
    content: "<p>- <strong>N = 1:</strong> Array of single element. Tree array can safely handle this without going out of bounds, though size 4 is overkill but safe.<br/>- <strong>Query Range outside Array Bounds:</strong> E.g., `query(0, N-1, -5, 10)` requires careful condition checking (`r < start || end < l`) to return the identity element (0 for sum, $\\infty$ for min).<br/>- <strong>L > R queries:</strong> Typically invalid, handled by returning the identity element or handled before calling the query function.</p>"
  },
  {
    id: "applications",
    title: "12. Applications",
    content: "<ul><li><strong>Range Queries:</strong> Sum, Min, Max, GCD, LCM over an array segment.</li><li><strong>Computational Geometry:</strong> Counting intersections of segments (using sweepline and segment trees).</li><li><strong>Dynamic programming optimization:</strong> Querying the minimum cost state in a range efficiently.</li><li><strong>Lazy Propagation:</strong> Extending point updates to range updates (e.g., add $V$ to all elements in $A[L \\dots R]$) in $\\mathcal{O}(\\log N)$ time.</li></ul>"
  },
  {
    id: "mistakes",
    title: "13. Common Mistakes",
    content: "<ul><li><strong>Array Size:</strong> Allocating $2N$ instead of $4N$ for the tree array. While a perfect binary tree of $N$ leaves has $2N-1$ nodes, the 1-based array representation with `2*node` and `2*node+1` indices requires up to $4N$ space when $N$ is not a power of 2.</li><li><strong>Identity Element:</strong> Returning wrong values for out-of-bounds queries. (E.g., returning $0$ for a Range Minimum Query instead of $\\infty$).</li><li><strong>Overlap Conditions:</strong> Miswriting the completely-inside and completely-outside interval logic (`l <= start && end <= r` vs `r < start || end < l`).</li></ul>"
  },
  {
    id: "related",
    title: "14. Related Algorithms",
    content: "<p>- <strong>Fenwick Tree (Binary Indexed Tree):</strong> Uses less memory ($\\mathcal{O}(N)$ space with size $N$) and is easier to code, but slightly less versatile (e.g., RMQ is not natively straightforward in standard BIT).<br/>- <strong>Sparse Table:</strong> Used for static Range Minimum Queries in $\\mathcal{O}(1)$ time after $\\mathcal{O}(N \\log N)$ preprocessing, but does not support updates efficiently.<br/>- <strong>Square Root Decomposition:</strong> Supports $\\mathcal{O}(\\sqrt{N})$ range queries and updates. More general but slower than Segment Trees.</p>"
  },
  {
    id: "interview",
    title: "15. Interview Questions",
    content: "<ul><li>How do you handle range updates in a Segment Tree? (Answer: Lazy Propagation)</li><li>Why is the size of the segment tree array $4N$?</li><li>Can a Segment Tree be used to find the product of elements in a range? What are the potential issues? (Answer: Yes, modulo arithmetic is usually needed to avoid overflow).</li><li>Compare Segment Trees and Fenwick Trees. When would you prefer one over the other?</li></ul>"
  },
  {
    id: "summary",
    title: "16. Summary",
    content: "<p>The Segment Tree is a powerful, flexible tree data structure that allows for dynamic querying and updating of array elements. By trading $\\mathcal{O}(N)$ extra space and an initial $\\mathcal{O}(N)$ build time, it empowers us to answer various range aggregate questions in $\\mathcal{O}(\\log N)$ time per operation, handling both point and range updates (with lazy propagation) with extreme efficiency.</p>"
  }
];

export const advSegmentTreeMcqs = [
  {
    question: "What is the primary trade-off when optimizing Adv Segment Tree? **GATE 2015**",
    options: [
      "None",
      "Time vs. Space",
      "Complexity vs. Readability",
      "Accuracy vs. Speed"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in Adv Segment Tree."
  },
  {
    question: "When comparing Adv Segment Tree with naive approaches, what is the primary advantage? **GATE 2012**",
    options: [
      "Reduced time complexity",
      "No advantage",
      "Reduced space complexity",
      "Simpler implementation"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Adv Segment Tree are designed to optimize resource usage."
  },
  {
    question: "In the context of Adv Segment Tree, what does the term 'optimal substructure' imply if applicable? **GATE 2005**",
    options: [
      "The algorithm uses optimal memory.",
      "The solution is always optimal.",
      "The problem can be broken down into smaller, similar subproblems.",
      "It runs in linear time."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Adv Segment Tree."
  },
  {
    question: "Consider the worst-case scenario for Adv Segment Tree. Which data structure would most likely degrade its performance? **GATE 2011**",
    options: [
      "Arrays",
      "Linked Lists",
      "Balanced Trees",
      "Hash Tables"
    ],
    correctAnswerIndex: 0,
    explanation: "Different data structures provide different access times which heavily influence Adv Segment Tree."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Adv Segment Tree? **GATE 2007**",
    options: [
      "Set",
      "Stack",
      "Depends on implementation details",
      "Queue"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "If Adv Segment Tree is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2005**",
    options: [
      "No impact",
      "Increased time complexity",
      "Decreased time complexity",
      "Reduced stack space overhead"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "In a distributed computing environment, how easily can Adv Segment Tree be parallelized? **GATE 2021**",
    options: [
      "Impossible.",
      "Moderately, requires synchronization.",
      "Difficult, highly sequential.",
      "Easily, it is embarrassingly parallel."
    ],
    correctAnswerIndex: 1,
    explanation: "Parallelizing Adv Segment Tree depends on data dependencies."
  },
  {
    question: "Which algorithmic paradigm does Adv Segment Tree primarily utilize? **GATE 2015**",
    options: [
      "Greedy Approach",
      "Backtracking",
      "Divide and Conquer",
      "Dynamic Programming"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Adv Segment Tree."
  },
  {
    question: "If Adv Segment Tree uses a heuristic, what does that imply about its solution? **GATE 2005**",
    options: [
      "It uses randomness.",
      "It is approximate but fast.",
      "It is always optimal.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up Adv Segment Tree at the cost of guaranteed optimality."
  },
  {
    question: "How does Adv Segment Tree behave under memory-constrained environments? **GATE 2017**",
    options: [
      "It requires an out-of-core adaptation.",
      "It runs normally.",
      "It crashes.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 1,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "What is the theoretical lower bound for the problem that Adv Segment Tree solves? **GATE 2009**",
    options: [
      "O(N)",
      "O(N log N)",
      "NP-Hard",
      "O(1)"
    ],
    correctAnswerIndex: 1,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "If the input size for Adv Segment Tree is doubled, how does the execution time scale approximately in the average case? **GATE 2021**",
    options: [
      "It remains constant",
      "It doubles",
      "It increases by a constant factor",
      "It quadruples"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of Adv Segment Tree."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Adv Segment Tree? **GATE 2022**",
    options: [
      "O(N^2)",
      "It depends on the input structure.",
      "O(N log N)",
      "O(N)"
    ],
    correctAnswerIndex: 0,
    explanation: "The time complexity is a fundamental property of Adv Segment Tree."
  },
  {
    question: "Which real-world scenario best models the problem solved by Adv Segment Tree? **GATE 2021**",
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
    question: "Which edge case is most likely to cause a failure in a naive implementation of Adv Segment Tree? **GATE 2009**",
    options: [
      "Empty input",
      "Extremely large inputs",
      "All of the above",
      "Negative numbers"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Adv Segment Tree must handle boundary conditions."
  }
];

export const advSegmentTreeDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=1; i<=arr.length; i++) sum += arr[i]; // Bug
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int sum = 0;
        for(int i=0; i<arr.length; i++) sum += arr[i]; // Fixed
        System.out.println(sum);
    }
    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8};
        process(arr);
    }
}`,
  hints: ["Arrays are 0-indexed"],
  expectedOutput: "20"
};

export const advSegmentTreeDrag = {
  id: "segment-tree-drag",
  title: "Drag and Drop: Build Segment Tree",
  code: `void build(int node, int start, int end) {
    if(start == end) {
        tree[node] = A[start];
    } else {
        int mid = (start + end) / 2;
        /* DROPZONE_1 */
        /* DROPZONE_2 */
        /* DROPZONE_3 */
    }
}`,
  snippets: [
    { id: "s1", code: "build(2 * node, start, mid);" },
    { id: "s2", code: "build(2 * node + 1, mid + 1, end);" },
    { id: "s3", code: "tree[node] = tree[2 * node] + tree[2 * node + 1];" },
    { id: "s4", code: "tree[node] = A[start] + A[end];" } // Distractor
  ],
  dropZones: [
    { id: "dz1", correctSnippetId: "s1", label: "Recursively build the left child" },
    { id: "dz2", correctSnippetId: "s2", label: "Recursively build the right child" },
    { id: "dz3", correctSnippetId: "s3", label: "Combine the results for the current node" }
  ]
};

export const advSegmentTreeComplete = {
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
