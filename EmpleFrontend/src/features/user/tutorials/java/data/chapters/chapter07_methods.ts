// Chapter 07

export const chapter07_CONTENT = {
  "title": "Methods",
  "description": "Methods (functions in OOP) are blocks of code that run when called. They are used to modularize, write reusable logic, and define behavior inside classes.",
  "points": [
    {
      "heading": "Method Signature",
      "body": "Consists of the method name and parameter list. Access modifiers (like `public`) and return type (or `void`) are declared first."
    },
    {
      "heading": "Static vs Instance Methods",
      "body": "`static` methods belong to the class and are called directly: `ClassName.method()`. Instance methods require an object to be called."
    },
    {
      "heading": "Pass by Value",
      "body": "Java passes all arguments <u>by value</u>. For objects, the 'value' passed is the memory reference copy, so properties can be modified."
    },
    {
      "heading": "Return Statement",
      "body": "Sends a value back to the caller. `void` methods return no value and can use a blank `return;` to exit early."
    },
    {
      "heading": "Method Overloading",
      "body": "Declaring multiple methods in the same class with the same name but different parameters (number, types, or order)."
    },
    {
      "heading": "Recursion",
      "body": "A method calling itself. Must contain a <u>base case</u> to terminate execution and prevent `StackOverflowError`."
    }
  ],
  "code": "public class Methods {\n    // Static helper method\n    public static int multiply(int a, int b) {\n        return a * b;\n    }\n\n    // Overloaded method\n    public static double multiply(double a, double b) {\n        return a * b;\n    }\n\n    public static void main(String[] args) {\n        int res1 = multiply(5, 10);\n        double res2 = multiply(2.5, 4.0);\n        System.out.println(\"Res 1: \" + res1);\n        System.out.println(\"Res 2: \" + res2);\n    }\n}"
};

export const chapter07_DEBUG = {
  "instructions": "Fix the 3 method declaration and signature bugs in this helper class.",
  "buggy": "public class Main {\n    int doubleVal(n) {\n        n * 2;\n    }\n    public static void main(String[] args) {\n        int result = doubleVal(5);\n        System.out.println(result);\n    }\n}",
  "fixed": "public class Main {\n    public static int doubleVal(int n) {\n        return n * 2;\n    }\n    public static void main(String[] args) {\n        int result = doubleVal(5);\n        System.out.println(result);\n    }\n}",
  "hints": [
    "The helper method must be declared static to be called inside main()",
    "Method parameter must have a data type (int n)",
    "The method must return the result value using the return keyword"
  ],
  "expectedOutput": "10"
};

