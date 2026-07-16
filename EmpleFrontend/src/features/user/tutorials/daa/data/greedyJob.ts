export const greedyJobContent = [
  {
    title: "1. Introduction",
    content: "Job Sequencing with Deadlines is a classic optimization problem that can be solved using the Greedy algorithm approach. The goal is to maximize the total profit by scheduling a set of jobs, each with a specific deadline and profit, on a single processor. It assumes that each job takes exactly one unit of time to complete."
  },
  {
    title: "2. Problem Statement",
    content: "Given an array of $n$ jobs, where each job has a deadline and an associated profit if completed before or on the deadline. Every job takes a single unit of time, and only one job can be scheduled at a time. Find the sequence of jobs that yields the maximum total profit."
  },
  {
    title: "3. Theory & Working",
    content: "The Greedy approach works by prioritizing jobs with the highest profit. \n\n1. **Sort** all jobs in descending order of their profit.\n2. **Initialize** an array `slots` of size equal to the maximum deadline among all jobs, initially all empty.\n3. **Iterate** through the sorted jobs. For each job, find the latest available time slot that is less than or equal to its deadline.\n4. If a slot is found, assign the job to that slot and add its profit to the total profit.\nThis guarantees that the most profitable jobs are scheduled, and by scheduling them as late as possible (closest to their deadline), earlier slots are left open for other jobs."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider jobs: J1(d=2, p=100), J2(d=1, p=19), J3(d=2, p=27), J4(d=1, p=25), J5(d=3, p=15).\n\n1. Sort by profit: J1(100), J3(27), J4(25), J2(19), J5(15).\n2. Max deadline is 3. Slots: [ _, _, _ ].\n3. Job J1 (d=2): Assign to slot 2. Slots: [ _, J1, _ ], Profit = 100.\n4. Job J3 (d=2): Slot 2 is full, assign to slot 1. Slots: [ J3, J1, _ ], Profit = 100 + 27 = 127.\n5. Job J4 (d=1): Slot 1 is full. Cannot schedule.\n6. Job J2 (d=1): Slot 1 is full. Cannot schedule.\n7. Job J5 (d=3): Assign to slot 3. Slots: [ J3, J1, J5 ], Profit = 127 + 15 = 142.\n\nTotal Profit = 142. Scheduled jobs: J3, J1, J5."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nJobSequencing(jobs, n):\n  Sort jobs in descending order of profit\n  max_deadline = find max deadline in jobs\n  slots = array of size max_deadline initialized to -1\n  total_profit = 0\n\n  for i = 0 to n-1:\n    for j = jobs[i].deadline - 1 down to 0:\n      if slots[j] == -1:\n        slots[j] = jobs[i].id\n        total_profit = total_profit + jobs[i].profit\n        break\n\n  return total_profit, slots\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n\ntypedef struct {\n    char id;\n    int deadline;\n    int profit;\n} Job;\n\nint compare(const void* a, const void* b) {\n    Job* j1 = (Job*)a;\n    Job* j2 = (Job*)b;\n    return j2->profit - j1->profit;\n}\n\nvoid printJobScheduling(Job arr[], int n) {\n    qsort(arr, n, sizeof(Job), compare);\n    \n    int max_deadline = 0;\n    for (int i = 0; i < n; i++) {\n        if (arr[i].deadline > max_deadline)\n            max_deadline = arr[i].deadline;\n    }\n    \n    char result[max_deadline];\n    bool slot[max_deadline];\n    \n    for (int i = 0; i < max_deadline; i++) slot[i] = false;\n    \n    int total_profit = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = arr[i].deadline - 1; j >= 0; j--) {\n            if (!slot[j]) {\n                result[j] = arr[i].id;\n                slot[j] = true;\n                total_profit += arr[i].profit;\n                break;\n            }\n        }\n    }\n    \n    printf(\"Scheduled Jobs: \");\n    for (int i = 0; i < max_deadline; i++) {\n        if (slot[i]) printf(\"%c \", result[i]);\n    }\n    printf(\"\\nTotal Profit: %d\\n\", total_profit);\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nimport java.util.Arrays;\n\nclass Job {\n    char id;\n    int deadline, profit;\n    public Job(char id, int deadline, int profit) {\n        this.id = id;\n        this.deadline = deadline;\n        this.profit = profit;\n    }\n}\n\npublic class JobSequencing {\n    public static void printJobScheduling(Job arr[], int n) {\n        Arrays.sort(arr, (a, b) -> b.profit - a.profit);\n\n        int max_deadline = 0;\n        for (int i = 0; i < n; i++) {\n            if (arr[i].deadline > max_deadline)\n                max_deadline = arr[i].deadline;\n        }\n\n        char[] result = new char[max_deadline];\n        boolean[] slot = new boolean[max_deadline];\n\n        int total_profit = 0;\n        for (int i = 0; i < n; i++) {\n            for (int j = arr[i].deadline - 1; j >= 0; j--) {\n                if (!slot[j]) {\n                    result[j] = arr[i].id;\n                    slot[j] = true;\n                    total_profit += arr[i].profit;\n                    break;\n                }\n            }\n        }\n\n        System.out.print(\"Scheduled Jobs: \");\n        for (int i = 0; i < max_deadline; i++) {\n            if (slot[i]) System.out.print(result[i] + \" \");\n        }\n        System.out.println(\"\\nTotal Profit: \" + total_profit);\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:**\n- Sorting the jobs takes $O(N \\log N)$.\n- Finding an available slot takes $O(D)$ in the worst case, where $D$ is the maximum deadline. Thus, for $N$ jobs, the slot assignment takes $O(N \\times D)$.\n- Overall Time Complexity: $O(N \\log N + N \\times D)$. Using a Disjoint Set Data Structure (Union-Find), this can be optimized to $O(N \\log N)$.\n\n**Space Complexity:**\n- $O(D)$ for the `result` and `slot` arrays, where $D$ is the maximum deadline."
  },
  {
    title: "9. Best/Worst/Avg Case",
    content: "**Best Case:** $O(N \\log N)$. Sorting takes $O(N \\log N)$. If all jobs have a deadline of $1, 2, \\dots, N$ and each job gets assigned immediately to its deadline slot without looping back, slot assignment takes $O(N)$.\n**Worst Case:** $O(N^2)$ (or $O(N \\times D)$). When all jobs have the same large deadline $D \\le N$, the inner loop scans backward completely for every job.\n**Average Case:** $O(N \\log N + N \\times D)$. Generally dependent on the distribution of deadlines."
  },
  {
    title: "10. In-place & Stability",
    content: "**In-place:** The standard algorithm uses $O(D)$ extra space for tracking time slots. While this space is proportional to the maximum deadline rather than the input size, it's strictly not in-place in the pure $O(1)$ sense.\n**Stability:** The greedy selection itself doesn't inherently depend on the stability of the sorting algorithm. If two jobs have the same profit, their relative order of checking does not affect the optimal total profit, though it may result in a different sequence of jobs."
  },
  {
    title: "11. Edge Cases",
    content: "1. **All jobs have the same deadline:** The algorithm effectively picks the top $D$ jobs with the highest profit.\n2. **Jobs with deadline 0:** Deadlines are typically $\\ge 1$. If a job has a deadline of $0$, it cannot be scheduled.\n3. **Number of jobs $N$ is less than Max Deadline $D$:** There will be empty slots, which is perfectly handled by checking the boolean array.\n4. **Multiple jobs with the same profit:** Any tie-breaking rule (or none at all) will still yield an optimal overall profit."
  },
  {
    title: "12. Applications",
    content: "1. **CPU Task Scheduling:** Scheduling independent tasks on a single processor to maximize resource utilization or reward.\n2. **Operations Research:** Maximizing profit in manufacturing sequences where machines take uniform time for setup and production.\n3. **Event Management:** Booking time slots for events where each event yields a certain revenue if it ends before its deadline.\n4. **Bandwidth Allocation:** Transmitting data packets over a network within a specific timeframe."
  },
  {
    title: "13. Common Mistakes",
    content: "1. **Not sorting by profit first:** Picking jobs purely based on closest deadlines or lowest deadlines can easily lead to suboptimal profit.\n2. **Assigning jobs to the earliest available slot instead of the latest:** If you assign a job to $t=1$ instead of its deadline $t=d$, you block slots for jobs that *must* be scheduled early (e.g., $d=1$). Always try to schedule as late as possible.\n3. **Using an array size of $N$ instead of Maximum Deadline:** The number of slots must accommodate the highest deadline, not necessarily the number of jobs."
  },
  {
    title: "14. Related Algorithms",
    content: "1. **Fractional Knapsack:** Another greedy algorithm that sorts items by value/weight ratio.\n2. **Activity Selection Problem:** Focuses on maximizing the *number* of activities rather than profit, typically sorted by finish time.\n3. **Interval Scheduling:** A broader class of scheduling algorithms where jobs have specific start and finish times.\n4. **Job Scheduling using Disjoint Sets:** An optimized $O(N \\log N)$ approach to this exact problem using Union-Find to find the latest available slot."
  },
  {
    title: "15. Interview Questions",
    content: "1. How would you optimize the slot finding process to reduce the time complexity? (Hint: Use Disjoint Sets / Union-Find).\n2. What happens if jobs take varying amounts of time instead of one unit? (This turns into a variation of the Knapsack or more complex scheduling problem, often requiring Dynamic Programming).\n3. Can we solve this problem using Dynamic Programming? If yes, what is the state transition?\n4. Why do we schedule jobs starting from their deadline and going backward rather than starting from time 1?"
  },
  {
    title: "16. Summary",
    content: "Job Sequencing with Deadlines is a prime example of the Greedy strategy applied to scheduling. By prioritizing high-profit jobs and placing them as close to their deadlines as possible, the algorithm guarantees an optimal profit for uniform-duration tasks. While the naive implementation runs in $O(N^2)$ worst-case time due to backward slot searching, using advanced data structures like Union-Find can optimize it to $O(N \\log N)$. Understanding this algorithm provides a strong foundation for tackling more complex resource allocation problems."
  }
];

