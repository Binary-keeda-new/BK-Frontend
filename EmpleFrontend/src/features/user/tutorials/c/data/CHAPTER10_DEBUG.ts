export const CHAPTER10_DEBUG = [
  {
    title: "Pointer Initialization",
    instruction: "Fix the bug in the following code so that it prints the value 100.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int num = 100;\n    int *ptr = num;\n    printf("%d\\n", *ptr);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int num = 100;\n    int *ptr = &num;\n    printf("%d\\n", *ptr);\n    return 0;\n}`,
    expectedOutput: "100",
    hints: [
      "A pointer must store the memory address of a variable.",
      "Are you assigning the value of `num` or its address to `ptr`?",
      "Use the address-of operator `&`."
    ]
  },
  {
    title: "Array and Pointer Arithmetic",
    instruction: "Fix the bug to print the third element of the array using pointer arithmetic.",
    buggy: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    int *p = arr;\n    printf("%d\\n", *p + 2);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    int *p = arr;\n    printf("%d\\n", *(p + 2));\n    return 0;\n}`,
    expectedOutput: "30",
    hints: [
      "The order of operations is important here.",
      "`*p + 2` dereferences `p` first, then adds 2 to the value.",
      "Use parentheses to add 2 to the pointer before dereferencing it."
    ]
  },
  {
    title: "Swapping Values using Pointers",
    instruction: "Fix the bug in the `swap` function to successfully swap the values of `a` and `b`.",
    buggy: `#include <stdio.h>\n\nvoid swap(int x, int y) {\n    int temp = x;\n    x = y;\n    y = temp;\n}\n\nint main() {\n    int a = 5, b = 10;\n    swap(a, b);\n    printf("%d %d\\n", a, b);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 5, b = 10;\n    swap(&a, &b);\n    printf("%d %d\\n", a, b);\n    return 0;\n}`,
    expectedOutput: "10 5",
    hints: [
      "C uses pass-by-value, so the function modifies copies of the variables.",
      "To modify the original variables, you need to pass their addresses (pointers).",
      "Update the function signature to accept pointers, dereference them inside the function, and pass addresses using `&` in `main`."
    ]
  }
];
