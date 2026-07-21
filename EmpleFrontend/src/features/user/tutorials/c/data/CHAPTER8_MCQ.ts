export const CHAPTER8_MCQ = [
  {
    q: "Consider the following C declaration: `int a[3][4] = { {1,2,3,4}, {5,6,7,8}, {9,10,11,12} };` What is the value of `*(*(a+1)+2)`? **GATE 2005**",
    options: ["5", "6", "7", "8"],
    ans: 2,
    explanation: "`a+1` points to the second 1D array {5,6,7,8}. `*(a+1)` is the base address of this 1D array. `*(a+1)+2` points to the 3rd element of the second array, which is 7. Dereferencing it gives 7."
  },
  {
    q: "In C, if an array is passed as an argument to a function, what actually gets passed? **GATE 2004**",
    options: ["Value of elements in array", "First element of the array", "Base address of the array", "Address of the last element of array"],
    ans: 2,
    explanation: "When an array is passed to a function, it decays into a pointer to its first element, meaning the base address of the array is passed."
  },
  {
    q: "Consider `int arr[5] = {10, 20, 30, 40, 50};`. What is the value of `arr[3] == *(arr + 3)`? **GATE 2011**",
    options: ["0", "1", "Syntax error", "Runtime error"],
    ans: 1,
    explanation: "In C, `arr[i]` is internally evaluated as `*(arr + i)`. So `arr[3]` and `*(arr + 3)` represent the same value, returning 1 (true)."
  },
  {
    q: "The size of an array `int arr[] = {1, 2, 3, 4, 5};` can be calculated using which expression? **GATE 2015**",
    options: ["sizeof(arr)", "sizeof(arr) / sizeof(arr[0])", "len(arr)", "sizeof(arr) * sizeof(int)"],
    ans: 1,
    explanation: "`sizeof(arr)` gives the total size in bytes, and dividing by `sizeof(arr[0])` gives the number of elements."
  },
  {
    q: "Consider a 2D array `int A[10][20];`. If the base address of A is 1000 and each integer takes 4 bytes, what is the address of `A[4][5]` assuming row-major order? **GATE 2008**",
    options: ["1340", "1360", "1440", "1180"],
    ans: 0,
    explanation: "Address = Base + Size * (RowIndex * Columns + ColIndex) = 1000 + 4 * (4 * 20 + 5) = 1000 + 4 * (85) = 1000 + 340 = 1340."
  },
  {
    q: "What is the output of the following C code snippet?\n`int a[5] = {1, 2, 3}; printf(\"%d\", a[3]);` **GATE 2018**",
    options: ["3", "Garbage value", "0", "Compilation error"],
    ans: 2,
    explanation: "When an array is partially initialized, the remaining elements are automatically initialized to 0. So `a[3]` is 0."
  },
  {
    q: "Consider the declaration `int a[5];`. Which of the following is equivalent to `a`? **GATE 2007**",
    options: ["&a", "&a[0]", "&a[1]", "a[0]"],
    ans: 1,
    explanation: "The array name `a` represents the address of the first element, which is `&a[0]`."
  },
  {
    q: "Which of the following correctly declares a multidimensional array in C? **GATE 2010**",
    options: ["int arr[3,3];", "int arr(3,3);", "int arr[3][3];", "int arr{3}{3};"],
    ans: 2,
    explanation: "In C, multidimensional arrays are declared using multiple pairs of square brackets, e.g., `int arr[3][3];`."
  },
  {
    q: "If `int a[] = {10, 20, 30};` and `int *p = a;`, what does `*p++` evaluate to, and what does `p` point to afterwards? **GATE 2014**",
    options: ["Evaluates to 10, points to 20", "Evaluates to 20, points to 20", "Evaluates to 10, points to 10", "Evaluates to 20, points to 30"],
    ans: 0,
    explanation: "The postfix `++` operator binds tighter than `*`. So `*p++` first evaluates `*p` (which is 10), and then increments `p` to point to the next element (20)."
  },
  {
    q: "Are the expressions `arr[i]` and `i[arr]` equivalent in C? **GATE 2021**",
    options: ["Yes", "No", "Depends on compiler", "Runtime error"],
    ans: 0,
    explanation: "Both evaluate to `*(arr + i)` and `*(i + arr)`, which are identical due to the commutativity of addition. Thus, `arr[i]` and `i[arr]` are exactly the same."
  }
];
