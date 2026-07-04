// Chapter 12

export const chapter12_CONTENT = {
  "title": "Exception Handling",
  "description": "Exceptions are events that disrupt the normal flow of instructions. Java handles exceptions using try, catch, finally, throw, and throws keywords.",
  "points": [
    {
      "heading": "Try-Catch Blocks",
      "body": "Place error-prone code in the `try` block. If an exception occurs, execution transfers to the `catch` block."
    },
    {
      "heading": "Finally Block",
      "body": "Code that <u>always executes</u> after try-catch, regardless of whether an exception was thrown. Used to release files or resources."
    },
    {
      "heading": "Checked vs Unchecked",
      "body": "Checked (compile-time) exceptions must be caught or declared. Unchecked (runtime) exceptions represent programming bugs."
    },
    {
      "heading": "Throwing Exceptions",
      "body": "Use the `throw` keyword to explicitly raise an exception in code (e.g., `throw new IllegalArgumentException();`)."
    },
    {
      "heading": "Throws Clause",
      "body": "Declared in method signatures to list the checked exceptions a method might propagate to its callers using `throws`."
    },
    {
      "heading": "Multiple Catches",
      "body": "Catch specific exceptions first (e.g., `NullPointerException`) before catching generic `Exception` objects to prevent swallowing bugs."
    }
  ],
  "code": "public class ExceptionsExample {\n    public static void main(String[] args) {\n        try {\n            int[] arr = {1, 2};\n            System.out.println(arr[5]); // throws exception\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"Handled index error: \" + e.getMessage());\n        } finally {\n            System.out.println(\"Execution cleanup completed.\");\n        }\n    }\n}"
};

export const chapter12_DEBUG = {
  "instructions": "Fix the 3 exception handling blocks and try-catch syntax bugs.",
  "buggy": "public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } finally {\n            System.out.println(\"Final\");\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error\");\n        }\n    }\n}",
  "fixed": "public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error\");\n        } finally {\n            System.out.println(\"Final\");\n        }\n    }\n}",
  "hints": [
    "The catch block must precede the finally block",
    "Verify catch brackets and parentheses match",
    "Ensure division-by-zero exception is caught correctly"
  ],
  "expectedOutput": "Error\nFinal"
};

export const chapter12_DRAG_DROP = {
  "instructions": "Arrange these lines to create a standard try-catch block.",
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
      "text": "        try {"
    },
    {
      "id": "d",
      "text": "            int x = 5 / 0;"
    },
    {
      "id": "e",
      "text": "        } catch (ArithmeticException e) {"
    },
    {
      "id": "f",
      "text": "            System.out.println(\"Error\");"
    },
    {
      "id": "g",
      "text": "        }"
    },
    {
      "id": "h",
      "text": "    }"
    },
    {
      "id": "i",
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
    "h",
    "i"
  ]
};

