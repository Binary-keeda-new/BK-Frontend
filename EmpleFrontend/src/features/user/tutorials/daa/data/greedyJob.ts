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
    question: "In the Job Sequencing with Deadlines problem, each job takes exactly how much time to complete?",
    options: [
      "Proportional to its profit",
      "Proportional to its deadline",
      "One unit of time",
      "Variable, given in the input"
    ],
    correctAnswerIndex: 2,
    explanation: "The standard job sequencing with deadlines problem assumes that every job takes a single, uniform unit of time to complete."
  },
  {
    question: "To maximize profit in Job Sequencing using a greedy approach, what is the primary sorting criterion?",
    options: [
      "Ascending order of deadlines",
      "Descending order of deadlines",
      "Ascending order of profit",
      "Descending order of profit"
    ],
    correctAnswerIndex: 3,
    explanation: "The greedy strategy involves sorting the jobs in descending order of their profit to ensure the highest-yielding jobs are considered first."
  },
  {
    question: "When assigning a time slot to a job in the standard $O(N^2)$ algorithm, which slot is checked first?",
    options: [
      "The slot corresponding to $t=1$",
      "The slot corresponding to the job's deadline",
      "The last available slot in the entire sequence",
      "The slot corresponding to $t=0$"
    ],
    correctAnswerIndex: 1,
    explanation: "The algorithm tries to schedule a job as late as possible, starting at its deadline and scanning backward. This leaves earlier slots open for jobs with tighter deadlines."
  },
  {
    question: "Given 4 jobs with (Profit, Deadline): J1(100, 2), J2(10, 1), J3(15, 2), J4(27, 1). What is the maximum profit that can be earned?",
    options: [
      "127",
      "115",
      "142",
      "110"
    ],
    correctAnswerIndex: 0,
    explanation: "Sorted by profit: J1(100, 2), J4(27, 1), J3(15, 2), J2(10, 1). Max deadline = 2. Slots: [ _, _ ]. J1 takes slot 2. J4 takes slot 1. J3 cannot be scheduled. J2 cannot be scheduled. Total profit = 100 + 27 = 127."
  },
  {
    question: "If a Union-Find (Disjoint Set) data structure is used to optimize the slot allocation in Job Sequencing, what is the improved time complexity (excluding sorting)?",
    options: [
      "$O(N \\log N)$",
      "$O(N \\alpha(N))$",
      "$O(N)$",
      "$O(N^2)$"
    ],
    correctAnswerIndex: 1,
    explanation: "Using path compression in a Disjoint Set, finding the latest available slot takes near $O(1)$ amortized time, leading to $O(N \\alpha(N))$ for the allocation phase, where $\\alpha$ is the inverse Ackermann function."
  },
  {
    question: "Consider a scenario where all $N$ jobs have the same deadline $D$, and $N > D$. How many jobs will be scheduled optimally?",
    options: [
      "$N$",
      "$D$",
      "$N - D$",
      "None"
    ],
    correctAnswerIndex: 1,
    explanation: "Since there are only $D$ time slots available (from 1 to $D$) and each job takes 1 unit of time, exactly $D$ jobs can be scheduled. The greedy algorithm will naturally pick the $D$ jobs with the highest profits."
  },
  {
    question: "Why does the Greedy algorithm for Job Sequencing yield an optimal solution?",
    options: [
      "Because it explores all possible combinations.",
      "Because the problem satisfies the greedy-choice property and optimal substructure.",
      "Because it sorts jobs by deadline first.",
      "It doesn't always yield an optimal solution; it's an approximation."
    ],
    correctAnswerIndex: 1,
    explanation: "The problem exhibits the greedy-choice property (locally optimal choices lead to a globally optimal solution) and optimal substructure. This guarantees that picking the highest profit jobs and placing them as late as possible yields the maximum total profit."
  },
  {
    question: "Let array $A$ contain the profits and deadlines of $N$ jobs. In the worst case of the $O(N^2)$ algorithm, what condition causes the $O(N^2)$ behavior?",
    options: [
      "All jobs have deadlines $1, 2, 3, \\dots, N$.",
      "All jobs have deadline equal to 1.",
      "All jobs have a very large deadline $D \\ge N$, and earlier slots are filled late.",
      "The array is already sorted in ascending order of profit."
    ],
    correctAnswerIndex: 2,
    explanation: "If all jobs have a large deadline $N$, the algorithm scans backward from $N$ for every job. As slots fill up, subsequent jobs scan over many occupied slots, leading to $\\sum_{i=1}^N i = O(N^2)$ operations."
  },
  {
    question: "What is the maximum number of time slots needed to process the input jobs?",
    options: [
      "$N$ (total number of jobs)",
      "The maximum deadline among all given jobs",
      "The sum of all deadlines",
      "The average of all deadlines"
    ],
    correctAnswerIndex: 1,
    explanation: "Jobs can only be scheduled up to their maximum deadline. Thus, the array representing time slots only needs to be of size equal to the maximum deadline present in the input."
  },
  {
    question: "Consider jobs J1 to J5 with (Profit, Deadline): J1(20, 2), J2(15, 2), J3(10, 1), J4(5, 3), J5(1, 3). Which jobs are scheduled in the optimal solution?",
    options: [
      "J1, J2, J4",
      "J1, J2, J3",
      "J1, J3, J4",
      "J1, J2, J5"
    ],
    correctAnswerIndex: 0,
    explanation: "Sorted: J1(20,2), J2(15,2), J3(10,1), J4(5,3), J5(1,3). Max deadline=3. Slots: [_, _, _]. J1 to slot 2. J2 to slot 1. J3(deadline=1) fails since slot 1 is full. J4 to slot 3. Jobs scheduled: J2, J1, J4. Total profit = 40."
  },
  {
    question: "Which of the following problems is structurally most similar to the Job Sequencing with Deadlines problem where each job has a unit processing time?",
    options: [
      "0/1 Knapsack Problem",
      "Activity Selection Problem",
      "Fractional Knapsack Problem",
      "Minimum Spanning Tree"
    ],
    correctAnswerIndex: 1,
    explanation: "Both Job Sequencing and Activity Selection involve scheduling tasks on a single resource. However, Activity Selection focuses on maximizing the count of non-overlapping activities, while Job Sequencing focuses on maximizing profit."
  },
  {
    question: "In the disjoint-set optimization of the job sequencing algorithm, the 'parent' of a time slot $t$ represents:",
    options: [
      "The job assigned to slot $t$",
      "The deadline of the job assigned to slot $t$",
      "The greatest available time slot $a$ such that $a \\le t$",
      "The total profit accumulated up to time $t$"
    ],
    correctAnswerIndex: 2,
    explanation: "In the Union-Find optimization, each time slot points to the largest available time slot less than or equal to itself. When slot $t$ is occupied, we union it with $t-1$."
  }
];

