export const CHAPTER12_MCQ = [
  {
    q: "Which of the following functions is used to allocate memory and initialize it to zero? **GATE 2014**",
    options: ["malloc()", "calloc()", "realloc()", "free()"],
    ans: 1,
    explanation: "The calloc() function allocates memory for an array of elements, initializes them to zero, and then returns a pointer to the memory."
  },
  {
    q: "What is the return type of malloc() in C? **GATE 2011**",
    options: ["int *", "void *", "char *", "float *"],
    ans: 1,
    explanation: "malloc() returns a void pointer (void *) which can be cast to any other data type pointer."
  },
  {
    q: "What happens if malloc() fails to allocate memory? **GATE 2015**",
    options: ["It returns a NULL pointer.", "It causes a runtime error.", "It returns an uninitialized pointer.", "It allocates a smaller block of memory."],
    ans: 0,
    explanation: "If malloc() fails (usually because the heap is exhausted), it returns a NULL pointer."
  },
  {
    q: "Which header file is required to use dynamic memory allocation functions? **GATE 2018**",
    options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>"],
    ans: 1,
    explanation: "Dynamic memory allocation functions like malloc, calloc, realloc, and free are declared in the <stdlib.h> header file."
  },
  {
    q: "A pointer that points to a memory location that has been deleted or freed is called a: **GATE 2017**",
    options: ["Null pointer", "Wild pointer", "Dangling pointer", "Void pointer"],
    ans: 2,
    explanation: "A dangling pointer arises when an object is deleted or deallocated, without modifying the value of the pointer, so that the pointer still points to the memory location of the deallocated memory."
  },
  {
    q: "Which function is used to change the size of a previously allocated memory block? **GATE 2019**",
    options: ["calloc()", "malloc()", "realloc()", "resize()"],
    ans: 2,
    explanation: "The realloc() function is used to dynamically change the memory allocation of a previously allocated memory block."
  },
  {
    q: "What is a memory leak in C? **GATE 2020**",
    options: ["When memory is allocated but not initialized.", "When allocated memory is freed multiple times.", "When dynamically allocated memory is not freed after its use.", "When a pointer accesses out of bound memory."],
    ans: 2,
    explanation: "A memory leak occurs when programmers create a memory in heap and forget to delete it."
  },
  {
    q: "Consider the statement `ptr = (int*) malloc(sizeof(int) * 5);`. How many bytes will be allocated if sizeof(int) is 4? **GATE 2016**",
    options: ["5 bytes", "10 bytes", "20 bytes", "40 bytes"],
    ans: 2,
    explanation: "It allocates space for 5 integers. 5 * 4 = 20 bytes."
  },
  {
    q: "What is the result of freeing a NULL pointer in C? **GATE 2021**",
    options: ["Syntax error", "Runtime error", "Undefined behavior", "No action is performed"],
    ans: 3,
    explanation: "If the pointer passed to free() is NULL, no operation is performed."
  },
  {
    q: "Which of the following creates a 2D dynamically allocated array of size M x N? **GATE 2022**",
    options: ["int **arr = malloc(M * N * sizeof(int));", "int **arr = (int**) malloc(M * sizeof(int*)); for(int i=0; i<M; i++) arr[i] = (int*) malloc(N * sizeof(int));", "int *arr[M] = malloc(N * sizeof(int));", "int **arr = calloc(M, N * sizeof(int));"],
    ans: 1,
    explanation: "To create a 2D array, an array of pointers is first allocated, and then memory for each row is allocated in a loop."
  }
];