export const chapter12_MCQ = [
  {
    "q": "(GATE CS 2012) What happens if an exception is thrown in a `try` block, and there is a `finally` block present, but no matching `catch` block?",
    "options": [
      "The program terminates immediately without executing the finally block",
      "The finally block executes, and then the exception is propagated",
      "Compilation error because catch is mandatory",
      "The finally block executes and suppresses the exception completely"
    ],
    "ans": 1,
    "explanation": "A `finally` block is guaranteed to execute whether an exception is caught or not. If there is no matching catch block (or no catch block at all), the finally block runs first, and then the exception is propagated up the call stack."
  },
  {
    "q": "(GATE CS 2008) Which of the following statements about exceptions in Java is TRUE?",
    "options": [
      "All exceptions are checked at compile time",
      "A method must declare all unchecked exceptions it can throw",
      "Checked exceptions must be either caught or declared in the throws clause",
      "Runtime exceptions must be caught using try-catch blocks"
    ],
    "ans": 2,
    "explanation": "Checked exceptions (those that do not inherit from RuntimeException or Error) are verified by the compiler. They must be explicitly handled via a try-catch block or declared in the method signature using the `throws` keyword."
  },
  {
    "q": "(GATE CS 2015) Consider the following code snippet containing multiple catch blocks for a single try block. Which catch block must appear first to avoid a compilation error?",
    "options": [
      "catch(Exception e)",
      "catch(RuntimeException e)",
      "catch(NullPointerException e)",
      "The order does not matter"
    ],
    "ans": 2,
    "explanation": "When dealing with exception hierarchies, catch blocks must be ordered from the most specific subclass to the most general superclass. Therefore, `NullPointerException` must appear before `RuntimeException`, which must appear before `Exception`."
  },
  {
    "q": "(GATE IT 2006) What will be the output of a Java program where a `return` statement is encountered inside a `try` block that is followed by a `finally` block?",
    "options": [
      "The method returns immediately, skipping the finally block",
      "The finally block executes first, and then the method returns",
      "Compilation error due to return inside try",
      "The return statement is ignored, and only the finally block executes"
    ],
    "ans": 1,
    "explanation": "The `finally` block is always executed before control transfers out of the `try` block, even if a `return` statement is present inside the `try` block."
  },
  {
    "q": "(GATE CS 2010) Which keyword is used to explicitly throw an exception object in Java?",
    "options": [
      "throws",
      "throw",
      "catch",
      "finally"
    ],
    "ans": 1,
    "explanation": "The `throw` keyword is used to explicitly throw a single exception instance (e.g., `throw new IOException();`), whereas `throws` is used in method signatures to declare exceptions."
  },
  {
    "q": "(GATE CS 2018) If a `finally` block itself throws an exception while another exception was already thrown in the `try` block (and not caught), which exception is propagated to the caller?",
    "options": [
      "The exception thrown in the try block",
      "The exception thrown in the finally block",
      "Both exceptions are wrapped into a single Exception object",
      "The program terminates without propagating any exception"
    ],
    "ans": 1,
    "explanation": "If a `finally` block throws an exception, it suppresses any exception that was previously thrown in the `try` or `catch` block and is currently propagating. The exception from the `finally` block becomes the one propagated to the caller."
  },
  {
    "q": "(GATE CS 2004) In Java, all exceptions and errors are subclasses of which of the following classes?",
    "options": [
      "Exception",
      "Error",
      "Throwable",
      "RuntimeException"
    ],
    "ans": 2,
    "explanation": "The class `Throwable` is the superclass of all errors and exceptions in the Java language."
  },
  {
    "q": "(GATE IT 2007) Which of the following blocks is mandatory with a `try` block?",
    "options": [
      "Only catch",
      "Only finally",
      "Either catch or finally (or both)",
      "Both catch and finally"
    ],
    "ans": 2,
    "explanation": "A `try` block must be followed by at least one `catch` block or a `finally` block. It cannot stand alone."
  },
  {
    "q": "(GATE CS 2003) When an array index is out of bounds in Java, which exception is thrown?",
    "options": [
      "IndexOutOfBoundsException",
      "ArrayIndexOutOfBoundsException",
      "ArrayBoundsException",
      "OutOfMemoryError"
    ],
    "ans": 1,
    "explanation": "Java throws an `ArrayIndexOutOfBoundsException` when you try to access an array with an illegal index."
  },
  {
    "q": "(GATE CS 2011) What is the superclass of all unchecked exceptions in Java (excluding Errors)?",
    "options": [
      "Exception",
      "Throwable",
      "RuntimeException",
      "UncheckedException"
    ],
    "ans": 2,
    "explanation": "`RuntimeException` and its subclasses are unchecked exceptions. They do not need to be declared in a method or constructor's `throws` clause."
  },
  {
    "q": "(GATE IT 2005) Can a method declare multiple exceptions in its throws clause?",
    "options": [
      "No, only one exception can be declared",
      "Yes, separated by semicolons",
      "Yes, separated by commas",
      "No, the throws clause is only for single exceptions"
    ],
    "ans": 2,
    "explanation": "A method can declare that it throws multiple exceptions by listing them in the `throws` clause, separated by commas."
  },
  {
    "q": "(GATE CS 2016) A user-defined checked exception class in Java should typically extend:",
    "options": [
      "Throwable",
      "Error",
      "RuntimeException",
      "Exception"
    ],
    "ans": 3,
    "explanation": "To create a custom checked exception, the class should extend `Exception` (but not `RuntimeException`)."
  },
  {
    "q": "(GATE CS 2009) What happens if an exception occurs inside a `catch` block?",
    "options": [
      "The program terminates immediately",
      "It is handled by the same catch block",
      "It is propagated to the caller or handled by an outer try-catch",
      "It is ignored"
    ],
    "ans": 2,
    "explanation": "An exception inside a `catch` block is treated like any other exception. If not handled by an inner try-catch, it propagates outward."
  },
  {
    "q": "(GATE IT 2008) Which exception is thrown when a division by zero occurs in integer arithmetic?",
    "options": [
      "ArithmeticException",
      "DivideByZeroException",
      "NumberFormatException",
      "MathematicalException"
    ],
    "ans": 0,
    "explanation": "Integer division by zero throws an `ArithmeticException`. Note that floating-point division by zero results in Infinity or NaN, not an exception."
  },
  {
    "q": "(GATE CS 2014) The 'throws' keyword in Java is used to:",
    "options": [
      "Throw an exception manually",
      "Catch an exception",
      "Declare an exception that might be thrown by a method",
      "Define a custom exception class"
    ],
    "ans": 2,
    "explanation": "The `throws` keyword is used in a method signature to declare which exceptions can be thrown by the method."
  }
];

export const chapter12_COMPLETE_EXERCISES = [];
