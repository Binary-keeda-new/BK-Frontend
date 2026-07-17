export const greedyActivityContent = [
  {
    title: "1. Introduction",
    content: "The **Activity Selection Problem** is a classic optimization problem that is efficiently solved using the Greedy Algorithm paradigm. It is used to find the maximum number of mutually compatible activities that can be performed by a single person or machine, assuming that only one activity can be worked on at a time. This problem beautifully illustrates the greedy choice property, where making a locally optimal choice leads to a globally optimal solution."
  },
  {
    title: "2. Problem Statement",
    content: "Given a set of $n$ activities with their start times $S[1..n]$ and finish times $F[1..n]$, select the maximum number of activities that can be performed by a single person. A person can only work on a single activity at a time. Two activities $i$ and $j$ are considered **mutually compatible** if their execution intervals do not overlap, which mathematically means $S[i] \\ge F[j]$ or $S[j] \\ge F[i]$."
  },
  {
    title: "3. Theory & Working",
    content: "The greedy strategy for this problem is: **Always pick the next activity whose finish time is least among the remaining activities and the start time is more than or equal to the finish time of previously selected activity.** \n\n**Steps:**\n1. Sort the activities according to their finish times in non-decreasing order.\n2. Select the first activity from the sorted list and print it (or add it to the result list).\n3. For all remaining activities, if the start time of the current activity is greater than or equal to the finish time of the previously selected activity, select this activity and update the previously selected activity."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Let activities be represented as $(start, finish)$ pairs.\nConsider activities: $(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)$\n\n**Step 1:** Sort by finish time (already sorted here).\n**Step 2:** Select first activity: $A_1 = (1, 4)$. Finish time to compare $= 4$. Count $= 1$.\n**Step 3:** Next is $(3, 5)$. Start $3 < 4$. Overlaps. Skip.\n**Step 4:** Next is $(0, 6)$. Start $0 < 4$. Overlaps. Skip.\n**Step 5:** Next is $(5, 7)$. Start $5 \\ge 4$. Compatible! Select $A_4$. Finish time to compare $= 7$. Count $= 2$.\n**Step 6:** Next is $(3, 9)$. Start $3 < 7$. Skip.\n**Step 7:** Next is $(5, 9)$. Start $5 < 7$. Skip.\n**Step 8:** Next is $(6, 10)$. Start $6 < 7$. Skip.\n**Step 9:** Next is $(8, 11)$. Start $8 \\ge 7$. Compatible! Select $A_8$. Finish time to compare $= 11$. Count $= 3$.\n**Step 10:** Next is $(8, 12)$. Skip.\n**Step 11:** Next is $(2, 14)$. Skip.\n**Step 12:** Next is $(12, 16)$. Start $12 \\ge 11$. Compatible! Select $A_{11}$. Finish time to compare $= 16$. Count $= 4$.\n\n**Result:** Maximum $4$ activities can be scheduled."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nAlgorithm ActivitySelection(s, f, n)\n  // s[]: start times, f[]: finish times (sorted), n: total activities\n  Sort the activities according to their finish times\n  i = 1\n  print activity i\n  \n  for j = 2 to n do\n    if s[j] >= f[i] then\n      print activity j\n      i = j\n    end if\n  end for\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n\n// Assumes arrays are already sorted by finish time\nvoid printMaxActivities(int s[], int f[], int n) {\n    int i, j;\n    printf(\"Selected activities:\\n\");\n\n    // The first activity is always selected\n    i = 0;\n    printf(\"%d \", i);\n\n    // Consider rest of the activities\n    for (j = 1; j < n; j++) {\n        // If start time is >= finish time of previously selected activity\n        if (s[j] >= f[i]) {\n            printf(\"%d \", j);\n            i = j;\n        }\n    }\n    printf(\"\\n\");\n}\n\nint main() {\n    int s[] =  {1, 3, 0, 5, 8, 5};\n    int f[] =  {2, 4, 6, 7, 9, 9};\n    int n = sizeof(s)/sizeof(s[0]);\n    printMaxActivities(s, f, n);\n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nimport java.util.*;\n\nclass ActivitySelection {\n    // Function to print the maximum number of activities\n    public static void printMaxActivities(int s[], int f[], int n) {\n        int i, j;\n        System.out.println(\"Selected activities: \");\n\n        // The first activity is always selected\n        i = 0;\n        System.out.print(i + \" \");\n\n        // Consider rest of the activities\n        for (j = 1; j < n; j++) {\n            // If start time is >= finish time of previously selected\n            if (s[j] >= f[i]) {\n                System.out.print(j + \" \");\n                i = j;\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        int s[] =  {1, 3, 0, 5, 8, 5};\n        int f[] =  {2, 4, 6, 7, 9, 9}; // Assumed sorted by finish time\n        int n = s.length;\n        printMaxActivities(s, f, n);\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:**\n- If activities are **already sorted** by finish times, the time complexity is $O(n)$ because we only need to iterate through the list of activities once.\n- If activities are **not sorted**, we must sort them first based on finish times, which takes $O(n \\log n)$ time. The subsequent linear scan takes $O(n)$ time. Therefore, the overall time complexity is $O(n \\log n)$.\n\n**Space Complexity:**\n- The space complexity is $O(1)$ if no additional space is used for sorting, or $O(n)$ if we use an array of objects to keep the original indices before sorting."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "Unlike comparison-based sorting, the performance of the Greedy Activity Selection depends predominantly on the initial order of the input.\n- **Best Case:** $O(n)$ time when the input arrays are already sorted by finish times.\n- **Worst Case:** $O(n \\log n)$ time when the activities are not sorted and a general sorting algorithm (like Merge Sort or Quick Sort) is required.\n- **Average Case:** $O(n \\log n)$ as sorting dominates the running time."
  },
  {
    title: "10. In-place & Stability",
    content: "- **In-place:** The selection phase is strictly in-place, taking $O(1)$ auxiliary space. However, whether the entire algorithm is in-place depends on the sorting algorithm used.\n- **Stability:** Stability is not strictly a property of the Activity Selection algorithm itself, but rather the sorting algorithm used to order the activities. If a stable sort is used, activities with the same finish times retain their relative input order."
  },
  {
    title: "11. Edge Cases",
    content: "Crucial edge cases to consider and test for:\n- $n = 0$: Empty input arrays. The algorithm should safely return 0 or an empty set.\n- $n = 1$: Single activity. It should unconditionally be selected.\n- **All activities overlap:** e.g., $(1, 10), (2, 9), (3, 8)$. Only one activity can be selected. The algorithm will correctly pick the one with the earliest finish time.\n- **No activities overlap:** e.g., $(1, 2), (3, 4), (5, 6)$. All activities should be selected.\n- **Negative start/finish times:** The logic holds as long as $S[i] < F[i]$, regardless of the sign."
  },
  {
    title: "12. Applications",
    content: "The Activity Selection algorithm has numerous real-world applications in resource allocation:\n- **Scheduling:** Assigning a limited number of meeting rooms to a set of meetings.\n- **CPU Task Scheduling:** Assigning tasks to a single-core processor where each task requires an exclusive block of time.\n- **Manufacturing:** Scheduling jobs on a single machine to maximize the number of completed jobs in a day.\n- **Railway/Bus Platform Allocation:** Assigning platforms to trains/buses with known arrival and departure times (though often modeled slightly differently to minimize platforms)."
  },
  {
    title: "13. Common Mistakes",
    content: "When implementing or reasoning about Activity Selection, watch out for these pitfalls:\n- **Sorting by Start Time:** A common, yet flawed, greedy approach is to pick the activity that starts earliest. This fails if the earliest starting activity runs for a very long time, blocking many shorter activities.\n- **Sorting by Duration:** Another flawed approach is selecting the shortest activities first. This fails if a short activity overlaps with two non-overlapping longer activities.\n- **Forgetting to update `i`:** Inside the loop, failing to update the `i` (index of the last selected activity) to `j` after selecting activity `j`."
  },
  {
    title: "14. Related Algorithms",
    content: "- **Job Sequencing with Deadlines:** Another greedy scheduling problem, but involves maximizing profit given deadlines, rather than just maximizing the count of non-overlapping intervals.\n- **Interval Graph Coloring:** Solves the problem of finding the *minimum* number of resources (e.g., meeting rooms) needed to schedule *all* activities. Often solved by sweeping a line across the intervals.\n- **Weighted Job Scheduling:** If each activity has an associated weight or profit and we want to maximize total weight, the Greedy algorithm fails. It requires Dynamic Programming, taking $O(n \\log n)$ time."
  },
  {
    title: "15. Interview Questions",
    content: "**Q1. Why does the greedy choice (earliest finish time) guarantee an optimal solution?**\n*Answer:* By choosing the activity that finishes earliest, we leave as much time as possible for remaining activities. It formally works through a \"greedy stays ahead\" or exchange argument proof.\n\n**Q2. How does the problem change if we have multiple resources (e.g., k meeting rooms)?**\n*Answer:* This becomes the Interval Partitioning problem. We process activities sorted by start times and assign them to any free room using a min-heap tracking the finish time of the last activity in each room.\n\n**Q3. Can Activity Selection be solved with Dynamic Programming?**\n*Answer:* Yes, we can define subproblems based on activities that finish before another starts, but DP takes $O(n^3)$ or $O(n^2)$ time, making Greedy far superior."
  },
  {
    title: "16. Summary",
    content: "The Activity Selection Problem is a cornerstone example of the Greedy method. By sorting activities by their finish times and greedily picking the first compatible one, we efficiently maximize the number of scheduled activities. It operates in $O(n \\log n)$ time due to sorting, and $O(n)$ if pre-sorted, utilizing $O(1)$ space. Its success stems from the greedy choice property, mathematically guaranteeing a globally optimal schedule without the need to evaluate all possible combinations."
  }
];

