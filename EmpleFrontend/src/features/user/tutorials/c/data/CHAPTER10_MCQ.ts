export const CHAPTER10_MCQ = [
  {
    q: "What is the output of the following code snippet? `int x = 5; int *p = &x; printf(\"%d\", ++(*p));` **GATE 2015**",
    options: ["5", "6", "Address of x", "Compilation Error"],
    ans: 1,
    explanation: "`*p` dereferences the pointer to get the value 5. `++(*p)` increments the value at that address to 6, and then prints it."
  },
  {
    q: "Consider the declaration `int a[5]; int *p = a;`. Which of the following expressions is equivalent to `a[2]`? **GATE 2008**",
    options: ["`*p + 2`", "`*(p + 2)`", "`p + 2`", "`&a[2]`"],
    ans: 1,
    explanation: "`p + 2` computes the address of the third element. Dereferencing it with `*(p + 2)` gives the value at `a[2]`."
  },
  {
    q: "What does the declaration `int (*p)[10];` mean? **GATE 2011**",
    options: ["An array of 10 pointers to integers", "A pointer to an array of 10 integers", "A function returning a pointer to an integer", "A pointer to a function taking 10 integers"],
    ans: 1,
    explanation: "The parentheses force the evaluation of the pointer first. So, `p` is a pointer to an array of 10 integers."
  },
  {
    q: "What is the size of a generic pointer `void *` in a typical 32-bit architecture? **GATE 2016**",
    options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the data type it points to"],
    ans: 1,
    explanation: "In a 32-bit architecture, memory addresses are 32 bits (4 bytes) long. Therefore, any pointer, including `void *`, takes 4 bytes."
  },
  {
    q: "Which of the following is an invalid pointer arithmetic operation? **GATE 2005**",
    options: ["Adding an integer to a pointer", "Subtracting an integer from a pointer", "Subtracting one pointer from another", "Adding two pointers"],
    ans: 3,
    explanation: "Adding two pointers is mathematically meaningless and is therefore an invalid operation in C. You can, however, subtract two pointers to find the distance between them."
  },
  {
    q: "What happens when you attempt to dereference an uninitialized pointer (wild pointer)? **GATE 2019**",
    options: ["It returns 0", "It results in a syntax error", "It causes undefined behavior, often a segmentation fault", "It automatically allocates memory"],
    ans: 2,
    explanation: "An uninitialized pointer holds a garbage memory address. Dereferencing it attempts to access invalid memory, leading to undefined behavior or a crash (segmentation fault)."
  },
  {
    q: "Given `char *str = \"Hello\";`, what does `str[1]` represent? **GATE 2004**",
    options: ["'H'", "'e'", "The address of 'e'", "A compilation error"],
    ans: 1,
    explanation: "A string literal decays into a pointer to its first character. `str[1]` is equivalent to `*(str + 1)`, which is the character 'e'."
  },
  {
    q: "What is a dangling pointer? **GATE 2012**",
    options: ["A pointer that is uninitialized", "A pointer that points to a memory location that has been freed or deleted", "A pointer that points to another pointer", "A pointer with a value of NULL"],
    ans: 1,
    explanation: "A dangling pointer arises when an object is deleted or deallocated, without modifying the value of the pointer, so that the pointer still points to the memory location of the deallocated memory."
  },
  {
    q: "How do you declare a pointer to a pointer to an integer? **GATE 2021**",
    options: ["`int *p;`", "`int **p;`", "`int &p;`", "`int *&p;`"],
    ans: 1,
    explanation: "`int **p;` declares a variable `p` that can hold the address of a pointer to an integer."
  },
  {
    q: "In C, `NULL` pointer is conventionally defined as: **GATE 2014**",
    options: ["`(void *)0`", "`0`", "Both A and B", "None of the above"],
    ans: 2,
    explanation: "In C, `NULL` is typically defined as an integer constant `0` or as `((void *)0)`. Both are treated as a null pointer constant."
  }
];
