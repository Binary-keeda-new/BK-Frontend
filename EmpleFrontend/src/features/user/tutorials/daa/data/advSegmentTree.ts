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
    id: 1,
    question: "Consider a Segment Tree constructed for an array of size $N$. What is the total number of nodes (both internal and leaf) in the conceptual binary tree?",
    options: [
      "$N$",
      "$2N - 1$",
      "$2^{\\lceil \\log_2 N \\rceil + 1} - 1$",
      "$4N$"
    ],
    correctAnswer: 1,
    explanation: "A segment tree is a full binary tree (every internal node has exactly 2 children). A full binary tree with $N$ leaves has exactly $N - 1$ internal nodes. Thus, the total number of nodes is $N + N - 1 = 2N - 1$."
  },
  {
    id: 2,
    question: "When implementing a Segment Tree using a 1-based array representation, what is the maximum array index that might be accessed for an array of size $N$?",
    options: [
      "$2N - 1$",
      "$4N$",
      "$2^{\\lceil \\log_2 N \\rceil + 1} - 1$",
      "$N \\log N$"
    ],
    correctAnswer: 2,
    explanation: "The segment tree is represented as a nearly complete binary tree. The depth is $\\lceil \\log_2 N \\rceil$. The maximum number of nodes in a complete binary tree of this depth is $2^{\\lceil \\log_2 N \\rceil + 1} - 1$. The $4N$ rule of thumb is a safe upper bound since $2^{\\lceil \\log_2 N \\rceil + 1} - 1 < 4N$."
  },
  {
    id: 3,
    question: "Which of the following functions CANNOT be efficiently supported by a standard Segment Tree (without modifications like lazy propagation) in $\\mathcal{O}(\\log N)$ time?",
    options: [
      "Range Minimum Query (RMQ)",
      "Range Sum Query (RSQ)",
      "Point Update",
      "Range Add Update (add $V$ to all elements in $[L, R]$)"
    ],
    correctAnswer: 3,
    explanation: "A standard segment tree only supports point updates in $\\mathcal{O}(\\log N)$ time. Range updates take $\\mathcal{O}(N)$ in the worst case unless Lazy Propagation is used, which restores the $\\mathcal{O}(\\log N)$ complexity."
  },
  {
    id: 4,
    question: "In a Range GCD (Greatest Common Divisor) Segment Tree, what should the recursive query function return when the query interval is completely outside the node's interval?",
    options: [
      "$\\infty$",
      "$0$",
      "$1$",
      "$-1$"
    ],
    correctAnswer: 1,
    explanation: "The identity element for GCD is $0$ because $\\text{gcd}(x, 0) = x$. If a segment is out of bounds, returning $0$ ensures it does not affect the GCD of the valid segments."
  },
  {
    id: 5,
    question: "Consider a Segment Tree storing the sum of elements. A query for the interval $[L, R]$ visits certain nodes. What is the maximum number of nodes visited at any single level of the tree during a query?",
    options: [
      "2",
      "4",
      "$\\log N$",
      "$\\sqrt{N}$"
    ],
    correctAnswer: 1,
    explanation: "At any level of the segment tree, a range query will visit at most 4 nodes. If it visits more than 2 nodes, some of the middle nodes will be completely inside the query range and their children will not be visited, terminating that branch. Thus, at most 2 nodes per level expand further, leading to at most 4 nodes processed per level."
  },
  {
    id: 6,
    question: "In a 1-based array implementation of a Segment Tree, if a node is at index $k$, where are its left and right children located?",
    options: [
      "$2k$ and $2k + 1$",
      "$2k + 1$ and $2k + 2$",
      "$k/2$ and $k/2 + 1$",
      "$2k - 1$ and $2k$"
    ],
    correctAnswer: 0,
    explanation: "In a 1-based index representation of a binary tree, the left child of node $k$ is at $2k$, and the right child is at $2k + 1$."
  },
  {
    id: 7,
    question: "What is the time complexity to build a Segment Tree for an array of size $N$?",
    options: [
      "$\\mathcal{O}(\\log N)$",
      "$\\mathcal{O}(N)$",
      "$\\mathcal{O}(N \\log N)$",
      "$\\mathcal{O}(N^2)$"
    ],
    correctAnswer: 1,
    explanation: "Building the segment tree involves calculating the value for exactly $2N - 1$ nodes. Since each node's value is calculated in $\\mathcal{O}(1)$ time from its children, the total time complexity is $\\mathcal{O}(N)$."
  },
  {
    id: 8,
    question: "Let $A$ be an array of size $N$. We want to find the subsegment with the maximum sum within a given query range $[L, R]$. To achieve this using a Segment Tree, what minimal information must each node store?",
    options: [
      "Total sum and Maximum subsegment sum",
      "Maximum subsegment sum only",
      "Total sum, Prefix maximum sum, Suffix maximum sum, and Maximum subsegment sum",
      "Total sum and Prefix maximum sum"
    ],
    correctAnswer: 2,
    explanation: "To merge two nodes and find the maximum subsegment sum of the parent, we need: Total Sum (to compute parent's prefix/suffix), Prefix Max (max sum starting from left), Suffix Max (max sum ending at right), and Max Subsegment Sum. This allows combining overlapping subarrays."
  },
  {
    id: 9,
    question: "Which of the following correctly describes the Lazy Propagation technique in Segment Trees?",
    options: [
      "It delays building the tree until the first query is made.",
      "It updates only the leaf nodes and avoids updating internal nodes.",
      "It postpones updates to descendant nodes until they are explicitly needed by a query or another update.",
      "It reduces the space complexity of the segment tree from $\\mathcal{O}(N)$ to $\\mathcal{O}(\\log N)$."
    ],
    correctAnswer: 2,
    explanation: "Lazy propagation optimizes range updates by marking internal nodes with a 'lazy' value and delaying the propagation of these updates to their children until those children are actually accessed."
  },
  {
    id: 10,
    question: "Consider an array $A$ of size $N$. A Segment Tree node represents the interval $[L, R]$. What is the interval represented by its right child?",
    options: [
      "$[L, \\lfloor(L+R)/2\\rfloor]$",
      "$[\\lfloor(L+R)/2\\rfloor, R]$",
      "$[\\lfloor(L+R)/2\\rfloor + 1, R]$",
      "$[L + 1, R - 1]$"
    ],
    correctAnswer: 2,
    explanation: "The interval is split at $mid = \\lfloor(L+R)/2\\rfloor$. The left child handles $[L, mid]$ and the right child handles $[mid + 1, R]$."
  },
  {
    id: 11,
    question: "If a Segment Tree is used to answer Range Minimum Queries (RMQ), what identity value should be returned when a query segment does not overlap with the current node's segment?",
    options: [
      "$0$",
      "$-1$",
      "$-\\infty$",
      "$\\infty$"
    ],
    correctAnswer: 3,
    explanation: "For RMQ, the identity element is $\\infty$ (or a sufficiently large maximum value). This ensures that returning it from an out-of-bounds branch does not falsely minimize the result from the valid branches."
  },
  {
    id: 12,
    question: "In comparison to a Fenwick Tree (Binary Indexed Tree), a Segment Tree generally:",
    options: [
      "Requires less memory and is faster to write.",
      "Requires more memory but supports a wider variety of queries (like RMQ).",
      "Cannot handle point updates dynamically.",
      "Has a slower asymptotic time complexity for queries."
    ],
    correctAnswer: 1,
    explanation: "A standard Fenwick tree is highly space-efficient (size $N$) and simple to code for invertible operations like sum. Segment trees require more space ($4N$) but are more versatile, easily handling non-invertible operations like min/max (RMQ)."
  },
  {
    id: 13,
    question: "A Range Sum Segment Tree is built on an array initially containing all zeros. After $K$ point updates, what is the maximum possible height of the segment tree (assuming size $N$)?",
    options: [
      "$\\mathcal{O}(\\log K)$",
      "$\\mathcal{O}(\\log N)$",
      "$\\mathcal{O}(K \\log N)$",
      "$\\mathcal{O}(N)$"
    ],
    correctAnswer: 1,
    explanation: "The structure and height of a Segment Tree depend strictly on the array size $N$ and are invariant to the number of updates. The height is always $\\lceil \\log_2 N \\rceil + 1$, hence $\\mathcal{O}(\\log N)$."
  },
  {
    id: 14,
    question: "When applying a lazy update (e.g., adding $V$ to a range) to a node representing the interval $[L, R]$, how does the node's sum change?",
    options: [
      "It increases by $V$.",
      "It increases by $V \\times (R - L + 1)$.",
      "It is replaced by $V$.",
      "It remains unchanged until the children are updated."
    ],
    correctAnswer: 1,
    explanation: "If we are adding $V$ to every element in the range $[L, R]$, the total sum of this range increases by $V$ multiplied by the number of elements in the range, which is $(R - L + 1)$."
  },
  {
    id: 15,
    question: "Consider a Segment Tree node that covers the interval $[0, 7]$. If a query asks for the interval $[2, 5]$, which intervals will the two children of this root node recursively process?",
    options: [
      "$[0, 3]$ and $[4, 7]$",
      "$[2, 3]$ and $[4, 5]$",
      "$[0, 4]$ and $[5, 7]$",
      "$[0, 2]$ and $[3, 7]$"
    ],
    correctAnswer: 0,
    explanation: "The node $[0, 7]$ splits its interval at $mid = \\lfloor(0+7)/2\\rfloor = 3$. Its left child covers $[0, 3]$ and its right child covers $[4, 7]$. The recursive calls will be made on these fixed node intervals, passing the query interval $[2, 5]$ down."
  }
];

export const advSegmentTreeDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  id: "segment-tree-complete",
  title: "Complete Range Query",
  code: `int query(int node, int start, int end, int l, int r) {
    // 1. Completely outside
    if(r < start || BLANK_1) {
        return 0; 
    }
    // 2. Completely inside
    if(l <= start && BLANK_2) {
        return tree[node];
    }
    
    // 3. Partial overlap
    int mid = (start + end) / 2;
    int p1 = query(BLANK_3, start, mid, l, r);
    int p2 = query(2 * node + 1, BLANK_4, end, l, r);
    return (p1 + p2);
}`,
  blanks: [
    { id: "b1", correctValue: "end < l" },
    { id: "b2", correctValue: "end <= r" },
    { id: "b3", correctValue: "2 * node" },
    { id: "b4", correctValue: "mid + 1" }
  ]
};
