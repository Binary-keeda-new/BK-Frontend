export const CHAPTER8_DEBUG = [
  {
    title: "Array Index Out of Bounds",
    instruction: "Fix the bug in the following code so it correctly calculates the sum of all elements.",
    buggy: `int main() {
  int arr[3] = {10, 20, 30};
  int sum = 0;
  for(int i = 1; i <= 3; i++) {
    sum += arr[i];
  }
  printf("%d", sum);
  return 0;
}`,
    fixed: `int main() {
  int arr[3] = {10, 20, 30};
  int sum = 0;
  for(int i = 0; i < 3; i++) {
    sum += arr[i];
  }
  printf("%d", sum);
  return 0;
}`,
    expectedOutput: "60",
    hints: ["Array indices in C are 0-based.", "The valid indices for an array of size 3 are 0, 1, and 2."]
  },
  {
    title: "Pointer to Array Elements",
    instruction: "Fix the bug in the following code to correctly print the first and second elements.",
    buggy: `int main() {
  int arr[2] = {5, 10};
  int *p = arr;
  printf("%d ", *p);
  printf("%d", *p + 1);
  return 0;
}`,
    fixed: `int main() {
  int arr[2] = {5, 10};
  int *p = arr;
  printf("%d ", *p);
  printf("%d", *(p + 1));
  return 0;
}`,
    expectedOutput: "5 10",
    hints: ["*p + 1 adds 1 to the value of the first element.", "You need to increment the pointer before dereferencing it, like *(p + 1)."]
  },
  {
    title: "Uninitialized Array Value",
    instruction: "Fix the bug in the code to initialize the third element to 100 before printing it.",
    buggy: `int main() {
  int arr[5];
  arr[1] = 100;
  printf("%d", arr[2]);
  return 0;
}`,
    fixed: `int main() {
  int arr[5];
  arr[2] = 100;
  printf("%d", arr[2]);
  return 0;
}`,
    expectedOutput: "100",
    hints: ["Array indices start from 0.", "The third element is at index 2."]
  }
];
