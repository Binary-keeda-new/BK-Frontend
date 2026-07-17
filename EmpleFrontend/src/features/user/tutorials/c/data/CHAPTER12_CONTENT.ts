export const CHAPTER12_CONTENT = {
  title: "Dynamic Memory Allocation",
  description: "Dynamic memory allocation allows a program to obtain memory at runtime. In C, this is done using functions provided in the `<stdlib.h>` library: `malloc()`, `calloc()`, `realloc()`, and `free()`. It offers the flexibility to request memory only when needed, which helps in efficient memory management and creating dynamic data structures like linked lists, trees, and graphs.",
  points: [
    {
      heading: "The `malloc()` Function",
      body: "The `malloc()` (memory allocation) function allocates a single large block of contiguous memory according to the size specified. It returns a `void` pointer to the allocated memory, which can be cast to the desired type. If the allocation fails, it returns `NULL`.\n\nExample:\n```c\nint *ptr = (int *)malloc(5 * sizeof(int));\n```"
    },
    {
      heading: "The `calloc()` Function",
      body: "The `calloc()` (contiguous allocation) function allocates multiple blocks of memory, each of the same size, and initializes all bytes to zero. It takes two arguments: the number of elements and the size of each element.\n\nExample:\n```c\nint *ptr = (int *)calloc(5, sizeof(int));\n```"
    },
    {
      heading: "The `realloc()` Function",
      body: "The `realloc()` (re-allocation) function changes the size of previously allocated memory without losing the old data. It is useful when the initially allocated memory is insufficient or excessive.\n\nExample:\n```c\nptr = (int *)realloc(ptr, 10 * sizeof(int));\n```"
    },
    {
      heading: "The `free()` Function",
      body: "Memory allocated dynamically is not automatically freed when it goes out of scope. The `free()` function is used to deallocate the memory, returning it to the system. Failing to free memory leads to memory leaks.\n\nExample:\n```c\nfree(ptr);\n```"
    },
    {
      heading: "Memory Leaks and Dangling Pointers",
      body: "A memory leak occurs when a program loses the pointer to dynamically allocated memory without freeing it. A dangling pointer arises when a pointer continues to hold the address of a memory block that has already been freed. It is good practice to set pointers to `NULL` after freeing them.\n\nExample:\n```c\nfree(ptr);\nptr = NULL; // Prevents dangling pointer\n```"
    }
  ],
  codeDescription: "Comprehensive Example",
  code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr;\n    int n = 5;\n\n    // Dynamically allocate memory using malloc\n    arr = (int *)malloc(n * sizeof(int));\n    if (arr == NULL) {\n        printf("Memory allocation failed\\n");\n        return 1;\n    }\n\n    // Initialize and print array elements\n    for (int i = 0; i < n; i++) {\n        arr[i] = i + 1;\n        printf("%d ", arr[i]);\n    }\n    printf("\\n");\n\n    // Reallocate memory to hold 10 elements\n    arr = (int *)realloc(arr, 10 * sizeof(int));\n    if (arr == NULL) {\n        printf("Memory reallocation failed\\n");\n        return 1;\n    }\n\n    // Free the allocated memory\n    free(arr);\n    arr = NULL;\n\n    return 0;\n}`
};
