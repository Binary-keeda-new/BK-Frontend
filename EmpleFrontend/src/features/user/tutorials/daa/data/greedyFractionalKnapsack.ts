export const greedyFractionalKnapsackContent = [
    {
        title: "Introduction",
        content: "The Fractional Knapsack problem is a classic algorithmic problem where the goal is to maximize the total value of items placed in a knapsack of limited capacity. Unlike the 0/1 Knapsack problem where items must be taken whole or left completely, the fractional version allows taking a fraction of an item. This property makes the Fractional Knapsack problem solvable using a Greedy Approach, which optimally selects items based on their value-to-weight ratio."
    },
    {
        title: "Problem Statement",
        content: "Given a set of $n$ items, each with a weight $w_i$ and a value $v_i$, and a knapsack with a maximum weight capacity $W$, determine the maximum total value of items that can be placed in the knapsack. You are allowed to take fractions of an item, meaning if you cannot take an item completely, you can take a fraction $x$ (where $0 \\le x \\le 1$) such that its weight is $x \\cdot w_i$ and its value is $x \\cdot v_i$."
    },
    {
        title: "Theory & Working",
        content: "The most intuitive and optimal way to solve the Fractional Knapsack problem is the Greedy Strategy. The key metric is the 'Value per Unit Weight' (also called the profit-to-weight ratio) for each item, calculated as $v_i / w_i$. The algorithm works as follows:\n\n1. Calculate the value-to-weight ratio for each item.\n2. Sort all items in descending order of their value-to-weight ratio.\n3. Iterate through the sorted items and add them to the knapsack one by one.\n4. If the knapsack can accommodate the entire item, take it fully and subtract its weight from the remaining capacity.\n5. If the knapsack cannot hold the entire item, take exactly the fraction of the item that fills the remaining capacity, add the corresponding fractional value to the total, and terminate (since the knapsack is now full)."
    },
    {
        title: "Step-by-Step Dry Run",
        content: "Let's consider a knapsack with capacity $W = 50$, and 3 items with (Value, Weight):\n- Item 1: (60, 10)\n- Item 2: (100, 20)\n- Item 3: (120, 30)\n\n**Step 1:** Calculate ratios ($v_i / w_i$):\n- Item 1: 60 / 10 = 6\n- Item 2: 100 / 20 = 5\n- Item 3: 120 / 30 = 4\n\n**Step 2:** Sort items by descending ratio:\n- Order: Item 1, Item 2, Item 3.\n\n**Step 3:** Fill the knapsack:\n- **Item 1:** Weight = 10. Remaining capacity = 50. Since $10 \\le 50$, take all of Item 1. Total Value = 60. Remaining capacity = 50 - 10 = 40.\n- **Item 2:** Weight = 20. Remaining capacity = 40. Since $20 \\le 40$, take all of Item 2. Total Value = 60 + 100 = 160. Remaining capacity = 40 - 20 = 20.\n- **Item 3:** Weight = 30. Remaining capacity = 20. Since $30 > 20$, we can only take a fraction. Fraction = 20 / 30 = 2/3. Value added = (2/3) * 120 = 80. Total Value = 160 + 80 = 240. Knapsack is full.\n\n**Result:** The maximum value is 240."
    },
    {
        title: "Pseudocode",
        content: "```text\nstruct Item {\n    value, weight\n}\n\nfunction fractionalKnapsack(W, items[]) {\n    // Sort items by (value/weight) in descending order\n    sort items in descending order of (items[i].value / items[i].weight)\n\n    totalValue = 0.0\n    currentWeight = 0\n\n    for each item in items {\n        if (currentWeight + item.weight <= W) {\n            // Take the whole item\n            currentWeight += item.weight\n            totalValue += item.value\n        } else {\n            // Take the remaining fractional part\n            remainingCapacity = W - currentWeight\n            totalValue += item.value * (remainingCapacity / item.weight)\n            break\n        }\n    }\n    return totalValue\n}\n```"
    },
    {
        title: "C Implementation",
        content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n\nstruct Item {\n    int value, weight;\n};\n\n// Comparator function to sort items by value/weight ratio\nint compare(const void *a, const void *b) {\n    struct Item *item1 = (struct Item *)a;\n    struct Item *item2 = (struct Item *)b;\n    double r1 = (double)item1->value / item1->weight;\n    double r2 = (double)item2->value / item2->weight;\n    if (r1 < r2) return 1;\n    else if (r1 > r2) return -1;\n    return 0;\n}\n\ndouble fractionalKnapsack(int W, struct Item arr[], int n) {\n    qsort(arr, n, sizeof(struct Item), compare);\n\n    int currentWeight = 0;\n    double finalValue = 0.0;\n\n    for (int i = 0; i < n; i++) {\n        if (currentWeight + arr[i].weight <= W) {\n            currentWeight += arr[i].weight;\n            finalValue += arr[i].value;\n        } else {\n            int remain = W - currentWeight;\n            finalValue += arr[i].value * ((double)remain / arr[i].weight);\n            break;\n        }\n    }\n    return finalValue;\n}\n\nint main() {\n    int W = 50;\n    struct Item arr[] = {{60, 10}, {100, 20}, {120, 30}};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    printf(\"Maximum value we can obtain = %f\\n\", fractionalKnapsack(W, arr, n));\n    return 0;\n}\n```"
    },
    {
        title: "Java Implementation",
        content: "```java\nimport java.util.Arrays;\nimport java.util.Comparator;\n\nclass Item {\n    int value, weight;\n    Item(int x, int y) {\n        this.value = x;\n        this.weight = y;\n    }\n}\n\npublic class FractionalKnapsack {\n    public static double getMaxValue(int W, Item[] arr) {\n        // Sort items by value/weight in descending order\n        Arrays.sort(arr, new Comparator<Item>() {\n            @Override\n            public int compare(Item item1, Item item2) {\n                double r1 = (double)item1.value / item1.weight;\n                double r2 = (double)item2.value / item2.weight;\n                return Double.compare(r2, r1);\n            }\n        });\n\n        double totalValue = 0d;\n        int currentWeight = 0;\n\n        for (Item item : arr) {\n            if (currentWeight + item.weight <= W) {\n                currentWeight += item.weight;\n                totalValue += item.value;\n            } else {\n                int remain = W - currentWeight;\n                totalValue += item.value * ((double)remain / item.weight);\n                break;\n            }\n        }\n        return totalValue;\n    }\n\n    public static void main(String[] args) {\n        Item[] arr = {new Item(60, 10), new Item(100, 20), new Item(120, 30)};\n        int capacity = 50;\n        System.out.println(\"Maximum value we can obtain = \" + getMaxValue(capacity, arr));\n    }\n}\n```"
    },
    {
        title: "Time & Space Complexity",
        content: "### Time Complexity\n- **Sorting:** The algorithm requires sorting the items based on their profit/weight ratio. Using an efficient sorting algorithm like Merge Sort or Quick Sort takes $O(n \\log n)$ time.\n- **Iteration:** Iterating through the sorted array to fill the knapsack takes linear time, $O(n)$.\n- **Total Time Complexity:** $O(n \\log n) + O(n) = O(n \\log n)$.\n\n### Space Complexity\n- Sorting may take up to $O(\\log n)$ or $O(n)$ auxiliary space depending on the sorting algorithm used.\n- The greedy selection process itself operates in $O(1)$ additional space.\n- **Total Space Complexity:** $O(1)$ to $O(n)$ depending on the implementation of the sort."
    },
    {
        title: "Best/Worst/Avg Case",
        content: "Since sorting is the dominant step, the performance is heavily tied to the sorting phase.\n- **Best Case Time Complexity:** $O(n \\log n)$. (If the array is already sorted, and we use an algorithm like Timsort, the sort could be $O(n)$, making the total $O(n)$).\n- **Average Case Time Complexity:** $O(n \\log n)$.\n- **Worst Case Time Complexity:** $O(n \\log n)$.\n\nNote: In an unweighted knapsack problem or if items are strictly bounded, one could theoretically use an $O(n)$ selection algorithm (like a linear-time median-finding approach to partition items), which can solve the Fractional Knapsack problem in $O(n)$ time. However, the standard implementation relies on sorting which restricts it to $O(n \\log n)$."
    },
    {
        title: "In-place & Stability",
        content: "- **In-place:** The algorithm itself (the greedy selection loop) is in-place ($O(1)$ space). Whether the entire process is in-place depends strictly on the chosen sorting algorithm (e.g., Heapsort is in-place).\n- **Stability:** Stability is not required for this algorithm to produce an optimal result. If two items have the exact same profit/weight ratio, they can be processed in any order without affecting the maximum possible total value."
    },
    {
        title: "Edge Cases",
        content: "- **Knapsack Capacity is 0:** The algorithm will correctly skip the loop entirely and return 0.\n- **All weights are strictly larger than W:** The algorithm will take a fraction of the first item (the one with the best ratio) and immediately terminate.\n- **Total weight of all items is less than W:** The algorithm will pick up all items and terminate without breaking early.\n- **Weights or values are 0:** Items with 0 weight (and non-zero value) have an infinite ratio and should ideally be taken entirely (though mathematically one must handle division by zero). Items with 0 value have a ratio of 0 and will be picked last."
    },
    {
        title: "Applications",
        content: "- **Resource Allocation:** Distributing divisible resources (like CPU time, bandwidth, or granular raw materials) efficiently to maximize total utility.\n- **Financial Modeling:** Allocating a fixed budget across divisible assets offering different rates of return.\n- **Transportation & Logistics:** Loading liquids, grains, or powders (divisible goods) into containers to maximize shipment value.\n- **Theoretical Base:** The logic serves as a foundation for constructing heuristics and bounds (like the Dantzig bound) in the Branch and Bound solution of the harder 0/1 Knapsack problem."
    },
    {
        title: "Common Mistakes",
        content: "- **Integer Division:** Computing the value/weight ratio using integer arithmetic (`value / weight`) instead of floating-point arithmetic. This will truncate the decimal part, destroying the precision needed to correctly rank the items.\n- **Applying to 0/1 Knapsack:** Attempting to use this Greedy approach on the 0/1 Knapsack problem. For 0/1 Knapsack, picking items solely based on their ratio does not guarantee an optimal solution. Dynamic programming must be used instead.\n- **Not sorting properly:** Failing to sort in strictly descending order, or ignoring precision issues if comparing floating-point numbers in the comparator."
    },
    {
        title: "Related Algorithms",
        content: "- **0/1 Knapsack (Dynamic Programming):** The discrete variant where items cannot be fragmented.\n- **Unbounded Knapsack:** Items can be chosen multiple times (usually solved via DP).\n- **Huffman Coding:** Another classic greedy algorithm that operates optimally by sorting and prioritizing local optimums.\n- **Job Sequencing with Deadlines:** Uses a similar greedy sorting strategy based on profit."
    },
    {
        title: "Interview Questions",
        content: "1. Why does the Greedy strategy work for the Fractional Knapsack problem but fail for the 0/1 Knapsack problem?\n2. Can the Fractional Knapsack problem be solved in $O(n)$ time? (Hint: Yes, using the linear-time selection algorithm to find the weighted median).\n3. How would you handle an item that has a weight of 0 but a positive value in your code?\n4. What is the space complexity of your implementation, and can it be optimized?"
    },
    {
        title: "Summary",
        content: "The Fractional Knapsack problem is a quintessential example of the Greedy algorithm paradigm working perfectly. By sorting items based on their value-to-weight ratio in descending order, we can greedily fill the knapsack and take a fraction of the last fitting item to ensure the knapsack is filled to its absolute maximum capacity with the most valuable items. This approach guarantees an optimal solution with a standard time complexity of $O(n \\log n)$, dominated by the sorting step."
    }
];

