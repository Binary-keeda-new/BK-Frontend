// Chapter 04

export const chapter04_CONTENT = {
  "title": "Operators & Expressions",
  "description": "Operators perform operations on variables and values. Java provides arithmetic, relational, logical, assignment, bitwise, and conditional operators.",
  "points": [
    {
      "heading": "Arithmetic Operators",
      "body": "`+`, `-`, `*`, `/`, `%` (modulus). Division on integers discards remainder (e.g., `5 / 2 = 2`). Modulus returns the remainder (e.g., `5 % 2 = 1`)."
    },
    {
      "heading": "Relational & Logical Operators",
      "body": "`==`, `!=`, `<`, `>`, `<=`, `>=` evaluate to boolean values. Logical `&&` (AND), `||` (OR), and `!` (NOT) are used to combine conditions."
    },
    {
      "heading": "Short-Circuit Evaluation",
      "body": "`&&` and `||` evaluate operands left-to-right. If the first operand determines the result (e.g., false in `&&`), the second is skipped."
    },
    {
      "heading": "Unary Operators",
      "body": "`++` and `--` increment/decrement by 1. Post-increment (`x++`) returns the value first, then increments. Pre-increment (`++x`) increments first."
    },
    {
      "heading": "String Concatenation",
      "body": "The `+` operator concatenates strings. If one operand is a `String` and the other is a primitive, the primitive is converted to a `String`."
    },
    {
      "heading": "Ternary Operator",
      "body": "`condition ? value_if_true : value_if_false` is a compact single-line if-else assignment."
    }
  ],
  "code": "public class Operators {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 4;\n        System.out.println(\"Quotient: \" + (a / b));\n        System.out.println(\"Remainder: \" + (a % b));\n\n        int x = 5;\n        System.out.println(\"Post-increment: \" + x++); // prints 5\n        System.out.println(\"Current x: \" + x);         // prints 6\n\n        String result = (a > b) ? \"Greater\" : \"Lesser\";\n        System.out.println(\"Ternary: \" + result);\n    }\n}"
};

export const chapter04_DEBUG = {
  "instructions": "Fix the 3 logical and modulus operator errors in this division check.",
  "buggy": "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 0;\n        if (y != 0 & x / y > 2) {\n            System.out.println(\"Valid\");\n        }\n        int remainder = x / 2;\n    }\n}",
  "fixed": "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 0;\n        if (y != 0 && x / y > 2) {\n            System.out.println(\"Valid\");\n        }\n        int remainder = x % 2;\n    }\n}",
  "hints": [
    "Use short-circuit operator && to prevent division by zero",
    "Change variable 'b' to a declared variable or numeric constant",
    "Use modulus % to get the remainder instead of division /"
  ],
  "expectedOutput": ""
};

