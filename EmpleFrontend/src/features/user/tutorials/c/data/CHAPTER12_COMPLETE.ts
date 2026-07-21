export const CHAPTER12_COMPLETE = [
  {
    instruction: "Fill in the blanks to dynamically allocate an array of 5 integers, initialize them to 0 using calloc, and then free the memory.",
    template: `#include <stdio.h>\n#include <___>\n\nint main() {\n    int *arr = (int *)___(5, sizeof(int));\n    printf("%d", arr[0]);\n    ___(arr);\n    return 0;\n}`,
    answer: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = (int *)calloc(5, sizeof(int));\n    printf("%d", arr[0]);\n    free(arr);\n    return 0;\n}`,
    blanks: ["stdlib.h", "calloc", "free"]
  },
  {
    instruction: "Fill in the blanks to resize the dynamically allocated memory to hold 10 integers.",
    template: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int *)malloc(5 * sizeof(int));\n    ptr = (int *)___(ptr, 10 * ___);\n    free(ptr);\n    return 0;\n}`,
    answer: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int *)malloc(5 * sizeof(int));\n    ptr = (int *)realloc(ptr, 10 * sizeof(int));\n    free(ptr);\n    return 0;\n}`,
    blanks: ["realloc", "sizeof(int)"]
  }
];
