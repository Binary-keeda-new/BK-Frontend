export const CHAPTER17_DEBUG = [
  {
    instructions: "This Activity Selection algorithm fails to pick the maximum number of activities because the activities are not sorted correctly first.",
    buggy: `void selectActivities(int start[], int finish[], int n) {
    // Bug: It assumes the activities are already sorted by finish time!
    int i = 0;
    printf("%d ", i);
    
    for (int j = 1; j < n; j++) {
        if (start[j] >= finish[i]) {
            printf("%d ", j);
            i = j;
        }
    }
}`,
    fixed: `void selectActivities(int start[], int finish[], int n) {
    // Fix: The array MUST be sorted by finish time first!
    // (Assume a function sortByFinishTime exists and is called here)
    sortByFinishTime(start, finish, n);
    
    int i = 0;
    printf("%d ", i);
    
    for (int j = 1; j < n; j++) {
        if (start[j] >= finish[i]) {
            printf("%d ", j);
            i = j;
        }
    }
}`,
    hints: [
      "The greedy choice for Activity Selection is to pick the activity that FINISHES EARLIEST.",
      "If the input arrays are [10, 1] (start) and [20, 2] (finish), it will wrongly pick activity 0 first.",
      "The data must be sorted by finish time before the loop."
    ],
    expectedOutput: "The activities are processed in the correct order to maximize the count."
  },
  {
    instructions: "This Fractional Knapsack implementation calculates the value/weight ratio using integer division, losing precision.",
    buggy: `double getMaxValue(int weight[], int value[], int n, int capacity) {
    // ... assuming arrays are sorted by ratio ...
    double totalValue = 0.0;
    for (int i = 0; i < n; i++) {
        if (capacity >= weight[i]) {
            capacity -= weight[i];
            totalValue += value[i];
        } else {
            // Bug: Integer division truncates the fraction! (e.g., 5/10 becomes 0)
            totalValue += value[i] * (capacity / weight[i]);
            break;
        }
    }
    return totalValue;
}`,
    fixed: `double getMaxValue(int weight[], int value[], int n, int capacity) {
    // ... assuming arrays are sorted by ratio ...
    double totalValue = 0.0;
    for (int i = 0; i < n; i++) {
        if (capacity >= weight[i]) {
            capacity -= weight[i];
            totalValue += value[i];
        } else {
            // Fix: Cast to double to preserve the fractional ratio
            totalValue += value[i] * ((double)capacity / weight[i]);
            break;
        }
    }
    return totalValue;
}`,
    hints: [
      "In C, if you divide an integer by an integer (e.g., 5 / 10), the result is an integer (0).",
      "We need a fraction of the value!",
      "Cast 'capacity' to a double before dividing."
    ],
    expectedOutput: "Accurately calculates the maximum fractional value."
  },
  {
    instructions: "This greedy coin change function gets stuck in an infinite loop if the coin denominations don't perfectly make change.",
    buggy: `void makeChange(int coins[], int n, int amount) {
    // Coins sorted descending: [25, 10, 5, 1]
    int i = 0;
    while (amount > 0) {
        if (coins[i] <= amount) {
            amount -= coins[i];
            printf("%d ", coins[i]);
        }
        // Bug: If coins[i] > amount, 'i' is never incremented!
    }
}`,
    fixed: `void makeChange(int coins[], int n, int amount) {
    // Coins sorted descending: [25, 10, 5, 1]
    int i = 0;
    while (amount > 0 && i < n) {
        if (coins[i] <= amount) {
            amount -= coins[i];
            printf("%d ", coins[i]);
        } else {
            // Fix: Move to the next smaller coin denomination
            i++;
        }
    }
}`,
    hints: [
      "What happens if amount is 12, and coins[i] is 25?",
      "The 'if' condition is false. The loop repeats. amount is still 12, coins[i] is still 25.",
      "Add an 'else' block to increment 'i' (try a smaller coin)."
    ],
    expectedOutput: "The loop progresses through the coins and terminates."
  }
];