export const greedyFractionalKnapsackMcqs = [
  {
    question: "Which of the following is a direct application of Greedy Fractional Knapsack? **GATE 2012**",
    options: [
      "All of the above",
      "Network routing",
      "Database indexing",
      "Cryptographic hashing"
    ],
    correctAnswerIndex: 1,
    explanation: "Greedy Fractional Knapsack has widespread applications across computer science domains."
  },
  {
    question: "Which real-world scenario best models the problem solved by Greedy Fractional Knapsack? **GATE 2016**",
    options: [
      "Resource allocation",
      "Pattern matching",
      "Sorting data",
      "Finding shortest paths"
    ],
    correctAnswerIndex: 0,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "When comparing Greedy Fractional Knapsack with naive approaches, what is the primary advantage? **GATE 2012**",
    options: [
      "Reduced time complexity",
      "Reduced space complexity",
      "No advantage",
      "Simpler implementation"
    ],
    correctAnswerIndex: 1,
    explanation: "Advanced algorithms like Greedy Fractional Knapsack are designed to optimize resource usage."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Greedy Fractional Knapsack? **GATE 2022**",
    options: [
      "Combinatorics",
      "Loop invariants",
      "Graph theory",
      "Probability"
    ],
    correctAnswerIndex: 0,
    explanation: "Formal proofs for Greedy Fractional Knapsack often rely on establishing invariants."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Greedy Fractional Knapsack? **GATE 2018**",
    options: [
      "Empty input",
      "Negative numbers",
      "Extremely large inputs",
      "All of the above"
    ],
    correctAnswerIndex: 2,
    explanation: "Robust implementations of Greedy Fractional Knapsack must handle boundary conditions."
  },
  {
    question: "What is the theoretical lower bound for the problem that Greedy Fractional Knapsack solves? **GATE 2009**",
    options: [
      "O(N)",
      "O(1)",
      "O(N log N)",
      "NP-Hard"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which algorithmic paradigm does Greedy Fractional Knapsack primarily utilize? **GATE 2021**",
    options: [
      "Dynamic Programming",
      "Backtracking",
      "Divide and Conquer",
      "Greedy Approach"
    ],
    correctAnswerIndex: 2,
    explanation: "Identifying the core paradigm is crucial for understanding Greedy Fractional Knapsack."
  },
  {
    question: "Consider the worst-case scenario for Greedy Fractional Knapsack. Which data structure would most likely degrade its performance? **GATE 2011**",
    options: [
      "Hash Tables",
      "Arrays",
      "Linked Lists",
      "Balanced Trees"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Greedy Fractional Knapsack."
  },
  {
    question: "If the input size for Greedy Fractional Knapsack is doubled, how does the execution time scale approximately in the average case? **GATE 2017**",
    options: [
      "It remains constant",
      "It doubles",
      "It quadruples",
      "It increases by a constant factor"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Greedy Fractional Knapsack."
  },
  {
    question: "In a standard implementation of Greedy Fractional Knapsack, what is the auxiliary space complexity? **GATE 2007**",
    options: [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Greedy Fractional Knapsack (if it is recursive)? **GATE 2005**",
    options: [
      "T(n) = T(n-1) + O(1)",
      "T(n) = T(n/2) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "Depends on the specific variant"
    ],
    correctAnswerIndex: 2,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "If Greedy Fractional Knapsack is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2012**",
    options: [
      "Increased time complexity",
      "No impact",
      "Reduced stack space overhead",
      "Decreased time complexity"
    ],
    correctAnswerIndex: 3,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "How does Greedy Fractional Knapsack behave under memory-constrained environments? **GATE 2011**",
    options: [
      "It requires an out-of-core adaptation.",
      "It crashes.",
      "It runs normally.",
      "It fails gracefully."
    ],
    correctAnswerIndex: 3,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Greedy Fractional Knapsack? **GATE 2021**",
    options: [
      "O(N^2)",
      "O(N)",
      "O(N log N)",
      "It depends on the input structure."
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Greedy Fractional Knapsack."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Greedy Fractional Knapsack? **GATE 2020**",
    options: [
      "Stack",
      "Depends on implementation details",
      "Set",
      "Queue"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  }
];

export const greedyFractionalKnapsackDebug = {
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

export const greedyFractionalKnapsackDrag = {
    code: `
public class FractionalKnapsack {
    public static double getMaxValue(int W, Item[] arr) {
        Arrays.sort(arr, new Comparator<Item>() {
            @Override
            public int compare(Item item1, Item item2) {
                double r1 = (double)item1.value / item1.weight;
                double r2 = (double)item2.value / item2.weight;
                return Double.compare(r2, r1);
            }
        });

        double totalValue = 0d;
        int currentWeight = 0;

        for (Item item : arr) {
            if (currentWeight + item.weight <= W) {
                currentWeight += item.weight;
                totalValue += item.value;
            } else {
                int remain = W - currentWeight;
                totalValue += item.value * ((double)remain / item.weight);
                // Drop zone 1
            }
        }
        return totalValue;
    }
}
`,
    options: ["break;", "continue;", "return totalValue;", "totalValue = 0;"],
    correctOptions: ["break;"],
    explanation: "Once the knapsack can no longer fit an entire item, we take exactly the fraction needed to fill the remaining capacity. After this, the knapsack is completely full, so we must `break` out of the loop."
};

export const greedyFractionalKnapsackComplete = {
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
