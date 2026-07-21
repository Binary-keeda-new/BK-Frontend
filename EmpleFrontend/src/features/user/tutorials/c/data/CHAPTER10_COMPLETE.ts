export const CHAPTER10_COMPLETE = [
  {
    instruction: "Fill in the blanks to assign the address of `val` to the pointer `ptr` and print the value using the pointer.",
    template: `#include <stdio.h>\n\nint main() {\n    float val = 3.14;\n    float ___ptr = ___val;\n    printf("%f\\n", ___ptr);\n    return 0;\n}`,
    answer: `#include <stdio.h>\n\nint main() {\n    float val = 3.14;\n    float *ptr = &val;\n    printf("%f\\n", *ptr);\n    return 0;\n}`,
    blanks: ["*", "&", "*"]
  },
  {
    instruction: "Fill in the blanks to dynamically allocate an integer using a pointer (assume standard library is included, just complete the syntax).",
    template: `int main() {\n    int *p = (int ___)malloc(sizeof(___));\n    ___p = 45;\n    printf("%d", *p);\n    free(p);\n    return 0;\n}`,
    answer: `int main() {\n    int *p = (int *)malloc(sizeof(int));\n    *p = 45;\n    printf("%d", *p);\n    free(p);\n    return 0;\n}`,
    blanks: ["*", "int", "*"]
  }
];
