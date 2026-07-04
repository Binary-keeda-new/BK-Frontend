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
        question: "Which of the following algorithm paradigms is best suited to find the optimal solution for the Fractional Knapsack problem?",
        options: [
            "Dynamic Programming",
            "Greedy Approach",
            "Divide and Conquer",
            "Backtracking"
        ],
        correctAnswer: 1,
        explanation: "The Fractional Knapsack problem can be solved optimally using the Greedy approach by sorting items based on their value-to-weight ratio."
    },
    {
        question: "In the Fractional Knapsack problem, on what basis are the items sorted before they are picked?",
        options: [
            "Ascending order of weights",
            "Descending order of values",
            "Descending order of value-to-weight ratio",
            "Ascending order of value-to-weight ratio"
        ],
        correctAnswer: 2,
        explanation: "To maximize the total value, items are sorted in descending order of their value-to-weight ratio (profit per unit weight)."
    },
    {
        question: "What is the standard time complexity of the Fractional Knapsack problem when solved using a comparison-based sorting algorithm?",
        options: [
            "O(n)",
            "O(n log n)",
            "O(n^2)",
            "O(W) where W is the capacity"
        ],
        correctAnswer: 1,
        explanation: "The dominant operation is sorting the items based on their ratio, which takes O(n log n) time using an efficient comparison-based sorting algorithm."
    },
    {
        question: "Consider a knapsack with a capacity of 50. There are three items: I1 (Value: 60, Weight: 10), I2 (Value: 100, Weight: 20), and I3 (Value: 120, Weight: 30). What is the maximum value that can be obtained in the Fractional Knapsack problem?",
        options: [
            "220",
            "240",
            "260",
            "280"
        ],
        correctAnswer: 1,
        explanation: "Ratios: I1=6, I2=5, I3=4. Pick I1 (wt=10, val=60). Rem wt=40. Pick I2 (wt=20, val=100). Rem wt=20. Pick fraction of I3: (20/30) * 120 = 80. Total value = 60 + 100 + 80 = 240."
    },
    {
        question: "Why does the Greedy strategy fail for the 0/1 Knapsack problem?",
        options: [
            "Because we cannot compute the value-to-weight ratio for discrete items.",
            "Because picking an item based on the highest ratio might leave empty space that cannot be filled, leading to a sub-optimal solution.",
            "Because sorting takes too much time for large capacities.",
            "Because the Greedy strategy assumes weights are always negative."
        ],
        correctAnswer: 1,
        explanation: "In the 0/1 Knapsack problem, items cannot be broken. A greedy choice might leave empty space in the knapsack that could have been better utilized by a different combination of items."
    },
    {
        question: "Is it theoretically possible to solve the Fractional Knapsack problem in O(n) time?",
        options: [
            "No, because sorting is strictly required.",
            "Yes, by using dynamic programming.",
            "Yes, by using a linear-time selection algorithm (like median of medians) to partition the items.",
            "No, the lower bound is O(n log n) for any knapsack variant."
        ],
        correctAnswer: 2,
        explanation: "The Fractional Knapsack problem can indeed be solved in O(n) worst-case time by using an O(n) selection algorithm to find the weighted median, avoiding a full sort of all elements."
    },
    {
        question: "Consider a fractional knapsack instance with items sorted by value-to-weight ratio. If the sum of all item weights is exactly equal to the knapsack capacity W, what will be the complexity of the greedy phase (excluding sorting)?",
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ],
        correctAnswer: 2,
        explanation: "The greedy phase simply iterates through the sorted array of n items. Even if all items fit perfectly, it will still take O(n) time to process them and compute the total value."
    },
    {
        question: "In a worst-case scenario, how many items will be taken fractionally in the Fractional Knapsack algorithm?",
        options: [
            "Exactly 0",
            "Exactly 1",
            "At most 1",
            "Up to n"
        ],
        correctAnswer: 2,
        explanation: "The algorithm takes items wholly until the remaining capacity is smaller than the next item's weight. At that point, it takes a fraction of that single item to exactly fill the knapsack and terminates. Thus, at most 1 item is taken fractionally."
    },
    {
        question: "Which data structure is typically implicit when simulating the Greedy choice for Fractional Knapsack via sorting?",
        options: [
            "Stack",
            "Queue",
            "Priority Queue (Max Heap)",
            "Hash Table"
        ],
        correctAnswer: 2,
        explanation: "Sorting the items effectively orders them by priority (highest ratio first). Alternatively, a Max Heap (Priority Queue) can be used to extract the item with the highest ratio one by one."
    },
    {
        question: "A fractional knapsack algorithm is implemented using a Max Heap instead of full sorting. What is the time complexity if only k items are evaluated before the knapsack is filled?",
        options: [
            "O(n + k log n)",
            "O(k log n)",
            "O(n log k)",
            "O(n log n)"
        ],
        correctAnswer: 0,
        explanation: "Building the Max Heap takes O(n) time. Extracting the maximum element k times takes O(k log n) time. Thus, the total time complexity is O(n + k log n)."
    },
    {
        question: "Let array V = [20, 30, 10] and array W = [10, 20, 5]. Capacity C = 15. What fraction of the second highest ratio item is taken?",
        options: [
            "0",
            "1/2",
            "1/4",
            "1"
        ],
        correctAnswer: 0,
        explanation: "Ratios: I1=2, I2=1.5, I3=2. Sort: I1, I3, I2 (or I3, I1, I2). Take I1 (wt=10, rem=5). Take I3 (wt=5, rem=0). No capacity left. Wait, the first items taken are I1 and I3, both having ratio 2. The second highest ratio is 1.5 (I2). Since capacity is 0, fraction of I2 taken is 0."
    },
    {
        question: "When applying Fractional Knapsack, what happens if an item has a weight of 0 but a positive value?",
        options: [
            "It will cause an infinite loop.",
            "Its ratio is infinite, so it should be prioritized and taken fully, adding to value without consuming capacity.",
            "It is ignored by the algorithm.",
            "The algorithm requires weights to be strictly positive."
        ],
        correctAnswer: 1,
        explanation: "Mathematically, the ratio approaches infinity. From a logical standpoint, picking it adds value without using any capacity, so it is the best possible choice and must be taken fully immediately."
    }
];

export const greedyFractionalKnapsackDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
    code: `
double fractionalKnapsack(int W, struct Item arr[], int n) {
    // Sort items...
    qsort(arr, n, sizeof(struct Item), compare);

    int currentWeight = 0;
    double finalValue = 0.0;

    for (int i = 0; i < n; i++) {
        if (currentWeight + arr[i].weight <= W) {
            currentWeight += arr[i].weight;
            // complete the line
        } else {
            int remain = W - currentWeight;
            // complete the line
            break;
        }
    }
    return finalValue;
}
`,
    blanks: [
        {
            expected: "finalValue += arr[i].value;",
            hint: "Update the total value accumulated so far by adding the current item's full value."
        },
        {
            expected: "finalValue += arr[i].value * ((double)remain / arr[i].weight);",
            hint: "Update the total value by adding the fractional value of the current item. Remember to use double precision."
        }
    ],
    explanation: "When taking a full item, its total value is added. When the knapsack capacity is reached but an item partially fits, we calculate the fraction of its weight that can fit `(double)remain / arr[i].weight`, multiply it by the item's value, and add it to `finalValue` before breaking out of the loop."
};
