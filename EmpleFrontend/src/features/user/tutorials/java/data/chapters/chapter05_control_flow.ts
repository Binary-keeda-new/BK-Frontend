// Chapter 05

export const chapter05_CONTENT = {
  "title": "Control Flow",
  "description": "Control flow statements let programs make choices. Java uses if, else if, else, switch, and modern switch expressions to branch logic.",
  "points": [
    {
      "heading": "if / else if / else",
      "body": "Evaluates boolean conditions. If a condition matches, its block runs and the remaining branches are skipped."
    },
    {
      "heading": "Comparing Reference Types",
      "body": "Always use `.equals()` to compare object content (like `String`s). Do not use `==`, as it compares memory references instead of actual text values."
    },
    {
      "heading": "Traditional switch",
      "body": "Tests a variable against constant case values. Requires a `break` statement to prevent falling through to the next case."
    },
    {
      "heading": "Switch Expressions (Java 12+)",
      "body": "Uses arrows (`->`) instead of colons, supports returning a value directly, and eliminates the need for `break` statements."
    },
    {
      "heading": "Variable Scope in Blocks",
      "body": "Variables declared inside an `if`/`else` or `switch` block are local to that block and cannot be accessed outside."
    },
    {
      "heading": "Condition Types",
      "body": "Unlike C, Java conditions must evaluate strictly to a `boolean` (`true`/`false`). Integer values like `0` or `1` are not treated as booleans."
    }
  ],
  "code": "public class ControlFlow {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 90) {\n            System.out.println(\"Grade: A\");\n        } else if (score >= 75) {\n            System.out.println(\"Grade: B\");\n        } else {\n            System.out.println(\"Grade: F\");\n        }\n\n        String day = \"MON\";\n        String type = switch (day) {\n            case \"SAT\", \"SUN\" -> \"Weekend\";\n            default -> \"Weekday\";\n        };\n        System.out.println(day + \" is a \" + type);\n    }\n}"
};

export const chapter05_DEBUG = {
  "instructions": "Fix the 3 string comparison and switch syntax bugs in this code.",
  "buggy": "public class Main {\n    public static void main(String[] args) {\n        String color = \"red\";\n        if (color == \"red\") {\n            System.out.println(\"Stop\");\n        }\n        switch (color) {\n            case \"red\":\n                System.out.println(\"Red\");\n            case \"green\":\n                System.out.println(\"Green\");\n                break;\n        }\n    }\n}",
  "fixed": "public class Main {\n    public static void main(String[] args) {\n        String color = \"red\";\n        if (color.equals(\"red\")) {\n            System.out.println(\"Stop\");\n        }\n        switch (color) {\n            case \"red\":\n                System.out.println(\"Red\");\n                break;\n            case \"green\":\n                System.out.println(\"Green\");\n                break;\n        }\n    }\n}",
  "hints": [
    "Use .equals() for string content comparison rather than ==",
    "Add break after the first case block to prevent fall-through",
    "Ensure all switch branches end with break or yield"
  ],
  "expectedOutput": "Stop\nRed"
};

export const chapter05_DRAG_DROP = {
  "instructions": "Arrange these lines to create an if-else check.",
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
      "text": "        int num = 15;"
    },
    {
      "id": "d",
      "text": "        if (num > 10) {"
    },
    {
      "id": "e",
      "text": "            System.out.println(\"Large\");"
    },
    {
      "id": "f",
      "text": "        } else {"
    },
    {
      "id": "g",
      "text": "            System.out.println(\"Small\");"
    },
    {
      "id": "h",
      "text": "        }"
    },
    {
      "id": "i",
      "text": "    }"
    },
    {
      "id": "j",
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
    "i",
    "j"
  ]
};

