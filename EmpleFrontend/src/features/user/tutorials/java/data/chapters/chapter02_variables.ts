// Chapter 02

export const chapter02_CONTENT = {
  "title": "Variables & Data Types",
  "description": "Variables are containers for storing data values. Java is statically-typed, meaning every variable must be declared with a data type before use.",
  "points": [
    {
      "heading": "Primitive Types",
      "body": "Java has 8 primitives: `byte`, `short`, `int`, `long` (integers); `float`, `double` (floating points); `boolean` (true/false); `char` (single 16-bit Unicode character)."
    },
    {
      "heading": "Reference Types",
      "body": "Point to objects in memory. The most common reference type is `String` (e.g., `String name = \"Alex\"`). Uninitialized reference types default to `null`."
    },
    {
      "heading": "Declaration & Initialization",
      "body": "`int count = 10;`\n`double price = 19.99;`\n`char grade = 'A';`\n`boolean isActive = true;"
    },
    {
      "heading": "Type Casting",
      "body": "Widening casting (implicit): `byte` -> `short` -> `int` -> `long` -> `float` -> `double`. Narrowing casting (explicit): `double` -> `float` -> `long` -> `int` -> `char` -> `short` -> `byte`, e.g., `int x = (int) 3.14;"
    },
    {
      "heading": "Variables Scope",
      "body": "Local variables are declared inside methods and must be initialized before use. Instance variables are declared in a class and have default values."
    },
    {
      "heading": "Constants",
      "body": "Use the `final` keyword. A `final` variable's value cannot be changed once assigned: `final double PI = 3.14159;"
    }
  ],
  "code": "public class DataVariables {\n    public static void main(String[] args) {\n        int age = 22;\n        double gpa = 3.85;\n        char initial = 'J';\n        boolean isEnrolled = true;\n        final int MAX_CREDITS = 18;\n\n        System.out.println(\"Age: \" + age);\n        System.out.println(\"GPA: \" + gpa);\n        System.out.println(\"Initial: \" + initial);\n        System.out.println(\"Enrolled: \" + isEnrolled);\n    }\n}"
};

export const chapter02_DEBUG = {
  "instructions": "Fix the 3 variable type and constant re-assignment errors in this code.",
  "buggy": "public class Main {\n    public static void main(String[] args) {\n        int age = 22.5;\n        final double PI = 3.14;\n        PI = 3.14159;\n        boolean status = \"true\";\n        System.out.println(age);\n    }\n}",
  "fixed": "public class Main {\n    public static void main(String[] args) {\n        double age = 22.5;\n        final double PI = 3.14159;\n        boolean status = true;\n        System.out.println(age);\n    }\n}",
  "hints": [
    "An int cannot store decimal values like 22.5 (use double)",
    "A final variable (PI) cannot be reassigned once initialized",
    "A boolean accepts literal true/false, not a string \"true\""
  ],
  "expectedOutput": "22.5"
};

export const chapter02_DRAG_DROP = {
  "instructions": "Arrange these lines to declare variables and print their values.",
  "lines": [
    {
      "id": "a",
      "text": "public class Main {"
    },
    {
      "id": "b",
      "text": "    public static void main(String[] args) {"
    },
    {
      "id": "c",
      "text": "        int x = 5;"
    },
    {
      "id": "d",
      "text": "        double y = 10.5;"
    },
    {
      "id": "e",
      "text": "        System.out.println(x + \" \" + y);"
    },
    {
      "id": "f",
      "text": "    }"
    },
    {
      "id": "g",
      "text": "}"
    }
  ],
  "order": [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g"
  ]
};

