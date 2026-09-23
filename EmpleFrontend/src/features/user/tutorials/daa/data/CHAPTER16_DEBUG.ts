export const CHAPTER16_DEBUG = [
  {
    instructions: "Fix the greedy choice logic for the Activity Selection problem.",
    buggy: "void select_activities(int start[], int finish[], int n) {\n    int i = 0;\n    printf(\"%d \", i);\n    for (int j = 1; j < n; j++) {\n        if (start[j] > finish[i]) {\n            printf(\"%d \", j);\n            i = j;\n        }\n    }\n}",
    fixed: "void select_activities(int start[], int finish[], int n) {\n    int i = 0;\n    printf(\"%d \", i);\n    for (int j = 1; j < n; j++) {\n        if (start[j] >= finish[i]) {\n            printf(\"%d \", j);\n            i = j;\n        }\n    }\n}",
    hints: ["An activity can start immediately as soon as the previous one finishes.", "The start time can be greater than OR EQUAL to the finish time."],
    expectedOutput: "Maximum compatible activities selected."
  },
  {
    instructions: "Correct the ratio comparison in Fractional Knapsack.",
    buggy: "int cmp(struct Item a, struct Item b) {\n    double r1 = a.value / a.weight;\n    double r2 = b.value / b.weight;\n    return r1 > r2;\n}",
    fixed: "int cmp(struct Item a, struct Item b) {\n    double r1 = (double)a.value / a.weight;\n    double r2 = (double)b.value / b.weight;\n    return r1 < r2;\n}",
    hints: ["Integer division truncates the decimal part!", "Cast to double before dividing. Also qsort expects negative/positive, or reverse boolean for descending order."],
    expectedOutput: "Items sorted perfectly by value-to-weight ratio."
  },
  {
    instructions: "Fix the array update logic in Job Sequencing with Deadlines.",
    buggy: "for (int i = 0; i < n; i++) {\n    for (int j = arr[i].dead; j > 0; j--) {\n        if (slot[j] == false) {\n            slot[j] = true;\n            break;\n        }\n    }\n}",
    fixed: "for (int i = 0; i < n; i++) {\n    for (int j = min(n, arr[i].dead) - 1; j >= 0; j--) {\n        if (slot[j] == false) {\n            slot[j] = true;\n            break;\n        }\n    }\n}",
    hints: ["Arrays are 0-indexed.", "The slot array checks should start from deadline - 1 and go down to 0."],
    expectedOutput: "Jobs allocated to valid timeslots."
  }
];