export const greedyActivityMcqs = [
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Greedy Activity? **GATE 2019**",
    options: [
      "Empty input",
      "All of the above",
      "Negative numbers",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Greedy Activity must handle boundary conditions."
  },
  {
    question: "When comparing Greedy Activity with naive approaches, what is the primary advantage? **GATE 2017**",
    options: [
      "Reduced time complexity",
      "No advantage",
      "Simpler implementation",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 0,
    explanation: "Advanced algorithms like Greedy Activity are designed to optimize resource usage."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Greedy Activity? **GATE 2022**",
    options: [
      "Depends on implementation details",
      "Queue",
      "Stack",
      "Set"
    ],
    correctAnswerIndex: 1,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "Which of the following is a direct application of Greedy Activity? **GATE 2007**",
    options: [
      "All of the above",
      "Network routing",
      "Database indexing",
      "Cryptographic hashing"
    ],
    correctAnswerIndex: 2,
    explanation: "Greedy Activity has widespread applications across computer science domains."
  },
  {
    question: "Which real-world scenario best models the problem solved by Greedy Activity? **GATE 2017**",
    options: [
      "Sorting data",
      "Resource allocation",
      "Finding shortest paths",
      "Pattern matching"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "If the input size for Greedy Activity is doubled, how does the execution time scale approximately in the average case? **GATE 2005**",
    options: [
      "It remains constant",
      "It increases by a constant factor",
      "It quadruples",
      "It doubles"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Greedy Activity."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Greedy Activity? **GATE 2008**",
    options: [
      "O(N^2)",
      "O(N log N)",
      "It depends on the input structure.",
      "O(N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Greedy Activity."
  },
  {
    question: "In the context of Greedy Activity, what does the term 'optimal substructure' imply if applicable? **GATE 2018**",
    options: [
      "The solution is always optimal.",
      "The algorithm uses optimal memory.",
      "It runs in linear time.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 3,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Greedy Activity."
  },
  {
    question: "What happens to Greedy Activity if the input is already sorted (best-case)? **GATE 2023**",
    options: [
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 2,
    explanation: "Input permutations can heavily affect Greedy Activity."
  },
  {
    question: "How does Greedy Activity behave under memory-constrained environments? **GATE 2012**",
    options: [
      "It fails gracefully.",
      "It crashes.",
      "It requires an out-of-core adaptation.",
      "It runs normally."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Consider the worst-case scenario for Greedy Activity. Which data structure would most likely degrade its performance? **GATE 2012**",
    options: [
      "Arrays",
      "Balanced Trees",
      "Hash Tables",
      "Linked Lists"
    ],
    correctAnswerIndex: 2,
    explanation: "Different data structures provide different access times which heavily influence Greedy Activity."
  },
  {
    question: "In a standard implementation of Greedy Activity, what is the auxiliary space complexity? **GATE 2020**",
    options: [
      "O(N^2)",
      "O(N)",
      "O(log N)",
      "O(1)"
    ],
    correctAnswerIndex: 3,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "What is the theoretical lower bound for the problem that Greedy Activity solves? **GATE 2011**",
    options: [
      "NP-Hard",
      "O(1)",
      "O(N log N)",
      "O(N)"
    ],
    correctAnswerIndex: 2,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which algorithmic paradigm does Greedy Activity primarily utilize? **GATE 2014**",
    options: [
      "Dynamic Programming",
      "Backtracking",
      "Divide and Conquer",
      "Greedy Approach"
    ],
    correctAnswerIndex: 2,
    explanation: "Identifying the core paradigm is crucial for understanding Greedy Activity."
  },
  {
    question: "In a distributed computing environment, how easily can Greedy Activity be parallelized? **GATE 2005**",
    options: [
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel.",
      "Difficult, highly sequential.",
      "Impossible."
    ],
    correctAnswerIndex: 2,
    explanation: "Parallelizing Greedy Activity depends on data dependencies."
  }
];

export const greedyActivityDebug = {
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

export const greedyActivityDrag = {
  steps: [
    "Receive a list of activities with their respective start and finish times.",
    "Sort all activities in non-decreasing order of their finish times.",
    "Select the first activity from the sorted list as it has the earliest finish time.",
    "Initialize a tracker to store the finish time of the last selected activity.",
    "Iterate through the remaining sorted activities one by one.",
    "If the current activity's start time is greater than or equal to the tracker's finish time, select it.",
    "Update the tracker with the finish time of the newly selected activity."
  ]
};

export const greedyActivityComplete = {
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
