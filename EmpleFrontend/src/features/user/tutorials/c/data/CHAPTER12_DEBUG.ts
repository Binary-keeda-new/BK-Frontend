export const CHAPTER12_DEBUG = [
  {
    title: "Memory Leak Prevention",
    instruction: "Fix the bug in the following code.",
    buggy: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int *)malloc(sizeof(int));\n    *ptr = 10;\n    printf("%d\\n", *ptr);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int *)malloc(sizeof(int));\n    *ptr = 10;\n    printf("%d\\n", *ptr);\n    free(ptr);\n    return 0;\n}`,
    expectedOutput: "10",
    hints: ["You allocated memory using malloc.", "What happens to the memory when you don't need it anymore?", "Use free() to prevent memory leaks."]
  },
  {
    title: "Handling Allocation Failure",
    instruction: "Fix the bug in the following code.",
    buggy: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int *)malloc(100 * sizeof(int));\n    *ptr = 5;\n    printf("%d\\n", *ptr);\n    free(ptr);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int *)malloc(100 * sizeof(int));\n    if (ptr == NULL) {\n        return 1;\n    }\n    *ptr = 5;\n    printf("%d\\n", *ptr);\n    free(ptr);\n    return 0;\n}`,
    expectedOutput: "5",
    hints: ["What if malloc fails and returns NULL?", "Dereferencing a NULL pointer causes a crash.", "Check if ptr is NULL before using it."]
  },
  {
    title: "Correct Element Sizing",
    instruction: "Fix the bug in the following code.",
    buggy: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Allocate memory for 5 integers\n    int *ptr = (int *)malloc(5);\n    ptr[0] = 42;\n    printf("%d\\n", ptr[0]);\n    free(ptr);\n    return 0;\n}`,
    fixed: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Allocate memory for 5 integers\n    int *ptr = (int *)malloc(5 * sizeof(int));\n    ptr[0] = 42;\n    printf("%d\\n", ptr[0]);\n    free(ptr);\n    return 0;\n}`,
    expectedOutput: "42",
    hints: ["malloc() takes the number of bytes to allocate.", "An integer is usually more than 1 byte.", "Use the sizeof operator."]
  }
];
