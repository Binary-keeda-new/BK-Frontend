export const CHAPTER8_CONTENT = {
  title: "Arrays in C",
  description: "An array is a collection of elements of the same data type stored in contiguous memory locations. Arrays allow you to store multiple items of the same type under a single variable name, making it easier to manage large datasets. They are widely used in C for tasks such as sorting, searching, and managing collections of data efficiently.",
  points: [
    {
      heading: "Declaration and Initialization",
      body: "An array is declared by specifying the data type of its elements, followed by the array name and its size in square brackets. You can initialize an array at the time of declaration by providing a comma-separated list of values enclosed in curly braces.\n\nExample:\n```c\nint numbers[5] = {10, 20, 30, 40, 50};\n```"
    },
    {
      heading: "Accessing Array Elements",
      body: "Array elements are accessed using their index, which starts from 0 for the first element and goes up to size - 1 for the last element. You can use the array name followed by the index in square brackets to read or modify an element's value.\n\nExample:\n```c\nint first = numbers[0]; // Accesses the first element (10)\nnumbers[2] = 100; // Modifies the third element to 100\n```"
    },
    {
      heading: "Memory Layout",
      body: "Elements in an array are stored in contiguous memory locations. This guarantees that the memory address of the first element is the base address of the array, and subsequent elements can be found by adding the element size to the base address. This makes array access very fast (O(1) time complexity)."
    },
    {
      heading: "Multidimensional Arrays",
      body: "C supports multidimensional arrays, which are essentially arrays of arrays. The most common is the 2D array, often used to represent matrices or grids. They are declared with multiple sets of square brackets.\n\nExample:\n```c\nint matrix[3][3] = {\n  {1, 2, 3},\n  {4, 5, 6},\n  {7, 8, 9}\n};\n```"
    },
    {
      heading: "Array Name as Pointers",
      body: "In C, the name of an array acts as a constant pointer to its first element. This means `numbers` is equivalent to `&numbers[0]`. When you pass an array to a function, it decays into a pointer, so the function can modify the original array elements."
    }
  ],
  codeDescription: "Comprehensive Example",
  code: `#include <stdio.h>

int main() {
  // Declare and initialize an array
  int arr[5] = {10, 20, 30, 40, 50};

  // Access and print array elements using a loop
  printf("Array elements:\\n");
  for(int i = 0; i < 5; i++) {
    printf("Element at index %d: %d\\n", i, arr[i]);
  }

  // Modify an element
  arr[2] = 99;
  printf("\\nAfter modification:\\n");
  printf("Element at index 2 is now: %d\\n", arr[2]);

  // Calculate the sum of all elements
  int sum = 0;
  for(int i = 0; i < 5; i++) {
    sum += arr[i];
  }
  printf("\\nSum of all elements: %d\\n", sum);

  return 0;
}`
};