export const chapter04_DRAG_DROP = {
  "instructions": "Arrange these lines to check if x is even using modulus.",
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
      "text": "        int x = 12;"
    },
    {
      "id": "d",
      "text": "        boolean isEven = (x % 2 == 0);"
    },
    {
      "id": "e",
      "text": "        System.out.println(isEven);"
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

export const chapter04_MCQ = [
  {
    "q": "What will be the output of the following Java program? (GATE CS 2007)\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        int y = x++ + ++x;\n        System.out.println(y);\n    }\n}\n``",
    "options": [
      "10",
      "11",
      "12",
      "13"
    ],
    "ans": 2,
    "explanation": "x++ uses 5 and increments x to 6. Then ++x increments x to 7 and uses 7. The sum is 5 + 7 = 12."
  },
  {
    "q": "Consider the following expression in Java: `true || (5 / 0 == 0)`. What is the result? (GATE CS 2011)",
    "options": [
      "ArithmeticException is thrown",
      "false",
      "true",
      "Compilation Error"
    ],
    "ans": 2,
    "explanation": "Because || is a short-circuit operator, since the left operand is true, the entire expression evaluates to true without evaluating the right operand (which would cause an exception)."
  },
  {
    "q": "What is the result of the bitwise XOR operation `5 ^ 3` in Java? (GATE IT 2008)",
    "options": [
      "2",
      "6",
      "7",
      "8"
    ],
    "ans": 1,
    "explanation": "5 is 101 in binary, and 3 is 011. XOR yields 110, which is 6 in decimal."
  },
  {
    "q": "Which of the following operators has the lowest precedence in Java? (GATE CS 2014)",
    "options": [
      "Assignment (=)",
      "Logical AND (&&)",
      "Addition (+)",
      "Equality (==)"
    ],
    "ans": 0,
    "explanation": "The assignment operator has the lowest precedence among the choices listed, ensuring that the entire right-hand expression is evaluated before assigning."
  },
  {
    "q": "What is the outcome of the following modulo arithmetic in Java: `-10 % 3`? (GATE CS 2016)",
    "options": [
      "2",
      "-1",
      "1",
      "-2"
    ],
    "ans": 1,
    "explanation": "In Java, the modulo operator returns a result with the same sign as the dividend (left operand). So, -10 % 3 yields -1."
  },
  {
    "q": "What will be the output of `System.out.println(10 >> 2);`? (GATE CS 2013)",
    "options": [
      "10",
      "2",
      "20",
      "0"
    ],
    "ans": 1,
    "explanation": "The right shift operator >> shifts the bits of 10 (1010) to the right by 2 positions, resulting in 2 (0010)."
  },
  {
    "q": "What is the output of `System.out.println(-10 >>> 2);`? (GATE CS 2015)",
    "options": [
      "-2",
      "1073741821",
      "-3",
      "10"
    ],
    "ans": 1,
    "explanation": ">>> is the unsigned right shift operator. It shifts a zero into the leftmost position, making the previously negative number a large positive number."
  },
  {
    "q": "Which of the following is the correct evaluation order of the expression `a + b * c`? (GATE CS 2004)",
    "options": [
      "Addition then multiplication",
      "Multiplication then addition",
      "Evaluated from left to right",
      "Evaluated from right to left"
    ],
    "ans": 1,
    "explanation": "Multiplication (*) has a higher precedence than addition (+), so it is evaluated first."
  },
  {
    "q": "What is the result of `10 + 20 + \"30\" + 40` in Java? (GATE CS 2006)",
    "options": [
      "10203040",
      "303040",
      "100",
      "Compilation Error"
    ],
    "ans": 1,
    "explanation": "Evaluation is left to right: 10+20=30, 30+\"30\"=\"3030\", \"3030\"+40=\"303040\"."
  },
  {
    "q": "If `int a = 10;`, what is the value of `a += a -= a *= a;`? (GATE CS 2012)",
    "options": [
      "0",
      "-80",
      "100",
      "Compilation Error"
    ],
    "ans": 1,
    "explanation": "Evaluate right to left: a *= a (a=100). Then a -= 100 (10-100 = -90). Then a += -90 (10 + -90 = -80)."
  },
  {
    "q": "Which operator is used to compare two primitive values for equality in Java? (GATE CS 2002)",
    "options": [
      "=",
      "==",
      "===",
      "equals()"
    ],
    "ans": 1,
    "explanation": "The double equal sign (==) is the equality operator for primitives in Java."
  },
  {
    "q": "What does the ternary operator `? :` evaluate to? (GATE CS 2009)",
    "options": [
      "It evaluates a boolean expression and executes a block of code",
      "It evaluates an expression and returns one of two values based on a boolean condition",
      "It performs a three-way comparison",
      "It is used for loop iterations"
    ],
    "ans": 1,
    "explanation": "The ternary operator returns the second operand if the first evaluates to true, and the third operand if the first evaluates to false."
  },
  {
    "q": "What is the result of `~5` in Java (where 5 is an integer)? (GATE CS 2017)",
    "options": [
      "-5",
      "-6",
      "4",
      "6"
    ],
    "ans": 1,
    "explanation": "The bitwise NOT operator (~) inverts all bits. For an integer x, ~x is -(x + 1). Thus, ~5 is -6."
  },
  {
    "q": "Which of these is a bitwise AND operator in Java? (GATE IT 2005)",
    "options": [
      "&&",
      "&",
      "||",
      "|"
    ],
    "ans": 1,
    "explanation": "The single ampersand (&) is the bitwise AND operator, while && is the logical AND operator."
  },
  {
    "q": "What is the output of `System.out.println(5 | 9);`? (GATE CS 2010)",
    "options": [
      "14",
      "13",
      "5",
      "9"
    ],
    "ans": 1,
    "explanation": "5 is 0101 and 9 is 1001 in binary. The bitwise OR (|) of 0101 and 1001 is 1101, which is 13 in decimal."
  }
];

export const chapter04_COMPLETE_EXERCISES = [];
