// Chapter 06

export const chapter06_CONTENT = {
  "title": "Loops: for, while & do-while",
  "description": "Loops repeat blocks of code. Java offers standard counter-controlled loops, pre-condition while loops, post-condition do-while loops, and enhanced for-loops.",
  "points": [
    {
      "heading": "for loop",
      "body": "`for (int i = 0; i < n; i++) {` \n`    // loop body` \n`}`\n\nUsed when the number of iterations is known before entering the loop."
    },
    {
      "heading": "while loop",
      "body": "`while (condition) {` \n`    // loop body` \n`}`\n\nRepeats execution while the condition is true. The condition is tested before entering the loop."
    },
    {
      "heading": "do-while loop",
      "body": "`do {` \n`    // loop body` \n`} while (condition);` \n\nRuns the loop body <u>at least once</u>, testing the condition at the end of the block."
    },
    {
      "heading": "break & continue",
      "body": "`break` immediately exits the current loop. `continue` skips the rest of the current iteration and goes to the next update."
    },
    {
      "heading": "Enhanced for loop (for-each)",
      "body": "`for (Type item : collection) {` \n`    // loop body` \n`}`\n\nSimplified syntax used to iterate sequentially over arrays or collection frameworks."
    },
    {
      "heading": "Infinite loops",
      "body": "`while (true)` runs forever unless a `break` statement is executed inside the body."
    }
  ],
  "code": "public class Loops {\n    public static void main(String[] args) {\n        // for loop\n        for (int i = 1; i <= 5; i++) {\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n\n        // enhanced for loop\n        int[] numbers = {10, 20, 30};\n        for (int num : numbers) {\n            System.out.println(\"Value: \" + num);\n        }\n    }\n}"
};

export const chapter06_DEBUG = {
  "instructions": "Fix the 3 bugs in this loop to print numbers from 1 to 5.",
  "buggy": "public class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        while (i <= 5) {\n            System.out.print(i + \" \")\n            i++\n        }\n    }\n}",
  "fixed": "public class Main {\n    public static void main(String[] args) {\n        int i = 1;\n        while (i <= 5) {\n            System.out.print(i + \" \");\n            i++;\n        }\n    }\n}",
  "hints": [
    "Initialize index i to 1 to start printing from 1",
    "The System.out.print statement requires a semicolon",
    "The counter update i++ requires a semicolon"
  ],
  "expectedOutput": "1 2 3 4 5 "
};