export const chapter07_DRAG_DROP = {
  "instructions": "Arrange these lines to call a static method that returns a String.",
  "lines": [
    {
      "id": "a",
      "text": "public class Main {"
    },
    {
      "id": "b",
      "text": "    public static String greet() {"
    },
    {
      "id": "c",
      "text": "        return \"Hello\";"
    },
    {
      "id": "d",
      "text": "    }"
    },
    {
      "id": "e",
      "text": "    public static void main(String[] args) {"
    },
    {
      "id": "f",
      "text": "        System.out.println(greet());"
    },
    {
      "id": "g",
      "text": "    }"
    },
    {
      "id": "h",
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
    "g",
    "h"
  ]
};

export const chapter07_MCQ = [
  {
    "q": "Consider the following recursive method (GATE CS 2014):\n```java\nint fun(int n) {\n    if (n == 4) return n;\n    else return 2 * fun(n + 1);\n}\n```\nWhat is the value returned by fun(2)?",
    "options": [
      "4",
      "8",
      "16",
      "32"
    ],
    "ans": 2,
    "explanation": "fun(2) = 2 * fun(3) = 2 * (2 * fun(4)) = 2 * (2 * 4) = 16."
  },
  {
    "q": "Consider the following Java method (GATE CS 2017):\n```java\nvoid printXYZ(int n) {\n    if (n > 0) {\n        printXYZ(n - 1);\n        System.out.print(n + \" \");\n        printXYZ(n - 1);\n    }\n}\n```\nWhat is printed when printXYZ(3) is called?",
    "options": [
      "1 2 1 3 1 2 1",
      "3 2 1 1 2 3",
      "1 2 3 2 1",
      "3 2 1 2 3"
    ],
    "ans": 0,
    "explanation": "printXYZ(3) calls printXYZ(2), prints 3, calls printXYZ(2). printXYZ(2) calls printXYZ(1), prints 2, printXYZ(1). Ultimately gives 1 2 1 3 1 2 1."
  },
  {
    "q": "Consider the following code (GATE IT 2004):\n```java\nint f(int j) {\n    static int i = 50;\n    int k;\n    if (i == j) {\n        System.out.println(\"Something\");\n        k = f(i);\n        return 0;\n    }\n    else return 0;\n}\n```\nIn Java, does this code compile?",
    "options": [
      "Yes, it compiles fine",
      "No, static variables cannot be declared inside a method in Java",
      "No, recursion without a base case won't compile",
      "Yes, but it gives a runtime error"
    ],
    "ans": 1,
    "explanation": "In Java, unlike C/C++, local variables cannot be declared as static. They must be declared at the class level."
  },
  {
    "q": "Consider the following method (GATE CS 2016):\n```java\nint foo(int val) {\n    int x = 0;\n    while (val > 0) {\n        x = x + foo(val - 1);\n        val--;\n    }\n    return val;\n}\n```\nWhat will foo(3) return?",
    "options": [
      "0",
      "3",
      "6",
      "Infinite recursion"
    ],
    "ans": 0,
    "explanation": "In the loop, val is decremented. After the while loop finishes, val is 0. So it always returns 0 for any val > 0."
  },
  {
    "q": "Consider the method (GATE CS 2015):\n```java\nint get(int n) {\n    int res = 0;\n    while (n > 0) {\n        res++;\n        n = n & (n - 1);\n    }\n    return res;\n}\n```\nWhat does get(n) do?",
    "options": [
      "Returns the sum of divisors of n",
      "Returns the number of set bits (1s) in the binary representation of n",
      "Returns the number of trailing zeros in n",
      "Returns n modulo 2"
    ],
    "ans": 1,
    "explanation": "Brian Kernighan's algorithm. The operation n = n & (n - 1) clears the lowest set bit. The loop runs until n becomes 0, effectively counting the set bits."
  },
  {
    "q": "What will be the output of the following Java method? (GATE CS 1999)\n```java\nint f(int n) {\n    if (n <= 1) return 1;\n    if (n % 2 == 0) return f(n/2);\n    return f(n/2) + f(n/2 + 1);\n}\n```\nEvaluate f(11).",
    "options": [
      "5",
      "8",
      "13",
      "None of the above"
    ],
    "ans": 0,
    "explanation": "f(11) = f(5) + f(6). f(5) = f(2) + f(3). f(6) = f(3). f(2) = f(1) = 1. f(3) = f(1) + f(2) = 1+1=2. So f(5) = 1+2=3. f(6) = 2. f(11) = 3+2=5."
  },
  {
    "q": "What is the return value of f(4) for the following function? (GATE CS 2008)\n```java\nint f(int x) {\n    if (x <= 0) return 0;\n    return f(x - 1) + 2;\n}\n``",
    "options": [
      "6",
      "8",
      "10",
      "12"
    ],
    "ans": 1,
    "explanation": "f(4) = f(3)+2 = f(2)+4 = f(1)+6 = f(0)+8 = 0+8 = 8."
  },
  {
    "q": "What is the output of the following program? (GATE CS 2011)\n```java\nvoid swap(int x, int y) {\n    int temp = x;\n    x = y;\n    y = temp;\n}\n// in main: \nint a = 10, b = 20;\nswap(a, b);\nSystem.out.println(a + \" \" + b);\n``",
    "options": [
      "20 10",
      "10 20",
      "Compilation Error",
      "Runtime Exception"
    ],
    "ans": 1,
    "explanation": "Java is pass-by-value. The primitive variables a and b are not modified outside the swap method. Output remains 10 20."
  },
  {
    "q": "Evaluate f(5) for this recursive function (GATE CS 1996):\n```java\nint f(int n) {\n    if (n == 0) return 1;\n    return n * f(n - 1);\n}\n``",
    "options": [
      "24",
      "120",
      "0",
      "720"
    ],
    "ans": 1,
    "explanation": "This computes the factorial of n. 5! = 5 * 4 * 3 * 2 * 1 = 120."
  },
  {
    "q": "Consider method overloading in Java (GATE IT 2007). Which of the following is an invalid overload of `void print(int a)`?",
    "options": [
      "void print(int a, int b)",
      "void print(float a)",
      "int print(int a)",
      "int print(String a)"
    ],
    "ans": 2,
    "explanation": "Method overloading requires the parameter list to be different. Changing only the return type (`int print(int a)`) causes a compilation error because Java cannot distinguish between them based on return type alone."
  },
  {
    "q": "What will be printed? (GATE CS 2004)\n```java\nstatic int counter = 0;\nstatic void increment() {\n    counter++;\n}\n// in main:\nincrement();\nincrement();\nSystem.out.println(counter);\n``",
    "options": [
      "0",
      "1",
      "2",
      "Compilation Error"
    ],
    "ans": 2,
    "explanation": "The counter is a static variable, meaning there's one copy shared across all method calls. It starts at 0 and is incremented twice, making it 2."
  },
  {
    "q": "Consider the function (GATE CS 2012):\n```java\nint calc(int a, int b) {\n    if (b == 0) return 1;\n    return a * calc(a, b - 1);\n}\n```\nWhat mathematical operation does calc compute?",
    "options": [
      "a * b",
      "a ^ b (a to the power of b)",
      "a + b",
      "a / b"
    ],
    "ans": 1,
    "explanation": "The function recursively multiplies 'a' by itself 'b' times, which computes a^b."
  },
  {
    "q": "What is the role of the 'return' statement in a 'void' method? (GATE CS 1998)",
    "options": [
      "It must return 0",
      "It cannot be used in a void method",
      "It terminates the execution of the method and returns to the caller",
      "It throws a compilation error"
    ],
    "ans": 2,
    "explanation": "In a void method, 'return;' can be used to exit the method early without returning any value."
  },
  {
    "q": "Examine this recursive method (GATE CS 2018):\n```java\nint fun(int x, int y) {\n    if (x == 0) return y;\n    return fun(x - 1, x + y);\n}\n```\nWhat is the value of fun(4, 3)?",
    "options": [
      "13",
      "10",
      "7",
      "15"
    ],
    "ans": 0,
    "explanation": "fun(4,3) -> fun(3,7) -> fun(2,10) -> fun(1,12) -> fun(0,13). Returns 13."
  },
  {
    "q": "Can a method call itself in Java? (GATE IT 2005)",
    "options": [
      "No, Java does not support recursion",
      "Yes, but only if the method is static",
      "Yes, this is called method overloading",
      "Yes, this is called recursion"
    ],
    "ans": 3,
    "explanation": "A method that calls itself is known as recursion. Java supports recursion for both static and instance methods."
  }
];

export const chapter07_COMPLETE_EXERCISES = [
  {
    template: `public class Main {
    public static ___ add(int a, int b) {
        return a + b;
    }
}`,
    blanks: [
      "int"
    ]
  }
];