export const greedyJobMcqs = [
  {
    question: "Which of the following best describes the worst-case time complexity of Greedy Job? **GATE 2011**",
    options: [
      "O(N^2)",
      "O(N)",
      "O(N log N)",
      "It depends on the input structure."
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Greedy Job."
  },
  {
    question: "If Greedy Job uses a heuristic, what does that imply about its solution? **GATE 2005**",
    options: [
      "It uses randomness.",
      "It is always optimal.",
      "It is approximate but fast.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 2,
    explanation: "Heuristics speed up Greedy Job at the cost of guaranteed optimality."
  },
  {
    question: "What is the primary trade-off when optimizing Greedy Job? **GATE 2006**",
    options: [
      "None",
      "Accuracy vs. Speed",
      "Time vs. Space",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 2,
    explanation: "Optimization often requires sacrificing memory for speed in Greedy Job."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Greedy Job? **GATE 2016**",
    options: [
      "Combinatorics",
      "Probability",
      "Loop invariants",
      "Graph theory"
    ],
    correctAnswerIndex: 1,
    explanation: "Formal proofs for Greedy Job often rely on establishing invariants."
  },
  {
    question: "Which of the following is a direct application of Greedy Job? **GATE 2012**",
    options: [
      "Network routing",
      "Cryptographic hashing",
      "Database indexing",
      "All of the above"
    ],
    correctAnswerIndex: 2,
    explanation: "Greedy Job has widespread applications across computer science domains."
  },
  {
    question: "Consider the worst-case scenario for Greedy Job. Which data structure would most likely degrade its performance? **GATE 2021**",
    options: [
      "Balanced Trees",
      "Linked Lists",
      "Hash Tables",
      "Arrays"
    ],
    correctAnswerIndex: 2,
    explanation: "Different data structures provide different access times which heavily influence Greedy Job."
  },
  {
    question: "What happens to Greedy Job if the input is already sorted (best-case)? **GATE 2015**",
    options: [
      "Behavior remains unchanged.",
      "It achieves its theoretical lower bound.",
      "It performs optimally.",
      "It degrades to worst-case."
    ],
    correctAnswerIndex: 1,
    explanation: "Input permutations can heavily affect Greedy Job."
  },
  {
    question: "In a standard implementation of Greedy Job, what is the auxiliary space complexity? **GATE 2019**",
    options: [
      "O(1)",
      "O(N)",
      "O(log N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 2,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Greedy Job? **GATE 2017**",
    options: [
      "Negative numbers",
      "All of the above",
      "Empty input",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 3,
    explanation: "Robust implementations of Greedy Job must handle boundary conditions."
  },
  {
    question: "In a distributed computing environment, how easily can Greedy Job be parallelized? **GATE 2011**",
    options: [
      "Moderately, requires synchronization.",
      "Impossible.",
      "Difficult, highly sequential.",
      "Easily, it is embarrassingly parallel."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing Greedy Job depends on data dependencies."
  },
  {
    question: "In the context of Greedy Job, what does the term 'optimal substructure' imply if applicable? **GATE 2016**",
    options: [
      "The algorithm uses optimal memory.",
      "The problem can be broken down into smaller, similar subproblems.",
      "The solution is always optimal.",
      "It runs in linear time."
    ],
    correctAnswerIndex: 2,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Greedy Job."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Greedy Job (if it is recursive)? **GATE 2020**",
    options: [
      "T(n) = T(n-1) + O(1)",
      "T(n) = T(n/2) + O(1)",
      "Depends on the specific variant",
      "T(n) = 2T(n/2) + O(n)"
    ],
    correctAnswerIndex: 3,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "Which algorithmic paradigm does Greedy Job primarily utilize? **GATE 2012**",
    options: [
      "Divide and Conquer",
      "Dynamic Programming",
      "Backtracking",
      "Greedy Approach"
    ],
    correctAnswerIndex: 2,
    explanation: "Identifying the core paradigm is crucial for understanding Greedy Job."
  },
  {
    question: "When comparing Greedy Job with naive approaches, what is the primary advantage? **GATE 2006**",
    options: [
      "No advantage",
      "Reduced time complexity",
      "Reduced space complexity",
      "Simpler implementation"
    ],
    correctAnswerIndex: 0,
    explanation: "Advanced algorithms like Greedy Job are designed to optimize resource usage."
  },
  {
    question: "How does Greedy Job behave under memory-constrained environments? **GATE 2005**",
    options: [
      "It runs normally.",
      "It fails gracefully.",
      "It requires an out-of-core adaptation.",
      "It crashes."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  }
];

export const greedyJobDebug = {
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

export const greedyJobDrag = {
  initialCode: `void printJobScheduling(Job arr[], int n) {
    // Sort jobs in descending order of profit
    qsort(arr, n, sizeof(Job), compare);

    int max_deadline = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i].deadline > max_deadline) max_deadline = arr[i].deadline;
    }

    bool slot[max_deadline];
    for (int i = 0; i < max_deadline; i++) slot[i] = false;

    int total_profit = 0;
    for (int i = 0; i < n; i++) {
        // Find a free slot for this job (starting from its deadline)
        ??? {
            if (!slot[j]) {
                slot[j] = true;
                ???;
                ???;
            }
        }
    }
}`,
  options: [
    "for (int j = arr[i].deadline - 1; j >= 0; j--)",
    "for (int j = 0; j < arr[i].deadline; j++)",
    "total_profit += arr[i].profit",
    "total_profit += arr[i].deadline",
    "break",
    "continue"
  ],
  correctOrder: [
    "for (int j = arr[i].deadline - 1; j >= 0; j--)",
    "total_profit += arr[i].profit",
    "break"
  ]
};

export const greedyJobComplete = {
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