export const chapter02_MCQ = [
  {
    "q": "What will be the output of the following Java program? (GATE CS 2015)\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int x = 128;\n        byte y = (byte) x;\n        System.out.println(y);\n    }\n}\n``",
    "options": [
      "128",
      "-128",
      "0",
      "Compilation Error"
    ],
    "ans": 1,
    "explanation": "In Java, a byte is 8 bits signed (-128 to 127). Casting 128 (binary 10000000) to byte results in -128 due to overflow."
  },
  {
    "q": "Which of the following represents the correct size of the 'double' data type in Java? (GATE IT 2006)",
    "options": [
      "4 bytes",
      "8 bytes",
      "16 bytes",
      "Depends on the operating system"
    ],
    "ans": 1,
    "explanation": "Java strictly defines primitive sizes. A 'double' is an IEEE 754 64-bit floating point, which takes 8 bytes."
  },
  {
    "q": "Consider the following statements regarding Java primitives. Which one is true? (GATE CS 2007)",
    "options": [
      "boolean takes 1 bit but its size is not precisely defined",
      "char uses 8-bit ASCII encoding",
      "int size varies between 32-bit and 64-bit platforms",
      "float has a higher precision than double"
    ],
    "ans": 0,
    "explanation": "The size of a boolean is not precisely defined in the Java specification, though it represents 1 bit of information. char is 16-bit Unicode, and int is always 32-bit."
  },
  {
    "q": "What is the result of assigning a larger primitive type to a smaller primitive type in Java without an explicit cast? (GATE CS 2014)",
    "options": [
      "Implicit widening conversion",
      "Compilation Error",
      "Runtime Exception",
      "Automatic truncation"
    ],
    "ans": 1,
    "explanation": "Assigning a larger primitive type (e.g., int) to a smaller one (e.g., byte) without a cast results in a compile-time error due to possible loss of precision."
  },
  {
    "q": "In Java, what is the default value of an uninitialized instance variable of reference type? (GATE IT 2004)",
    "options": [
      "Garbage value",
      "0",
      "null",
      "\"\" (Empty String)"
    ],
    "ans": 2,
    "explanation": "Instance variables of reference types are automatically initialized to null by the JVM."
  },
  {
    "q": "Which of the following is an invalid variable declaration in Java? (GATE CS 2012)",
    "options": [
      "int $value = 10;",
      "double _price = 20.5;",
      "char 1stLetter = 'A';",
      "boolean isValid = true;"
    ],
    "ans": 2,
    "explanation": "Variable names in Java cannot begin with a digit."
  },
  {
    "q": "What is the default value of a local variable in Java if it is not explicitly initialized? (GATE CS 2018)",
    "options": [
      "0",
      "null",
      "Garbage value",
      "It causes a compilation error if used"
    ],
    "ans": 3,
    "explanation": "Local variables in Java do not get default values and must be initialized before they are used, otherwise the compiler throws an error."
  },
  {
    "q": "Which of these data types is used to store 16-bit Unicode characters in Java? (GATE IT 2008)",
    "options": [
      "byte",
      "short",
      "char",
      "String"
    ],
    "ans": 2,
    "explanation": "The char data type in Java is a single 16-bit Unicode character."
  },
  {
    "q": "Consider the declaration `final double PI = 3.14;`. Which of the following is true? (GATE CS 2005)",
    "options": [
      "PI is a constant and its value can be changed once",
      "PI is a constant and its value cannot be modified",
      "PI is a class-level variable by default",
      "PI will be allocated on the heap"
    ],
    "ans": 1,
    "explanation": "The 'final' keyword makes the variable a constant, meaning its value cannot be changed once initialized."
  },
  {
    "q": "Which of the following assignments is valid in Java? (GATE CS 2011)",
    "options": [
      "float f = 3.14;",
      "double d = 3.14f;",
      "int i = 3.14;",
      "byte b = 256;"
    ],
    "ans": 1,
    "explanation": "A float can be implicitly cast to a double. `float f = 3.14;` is invalid because 3.14 is a double literal and needs an 'f' suffix."
  },
  {
    "q": "What will be the output of `System.out.println(10 + 20 + \"Java\");`? (GATE CS 2016)",
    "options": [
      "1020Java",
      "30Java",
      "Compilation Error",
      "Java30"
    ],
    "ans": 1,
    "explanation": "Expression evaluation goes left to right. 10 + 20 evaluates to 30, then 30 + \"Java\" performs string concatenation resulting in \"30Java\"."
  },
  {
    "q": "What is the range of the 'short' data type in Java? (GATE IT 2007)",
    "options": [
      "-128 to 127",
      "-32768 to 32767",
      "-2147483648 to 2147483647",
      "0 to 65535"
    ],
    "ans": 1,
    "explanation": "The 'short' data type is a 16-bit signed two's complement integer, ranging from -32,768 to 32,767."
  },
  {
    "q": "Which primitive type has the highest precision in Java? (GATE CS 2003)",
    "options": [
      "long",
      "float",
      "double",
      "int"
    ],
    "ans": 2,
    "explanation": "The 'double' data type is a double-precision 64-bit IEEE 754 floating point."
  },
  {
    "q": "In Java, what happens if an integer arithmetic operation results in a value larger than the maximum value for an 'int'? (GATE CS 2013)",
    "options": [
      "It throws an ArithmeticException",
      "It causes a compilation error",
      "It overflows silently and wraps around",
      "It automatically promotes to 'long'"
    ],
    "ans": 2,
    "explanation": "Java integer arithmetic simply overflows silently, wrapping around according to two's complement representation."
  },
  {
    "q": "Which of the following best describes the 'String' type in Java? (GATE CS 2009)",
    "options": [
      "It is a primitive data type",
      "It is a mutable sequence of characters",
      "It is a class and an immutable reference type",
      "It is stored on the stack"
    ],
    "ans": 2,
    "explanation": "In Java, String is not a primitive; it is a reference type (a class) and its instances are immutable."
  }
];

export const chapter02_COMPLETE_EXERCISES = [
  {
    template: `public class Main {
    public static void main(String[] args) {
        ___ number = 10;
        System.out.println(number);
    }
}`,
    blanks: [
      "int"
    ]
  }
];