export const chapter06_DRAG_DROP = {
  "instructions": "Arrange these lines to write a for loop that runs 3 times.",
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
      "text": "        for (int i = 0; i < 3; i++) {"
    },
    {
      "id": "d",
      "text": "            System.out.println(i);"
    },
    {
      "id": "e",
      "text": "        }"
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

export const chapter06_MCQ = [
  {
    "q": "Consider the following Java code fragment (GATE CS 2015):\n```java\nint i = 0, j = 0;\nwhile (i < 10) {\n    if (i % 2 == 0) {\n        j += i;\n    }\n    i++;\n}\nSystem.out.println(j);\n```\nWhat will be the output?",
    "options": [
      "20",
      "12",
      "30",
      "45"
    ],
    "ans": 0,
    "explanation": "The loop runs for i = 0 to 9. It adds even values of i to j. j = 0 + 2 + 4 + 6 + 8 = 20."
  },
  {
    "q": "Consider the following code (GATE CS 2014):\n```java\nint i = 1, j = 1;\nfor (; i <= 10; i++) {\n    if (i % 3 == 0) continue;\n    j++;\n}\nSystem.out.println(j);\n```\nWhat is the value of j at the end of the loop?",
    "options": [
      "7",
      "8",
      "9",
      "10"
    ],
    "ans": 1,
    "explanation": "The loop iterates 10 times. When i=3, 6, 9, the continue statement is executed and j++ is skipped. Thus j is incremented 7 times. Initial j=1, so final j=8."
  },
  {
    "q": "Consider the following Java snippet (GATE CS 2004):\n```java\nint x = 0;\nfor (int i = 0; i < 5; i++) {\n    for (int j = i; j > 0; j--) {\n        x++;\n    }\n}\nSystem.out.println(x);\n```\nWhat will be printed?",
    "options": [
      "15",
      "10",
      "5",
      "25"
    ],
    "ans": 1,
    "explanation": "The outer loop runs for i=0 to 4. Inner loop runs i times. Total iterations = 0 + 1 + 2 + 3 + 4 = 10."
  },
  {
    "q": "Consider the following code (GATE CS 2018):\n```java\nint c = 0;\nint i = 2;\nwhile (i < 100) {\n    int j = 2;\n    while (j <= i / j) {\n        if (i % j == 0) break;\n        j++;\n    }\n    if (j > i / j) c++;\n    i++;\n}\nSystem.out.println(c);\n```\nWhat does the above code compute?",
    "options": [
      "The number of composite numbers between 2 and 99",
      "The number of prime numbers between 2 and 99",
      "The number of odd numbers between 2 and 99",
      "The sum of prime numbers between 2 and 99"
    ],
    "ans": 1,
    "explanation": "This is standard logic for checking prime numbers. The variable c keeps a count of how many primes are found between 2 and 99."
  },
  {
    "q": "Consider the following snippet (GATE IT 2006):\n```java\nint n = 10;\nint count = 0;\ndo {\n    n /= 2;\n    count++;\n} while (n > 0);\nSystem.out.println(count);\n```\nWhat is the output?",
    "options": [
      "3",
      "4",
      "5",
      "Infinite loop"
    ],
    "ans": 1,
    "explanation": "Iterations: \n1) n=10/2=5, count=1\n2) n=5/2=2, count=2\n3) n=2/2=1, count=3\n4) n=1/2=0, count=4. Loop ends."
  },
  {
    "q": "What will be the output of the following Java program (GATE CS 1999)?\n```java\nint i = 0;\nwhile (i < 3) {\n    System.out.print(i + \" \");\n    i++;\n    if (i == 2) continue;\n    System.out.print(\"X \");\n}\n``",
    "options": [
      "0 X 1 2 X",
      "0 X 1 2",
      "0 X 1 2 X ",
      "0 1 X 2 "
    ],
    "ans": 0,
    "explanation": "i=0: prints '0 ', i becomes 1, prints 'X '. i=1: prints '1 ', i becomes 2, continue skips 'X '. i=2: prints '2 ', i becomes 3, prints 'X '."
  },
  {
    "q": "Consider the following code block (GATE CS 2008):\n```java\nint j = 0;\nfor (int i = 0; i < 10; i++) {\n    j += (i % 2 == 0) ? 1 : 0;\n}\nSystem.out.println(j);\n```\nWhat is the value printed?",
    "options": [
      "4",
      "5",
      "6",
      "10"
    ],
    "ans": 1,
    "explanation": "The loop iterates for i from 0 to 9. It adds 1 to j whenever i is even. The even numbers are 0, 2, 4, 6, 8 (total 5 numbers). So j becomes 5."
  },
  {
    "q": "What happens when the following code is compiled and executed? (GATE CS 2011)\n```java\nfor (int i = 0; ; i++) {\n    if (i > 3) break;\n    System.out.print(i);\n}\n``",
    "options": [
      "Compilation Error due to missing condition",
      "Runtime Exception",
      "Prints 0123",
      "Infinite loop"
    ],
    "ans": 2,
    "explanation": "The condition part of a for loop is optional. If omitted, it evaluates to true. The loop prints 0, 1, 2, 3 and then breaks when i=4."
  },
  {
    "q": "Consider the following loop (GATE IT 2007):\n```java\nint x = 1;\nwhile (x <= 100) {\n    x *= 2;\n}\nSystem.out.println(x);\n```\nWhat is the final value of x?",
    "options": [
      "100",
      "128",
      "64",
      "256"
    ],
    "ans": 1,
    "explanation": "The loop multiplies x by 2 in each iteration. x takes values 1, 2, 4, 8, 16, 32, 64, 128. Once x becomes 128, the condition x <= 100 becomes false."
  },
  {
    "q": "In Java, what will the following snippet output? (GATE CS 2001)\n```java\nint a = 5, b = 2;\nwhile (a > 0) {\n    a -= b;\n}\nSystem.out.println(a);\n``",
    "options": [
      "-1",
      "0",
      "1",
      "2"
    ],
    "ans": 0,
    "explanation": "Iterations: a=5 (a-=2 -> 3), a=3 (a-=2 -> 1), a=1 (a-=2 -> -1). Now a is -1, which is not > 0. The loop terminates and prints -1."
  },
  {
    "q": "Analyze the following Java code snippet (GATE CS 2019):\n```java\nint count = 0;\nfor (int i = 0; i < 5; i++) {\n    for (int j = 0; j < 5; j++) {\n        if (i == j) break;\n        count++;\n    }\n}\nSystem.out.println(count);\n```\nWhat is the value of count?",
    "options": [
      "10",
      "15",
      "20",
      "25"
    ],
    "ans": 0,
    "explanation": "Outer loop i=0..4. Inner loop j=0..4. It breaks when i==j. For i=0, breaks immediately (0 increments). For i=1, j=0 increments, breaks at j=1 (1 increment). i=2 gives 2 increments, i=3 gives 3, i=4 gives 4. Total = 0+1+2+3+4 = 10."
  },
  {
    "q": "What will be printed? (GATE CS 1998)\n```java\nint k = 0;\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (i == 2) continue;\n        k++;\n    }\n}\nSystem.out.println(k);\n``",
    "options": [
      "9",
      "6",
      "3",
      "0"
    ],
    "ans": 1,
    "explanation": "When i=2, the continue statement skips the rest of the inner loop body for all 3 iterations of j. Thus, k is incremented only when i=1 (3 times) and i=3 (3 times). Total k=6."
  },
  {
    "q": "Consider the following do-while loop (GATE IT 2004):\n```java\nint i = 5;\ndo {\n    System.out.print(i + \" \");\n    i--;\n} while (i > 5);\n```\nWhat is the output?",
    "options": [
      "5 ",
      "5 4 3 2 1 ",
      "Compilation Error",
      "No output"
    ],
    "ans": 0,
    "explanation": "A do-while loop always executes at least once. It prints '5 ', then i becomes 4. The condition i > 5 is false (4 > 5), so the loop terminates."
  },
  {
    "q": "Identify the output of this snippet (GATE CS 2013):\n```java\nint x = 0;\nfor (int i = 0; i < 3; i++) {\n    switch(i) {\n        case 0: x += 1;\n        case 1: x += 2;\n        case 2: x += 3;\n    }\n}\nSystem.out.println(x);\n``",
    "options": [
      "6",
      "12",
      "14",
      "18"
    ],
    "ans": 2,
    "explanation": "Missing break statements cause fall-through. i=0: adds 1+2+3=6 to x. i=1: adds 2+3=5 to x. i=2: adds 3 to x. Total x = 6+5+3 = 14."
  },
  {
    "q": "Consider the loop condition (GATE CS 1996):\n```java\nint i = 1;\nwhile (++i <= 5) {\n    System.out.print(i + \" \");\n}\n```\nWhat is the output?",
    "options": [
      "1 2 3 4 5",
      "2 3 4 5",
      "1 2 3 4",
      "2 3 4 5 6"
    ],
    "ans": 1,
    "explanation": "Pre-increment evaluates to the incremented value. i=1 -> ++i is 2 (<=5), prints 2. Then 3, 4, 5. When i becomes 6, 6 <= 5 is false. So prints 2 3 4 5."
  }
];

export const chapter06_COMPLETE_EXERCISES = [
  {
    template: `public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; ___) {
            System.out.println(i);
        }
    }
}`,
    blanks: [
      "i++"
    ]
  }
];
