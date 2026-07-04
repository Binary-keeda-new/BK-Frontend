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
    question: "Which of the following greedy strategies always yields an optimal solution for the standard Activity Selection Problem (maximizing the number of mutually compatible activities)?",
    options: [
      "Selecting the activity with the earliest start time.",
      "Selecting the activity with the minimum duration.",
      "Selecting the activity with the earliest finish time.",
      "Selecting the activity with the fewest overlapping conflicts."
    ],
    correctAnswer: 2,
    explanation: "Selecting the activity that finishes first leaves the maximum possible remaining time for subsequent activities, thus maximizing the count."
  },
  {
    question: "Consider a set of activities defined by (start, finish) times: (1, 2), (3, 4), (0, 6), (5, 7), (8, 9), (5, 9). What is the maximum number of mutually compatible activities that can be scheduled?",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correctAnswer: 2,
    explanation: "Activities sorted by finish time: A1=(1,2), A2=(3,4), A3=(0,6), A4=(5,7), A5=(8,9), A6=(5,9). Select A1 (finishes at 2). Next compatible is A2 (starts at 3). Next compatible is A4 (starts at 5). Next compatible is A5 (starts at 8). Total activities selected = 4."
  },
  {
    question: "What is the time complexity of the Activity Selection algorithm if the given input arrays of start and finish times are NOT sorted?",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(2^n)"
    ],
    correctAnswer: 1,
    explanation: "If the activities are not sorted, sorting them based on their finish times requires O(n log n) time. The subsequent greedy selection step takes O(n) time. The overall time complexity is dominated by sorting, yielding O(n log n)."
  },
  {
    question: "In an instance of the Activity Selection Problem, suppose multiple activities have the exact same finish time. Does the order in which they are placed during sorting affect the optimal number of activities selected?",
    options: [
      "Yes, breaking ties incorrectly can lead to a suboptimal solution.",
      "No, because any tie-breaking rule among equal finish times still guarantees a maximum subset.",
      "Yes, ties must be broken by selecting the activity with the latest start time.",
      "Yes, ties must be broken by selecting the activity with the earliest start time."
    ],
    correctAnswer: 1,
    explanation: "All activities with the same finish time will be mutually exclusive among themselves (except possibly if they have zero duration). Regardless of which one is picked, it ends at the same time and leaves exactly the same space for future activities."
  },
  {
    question: "Suppose we modified the Activity Selection problem such that each activity also has an associated positive profit, and we want to maximize the total profit instead of just the count. Which algorithmic approach is required?",
    options: [
      "The exact same Greedy approach (sort by finish time).",
      "Greedy approach (sort by profit/duration ratio).",
      "Dynamic Programming (Weighted Job Scheduling).",
      "Divide and Conquer."
    ],
    correctAnswer: 2,
    explanation: "When activities have weights/profits, the problem becomes Weighted Job Scheduling. The greedy choice property fails, and Dynamic Programming is required to find the optimal solution in O(n log n) time."
  },
  {
    question: "Consider the greedy strategy: 'Select the activity with the minimum duration (finish - start)'. Which counterexample proves this strategy is NOT always optimal?",
    options: [
      "(0, 10), (10, 20)",
      "(1, 5), (4, 6), (5, 9)",
      "(0, 4), (5, 9)",
      "(2, 4), (1, 6), (5, 8)"
    ],
    correctAnswer: 1,
    explanation: "In the set (1, 5), (4, 6), (5, 9), the minimum duration activity is (4, 6) with duration 2. Selecting it conflicts with both (1, 5) and (5, 9). We end up with 1 activity. The optimal choice is (1, 5) and (5, 9), giving 2 activities."
  },
  {
    question: "If we solve the Activity Selection Problem using Dynamic Programming instead of Greedy, what would be the worst-case time complexity of the standard DP formulation without optimizations?",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n^2) or O(n^3)",
      "O(2^n)"
    ],
    correctAnswer: 2,
    explanation: "A straightforward DP approach evaluates subproblems recursively, checking all compatible splits, typically resulting in an O(n^3) or O(n^2) time complexity, which is vastly inferior to the O(n log n) Greedy approach."
  },
  {
    question: "Let A be an optimal solution set of activities produced by the greedy algorithm. If activity X is the one with the earliest finish time in the entire input set, which of the following is true?",
    options: [
      "X may or may not be in A.",
      "X is definitely in A.",
      "X is only in A if it has the earliest start time.",
      "X is never in A."
    ],
    correctAnswer: 1,
    explanation: "The greedy algorithm explicitly selects the activity with the earliest finish time as its first choice. Therefore, X is definitively included in the optimal set A produced by the greedy strategy."
  },
  {
    question: "Consider a variant where an activity requires a setup time 'k' before it can start. So, if activity A is selected, the next activity B must satisfy start_B >= finish_A + k. How can the greedy algorithm be adapted?",
    options: [
      "Sort by (finish + k) instead of finish.",
      "Add 'k' to all start times, then run standard greedy.",
      "Add 'k' to all finish times, then run standard greedy.",
      "The greedy approach no longer works; DP is required."
    ],
    correctAnswer: 2,
    explanation: "By effectively treating the finish time of each activity as finish + k, we encapsulate the setup time into the activity's duration. The standard greedy algorithm (sorting by these new finish times) still guarantees an optimal solution."
  },
  {
    question: "Which of the following problems can be reduced to the Activity Selection Problem?",
    options: [
      "Finding the minimum number of meeting rooms required to schedule a set of meetings.",
      "Finding the maximum number of compatible jobs that can be scheduled on a single machine.",
      "Finding the shortest path in a Directed Acyclic Graph.",
      "Finding the Minimum Spanning Tree of a graph."
    ],
    correctAnswer: 1,
    explanation: "The Activity Selection Problem is exactly equivalent to finding the maximum number of compatible jobs that can be processed sequentially on a single machine. Finding the minimum meeting rooms is the Interval Partitioning problem."
  },
  {
    question: "Let S be a set of activities. If we sort S by non-increasing order of start times (latest start time first) and greedily select the first compatible activity, does this yield an optimal solution?",
    options: [
      "Yes, it is symmetrically equivalent and yields an optimal solution.",
      "No, this greedy strategy always produces a suboptimal solution.",
      "No, it might fail depending on the finish times.",
      "Yes, but only if all activities have the same duration."
    ],
    correctAnswer: 0,
    explanation: "This is a symmetric backward approach. Starting from the end of the timeline, picking the activity that starts the latest leaves the most room for activities that happen earlier. It is mathematically equivalent and yields an optimal solution."
  },
  {
    question: "In the context of the Activity Selection Problem, what is the space complexity of the selection phase (excluding the space required for sorting)?",
    options: [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n^2)"
    ],
    correctAnswer: 1,
    explanation: "The selection phase only requires a few integer variables (like an index tracking the previously selected activity), taking O(1) auxiliary space."
  }
];

export const greedyActivityDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problem: "Complete the C code to correctly select the maximum number of mutually compatible activities. Assume the input arrays are already sorted by finish time.",
  codeSnippet: `
void printMaxActivities(int s[], int f[], int n) {
    int i = 0; // First activity selected
    printf("%d ", i);
    
    for (int j = 1; j < n; j++) {
        // If start time is >= finish time of the previously selected activity
        if (BLANK) {
            printf("%d ", j);
            i = j;
        }
    }
}
`,
  solution: "s[j] >= f[i]"
};