export const chapter05_MCQ = [
  {
    "q": "What is the output of the following Java program? (GATE CS 2015)\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        if (i++ == 0) {\n            System.out.println(i);\n        }\n    }\n}\n``",
    "options": [
      "0",
      "1",
      "Compilation Error",
      "No output"
    ],
    "ans": 1,
    "explanation": "The postfix operator `i++` evaluates to 0, which equals 0, so the condition is true. `i` is then incremented to 1 before the print statement executes."
  },
  {
    "q": "In Java, what occurs if a `switch` statement has no `break` statements between cases? (GATE CS 2004)",
    "options": [
      "Compilation error",
      "Only the matched case is executed",
      "Control falls through to subsequent cases until a break or the end of the switch is reached",
      "A runtime exception is thrown"
    ],
    "ans": 2,
    "explanation": "Without `break` statements, execution 'falls through' to all subsequent cases, regardless of whether their conditions match."
  },
  {
    "q": "Consider the following condition: `if (a = 5)`. Why does this cause a compilation error in Java but not in C? (GATE IT 2006)",
    "options": [
      "Variables cannot be modified in an if statement",
      "The assignment operator returns an integer, but Java requires a strictly boolean expression for if conditions",
      "Java does not support assignment operators",
      "a must be declared final"
    ],
    "ans": 1,
    "explanation": "In Java, `if` conditions must evaluate to `boolean`. The expression `a = 5` evaluates to an `int` (5), causing a compilation error."
  },
  {
    "q": "Which of the following data types CANNOT be used as the control variable in a traditional Java `switch` statement? (GATE CS 2018)",
    "options": [
      "int",
      "String",
      "enum",
      "double"
    ],
    "ans": 3,
    "explanation": "Java's `switch` statement does not support floating-point types (`float` or `double`). It supports integral types, `String`, and `enum`."
  },
  {
    "q": "How does an `else` statement resolve the 'dangling else' problem in Java? (GATE CS 1997)",
    "options": [
      "It binds to the outermost if statement",
      "It binds to the nearest preceding unmatched if statement in the same block",
      "It causes a compilation error requiring curly braces",
      "It resolves based on indentation"
    ],
    "ans": 1,
    "explanation": "Java resolves the dangling else ambiguity by associating an `else` with the closest preceding `if` that does not already have an `else`."
  },
  {
    "q": "Which of the following statements about the 'default' case in a switch statement is correct? (GATE CS 2011)",
    "options": [
      "It must be the last case in the switch block",
      "It is mandatory in every switch block",
      "It can be placed anywhere in the switch block",
      "It causes a compilation error if placed first"
    ],
    "ans": 2,
    "explanation": "The 'default' case can be placed anywhere in the switch block, though it is conventionally placed at the end."
  },
  {
    "q": "What will be the output of `if (false) { System.out.println(\"A\"); } else if (true) { System.out.println(\"B\"); } else { System.out.println(\"C\"); }`? (GATE IT 2008)",
    "options": [
      "A",
      "B",
      "C",
      "Compilation Error"
    ],
    "ans": 1,
    "explanation": "The first condition is false, the second is true, so 'B' is printed, and the final else is skipped."
  },
  {
    "q": "Which statement is used to exit a switch block early? (GATE CS 2002)",
    "options": [
      "exit",
      "return",
      "continue",
      "break"
    ],
    "ans": 3,
    "explanation": "The 'break' statement terminates the switch block and transfers control to the statement immediately following the switch."
  },
  {
    "q": "Is it possible to nest an if-else statement inside another if-else statement in Java? (GATE CS 2009)",
    "options": [
      "Yes, unconditionally",
      "No, it causes a compilation error",
      "Yes, but only up to 3 levels",
      "Yes, but only in the 'else' block"
    ],
    "ans": 0,
    "explanation": "Java supports nesting of if-else statements unconditionally, to any depth."
  },
  {
    "q": "What happens if multiple cases in a switch block have the same value? (GATE CS 2013)",
    "options": [
      "The first one is executed",
      "The last one is executed",
      "A compilation error occurs",
      "A runtime exception is thrown"
    ],
    "ans": 2,
    "explanation": "Java does not allow duplicate case labels in a switch statement; it results in a compilation error."
  },
  {
    "q": "Can the condition of an 'if' statement in Java be an expression that evaluates to an integer, like 'if(1)'? (GATE IT 2005)",
    "options": [
      "Yes, 1 is treated as true",
      "Yes, any non-zero value is treated as true",
      "No, it must evaluate to a boolean",
      "Yes, but it gives a warning"
    ],
    "ans": 2,
    "explanation": "In Java, the condition must explicitly evaluate to a boolean value (true or false)."
  },
  {
    "q": "Which of the following is true about Java 12+ switch expressions? (GATE CS 2017)",
    "options": [
      "They use the '->' operator",
      "They require 'break' statements",
      "They cannot return values",
      "They only support primitive types"
    ],
    "ans": 0,
    "explanation": "Switch expressions (introduced in Java 12) use the arrow '->' syntax and do not require 'break' statements."
  },
  {
    "q": "Consider `if (a == b)`. If 'a' and 'b' are Strings, what does this compare? (GATE CS 2010)",
    "options": [
      "Their character sequences",
      "Their string lengths",
      "Their object references",
      "Their hash codes"
    ],
    "ans": 2,
    "explanation": "The '==' operator compares object references, not the actual contents of the strings. Use .equals() for content comparison."
  },
  {
    "q": "What will be printed if x = 10, y = 20: `if(x > 5) if(y > 20) print(\"A\"); else print(\"B\");`? (GATE CS 2014)",
    "options": [
      "A",
      "B",
      "Nothing",
      "Compilation Error"
    ],
    "ans": 1,
    "explanation": "The else binds to the nearest if (`if(y > 20)`). Since x=10 > 5 is true, it enters the outer if. Since y=20 > 20 is false, it executes the else block and prints B."
  },
  {
    "q": "Which Java keyword allows you to jump to a specific labeled block in nested control flow structures? (GATE IT 2007)",
    "options": [
      "goto",
      "break with a label",
      "jump",
      "continue with no label"
    ],
    "ans": 1,
    "explanation": "Java supports labeled 'break' and 'continue' statements to exit or skip iterations of specific enclosing loops/blocks."
  }
];

export const chapter05_COMPLETE_EXERCISES = [];
