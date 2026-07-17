// Chapter 08

export const chapter08_CONTENT = {
    title: "ARRAYS",
    description: "Learn about arrays",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};

export const chapter08_DEBUG = undefined;

export const chapter08_DRAG_DROP = undefined;

export const chapter08_MCQ = [
  {
    "q": `Consider the following code (GATE CS 2011):\n\`\`\`java\nint[][] arr = new int[3][4];\n// ... initialized with values ...\n\`\`\`\nIn Java, how are multidimensional arrays implemented?`,
    "options": [
      `As a contiguous block of memory`,
      `As an array of references to other arrays`,
      `As a linked list`,
      `As a binary tree`
    ],
    "ans": 1,
    "explanation": `In Java, a 2D array is implemented as an array of arrays. The primary array holds references to the secondary arrays, meaning rows can have different lengths (jagged arrays).`
  },
  {
    "q": `Consider the following code (GATE IT 2005):\n\`\`\`java\nint[] arr = {10, 20, 30, 40, 50};\nint x = arr.length;\n\`\`\`\nWhat is \`arr.length\` in Java?`,
    "options": [
      `A method that returns the array size`,
      `A constant field that holds the number of elements the array can contain`,
      `The number of non-zero elements in the array`,
      `A variable that can be changed to resize the array`
    ],
    "ans": 1,
    "explanation": `In Java, \`length\` is a final (constant) instance variable of an array object that stores the number of elements allocated.`
  },
  {
    "q": `Consider the following loop traversing an array (GATE CS 2007):\n\`\`\`java\nint[] a = {1, 2, 3, 4, 5, 6};\nfor (int i = 0; i < a.length / 2; i++) {\n    int temp = a[i];\n    a[i] = a[a.length - 1 - i];\n    a[a.length - 1 - i] = temp;\n}\n\`\`\`\nWhat does this code do?`,
    "options": [
      `Sorts the array in ascending order`,
      `Reverses the array`,
      `Shifts the array elements left by one`,
      `Randomly shuffles the array`
    ],
    "ans": 1,
    "explanation": `The loop iterates over the first half of the array, swapping each element with its corresponding element from the end, effectively reversing the array in place.`
  },
  {
    "q": `Consider the following Java snippet (GATE CS 2016):\n\`\`\`java\nint[][] matrix = {{1, 2}, {3, 4, 5}, {6}};\nint sum = 0;\nfor (int i = 0; i < matrix.length; i++) {\n    sum += matrix[i].length;\n}\nSystem.out.println(sum);\n\`\`\`\nWhat is the output?`,
    "options": [
      `3`,
      `6`,
      `9`,
      `Compilation Error`
    ],
    "ans": 1,
    "explanation": `matrix.length is 3. matrix[0].length is 2. matrix[1].length is 3. matrix[2].length is 1. The sum of lengths is 2 + 3 + 1 = 6. (Total elements in this jagged array).`
  },
  {
    "q": `Consider the initialization (GATE IT 2008):\n\`\`\`java\nint[] x = new int[25];\n\`\`\`\nWhat will be the value of \`x[10]\` immediately after this declaration?`,
    "options": [
      `Garbage value`,
      `Null`,
      `0`,
      `Throws an exception`
    ],
    "ans": 2,
    "explanation": `When an array of primitives is instantiated in Java, the runtime automatically initializes all elements to their default value, which is 0 for int.`
  },
  {
    "q": `Identify the output of the following Java program (GATE CS 2013):\n\`\`\`java\nint[] a = new int[]{1, 2, 3};\nint[] b = a;\nb[0] = 5;\nSystem.out.println(a[0]);\n\`\``,
    "options": [
      `1`,
      `2`,
      `5`,
      `Compilation Error`
    ],
    "ans": 2,
    "explanation": `Both variables a and b reference the same array object in memory. Modifying the array through b changes the array that a also points to, so a[0] becomes 5.`
  },
  {
    "q": `What happens when you run this code? (GATE CS 2002)\n\`\`\`java\nint[] arr = new int[3];\narr[3] = 4;\n\`\``,
    "options": [
      `Compilation Error`,
      `Array grows dynamically`,
      `ArrayIndexOutOfBoundsException`,
      `Assigns 4 to the last element`
    ],
    "ans": 2,
    "explanation": `The array has size 3, meaning valid indices are 0, 1, and 2. Accessing index 3 throws an ArrayIndexOutOfBoundsException at runtime.`
  },
  {
    "q": `Evaluate the following code (GATE IT 2004):\n\`\`\`java\nint[] x = {120, 200, 16};\nfor(int i = 0; i < x.length; i++){\n    System.out.print(x[i] + " ");\n}\n\`\`\`\nWhat is printed?`,
    "options": [
      `120 200 16 `,
      `120 200 16 0 `,
      `Compilation Error`,
      `16 200 120 `
    ],
    "ans": 0,
    "explanation": `It simply iterates from index 0 to length-1 and prints the elements in order.`
  },
  {
    "q": `Consider the multidimensional array (GATE CS 2018):\n\`\`\`java\nint[][] arr = new int[2][];\narr[0] = new int[3];\narr[1] = new int[2];\n\`\`\`\nWhich of the following is correct?`,
    "options": [
      "arr[0][2] is out of bounds",
      "arr.length is 3",
      "arr[1].length is 2",
      "arr[1][2] equals 0"
    ],
    "ans": 2,
    "explanation": `arr[1] is initialized as an array of size 2, so arr[1].length is 2. The valid indices for arr[1] are 0 and 1, so arr[1][2] would throw an exception.`
  },
  {
    "q": `How can you copy the contents of one array to another in Java? (GATE CS 1999)`,
    "options": [
      `Using the == operator`,
      `Using System.arraycopy()`,
      `Using the = operator`,
      `Arrays cannot be copied in Java`
    ],
    "ans": 1,
    "explanation": `The = operator copies the reference. System.arraycopy(), Arrays.copyOf(), or a loop must be used to copy the actual contents.`
  },
  {
    "q": `What is the result of the following Java snippet? (GATE CS 2012):\n\`\`\`java\nint[] a = {1, 2, 3};\nSystem.out.println(a.toString());\n\`\``,
    "options": [
      "[1, 2, 3]",
      "1, 2, 3",
      "Compilation Error",
      "A memory address hash (like [I@15db9742)"
    ],
    "ans": 3,
    "explanation": `Arrays in Java do not override the toString() method. It prints the class name ( [I for int array) followed by @ and the object's hashcode.`
  },
  {
    "q": `Identify the output (GATE IT 2006):\n\`\`\`java\nint[] a1 = {1, 2, 3};\nint[] a2 = {1, 2, 3};\nSystem.out.println(a1 == a2);\n\`\``,
    "options": [
      `true`,
      `false`,
      `Compilation Error`,
      `Runtime Exception`
    ],
    "ans": 1,
    "explanation": `The == operator checks if a1 and a2 reference the exact same object in memory. Since they are created separately, they refer to different objects, making the result false.`
  },
  {
    "q": `What is the correct syntax to declare an array of 5 integers in Java? (GATE CS 2004)`,
    "options": [
      "int arr[5];",
      "int arr = new int[5];",
      "int[] arr = new int[5];",
      "int arr[] = new int(5);"
    ],
    "ans": 2,
    "explanation": `The correct way to declare and initialize an array in Java is \`int[] arr = new int[5];\` or \`int arr[] = new int[5];\`.`
  },
  {
    "q": `What will be the output? (GATE CS 2019)\n\`\`\`java\nint[] arr = {1, 2, 3, 4, 5};\nint sum = 0;\nfor (int num : arr) {\n    sum += num;\n}\nSystem.out.println(sum);\n\`\``,
    "options": [
      `10`,
      `15`,
      `Compilation Error`,
      `Runtime Exception`
    ],
    "ans": 1,
    "explanation": `The enhanced for loop iterates over all elements. Sum = 1+2+3+4+5 = 15.`
  },
  {
    "q": `What is the default value of boolean array elements in Java? (GATE CS 2001)`,
    "options": [
      `true`,
      `false`,
      `null`,
      `0`
    ],
    "ans": 1,
    "explanation": `When an array of booleans is instantiated, Java automatically initializes all elements to false.`
  }
];

export const chapter08_COMPLETE_EXERCISES = [
  {
    template: `public class Main {
    public static void main(String[] args) {
        int[] arr = ___ int[5];
        arr[0] = 10;
    }
}`,
    blanks: [
      "new"
    ]
  }
];
