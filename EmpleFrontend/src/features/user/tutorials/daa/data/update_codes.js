const fs = require('fs');
const path = require('path');

const codes = {
  3: {
    desc: "Time-Space Tradeoff in Fibonacci",
    code: `// --- Time vs Space Tradeoff ---
#include <stdio.h>

/*
 * APPROACH 1: Recursive (Slow but saves memory)
 * Time: O(2^n) - Exponential, very slow!
 * Space: O(n) - Call stack depth
 */
int fib_recursive(int n) {
    if (n <= 1) return n;
    return fib_recursive(n - 1) + fib_recursive(n - 2);
}

/*
 * APPROACH 2: Dynamic Programming (Fast but uses memory)
 * Time: O(n) - Linear, extremely fast!
 * Space: O(n) - We allocate an array of size n
 */
int fib_dp(int n) {
    int dp[n+2];
    dp[0] = 0; 
    dp[1] = 1;
    
    // We trade space (the array) for time (only calculating once)
    for(int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}`
  },
  4: {
    desc: "Solving Recurrences with Recursion",
    code: `// --- Recurrence Relations in Code ---
#include <stdio.h>

/*
 * Example Recurrence: T(n) = 2*T(n/2) + O(n)
 * This is the classic Merge Sort recurrence!
 * By Master Theorem: a=2, b=2, f(n)=O(n).
 * Since n^(log_2(2)) = n^1 = O(n), it falls in Case 2.
 * Thus, Time Complexity is O(n log n)
 */
void mergeSortRecurrence(int n) {
    // Base case: T(1) = O(1)
    if (n <= 1) {
        printf("Base case reached\\n");
        return;
    }
    
    // O(n) work at current level (e.g., merging)
    printf("Doing O(n) work at level n=%d\\n", n);
    
    // 2 recursive calls of size n/2
    mergeSortRecurrence(n / 2);
    mergeSortRecurrence(n / 2);
}`
  },
  5: {
    desc: "Linear Search Implementation",
    code: `// --- Linear Search Algorithm ---
#include <stdio.h>

/*
 * ALGORITHM: Linear Search
 * Iterates through every element until the target is found.
 * 
 * Time Complexity: 
 *   - Best Case: O(1) (Found at first index)
 *   - Worst Case: O(n) (Found at last index or not present)
 * Space Complexity: O(1) (In-place)
 */
int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        // Check if current element matches the target
        if (arr[i] == target) {
            return i; // Return the index where found
        }
    }
    
    return -1; // Return -1 if not found
}

int main() {
    int data[] = {10, 23, 45, 70, 11, 15};
    int target = 70;
    int size = sizeof(data) / sizeof(data[0]);
    
    int result = linearSearch(data, size, target);
    printf("Element found at index: %d\\n", result);
    return 0;
}`
  },
  8: {
    desc: "Stable vs Unstable Sorting Example",
    code: `// --- Stable vs Unstable Sorting ---
#include <stdio.h>

/*
 * CONCEPT: Stability in Sorting
 * A sorting algorithm is STABLE if it preserves the relative order 
 * of equal elements from the original input.
 * 
 * For example, if we sort students by Grade, and two students 
 * have 'A', the one who was earlier in the list stays earlier.
 * 
 * STABLE sorts: Merge Sort, Insertion Sort, Bubble Sort
 * UNSTABLE sorts: Quick Sort, Heap Sort, Selection Sort
 */

typedef struct {
    char name[20];
    int grade;
} Student;

int main() {
    Student classList[] = {
        {"Alice", 90},
        {"Bob", 85}, // Bob comes before Charlie
        {"Charlie", 85}
    };
    
    printf("Understanding stability is crucial for multi-key sorts!\\n");
    return 0;
}`
  }
};

const dir = __dirname;
for (const [chNum, data] of Object.entries(codes)) {
  const filePath = path.join(dir, \`CHAPTER\${chNum}_CONTENT.ts\`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace from 'code:' to the end of the file
    content = content.replace(/code:\s*".*$/s, 
      \`codeDescription: "\${data.desc}",\\n  code: \\\`\${data.code}\\\`\\n};\`);
    fs.writeFileSync(filePath, content);
    console.log(\`Updated Chapter \${chNum}\`);
  }
}