export const greedyJobDebug = {
  instructions: "Fix the syntax error so the code compiles correctly.",
  buggyC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\")\n    return 0;\n}",
  fixedC: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
  buggyJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.printl(\"Hello World\");\n    }\n}",
  fixedJava: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}",
  hints: ["Check the print statement.","Missing semicolon or wrong spelling?","Fix it!"],
  expectedOutput: "Hello World"
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
  problemStatement: "Complete the Java implementation for Job Sequencing. The method should compute the maximum profit by scheduling tasks up to their deadlines.",
  initialCode: `import java.util.Arrays;

class Job {
    char id;
    int deadline, profit;
    public Job(char id, int deadline, int profit) {
        this.id = id;
        this.deadline = deadline;
        this.profit = profit;
    }
}

public class JobSequencing {
    public static int getMaxProfit(Job arr[], int n) {
        // Sort in descending order of profit
        Arrays.sort(arr, (a, b) -> b.profit - a.profit);

        int max_deadline = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i].deadline > max_deadline) {
                max_deadline = arr[i].deadline;
            }
        }

        boolean[] slot = new boolean[max_deadline];
        int total_profit = 0;

        for (int i = 0; i < n; i++) {
            // Find a slot starting from the job's deadline
            for (int j = arr[i].deadline - 1; j >= 0; j--) {
                if (/* missing condition */) {
                    slot[j] = true;
                    // Add profit
                    /* missing statement */
                    break;
                }
            }
        }
        return total_profit;
    }
}`,
  correctCode: `import java.util.Arrays;

class Job {
    char id;
    int deadline, profit;
    public Job(char id, int deadline, int profit) {
        this.id = id;
        this.deadline = deadline;
        this.profit = profit;
    }
}

public class JobSequencing {
    public static int getMaxProfit(Job arr[], int n) {
        // Sort in descending order of profit
        Arrays.sort(arr, (a, b) -> b.profit - a.profit);

        int max_deadline = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i].deadline > max_deadline) {
                max_deadline = arr[i].deadline;
            }
        }

        boolean[] slot = new boolean[max_deadline];
        int total_profit = 0;

        for (int i = 0; i < n; i++) {
            // Find a slot starting from the job's deadline
            for (int j = arr[i].deadline - 1; j >= 0; j--) {
                if (!slot[j]) {
                    slot[j] = true;
                    // Add profit
                    total_profit += arr[i].profit;
                    break;
                }
            }
        }
        return total_profit;
    }
}`
};
