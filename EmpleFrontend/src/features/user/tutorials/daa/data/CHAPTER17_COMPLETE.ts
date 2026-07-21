export const CHAPTER17_COMPLETE = [
  {
    instruction: "Complete the condition in Activity Selection to check if the next activity can be attended.",
    template: `void selectActivities(int start[], int finish[], int n) {
    // Assume activities are sorted by finish time
    int i = 0; // The currently selected activity
    
    for (int j = 1; j < n; j++) {
        // Check if the next activity starts AFTER or WHEN the current one finishes
        if (start[j] ________ finish[i]) {
            printf("%d ", j);
            i = j; // Update the current activity
        }
    }
}`,
    answer: ">=",
    blanks: [">="]
  },
  {
    instruction: "Complete the calculation for the Fractional Knapsack when an item only partially fits.",
    template: `// If the item doesn't fully fit, take a fraction
if (capacity < weight[i]) {
    // We can only take 'capacity' amount of this item
    double fraction = (double) ________ / weight[i];
    totalValue += value[i] * fraction;
    break; // Knapsack is full
}`,
    answer: "capacity",
    blanks: ["capacity"]
  }
];