export const CHAPTER10_CONTENT = {
  title: "Pointers in C",
  description: "Pointers are one of the most powerful and distinctive features of the C programming language. They allow you to directly access and manipulate memory, enabling dynamic memory allocation, efficient array handling, and complex data structures like linked lists and trees. Mastering pointers is essential for writing efficient C code and deeply understanding how memory works at the hardware level.",
  points: [
    {
      heading: "What is a Pointer?",
      body: "A pointer is a variable whose value is the address of another variable. Instead of holding a data value directly, a pointer holds the memory location where the data value is stored.\n\nExample:\n```c\nint x = 10;\nint *p = &x; // p holds the memory address of x\n```"
    },
    {
      heading: "Pointer Declaration and Initialization",
      body: "To declare a pointer, use the asterisk (*) before the variable name. The data type of the pointer must match the data type of the variable it points to. You initialize a pointer using the address-of operator (&).\n\nExample:\n```c\ndouble d = 3.14;\ndouble *dp = &d;\n```"
    },
    {
      heading: "Dereferencing Pointers",
      body: "Dereferencing a pointer means accessing the value stored at the memory address the pointer holds. You use the asterisk (*) operator, also known as the indirection operator, to dereference a pointer.\n\nExample:\n```c\nint x = 20;\nint *p = &x;\nprintf(\"%d\", *p); // Prints 20\n```"
    },
    {
      heading: "Pointer Arithmetic",
      body: "You can perform mathematical operations on pointers, such as addition and subtraction. When you add 1 to a pointer, it points to the next memory location of its base type. This is particularly useful when working with arrays.\n\nExample:\n```c\nint arr[] = {10, 20, 30};\nint *p = arr;\np++; // p now points to arr[1] (value 20)\n```"
    },
    {
      heading: "Pointers and Arrays",
      body: "In C, arrays and pointers are closely related. An array name acts as a constant pointer to its first element. You can use pointers to iterate through array elements efficiently.\n\nExample:\n```c\nint arr[3] = {1, 2, 3};\nint *p = arr;\n// *(p + 1) is equivalent to arr[1]\n```"
    }
  ],
  codeDescription: "Comprehensive Example demonstrating pointer basics, dereferencing, and pointer arithmetic with arrays.",
  code: `#include <stdio.h>\n\nint main() {\n    int num = 42;\n    int *ptr = &num; // Pointer initialization\n    \n    printf("Value of num: %d\\n", num);\n    printf("Value pointed to by ptr: %d\\n", *ptr); // Dereferencing\n    \n    // Changing value using pointer\n    *ptr = 100;\n    printf("New value of num: %d\\n", num);\n    \n    // Pointer arithmetic with an array\n    int arr[5] = {10, 20, 30, 40, 50};\n    int *arr_ptr = arr; // Points to the first element\n    \n    printf("Array elements using pointers:\\n");\n    for(int i = 0; i < 5; i++) {\n        printf("%d ", *(arr_ptr + i));\n    }\n    printf("\\n");\n    \n    return 0;\n}`
};
