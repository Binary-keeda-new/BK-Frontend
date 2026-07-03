"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAPTERS = exports.COMPLETE_EXERCISES = exports.DRAG_DROP = exports.DEBUG = exports.MCQ = exports.CONTENT = void 0;
exports.shuffle = shuffle;
// --- CURRICULUM DATA ---
exports.CONTENT = {
    basics: {
        title: "Java Basics",
        description: "Java is a popular, class-based, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995. It runs on the Write Once, Run Anywhere principle using the Java Virtual Machine (JVM).",
        points: [
            { heading: "Structure of a Java program", body: "Every Java program is written inside a class. The filename must match the public class name (e.g., `Main.java`). Execution starts from the main method: `public static void main(String[] args)`." },
            { heading: "Compilation & JVM", body: "Source `.java` → Compiler `javac` → Bytecode `.class` → JVM `java`. The JVM interprets/JIT-compiles bytecode into native machine instructions." },
            { heading: "Comments", body: "`// Single-line comment`\n`/* Multi-line comment */`\n`/** Javadoc comment used to generate API docs */`" },
            { heading: "Identifiers & Keywords", body: "Names of classes, methods, and variables are identifiers. Keywords like `public`, `class`, `static`, `void` are <u>reserved by Java</u>." },
            { heading: "System.out.println()", body: "Standard output function. `System` is a class, `out` is a static print stream, and `println` is the method that prints text followed by a newline." },
            { heading: "Strict Rules", body: "Java is <u>case-sensitive</u>, statements must end with semicolons, and code blocks are enclosed in curly braces `{}`." }
        ],
        code: "public class Main {\n    public static void main(String[] args) {\n        // Print hello message to console\n        System.out.println(\"Hello, Java!\");\n    }\n}"
    },
    variables: {
        title: "Variables & Data Types",
        description: "Variables are containers for storing data values. Java is statically-typed, meaning every variable must be declared with a data type before use.",
        points: [
            { heading: "Primitive Types", body: "Java has 8 primitives: `byte`, `short`, `int`, `long` (integers); `float`, `double` (floating points); `boolean` (true/false); `char` (single 16-bit Unicode character)." },
            { heading: "Reference Types", body: "Point to objects in memory. The most common reference type is `String` (e.g., `String name = \"Alex\"`). Uninitialized reference types default to `null`." },
            { heading: "Declaration & Initialization", body: "`int count = 10;`\n`double price = 19.99;`\n`char grade = 'A';`\n`boolean isActive = true;`" },
            { heading: "Type Casting", body: "Widening casting (implicit): `byte` -> `short` -> `int` -> `long` -> `float` -> `double`. Narrowing casting (explicit): `double` -> `float` -> `long` -> `int` -> `char` -> `short` -> `byte`, e.g., `int x = (int) 3.14;`" },
            { heading: "Variables Scope", body: "Local variables are declared inside methods and must be initialized before use. Instance variables are declared in a class and have default values." },
            { heading: "Constants", body: "Use the `final` keyword. A `final` variable's value cannot be changed once assigned: `final double PI = 3.14159;`" }
        ],
        code: "public class DataVariables {\n    public static void main(String[] args) {\n        int age = 22;\n        double gpa = 3.85;\n        char initial = 'J';\n        boolean isEnrolled = true;\n        final int MAX_CREDITS = 18;\n\n        System.out.println(\"Age: \" + age);\n        System.out.println(\"GPA: \" + gpa);\n        System.out.println(\"Initial: \" + initial);\n        System.out.println(\"Enrolled: \" + isEnrolled);\n    }\n}"
    },
    io: {
        title: "Input & Output",
        description: "Java provides standard stream variables System.out and System.in for output and input. The Scanner class is used to read formatted user input.",
        points: [
            { heading: "System.out methods", body: "`println()` prints data with a newline. `print()` prints data without a newline. `printf()` provides formatted output (e.g., `%d`, `%s`)." },
            { heading: "Reading Input with Scanner", body: "Import `java.util.Scanner`. Initialize with: `Scanner scanner = new Scanner(System.in);`. Always close the scanner when done." },
            { heading: "Reading Primitive values", body: "Use `nextInt()` for integers, `nextDouble()` for doubles, `nextBoolean()` for booleans, and `next()` for single words." },
            { heading: "Reading Strings", body: "Use `nextLine()` to read an entire line of text. Be careful: call `nextLine()` to clear the buffer if reading a line after `nextInt()`." },
            { heading: "Format Specifiers", body: "Use `System.out.printf(\"Total: %.2f\", total);` for decimals, `%s` for strings, `%d` for integers, and `%n` for a platform-independent newline." },
            { heading: "System.err", body: "`System.err` is the standard error stream. Output is typically colored red in IDE consoles to denote error logs." }
        ],
        code: "import java.util.Scanner;\n\npublic class InputOutput {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n\n        System.out.print(\"Enter name: \");\n        String name = scanner.nextLine();\n\n        System.out.print(\"Enter age: \");\n        int age = scanner.nextInt();\n\n        System.out.printf(\"Hello, %s! Next year you will be %d.%n\", name, age + 1);\n        scanner.close();\n    }\n}"
    },
    operators: {
        title: "Operators & Expressions",
        description: "Operators perform operations on variables and values. Java provides arithmetic, relational, logical, assignment, bitwise, and conditional operators.",
        points: [
            { heading: "Arithmetic Operators", body: "`+`, `-`, `*`, `/`, `%` (modulus). Division on integers discards remainder (e.g., `5 / 2 = 2`). Modulus returns the remainder (e.g., `5 % 2 = 1`)." },
            { heading: "Relational & Logical Operators", body: "`==`, `!=`, `<`, `>`, `<=`, `>=` evaluate to boolean values. Logical `&&` (AND), `||` (OR), and `!` (NOT) are used to combine conditions." },
            { heading: "Short-Circuit Evaluation", body: "`&&` and `||` evaluate operands left-to-right. If the first operand determines the result (e.g., false in `&&`), the second is skipped." },
            { heading: "Unary Operators", body: "`++` and `--` increment/decrement by 1. Post-increment (`x++`) returns the value first, then increments. Pre-increment (`++x`) increments first." },
            { heading: "String Concatenation", body: "The `+` operator concatenates strings. If one operand is a `String` and the other is a primitive, the primitive is converted to a `String`." },
            { heading: "Ternary Operator", body: "`condition ? value_if_true : value_if_false` is a compact single-line if-else assignment." }
        ],
        code: "public class Operators {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 4;\n        System.out.println(\"Quotient: \" + (a / b));\n        System.out.println(\"Remainder: \" + (a % b));\n\n        int x = 5;\n        System.out.println(\"Post-increment: \" + x++); // prints 5\n        System.out.println(\"Current x: \" + x);         // prints 6\n\n        String result = (a > b) ? \"Greater\" : \"Lesser\";\n        System.out.println(\"Ternary: \" + result);\n    }\n}"
    },
    "control-flow": {
        title: "Control Flow",
        description: "Control flow statements let programs make choices. Java uses if, else if, else, switch, and modern switch expressions to branch logic.",
        points: [
            { heading: "if / else if / else", body: "Evaluates boolean conditions. If a condition matches, its block runs and the remaining branches are skipped." },
            { heading: "Comparing Reference Types", body: "Always use `.equals()` to compare object content (like `String`s). Do not use `==`, as it compares memory references instead of actual text values." },
            { heading: "Traditional switch", body: "Tests a variable against constant case values. Requires a `break` statement to prevent falling through to the next case." },
            { heading: "Switch Expressions (Java 12+)", body: "Uses arrows (`->`) instead of colons, supports returning a value directly, and eliminates the need for `break` statements." },
            { heading: "Variable Scope in Blocks", body: "Variables declared inside an `if`/`else` or `switch` block are local to that block and cannot be accessed outside." },
            { heading: "Condition Types", body: "Unlike C, Java conditions must evaluate strictly to a `boolean` (`true`/`false`). Integer values like `0` or `1` are not treated as booleans." }
        ],
        code: "public class ControlFlow {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 90) {\n            System.out.println(\"Grade: A\");\n        } else if (score >= 75) {\n            System.out.println(\"Grade: B\");\n        } else {\n            System.out.println(\"Grade: F\");\n        }\n\n        String day = \"MON\";\n        String type = switch (day) {\n            case \"SAT\", \"SUN\" -> \"Weekend\";\n            default -> \"Weekday\";\n        };\n        System.out.println(day + \" is a \" + type);\n    }\n}"
    },
    loops: {
        title: "Loops: for, while & do-while",
        description: "Loops repeat blocks of code. Java offers standard counter-controlled loops, pre-condition while loops, post-condition do-while loops, and enhanced for-loops.",
        points: [
            { heading: "for loop", body: "`for (int i = 0; i < n; i++) {` \n`    // loop body` \n`}`\n\nUsed when the number of iterations is known before entering the loop." },
            { heading: "while loop", body: "`while (condition) {` \n`    // loop body` \n`}`\n\nRepeats execution while the condition is true. The condition is tested before entering the loop." },
            { heading: "do-while loop", body: "`do {` \n`    // loop body` \n`} while (condition);` \n\nRuns the loop body <u>at least once</u>, testing the condition at the end of the block." },
            { heading: "break & continue", body: "`break` immediately exits the current loop. `continue` skips the rest of the current iteration and goes to the next update." },
            { heading: "Enhanced for loop (for-each)", body: "`for (Type item : collection) {` \n`    // loop body` \n`}`\n\nSimplified syntax used to iterate sequentially over arrays or collection frameworks." },
            { heading: "Infinite loops", body: "`while (true)` runs forever unless a `break` statement is executed inside the body." }
        ],
        code: "public class Loops {\n    public static void main(String[] args) {\n        // for loop\n        for (int i = 1; i <= 5; i++) {\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n\n        // enhanced for loop\n        int[] numbers = {10, 20, 30};\n        for (int num : numbers) {\n            System.out.println(\"Value: \" + num);\n        }\n    }\n}"
    },
    functions: {
        title: "Methods",
        description: "Methods (functions in OOP) are blocks of code that run when called. They are used to modularize, write reusable logic, and define behavior inside classes.",
        points: [
            { heading: "Method Signature", body: "Consists of the method name and parameter list. Access modifiers (like `public`) and return type (or `void`) are declared first." },
            { heading: "Static vs Instance Methods", body: "`static` methods belong to the class and are called directly: `ClassName.method()`. Instance methods require an object to be called." },
            { heading: "Pass by Value", body: "Java passes all arguments <u>by value</u>. For objects, the 'value' passed is the memory reference copy, so properties can be modified." },
            { heading: "Return Statement", body: "Sends a value back to the caller. `void` methods return no value and can use a blank `return;` to exit early." },
            { heading: "Method Overloading", body: "Declaring multiple methods in the same class with the same name but different parameters (number, types, or order)." },
            { heading: "Recursion", body: "A method calling itself. Must contain a <u>base case</u> to terminate execution and prevent `StackOverflowError`." }
        ],
        code: "public class Methods {\n    // Static helper method\n    public static int multiply(int a, int b) {\n        return a * b;\n    }\n\n    // Overloaded method\n    public static double multiply(double a, double b) {\n        return a * b;\n    }\n\n    public static void main(String[] args) {\n        int res1 = multiply(5, 10);\n        double res2 = multiply(2.5, 4.0);\n        System.out.println(\"Res 1: \" + res1);\n        System.out.println(\"Res 2: \" + res2);\n    }\n}"
    },
    arrays: {
        title: "Arrays",
        description: "An array is an object that holds a fixed number of values of a single data type. Arrays in Java are zero-indexed and reside on the heap.",
        points: [
            { heading: "Declaring & Instantiating", body: "`int[] nums = new int[5];` creates an empty array of size 5. Or declare with values: `int[] nums = {1, 2, 3, 4, 5};`." },
            { heading: "Accessing elements", body: "Use square brackets: `nums[0]` is the first element, `nums[nums.length - 1]` is the last element." },
            { heading: "Array Length", body: "Use the `.length` property to find size (e.g., `nums.length`). Unlike `String`s, arrays use a property, not a method." },
            { heading: "Multidimensional Arrays", body: "Arrays of arrays. Declare a 2D grid: `int[][] matrix = new int[3][3];`. Access elements via `matrix[row][col]`." },
            { heading: "Default values", body: "Newly allocated numeric arrays are initialized to `0`. `boolean` arrays default to `false`. Object arrays default to `null`." },
            { heading: "ArrayIndexOutOfBoundsException", body: "Thrown at runtime if you attempt to access an index less than 0 or greater than or equal to the array length." }
        ],
        code: "public class ArraysExample {\n    public static void main(String[] args) {\n        int[] values = {10, 20, 30, 40};\n        \n        System.out.println(\"Length: \" + values.length);\n        for (int i = 0; i < values.length; i++) {\n            System.out.printf(\"Index %d: %d%n\", i, values[i]);\n        }\n\n        int[][] grid = {{1, 2}, {3, 4}};\n        System.out.println(\"Grid[1][0]: \" + grid[1][0]);\n    }\n}"
    },
    strings: {
        title: "Strings",
        description: "In Java, a String is an object that represents a sequence of characters. Strings are immutable, meaning their content cannot be modified once created.",
        points: [
            { heading: "Immutability", body: "`String` operations (like concat or replace) do not modify the original string; instead, they return a new `String` object." },
            { heading: "Comparing Strings", body: "Always use `.equals()` for content comparison. `==` checks if two variables point to the same memory reference." },
            { heading: "Common Methods", body: "`length()` returns character count; `charAt(index)` gets character; `substring(start, end)` extracts parts; `toLowerCase()` converts case." },
            { heading: "String Pool", body: "Java optimizes memory by storing literal strings in a pool. Literal declarations (e.g. `\"Hi\"`) share pool references." },
            { heading: "Concatenation", body: "Use `+` operator or `concat()`. Under the hood, Java uses `StringBuilder` to optimize repetitive literal concatenations." },
            { heading: "StringBuilder & StringBuffer", body: "Mutable character sequences. Use `StringBuilder` for heavy string manipulations inside single-threaded applications." }
        ],
        code: "public class StringsExample {\n    public static void main(String[] args) {\n        String str = \"Java Programming\";\n        System.out.println(\"Length: \" + str.length());\n        System.out.println(\"Char at index 5: \" + str.charAt(5));\n        System.out.println(\"Substring: \" + str.substring(0, 4));\n\n        String s1 = new String(\"Hello\");\n        String s2 = new String(\"Hello\");\n        System.out.println(\"s1 == s2: \" + (s1 == s2));       // false\n        System.out.println(\"s1.equals(s2): \" + s1.equals(s2)); // true\n    }\n}"
    },
    pointers: {
        title: "Classes & Objects",
        description: "Java is an object-oriented language. A class is a blueprint, and an object is an instance of a class that contains state (fields) and behavior (methods).",
        points: [
            { heading: "Declaring a Class", body: "A class defines the template. Instance variables hold state, constructors initialize state, and methods define actions." },
            { heading: "Instantiation", body: "Create an object using the `new` keyword: `Car myCar = new Car();`. This allocates object memory on the heap." },
            { heading: "Constructors", body: "Special methods called during object creation. They have no return type and share the exact name of the class." },
            { heading: "The 'this' Keyword", body: "Refers to the current object instance. Typically used to distinguish instance variables from local parameter names." },
            { heading: "Access Modifiers", body: "Control visibility: `public` (anywhere), `private` (class only), `protected` (package/subclass), `default` (package only)." },
            { heading: "Getters & Setters", body: "Provide controlled access to private instance fields, enforcing <u>encapsulation</u> best practices." }
        ],
        code: "public class User {\n    private String name;\n    private int age;\n\n    // Constructor\n    public User(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    // Getter\n    public String getName() {\n        return name;\n    }\n\n    public static void main(String[] args) {\n        User user = new User(\"Bob\", 25);\n        System.out.println(\"User Name: \" + user.getName());\n    }\n}"
    },
    structures: {
        title: "OOP Principles",
        description: "Object-Oriented Programming relies on four main pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction to manage complexity.",
        points: [
            { heading: "Inheritance", body: "Allows a class (subclass) to inherit fields and methods from another (superclass) using the `extends` keyword." },
            { heading: "Polymorphism", body: "Allows objects to take many forms. Method Overriding lets a subclass provide a custom implementation of an inherited method using `@Override`." },
            { heading: "Encapsulation", body: "Restricting direct access to object state. Fields are declared `private`, and exposed through public getters and setters." },
            { heading: "Abstraction & Interfaces", body: "Abstract classes/methods hide implementation details. Interfaces define contracts using abstract methods and default implementations using `implements`." },
            { heading: "The 'super' Keyword", body: "Used to call superclass constructors or superclass overridden methods from a subclass." },
            { heading: "Final Classes & Methods", body: "A `final` class cannot be inherited (`extended`). A `final` method cannot be overridden by subclasses." }
        ],
        code: "// Interface\ninterface Animal {\n    void makeSound();\n}\n\n// Subclass implementing interface\nclass Dog implements Animal {\n    @Override\n    public void makeSound() {\n        System.out.println(\"Woof\");\n    }\n}\n\npublic class OOP {\n    public static void main(String[] args) {\n        Animal myDog = new Dog();\n        myDog.makeSound(); // Polymorphism\n    }\n}"
    },
    "file-handling": {
        title: "Exception Handling",
        description: "Exceptions are events that disrupt the normal flow of instructions. Java handles exceptions using try, catch, finally, throw, and throws keywords.",
        points: [
            { heading: "Try-Catch Blocks", body: "Place error-prone code in the `try` block. If an exception occurs, execution transfers to the `catch` block." },
            { heading: "Finally Block", body: "Code that <u>always executes</u> after try-catch, regardless of whether an exception was thrown. Used to release files or resources." },
            { heading: "Checked vs Unchecked", body: "Checked (compile-time) exceptions must be caught or declared. Unchecked (runtime) exceptions represent programming bugs." },
            { heading: "Throwing Exceptions", body: "Use the `throw` keyword to explicitly raise an exception in code (e.g., `throw new IllegalArgumentException();`)." },
            { heading: "Throws Clause", body: "Declared in method signatures to list the checked exceptions a method might propagate to its callers using `throws`." },
            { heading: "Multiple Catches", body: "Catch specific exceptions first (e.g., `NullPointerException`) before catching generic `Exception` objects to prevent swallowing bugs." }
        ],
        code: "public class ExceptionsExample {\n    public static void main(String[] args) {\n        try {\n            int[] arr = {1, 2};\n            System.out.println(arr[5]); // throws exception\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"Handled index error: \" + e.getMessage());\n        } finally {\n            System.out.println(\"Execution cleanup completed.\");\n        }\n    }\n}"
    },
    memory: {
        title: "Collections",
        description: "The Java Collections Framework provides an architecture to store and manipulate groups of objects. It includes lists, sets, and maps.",
        points: [
            { heading: "ArrayList", body: "A resizable array implementation of the `List` interface. Elements can be dynamically added, accessed, and removed." },
            { heading: "HashMap", body: "A map implementation that stores key-value pairs. Offers constant-time `O(1)` performance for insert and lookup operations." },
            { heading: "Generics", body: "Specify the type of objects collections store (e.g. `ArrayList<String>`). Prevents typecast errors at runtime." },
            { heading: "Wrapper Classes", body: "Primitives cannot be stored in collections. Java autoboxes primitives into Wrapper objects (e.g., `int` -> `Integer`)." },
            { heading: "HashSet", body: "A collection that stores unique elements only. Backed by a `HashMap`, duplicate element insertions are ignored." },
            { heading: "Iterating Collections", body: "Use an enhanced `for` loop, `Iterator` class, or Lambda expressions (`.forEach()`) to traverse collection elements." }
        ],
        code: "import java.util.ArrayList;\nimport java.util.HashMap;\n\npublic class CollectionsExample {\n    public static void main(String[] args) {\n        // ArrayList\n        ArrayList<String> list = new ArrayList<>();\n        list.add(\"Java\");\n        list.add(\"C++\");\n        System.out.println(\"List: \" + list);\n\n        // HashMap\n        HashMap<String, Integer> map = new HashMap<>();\n        map.put(\"Java\", 1);\n        map.put(\"Python\", 2);\n        System.out.println(\"Java Rank: \" + map.get(\"Java\"));\n    }\n}"
    },
    multithreading: {
        title: "Concurrency & Shared Data",
        description: "Multithreading is a Java feature that allows concurrent execution of two or more parts of a program to make maximum use of the CPU.",
        points: [
            { heading: "Creating a Thread", body: "Two ways: (1) Extend the `Thread` class and override `run()`, or (2) Implement the `Runnable` interface and pass it to a new Thread instance (preferred)." },
            { heading: "Thread Lifecycle", body: "Threads can be in states: `New`, `Runnable`, `Blocked`, `Waiting`, `Timed Waiting`, or `Terminated`. Use `thread.start()` to begin execution." },
            { heading: "Concurrency & Shared Data", body: "When multiple threads access shared resources, race conditions can occur. Use the `synchronized` keyword or Locks to ensure thread-safety." },
            { heading: "Thread Methods", body: "`Thread.sleep(ms)` pauses execution. `thread.join()` waits for a thread to die. `Thread.currentThread()` retrieves the active thread." },
            { heading: "Volatile Keyword", body: "Ensures changes to a variable are immediately visible to all threads, preventing local caching of shared variables using `volatile`." },
            { heading: "Thread Pool & ExecutorService", body: "Reuses threads from a pool instead of creating new ones for every task, improving performance in concurrent applications." }
        ],
        code: "class MyThread extends Thread {\n    public void run() {\n        System.out.println(\"Thread running: \" + Thread.currentThread().getName());\n    }\n}\n\npublic class Concurrency {\n    public static void main(String[] args) {\n        MyThread t1 = new MyThread();\n        t1.start(); // Start thread execution\n    }\n}"
    },
    java8: {
        title: "Streams & Lambdas",
        description: "Java 8 introduced functional programming features that allow writing concise, declarative code. The core elements are Lambda Expressions, Functional Interfaces, and the Streams API.",
        points: [
            { heading: "Lambda Expressions", body: "An anonymous method with syntax: `(parameters) -> { body }`. Useful for writing inline implementations of single-method interfaces." },
            { heading: "Functional Interfaces", body: "Interfaces with exactly one abstract method (e.g., `Runnable`, `Comparator`). Annotate with `@FunctionalInterface` for compiler checks." },
            { heading: "Streams API Overview", body: "Allows sequence of elements to be processed in pipeline. Streams do not modify the original data source; they process elements on the fly." },
            { heading: "Intermediate Operations", body: "Transform a stream into another stream (lazy evaluation). Common operations: `filter()`, `map()`, `sorted()`, `distinct()`." },
            { heading: "Terminal Operations", body: "Produce a result or side-effect and close the stream. Common operations: `collect()`, `forEach()`, `count()`, `reduce()`." },
            { heading: "Method References", body: "Double colon syntax (`Class::method`) used as a shorthand writeup for simple lambda expressions calling existing methods." }
        ],
        code: "import java.util.Arrays;\nimport java.util.List;\n\npublic class StreamsExample {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Alice\", \"Bob\", \"Charlie\");\n        \n        // Filter names starting with 'A' and print\n        names.stream()\n             .filter(name -> name.startsWith(\"A\"))\n             .forEach(System.out::println);\n    }\n}"
    }
};
exports.MCQ = {
    basics: [
        { q: "Who created Java and when?", options: ["Dennis Ritchie in 1972", "James Gosling in 1995", "Bjarne Stroustrup in 1985", "Guido van Rossum in 1991"], ans: 1, explanation: "James Gosling created Java at Sun Microsystems in 1995." },
        { q: "What does the JVM stand for?", options: ["Java Virtual Machine", "Java Variable Method", "Java Verified Mechanism", "Java Value Mapping"], ans: 0, explanation: "JVM stands for Java Virtual Machine, which runs Java bytecode on host operating systems." },
        { q: "Which tool compiled Main.java to Main.class?", options: ["java", "jvm", "javac", "jar"], ans: 2, explanation: "javac is the Java compiler tool used to compile source files to bytecode class files." },
        { q: "Which signature represents the standard Java entry point method?", options: ["public void main(String[] args)", "public static void main(String[] args)", "static void main(String args)", "public static int main(String[] args)"], ans: 1, explanation: "The standard entry point signature is public static void main(String[] args)." },
        { "q": "What is the output?\n```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"5\" + 3 + 2);\n    }\n}\n```", "options": ["10", "532", "53+2", "Compilation Error"], "ans": 1, "explanation": "String concatenation with + is left-associative. \"5\" + 3 becomes \"53\", then \"53\" + 2 becomes \"532\"." },
        { "q": "Which statement about Java's platform independence is true?", "options": ["Java source code runs directly on hardware", "Java bytecode runs on any platform with a JVM", "Java only runs on Windows", "Java requires recompilation for each OS"], "ans": 1, "explanation": "Java achieves platform independence because the compiled bytecode (.class files) can run on any operating system that has a compatible JVM installed." },
        { "q": "What is the output?\n```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(10 + 20 + \"30\");\n    }\n}\n```", "options": ["102030", "3030", "60", "Compilation Error"], "ans": 1, "explanation": "Addition is left-associative. 10 + 20 evaluates first as integer addition to 30. Then 30 + \"30\" triggers string concatenation (since one operand is a String), producing \"3030\"." },
        { "q": "Which of the following is NOT a valid Java identifier?", "options": ["_value", "$total", "2ndPlace", "myVar2"], "ans": 2, "explanation": "Java identifiers cannot begin with a digit. They can begin with a letter, underscore, or dollar sign." },
        { "q": "What is the purpose of the JIT (Just-In-Time) compiler in the JVM?", "options": ["Converts Java source to bytecode", "Compiles bytecode to native machine code at runtime for performance", "Manages garbage collection", "Handles exception stack traces"], "ans": 1, "explanation": "The JIT compiler translates frequently executed bytecode into native machine code during execution, improving performance over pure interpretation." },
        { "q": "Which of these is a valid single-line comment in Java?", "options": ["# This is a comment", "-- This is a comment", "// This is a comment", "<!-- This is a comment -->"], "ans": 2, "explanation": "Java uses C-style comments: // for single-line and /* */ for multi-line comments." },
        { "q": "What must the name of a public class match in a Java source file?", "options": ["The package name", "The file name (excluding .java extension)", "The project name", "The main method name"], "ans": 1, "explanation": "If a class is declared public, the source file name must exactly match the class name, including case sensitivity." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println('A' + 1);\n    }\n}\n```", "options": ["A1", "B", "66", "Compilation Error"], "ans": 2, "explanation": "'A' is a char, which is implicitly promoted to its Unicode integer value (65) when used in an arithmetic expression. 65 + 1 = 66, printed as an int." },
        { "q": "Which keyword is used to import a package in Java?", "options": ["include", "using", "import", "require"], "ans": 2, "explanation": "The import keyword is used to bring classes from other packages into scope, similar to #include in C or import in Python." },
        { "q": "What happens if a Java program has no main method?", "options": ["It compiles and runs with no output", "It fails to compile", "It compiles but throws a runtime error when executed", "It runs the first method defined"], "ans": 2, "explanation": "A class without a main method can compile successfully (e.g. as a utility class), but attempting to execute it directly results in a runtime error: 'Main method not found'." },
        { "q": "What is bytecode in the context of Java?", "options": ["Raw machine code specific to Intel processors", "Platform-independent intermediate code executed by the JVM", "Java source code before formatting", "A compressed version of the .java file"], "ans": 1, "explanation": "Bytecode is the intermediate, platform-independent representation generated by javac from Java source code, which the JVM interprets or JIT-compiles." }
    ],
    variables: [
        { q: "Which is NOT a primitive data type in Java?", options: ["int", "double", "String", "boolean"], ans: 2, explanation: "String is a class in Java (reference type), not a primitive." },
        { q: "How many bytes does an int data type use in Java?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], ans: 2, explanation: "An int primitive is fixed at 32-bits (4 bytes) in Java across all platforms." },
        { q: "Which keyword declares a variable whose value cannot be reassigned?", options: ["const", "final", "static", "void"], ans: 1, explanation: "The final keyword declares a constant variable in Java." },
        { q: "Which type conversion represents narrow (explicit) casting?", options: ["int to long", "float to double", "double to int", "byte to int"], ans: 2, explanation: "Converting from double (larger) to int (smaller) requires explicit narrowing cast: (int)." },
        { "q": "What is the range of a Java `byte` data type?", "options": ["0 to 255", "-128 to 127", "-32768 to 32767", "-256 to 255"], "ans": 1, "explanation": "A byte is 8 bits and signed, giving a range of -128 to 127 (2^7 to 2^7 - 1)." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        byte b = 130;\n        System.out.println(b);\n    }\n}\n```", "options": ["130", "-126", "Compilation Error", "0"], "ans": 2, "explanation": "130 exceeds the byte range (-128 to 127) and cannot be assigned directly as a literal without an explicit cast, resulting in a compilation error (possible lossy conversion)." },
        { "q": "What is the default value of an uninitialized instance variable of type `int`?", "options": ["null", "Garbage value", "0", "Compilation Error"], "ans": 2, "explanation": "Java automatically initializes instance (and class) fields to default values. Numeric types default to 0, unlike local variables which must be explicitly initialized." },
        { "q": "Which of these correctly declares a long literal in Java?", "options": ["long x = 100000000000;", "long x = 100000000000L;", "long x = L100000000000;", "long x = 100000000000l;"], "ans": 1, "explanation": "Long literals exceeding int range require an 'L' or 'l' suffix (uppercase L is preferred for readability) to indicate the literal type." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        {\n            int y = 10;\n            System.out.println(x + y);\n        }\n        System.out.println(y);\n    }\n}\n```", "options": ["15\\n10", "15\\nCompilation Error", "Compilation Error", "15\\n0"], "ans": 2, "explanation": "Variable y is scoped to the inner block only. Attempting to access y outside its scope (in the second println) causes a compilation error: cannot find symbol." },
        { "q": "What is the result of implicitly widening a `float` to a `double`?", "options": ["Loss of precision occurs", "No data loss occurs", "It requires an explicit cast", "It causes a runtime exception"], "ans": 1, "explanation": "Widening conversions (float to double) are implicit and safe in Java since double has a larger range and precision than float, so no data is lost." },
        { "q": "Which statement about `char` in Java is correct?", "options": ["char is a signed 8-bit type", "char is an unsigned 16-bit type representing Unicode", "char can only store ASCII characters", "char is a reference type"], "ans": 1, "explanation": "Java's char is a 16-bit unsigned type representing a single UTF-16 code unit, capable of storing Unicode characters with values from 0 to 65535." },
        { "q": "What is the value of `10 / 4.0` in Java?", "options": ["2", "2.5", "2.0", "Compilation Error"], "ans": 1, "explanation": "When at least one operand of a division is a floating-point type (4.0), Java performs floating-point division rather than integer division, giving 2.5." },
        { "q": "Which of the following is true about local variables in Java?", "options": ["They have default values", "They must be explicitly initialized before use", "They are stored on the heap", "They can be accessed outside their method"], "ans": 1, "explanation": "Unlike instance/class fields, local variables do not get automatic default values and must be explicitly assigned before being read, or the compiler raises an error." },
        { "q": "What happens when you assign an `int` value to a `long` variable?", "options": ["Compilation error requiring explicit cast", "Automatic widening conversion occurs", "The value is truncated", "Runtime exception is thrown"], "ans": 1, "explanation": "int to long is a widening primitive conversion, which Java performs implicitly without requiring an explicit cast, since long has a larger range." },
        { "q": "What is autoboxing in the context of variables?", "options": ["Converting a wrapper class to a primitive automatically", "Converting a primitive to its corresponding wrapper class automatically", "Casting between numeric primitives", "Boxing an array into a collection"], "ans": 1, "explanation": "Autoboxing is the automatic conversion Java performs between a primitive type (like int) and its corresponding wrapper class object (like Integer)." }
    ],
    io: [
        { q: "Which class is commonly used to read input from the console?", options: ["Reader", "Scanner", "System.in", "Console"], ans: 1, explanation: "java.util.Scanner is the utility class used to read user input values." },
        { q: "Which method in Scanner reads an entire line of text?", options: ["next()", "read()", "nextLine()", "nextString()"], ans: 2, explanation: "nextLine() reads text until a newline character is encountered." },
        { q: "What is the difference between print() and println()?", options: ["println() requires arguments", "println() appends a newline at the end", "print() works with integers only", "println() writes to error stream"], ans: 1, explanation: "println() appends a newline character to the end of the printed text." },
        { q: "Which format specifier outputs a decimal value with exactly 2 decimal places?", options: ["%d", "%.2d", "%.2f", "%f.2"], ans: 2, explanation: "%.2f formats a floating-point number to two decimal places." },
        { "q": "Output (assume user enters 'John' then presses Enter, followed by 25):\n```java\nScanner sc = new Scanner(System.in);\nSystem.out.print(\"Name: \");\nint age = sc.nextInt();\nString name = sc.nextLine();\nSystem.out.println(name);\n```\nIf the input order is `25` then Enter, what does `name` contain immediately after?", "options": ["\"25\"", "An empty string (leftover newline)", "null", "\"John\""], "ans": 1, "explanation": "nextInt() reads the integer but leaves the trailing newline character in the input buffer. The subsequent nextLine() call reads that leftover newline as an empty string." },
        { "q": "Which Scanner method should be called to properly release its resources?", "options": ["scanner.dispose()", "scanner.close()", "scanner.end()", "scanner.release()"], "ans": 1, "explanation": "Calling close() on a Scanner releases the underlying resources (such as the input stream) and is recommended once input reading is complete." },
        { "q": "What does `System.out.printf(\"%5d\", 42)` output?", "options": ["42", "   42", "42   ", "00042"], "ans": 1, "explanation": "%5d specifies a minimum field width of 5 characters, right-aligned by default, padding with spaces: '   42' (3 spaces + 42)." },
        { "q": "Which exception is thrown if `scanner.nextInt()` is called but the input is not a valid integer?", "options": ["NumberFormatException", "InputMismatchException", "IllegalArgumentException", "IOException"], "ans": 1, "explanation": "Scanner throws an InputMismatchException if the next token does not match the expected type pattern (e.g., a non-numeric string when nextInt() is called)." },
        { "q": "What is the output of `System.out.printf(\"%-10s|\", \"Hi\")`?", "options": ["'Hi        |'", "'        Hi|'", "'Hi|'", "Compilation Error"], "ans": 0, "explanation": "The minus sign in %-10s left-justifies the string within a field width of 10, padding with spaces on the right, followed by '|'." },
        { "q": "Which class provides buffered character-stream reading in Java for potentially better performance?", "options": ["Scanner", "BufferedReader", "InputStream", "PrintWriter"], "ans": 1, "explanation": "BufferedReader wraps another Reader to provide efficient reading of characters, arrays, and lines by buffering input, generally faster than Scanner for large inputs." },
        { "q": "What does `%n` represent in a printf format string?", "options": ["A percentage symbol", "A platform-independent newline", "A null character", "A tab character"], "ans": 1, "explanation": "%n inserts the platform-specific line separator, making output portable across operating systems, unlike the hardcoded \\n." },
        { "q": "What is the return type of `scanner.next()`?", "options": ["char", "int", "String", "Object"], "ans": 2, "explanation": "next() reads and returns the next complete token as a String, stopping at whitespace." },
        { "q": "Which stream is typically used to write formatted error messages that bypass standard output buffering?", "options": ["System.out", "System.in", "System.err", "System.log"], "ans": 2, "explanation": "System.err is the standard error stream, conventionally used for error messages, and is often unbuffered so errors appear immediately." },
        { "q": "Output:\n```java\nSystem.out.printf(\"%d apples cost $%.2f%n\", 3, 1.5);\n```", "options": ["3 apples cost $1.50", "3 apples cost $1.5", "3.0 apples cost $1.50", "Compilation Error"], "ans": 0, "explanation": "%d formats the integer 3, and %.2f formats the double 1.5 to two decimal places, producing '1.50'." },
        { "q": "What is a key risk of using `scanner.nextInt()` followed directly by `scanner.nextLine()` without handling the buffer?", "options": ["A NumberFormatException is always thrown", "The nextLine() call may return an unexpectedly empty string", "The program crashes immediately", "nextInt() will fail instead"], "ans": 1, "explanation": "Because nextInt() doesn't consume the trailing newline, the following nextLine() call picks up that leftover newline and returns an empty string instead of the intended next line of input." }
    ],
    operators: [
        { q: "What is the result of 5 / 2 in Java?", options: ["2.5", "2", "3", "0"], ans: 1, explanation: "Integer division discards any decimal remainder, evaluating to 2." },
        { q: "What is the modulus operator (%) used for?", options: ["Percentage math", "Dividing floats", "Calculating division remainder", "Pointer math"], ans: 2, explanation: "The modulus operator computes the remainder after division." },
        { q: "What does short-circuit evaluation of logical AND (&&) mean?", options: ["Both sides are evaluated concurrently", "If the left side is false, the right side is skipped", "If the left side is true, the right side is skipped", "It throws an exception"], ans: 1, explanation: "In &&, if the left operand is false, the expression is guaranteed false, so the right side is not run." },
        { q: "Which operator is the ternary conditional?", options: ["??", "::", "? :", "->"], ans: 2, explanation: "? : is the ternary operator used for inline conditional assignments." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int a = 5;\n        int b = a++ + ++a;\n        System.out.println(b);\n    }\n}\n```", "options": ["11", "12", "10", "13"], "ans": 1, "explanation": "a++ evaluates to 5 (a becomes 6), then ++a evaluates to 7 (pre-increment on 6). Sum: 5 + 7 = 12." },
        { "q": "What is the result of `5 & 3` (bitwise AND) in Java?", "options": ["7", "1", "8", "0"], "ans": 1, "explanation": "5 is 101 in binary, 3 is 011. Bitwise AND gives 001, which equals 1." },
        { "q": "What is the output of `~5` (bitwise complement) in Java?", "options": ["5", "-5", "-6", "10"], "ans": 2, "explanation": "The bitwise complement operator inverts all bits. For any integer x, ~x equals -(x+1). So ~5 = -6." },
        { "q": "Which operator has the highest precedence in Java?", "options": ["Assignment (=)", "Logical OR (||)", "Postfix (++, --)", "Ternary (?:)"], "ans": 2, "explanation": "Postfix increment/decrement operators have the highest precedence among standard Java operators, evaluated before arithmetic and logical operators." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        x >>= 2;\n        System.out.println(x);\n    }\n}\n```", "options": ["40", "2", "5", "20"], "ans": 1, "explanation": "The right-shift-assignment operator shifts bits right by 2 positions: 10 (1010) >> 2 = 2 (0010)." },
        { "q": "What does the `instanceof` operator check?", "options": ["Whether two objects are equal", "Whether an object is an instance of a specific class or subclass", "Whether a variable is initialized", "Whether a class implements Comparable"], "ans": 1, "explanation": "instanceof tests whether an object reference is an instance of a given type, returning a boolean, commonly used before downcasting." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        boolean result = (5 > 3) | (10 / 0 == 0);\n        System.out.println(result);\n    }\n}\n```", "options": ["true", "false", "ArithmeticException thrown", "Compilation Error"], "ans": 2, "explanation": "The single pipe | is a non-short-circuit logical OR — both operands are always evaluated. Since the right side (10/0) throws an ArithmeticException, execution halts before printing." },
        { "q": "What is the output of `10 % -3` in Java?", "options": ["-2", "1", "2", "-1"], "ans": 1, "explanation": "In Java, the sign of the modulus result follows the sign of the dividend (left operand). 10 % -3 = 1, since 10 = (-3)*(-3) + 1." },
        { "q": "Which compound assignment operator performs an implicit narrowing cast?", "options": ["+=", "=", "==", "instanceof"], "ans": 0, "explanation": "Compound assignment operators like += implicitly cast the result back to the variable's original type, e.g., `byte b = 10; b += 5;` compiles fine even though the intermediate result is an int." },
        { "q": "What is the output of `true && (5 / 0 > 1)`?", "options": ["true", "false", "ArithmeticException thrown", "Compilation Error"], "ans": 2, "explanation": "Since the left operand is true, && must evaluate the right side to determine the final result, which throws an ArithmeticException due to division by zero." },
        { "q": "What is the result of the expression `(int)(4.9 + 4.9)`?", "options": ["8", "9", "10", "9.8"], "ans": 1, "explanation": "4.9 + 4.9 evaluates to 9.8 as a double first, and then casting to int truncates the decimal part, resulting in 9." }
    ],
    "control-flow": [
        { q: "How must a condition inside an if statement evaluate in Java?", options: ["To any integer (0 or 1)", "Strictly to a boolean (true or false)", "To a string object", "To any numeric value"], ans: 1, explanation: "Java requires conditions to evaluate strictly to a boolean value." },
        { q: "Which keyword stops execution fall-through in case statements?", options: ["stop", "continue", "break", "exit"], ans: 2, explanation: "The break keyword exits the switch block, preventing fall-through." },
        { q: "How do you compare the content of two String variables for equality?", options: ["s1 == s2", "s1.equals(s2)", "s1 === s2", "compare(s1, s2)"], ans: 1, explanation: ".equals() checks content equality. == checks memory reference equality." },
        { q: "Which operator replaces colons in modern Java switch expressions?", options: ["->", "=>", "::", ":"], ans: 0, explanation: "Modern switch expressions (Java 12+) use the arrow operator (->)." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        if (x = 5) {\n            System.out.println(\"Equal\");\n        }\n    }\n}\n```", "options": ["Equal", "No output", "Compilation Error", "Runtime Error"], "ans": 2, "explanation": "Unlike C, Java requires if conditions to be strictly boolean. Since x = 5 is an assignment expression evaluating to int, it causes a compilation error." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int day = 3;\n        switch (day) {\n            case 1:\n            case 2:\n            case 3:\n                System.out.println(\"Early Week\");\n                break;\n            case 4:\n            case 5:\n                System.out.println(\"Late Week\");\n                break;\n        }\n    }\n}\n```", "options": ["Early Week", "Late Week", "Nothing prints", "Compilation Error"], "ans": 0, "explanation": "Grouped case labels (1, 2, 3) share the same code block due to fall-through with no break statements between them, so day=3 matches and prints 'Early Week'." },
        { "q": "Can a `switch` statement in Java operate on a `String` variable?", "options": ["No, never", "Yes, since Java 7", "Yes, but only in switch expressions", "Only with enums"], "ans": 1, "explanation": "Since Java 7, switch statements support String as the selector type, in addition to int, char, byte, short, and enums." },
        { "q": "What happens if no `case` matches and there is no `default` in a switch statement?", "options": ["Compilation error", "The switch block does nothing", "The first case executes", "A runtime exception is thrown"], "ans": 1, "explanation": "If no case matches and no default label exists, control simply exits the switch block without executing any code — no error occurs." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        String result = switch (x) {\n            case 1, 2, 3 -> \"Low\";\n            case 4, 5, 6 -> \"Mid\";\n            default -> \"High\";\n        };\n        System.out.println(result);\n    }\n}\n```", "options": ["Low", "Mid", "High", "Compilation Error"], "ans": 1, "explanation": "The modern switch expression matches x=5 against case 4, 5, 6, yielding 'Mid' and assigning it directly to result." },
        { "q": "Which of the following correctly demonstrates a nested if-else structure resolving the 'dangling else' correctly?", "options": ["else always binds to the nearest unmatched if", "else always binds to the outermost if", "Java requires explicit braces to avoid ambiguity", "Both A and C are true"], "ans": 3, "explanation": "In Java (like C), an else clause always associates with the nearest preceding unmatched if. However, best practice recommends explicit braces to avoid ambiguity in nested conditionals." },
        { "q": "In a modern Java switch expression using arrows, what keyword is used to return a value from a multi-statement block?", "options": ["return", "yield", "break", "output"], "ans": 1, "explanation": "The yield keyword is used within a block-style switch expression case to produce the resulting value, distinct from 'return' which exits an enclosing method." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 20;\n        if (a > 5 && b > 5)\n            System.out.println(\"A\");\n        else if (a > 15)\n            System.out.println(\"B\");\n        else\n            System.out.println(\"C\");\n    }\n}\n```", "options": ["A", "B", "C", "AB"], "ans": 0, "explanation": "Since a > 5 (10>5) and b > 5 (20>5) are both true, the first condition matches, printing 'A' and skipping the rest of the else-if chain." },
        { "q": "What data types are valid as a traditional `switch` selector in Java (excluding switch expressions)?", "options": ["Only int and char", "int, char, byte, short, String, and enum types", "Any primitive type including double", "Only Object subclasses"], "ans": 1, "explanation": "Traditional switch supports byte, short, char, int (and their wrapper classes), String, and enum types as the selector expression — but not long, float, double, or boolean." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int x = 2;\n        switch (x) {\n            default:\n                System.out.println(\"Default\");\n                break;\n            case 1:\n                System.out.println(\"One\");\n                break;\n        }\n    }\n}\n```", "options": ["Default", "One", "Compilation Error", "No output"], "ans": 0, "explanation": "The default label can appear anywhere in the switch block. Since x=2 matches no case, control falls to default, printing 'Default'." },
        { "q": "Which of these is required to make an if-else-if ladder mutually exclusive?", "options": ["Using switch instead", "Each branch condition being evaluated only if the prior conditions are false", "Adding a break after each block", "Declaring all variables as final"], "ans": 1, "explanation": "An if-else-if ladder is inherently mutually exclusive because each subsequent condition is only checked if all preceding conditions evaluated to false." }
    ],
    loops: [
        { q: "Which loop evaluates its condition after running the body?", options: ["for", "while", "do-while", "for-each"], ans: 2, explanation: "The do-while loop evaluates its condition after executing the body, running at least once." },
        { q: "What does the continue statement do in a loop?", options: ["Exits the loop", "Restarts the program", "Skips to the next iteration", "Pauses execution"], ans: 2, explanation: "continue skips the remainder of the current iteration block." },
        { q: "What is the enhanced for loop syntax used for?", options: ["Infinite looping", "Iterating arrays or collections sequentially", "Pre-testing conditions", "Throwing exceptions"], ans: 1, explanation: "The enhanced for loop (for-each) provides a clean way to iterate over arrays and collections." },
        { q: "What represents a standard infinite loop in Java?", options: ["while(1)", "while(true)", "for(true)", "do while(0)"], ans: 1, explanation: "while(true) creates an infinite loop since Java conditions must be booleans." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int count = 0;\n        for (int i = 0; i < 5; i++) {\n            if (i == 2) continue;\n            count++;\n        }\n        System.out.println(count);\n    }\n}\n```", "options": ["5", "4", "3", "2"], "ans": 1, "explanation": "The loop runs for i=0,1,2,3,4 (5 iterations). When i==2, continue skips the count++ statement for that iteration only, resulting in count being incremented 4 times." },
        { "q": "What is the output?\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        outer:\n        for (int a = 0; a < 3; a++) {\n            for (int b = 0; b < 3; b++) {\n                if (b == 1) continue outer;\n                i++;\n            }\n        }\n        System.out.println(i);\n    }\n}\n```", "options": ["9", "3", "6", "0"], "ans": 1, "explanation": "Labeled continue outer skips to the next iteration of the outer loop as soon as b==1. Only i++ at b=0 executes for each of the 3 outer iterations, giving i=3." },
        { "q": "What is a key difference between `while` and `do-while` loops?", "options": ["while checks the condition after the loop body executes", "do-while guarantees at least one execution of the loop body", "while loops cannot use break", "do-while loops run indefinitely"], "ans": 1, "explanation": "do-while evaluates its condition after executing the body, guaranteeing the body runs at least once, unlike while which checks the condition first." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        for (int i = 5; i > 0; i--) {\n            if (i == 3) break;\n            System.out.print(i);\n        }\n    }\n}\n```", "options": ["54321", "543", "54", "5432"], "ans": 2, "explanation": "The loop prints i=5, then i=4, then when i=3 the break statement immediately terminates the loop before printing 3." },
        { "q": "What is the enhanced for-loop (for-each) syntax unable to do that a standard for-loop can?", "options": ["Iterate over an ArrayList", "Access the current element's index directly", "Iterate over an array", "Use a break statement"], "ans": 1, "explanation": "The for-each loop hides the underlying iterator/index mechanism, making it impossible to directly access or modify the loop index without a separate counter." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int x = 0;\n        do {\n            x++;\n        } while (x < 0);\n        System.out.println(x);\n    }\n}\n```", "options": ["0", "1", "Infinite loop", "-1"], "ans": 1, "explanation": "do-while always executes the body at least once. x becomes 1, then the condition (1 < 0) is false, so the loop exits with x=1." },
        { "q": "What does the following nested loop print?\n```java\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(\"*\");\n    }\n    System.out.println();\n}\n```", "options": ["***\\n***\\n***", "*\\n**\\n***", "***\\n**\\n*", "* * *"], "ans": 1, "explanation": "The inner loop runs j from 1 to i, printing an increasing number of stars per outer iteration: 1 star, then 2 stars, then 3 stars, each on a new line." },
        { "q": "Which loop construct is best suited when the exact number of iterations is unknown but a condition must be checked before each iteration?", "options": ["for loop", "while loop", "do-while loop", "enhanced for loop"], "ans": 1, "explanation": "A while loop is ideal when the number of iterations depends on a runtime condition checked before each iteration, unlike for loops which are typically used for a known iteration count." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        while (i < 3) {\n            i++;\n            System.out.print(i + \" \");\n        }\n    }\n}\n```", "options": ["0 1 2", "1 2 3", "0 1 2 3", "1 2 3 4"], "ans": 1, "explanation": "i is incremented before it is printed each time. Starting from 0, the loop prints 1, then 2, then 3, stopping once i reaches 3 (loop condition becomes false after printing 3)." },
        { "q": "What happens when `break` is used inside a switch statement that is nested inside a for loop?", "options": ["It exits the for loop", "It exits only the switch statement", "It causes a compilation error", "It exits both the switch and the loop"], "ans": 1, "explanation": "break inside a switch only terminates the switch block itself; it does not affect the enclosing loop unless the loop is explicitly labeled and targeted." },
        { "q": "What is the purpose of a labeled loop in Java, e.g. `outer: for (...) { ... }`?", "options": ["To name the loop variable", "To allow break/continue statements to target a specific outer loop from within nested loops", "To document the loop for readability only", "To restrict loop iteration count"], "ans": 1, "explanation": "Labels allow break and continue statements inside nested loops to specifically target an outer loop, rather than just the innermost enclosing loop." }
    ],
    functions: [
        { q: "What belongs to a class and doesn't require creating an object?", options: ["Instance method", "Constructor", "Static method", "Field modifier"], ans: 2, explanation: "Static methods belong to the class and are called without class instances." },
        { q: "What is method overloading?", options: ["Overriding parent class methods", "Declaring methods with same name but different parameters", "Running out of call stack space", "Declaring final methods"], ans: 1, explanation: "Method overloading means sharing the method name with unique parameter signatures." },
        { q: "How does Java pass parameters to methods?", options: ["By reference", "By value", "Depends on type", "By constant reference"], ans: 1, explanation: "Java passes all arguments strictly by value (copying reference variables or primitives)." },
        { q: "Which exception occurs when recursive calls overflow stack memory?", options: ["OutOfMemoryError", "StackOverflowError", "RecursionException", "NullPointerException"], ans: 1, explanation: "Too many nested stack frames result in a StackOverflowError." },
        { "q": "Output:\n```java\npublic class Main {\n    static int counter() {\n        return 5;\n    }\n    public static void main(String[] args) {\n        System.out.println(counter() + counter());\n    }\n}\n```", "options": ["5", "10", "55", "Compilation Error"], "ans": 1, "explanation": "counter() is called twice, each returning 5, and the results are added: 5 + 5 = 10." },
        { "q": "What is method overloading resolution based on in Java?", "options": ["Return type only", "The number and/or types of parameters", "Method name only", "Access modifier"], "ans": 1, "explanation": "Java resolves overloaded methods at compile time based on the number, types, and order of the arguments passed — return type alone cannot distinguish overloads." },
        { "q": "Which of the following method signatures would cause a compilation error due to an ambiguous overload conflict?", "options": ["void foo(int a) and void foo(double a)", "int foo(int a) and void foo(int a)", "void foo(int a, int b) and void foo(int a)", "void foo(String a) and void foo(int a)"], "ans": 1, "explanation": "Overloading requires different parameter lists — return type alone does not differentiate methods, so int foo(int a) and void foo(int a) are duplicate signatures and cause a compile error." },
        { "q": "What is the correct term for a method having the same name as its class with no return type?", "options": ["Static initializer", "Constructor", "Destructor", "Finalizer"], "ans": 1, "explanation": "A constructor shares its class's name, has no return type (not even void), and is used to initialize new object instances." },
        { "q": "Output:\n```java\npublic class Main {\n    static void modify(int[] arr) {\n        arr[0] = 100;\n    }\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        modify(nums);\n        System.out.println(nums[0]);\n    }\n}\n```", "options": ["1", "100", "Compilation Error", "0"], "ans": 1, "explanation": "Although Java passes the array reference by value, the copied reference still points to the same array object on the heap, so modifications through it affect the original array." },
        { "q": "What is a recursive base case?", "options": ["The initial function call", "A condition that stops further recursive calls", "The return type of the method", "A loop inside the recursive function"], "ans": 1, "explanation": "A base case is the terminating condition in a recursive function that prevents infinite recursion, ensuring the recursion eventually returns without further self-calls." },
        { "q": "What is the primary use of varargs (`...`) in a Java method signature?", "options": ["To accept a variable number of arguments of a specified type", "To declare an array explicitly", "To mark a method as overloaded", "To pass arguments by reference"], "ans": 0, "explanation": "Varargs (e.g., `void method(int... nums)`) allows a method to accept zero or more arguments of the specified type, internally treated as an array." },
        { "q": "Output:\n```java\npublic class Main {\n    static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(4));\n    }\n}\n```", "options": ["24", "10", "4", "Compilation Error"], "ans": 0, "explanation": "factorial(4) = 4 * factorial(3) = 4 * 3 * factorial(2) = 4 * 3 * 2 * factorial(1) = 4 * 3 * 2 * 1 = 24." },
        { "q": "Which access modifier makes a method accessible only within the same class?", "options": ["public", "protected", "private", "default (package-private)"], "ans": 2, "explanation": "private restricts method access to the enclosing class only; it cannot be called from subclasses or other classes, even within the same package." },
        { "q": "What is the effect of declaring a method as `final`?", "options": ["It can only be called once", "It cannot be overridden by subclasses", "It cannot accept parameters", "It automatically becomes static"], "ans": 1, "explanation": "A final method cannot be overridden by any subclass, which is often used to preserve critical behavior or improve performance via inlining." },
        { "q": "What does a method with a `void` return type indicate?", "options": ["It returns null", "It returns 0", "It returns no value", "It throws an exception"], "ans": 2, "explanation": "void indicates that a method performs an action but does not return any value to the caller." }
    ],
    arrays: [
        { q: "Which is the index of the first element in a Java array?", options: ["1", "0", "-1", "null"], ans: 1, explanation: "Java arrays use zero-based indexing, starting at 0." },
        { q: "How do you find the size of a Java array named data?", options: ["data.size()", "data.length()", "data.length", "data.count"], ans: 2, explanation: "Arrays use the read-only .length field property to expose their sizes." },
        { q: "Which exception is thrown if you access index -1?", options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "ArrayStoreException", "IllegalArgumentException"], ans: 1, explanation: "Out-of-bounds array access throws an ArrayIndexOutOfBoundsException." },
        { q: "What is the default value of boolean array elements?", options: ["true", "false", "null", "0"], ans: 1, explanation: "Newly allocated boolean arrays are initialized with false by default." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = new int[3];\n        System.out.println(arr[0] + \" \" + arr[1] + \" \" + arr[2]);\n    }\n}\n```", "options": ["null null null", "Garbage values", "0 0 0", "Compilation Error"], "ans": 2, "explanation": "Java automatically initializes newly allocated numeric arrays to 0 for every element, unlike C, which leaves them uninitialized." },
        { "q": "What is the output?\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        int sum = 0;\n        for (int val : arr) {\n            sum += val;\n        }\n        System.out.println(sum);\n    }\n}\n```", "options": ["15", "10", "5", "Compilation Error"], "ans": 0, "explanation": "The enhanced for loop sums all 5 elements of the array: 1+2+3+4+5 = 15." },
        { "q": "What exception is thrown when accessing `arr[arr.length]` on a valid array `arr`?", "options": ["IndexOutOfBoundsException", "ArrayIndexOutOfBoundsException", "NullPointerException", "IllegalStateException"], "ans": 1, "explanation": "Valid array indices range from 0 to arr.length - 1. Accessing arr.length (one past the last valid index) throws ArrayIndexOutOfBoundsException." },
        { "q": "How do you correctly declare a jagged (irregular) 2D array in Java?", "options": ["int[][] arr = new int[3][3];", "int[][] arr = new int[3][];", "int arr[3][] = new int[3];", "int[3][] arr = new int[];"], "ans": 1, "explanation": "Declaring `new int[3][]` creates an array of 3 row references, each of which can then be independently allocated with different lengths, forming a jagged array." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3};\n        int[] b = a;\n        b[0] = 99;\n        System.out.println(a[0]);\n    }\n}\n```", "options": ["1", "99", "Compilation Error", "0"], "ans": 1, "explanation": "Arrays are reference types in Java. Assigning `b = a` copies the reference, so both a and b point to the same array object; modifying through b affects a as well." },
        { "q": "Which method from the `java.util.Arrays` class is used to sort an array?", "options": ["Arrays.order()", "Arrays.sort()", "Arrays.arrange()", "Collections.sort()"], "ans": 1, "explanation": "Arrays.sort(arr) is the standard utility method to sort primitive or object arrays in ascending order." },
        { "q": "What is the output of `Arrays.toString(new int[]{1, 2, 3})`?", "options": ["[1, 2, 3]", "1 2 3", "{1, 2, 3}", "Array reference hash"], "ans": 0, "explanation": "Arrays.toString() formats a one-dimensional array into a human-readable string in the format '[element1, element2, ...]'." },
        { "q": "How many total elements does the array `int[][] matrix = new int[3][4];` hold?", "options": ["7", "12", "3", "4"], "ans": 1, "explanation": "A rectangular 2D array with 3 rows and 4 columns has 3 * 4 = 12 total elements." },
        { "q": "What is the default value of elements in a newly created `String[]` array?", "options": ["Empty string \"\"", "null", "0", "Compilation Error"], "ans": 1, "explanation": "String is a reference type, so uninitialized array elements default to null, not an empty string." },
        { "q": "Which statement correctly copies elements from array `src` to array `dest` using a built-in utility?", "options": ["dest = src.copy();", "System.arraycopy(src, 0, dest, 0, src.length);", "dest = src.clone;", "Arrays.copy(src, dest);"], "ans": 1, "explanation": "System.arraycopy(src, srcPos, dest, destPos, length) is the standard native method for efficiently copying array elements." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 3, 8, 1};\n        java.util.Arrays.sort(arr);\n        System.out.println(arr[0]);\n    }\n}\n```", "options": ["5", "1", "8", "3"], "ans": 1, "explanation": "Arrays.sort() sorts the array in ascending order in-place, so after sorting {1, 3, 5, 8}, arr[0] is 1." }
    ],
    strings: [
        { q: "What does string immutability mean?", options: ["String content cannot be changed once created", "String objects cannot be assigned to variables", "String values cannot be compared", "String pool is read-only"], ans: 0, explanation: "String immutability means modifying operations return new String objects instead of altering the original memory." },
        { q: "Which method extracts a subset of characters from a String?", options: ["slice()", "split()", "substring()", "charAt()"], ans: 2, explanation: "substring() extracts character ranges from strings." },
        { q: "Which class is optimized for thread-safe mutable string operations?", options: ["StringBuilder", "StringBuffer", "StringJoiner", "StringTokenizer"], ans: 1, explanation: "StringBuffer is synchronized and thread-safe, unlike StringBuilder." },
        { q: "Where does Java store string literals for memory reuse?", options: ["Stack pool", "Heap registers", "String constant pool", "JVM stack"], ans: 2, explanation: "String literals are stored in the String Constant Pool in the heap." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        String s1 = \"hello\";\n        String s2 = \"hello\";\n        System.out.println(s1 == s2);\n    }\n}\n```", "options": ["true", "false", "Compilation Error", "NullPointerException"], "ans": 0, "explanation": "String literals are interned in the String Constant Pool. Both s1 and s2 reference the same pooled object, so == (reference comparison) returns true." },
        { "q": "What does `\"Hello\".replace('l', 'L')` return?", "options": ["\"HeLLo\"", "\"HelLo\"", "\"Hello\"", "Compilation Error"], "ans": 0, "explanation": "replace(char, char) replaces all occurrences of the target character. Both 'l' characters are replaced with 'L', yielding 'HeLLo'." },
        { "q": "What is the output of `\"Java\".compareTo(\"Java\")`?", "options": ["1", "-1", "0", "true"], "ans": 2, "explanation": "compareTo() returns 0 when the two strings are lexicographically equal, matching the contract used for sorting." },
        { "q": "Which method converts a `String` into a character array?", "options": ["toArray()", "toCharArray()", "chars()", "split(\"\")"], "ans": 1, "explanation": "toCharArray() returns a new char[] containing each character of the string in sequence." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder(\"Java\");\n        sb.append(\" Rocks\");\n        sb.insert(0, \">> \");\n        System.out.println(sb);\n    }\n}\n```", "options": [">> Java Rocks", "Java Rocks >>", "Java >> Rocks", "Compilation Error"], "ans": 0, "explanation": "append() adds ' Rocks' to the end (Java Rocks), then insert(0, ...) places '>> ' at the very beginning, giving '>> Java Rocks'." },
        { "q": "What is the result of `String.valueOf(123)`?", "options": ["123 (as int)", "\"123\" (as String)", "Compilation Error", "null"], "ans": 1, "explanation": "String.valueOf() is a static utility method that converts a value of any primitive type into its String representation." },
        { "q": "Which method checks if a String is empty (has zero length)?", "options": ["isNull()", "isBlank()", "isEmpty()", "isZero()"], "ans": 2, "explanation": "isEmpty() returns true if and only if the string's length is exactly 0. isBlank() (Java 11+) also considers strings with only whitespace as blank." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        String s = \"Programming\";\n        System.out.println(s.indexOf(\"gram\"));\n    }\n}\n```", "options": ["2", "3", "4", "-1"], "ans": 1, "explanation": "indexOf() returns the starting index of the first occurrence of the substring. 'gram' starts at index 3 in 'Programming' (P-r-o-g...)." },
        { "q": "What does `\"  Java  \".trim()` return?", "options": ["\"Java\"", "\"  Java  \"", "\" Java \"", "Compilation Error"], "ans": 0, "explanation": "trim() removes leading and trailing whitespace from a string, returning 'Java' without any surrounding spaces." },
        { "q": "Why is StringBuilder generally preferred over String concatenation (+=) inside a loop with many iterations?", "options": ["StringBuilder uses less memory per character", "String concatenation creates a new String object on every iteration, causing overhead", "StringBuilder automatically parallelizes operations", "String += causes a compilation error in loops"], "ans": 1, "explanation": "Since Strings are immutable, each += operation creates a new String object, leading to significant overhead in loops. StringBuilder mutates an internal buffer instead, making it far more efficient." },
        { "q": "What is the output of `\"abc\".equals(\"ABC\".toLowerCase())`?", "options": ["true", "false", "Compilation Error", "null"], "ans": 0, "explanation": "\"ABC\".toLowerCase() produces \"abc\", and .equals() compares string content, which matches exactly, returning true." }
    ],
    pointers: [
        { q: "Which keyword initializes a new object instance on the heap?", options: ["class", "this", "new", "null"], ans: 2, explanation: "The new keyword allocates heap memory and calls the class constructor." },
        { q: "What is a constructor?", options: ["A class builder tool", "A method called during object initialization", "An interface contract", "A garbage collector"], ans: 1, explanation: "Constructors are invoked during object creation to initialize fields." },
        { q: "What does the 'this' keyword reference?", options: ["The parent class instance", "The current class blueprint", "The current object instance", "The garbage collector"], ans: 2, explanation: "'this' refers to the active object instance executing the method." },
        { q: "Which access modifier restricts visibility to the declaring class only?", options: ["public", "protected", "private", "default"], ans: 2, explanation: "private elements are accessible only within the declaring class itself." },
        { "q": "What does calling `new Object()` return in terms of memory allocation?", "options": ["A reference to a stack-allocated object", "A reference to a heap-allocated object", "A primitive value", "A null reference"], "ans": 1, "explanation": "The 'new' keyword in Java always allocates memory for the object on the heap and returns a reference to it." },
        { "q": "What happens if a class does not explicitly define any constructor?", "options": ["The class cannot be instantiated", "The compiler automatically provides a public no-argument default constructor", "A compilation error occurs", "The class becomes abstract"], "ans": 1, "explanation": "If no constructor is defined, Java automatically supplies a default no-argument constructor with the same access level as the class." },
        { "q": "Output:\n```java\nclass Box {\n    int side = 10;\n    Box(int side) {\n        side = side;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box(20);\n        System.out.println(b.side);\n    }\n}\n```", "options": ["10", "20", "0", "Compilation Error"], "ans": 0, "explanation": "Inside the constructor, `side = side;` assigns the parameter to itself due to shadowing (the local parameter takes precedence), leaving the instance field 'side' unchanged at its default value 10." },
        { "q": "Which access modifier allows access from any class in the same package but not from subclasses in different packages?", "options": ["public", "private", "protected", "default (no modifier)"], "ans": 3, "explanation": "Default (package-private) access allows visibility only within the same package, unlike protected, which also permits access from subclasses in other packages." },
        { "q": "What is the purpose of a getter method in encapsulation?", "options": ["To modify a private field's value", "To provide read-only or controlled access to a private field", "To delete an object instance", "To override a superclass method"], "ans": 1, "explanation": "Getters provide controlled, often read-only, access to private fields, supporting the encapsulation principle by preventing direct external modification." },
        { "q": "What is the correct way to call an overloaded constructor from within another constructor of the same class?", "options": ["super(...)", "this(...)", "new Constructor(...)", "self(...)"], "ans": 1, "explanation": "this(...) is used to invoke another constructor of the same class, and must be the first statement in the calling constructor." },
        { "q": "What happens when an object reference goes out of scope with no other references pointing to it?", "options": ["It is immediately deleted", "It becomes eligible for garbage collection", "It causes a memory leak automatically", "It throws a NullPointerException"], "ans": 1, "explanation": "Java's garbage collector automatically reclaims heap memory for objects that are no longer reachable from any active reference, though the exact timing is not guaranteed." },
        { "q": "What is the output?\n```java\nclass Counter {\n    static int count = 0;\n    Counter() { count++; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Counter();\n        new Counter();\n        new Counter();\n        System.out.println(Counter.count);\n    }\n}\n```", "options": ["0", "1", "3", "Compilation Error"], "ans": 2, "explanation": "The static field count is shared across all instances. Each of the 3 constructor calls increments the same shared count, resulting in a final value of 3." },
        { "q": "Which keyword can be used to prevent a class from being instantiated directly while still allowing subclassing?", "options": ["final", "static", "abstract", "private"], "ans": 2, "explanation": "An abstract class cannot be instantiated directly with 'new', but it can be subclassed, and its concrete subclasses can then be instantiated." },
        { "q": "What is the significance of the equals() and hashCode() contract when overriding equals() in a class?", "options": ["They are unrelated and can be overridden independently", "If two objects are equal per equals(), they must return the same hashCode()", "hashCode() must always return 0", "Overriding equals() automatically overrides hashCode()"], "ans": 1, "explanation": "The Java contract requires that if two objects are equal according to equals(), they must produce the same hashCode() value, which is essential for correct behavior in hash-based collections like HashMap." },
        { "q": "What does `Car myCar = null;` followed by `myCar.start();` result in?", "options": ["Compilation Error", "NullPointerException at runtime", "It silently does nothing", "It creates a new Car object automatically"], "ans": 1, "explanation": "Calling a method on a null reference throws a NullPointerException at runtime, since there is no object to invoke the method on." }
    ],
    structures: [
        { q: "Which keyword establishes inheritance in Java?", options: ["implements", "inherits", "extends", "super"], ans: 2, explanation: "Java subclasses extend a superclass using the 'extends' keyword." },
        { q: "Which keyword references parent class variables or constructors?", options: ["super", "this", "parent", "base"], ans: 0, explanation: "The super keyword is used to access superclass constructors and overridden methods." },
        { q: "What is method overriding?", options: ["Writing overloaded methods", "Providing a custom implementation of an inherited parent method", "Declaring abstract methods", "Calling super constructors"], ans: 1, explanation: "Overriding replaces an inherited method with custom behavior in a subclass." },
        { q: "What is an interface in Java?", options: ["A GUI visual tool", "A class template containing abstract methods to be implemented", "A final class", "A type of constructor"], ans: 1, explanation: "An interface defines public behaviors that implementing classes must define." },
        { "q": "Which of the following is true regarding multiple inheritance in Java?", "options": ["Java classes support multiple inheritance directly", "Java disallows multiple class inheritance but allows implementing multiple interfaces", "Java supports it only for abstract classes", "Multiple inheritance causes a runtime error"], "ans": 1, "explanation": "Java does not support multiple inheritance of classes (to avoid the diamond problem) but a class can implement multiple interfaces to achieve similar flexibility." },
        { "q": "What is the output?\n```java\nclass Animal {\n    void sound() { System.out.println(\"Animal sound\"); }\n}\nclass Dog extends Animal {\n    void sound() { System.out.println(\"Bark\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.sound();\n    }\n}\n```", "options": ["Animal sound", "Bark", "Compilation Error", "Runtime Error"], "ans": 1, "explanation": "This demonstrates runtime polymorphism. Even though the reference type is Animal, the actual object is Dog, so the overridden sound() method in Dog is invoked." },
        { "q": "What distinguishes an abstract class from an interface (pre-Java 8)?", "options": ["Abstract classes can have constructors and instance fields; interfaces (pre-8) could not", "Interfaces can be instantiated directly", "Abstract classes cannot have any methods", "There is no difference"], "ans": 0, "explanation": "Abstract classes can define constructors, instance variables, and both abstract and concrete methods, while classic interfaces (before Java 8) could only declare abstract method signatures and constants." },
        { "q": "Which keyword must be used by a subclass to provide its own implementation of a superclass method with the same signature?", "options": ["overload", "@Override (annotation, optional but recommended)", "extends", "implements"], "ans": 1, "explanation": "The @Override annotation is not strictly required by the compiler, but it is recommended to catch signature mismatch errors at compile time when overriding a method." },
        { "q": "Output:\n```java\nclass Base {\n    Base() { System.out.println(\"Base\"); }\n}\nclass Derived extends Base {\n    Derived() { System.out.println(\"Derived\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Derived();\n    }\n}\n```", "options": ["Derived", "Base\\nDerived", "Derived\\nBase", "Compilation Error"], "ans": 1, "explanation": "Java implicitly calls the superclass's no-arg constructor (super()) as the first statement of a subclass constructor, so Base's constructor runs first, printing 'Base' then 'Derived'." },
        { "q": "What is method overloading vs method overriding primarily differentiated by?", "options": ["Overloading occurs at compile-time within the same class; overriding occurs at runtime across inheritance hierarchy", "Overloading requires inheritance; overriding does not", "They are the same concept", "Overriding requires different parameter lists"], "ans": 0, "explanation": "Overloading is resolved at compile-time based on method signatures within the same class, while overriding is resolved at runtime (dynamic dispatch) based on the actual object's subclass implementation." },
        { "q": "Can an abstract method have a method body?", "options": ["Yes, always", "No, abstract methods have no body and must be implemented by subclasses", "Only if declared final", "Only in interfaces"], "ans": 1, "explanation": "An abstract method is declared without a body (ending with a semicolon) and must be implemented by any concrete subclass." },
        { "q": "What is a 'default method' in a Java interface (Java 8+)?", "options": ["A method with no implementation", "A method with a concrete implementation defined directly in the interface", "A static utility method", "The interface's default constructor"], "ans": 1, "explanation": "Default methods (marked with the 'default' keyword) allow interfaces to provide a concrete implementation, enabling backward compatibility when adding new methods to existing interfaces." },
        { "q": "Which principle does hiding an object's internal state behind public getter/setter methods primarily demonstrate?", "options": ["Polymorphism", "Inheritance", "Encapsulation", "Abstraction"], "ans": 2, "explanation": "Encapsulation is the practice of restricting direct access to an object's internal state and exposing controlled access through public methods." },
        { "q": "What happens if a subclass tries to override a `final` method from its superclass?", "options": ["It compiles and silently succeeds", "It causes a compilation error", "It throws a runtime exception", "The final method is simply hidden"], "ans": 1, "explanation": "A final method cannot be overridden. Attempting to do so in a subclass results in a compile-time error." },
        { "q": "What does `implements` do differently from `extends` in class declarations?", "options": ["implements is used for interfaces, extends is used for classes and interface inheritance", "They are interchangeable", "implements can only be used once, extends any number of times", "extends is used for interfaces only"], "ans": 0, "explanation": "A class uses 'implements' to fulfill the contract of one or more interfaces, while 'extends' is used to inherit from a single superclass (or extend another interface, in the case of interface-to-interface inheritance)." }
    ],
    "file-handling": [
        { q: "Which block contains code that always executes after try-catch?", options: ["final", "finally", "catch-all", "finish"], ans: 1, explanation: "The finally block is guaranteed to execute, even if an exception occurs or a return statement is hit." },
        { q: "Which keyword declares that a method throws checked exceptions?", options: ["throw", "throws", "try", "catch"], ans: 1, explanation: "The throws keyword lists checked exceptions a method propagates to its caller." },
        { q: "What represents an unchecked runtime exception?", options: ["IOException", "SQLException", "NullPointerException", "ClassNotFoundException"], ans: 2, explanation: "NullPointerException extends RuntimeException and is unchecked at compile-time." },
        { q: "Which keyword explicitly raises an exception in code?", options: ["throw", "throws", "raise", "new"], ans: 0, explanation: "The throw keyword is used to explicitly instantiate and raise an exception." },
        { "q": "What is the output?\n```java\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            int[] arr = new int[2];\n            System.out.println(arr[5]);\n        } catch (Exception e) {\n            System.out.println(\"Caught: \" + e.getClass().getSimpleName());\n        }\n    }\n}\n```", "options": ["Caught: ArrayIndexOutOfBoundsException", "Compilation Error", "Caught: Exception", "Runtime crash"], "ans": 0, "explanation": "Since ArrayIndexOutOfBoundsException is a subclass of Exception, the generic catch(Exception e) block catches it, and getClass().getSimpleName() reports its actual runtime class." },
        { "q": "What is the correct order for multiple catch blocks handling exceptions in a hierarchy?", "options": ["Most general exception type first, most specific last", "Most specific exception type first, most general last", "Order does not matter", "Alphabetical order"], "ans": 1, "explanation": "Catch blocks must be ordered from most specific to most general exception types; otherwise, a more general catch block earlier in the chain would make later specific catches unreachable, causing a compile error." },
        { "q": "Which of these is a checked exception in Java?", "options": ["NullPointerException", "ArrayIndexOutOfBoundsException", "IOException", "ArithmeticException"], "ans": 2, "explanation": "IOException is a checked exception (extends Exception, not RuntimeException) and must be either caught or declared with throws." },
        { "q": "What is the purpose of a custom exception class in Java?", "options": ["To replace built-in exceptions entirely", "To represent application-specific error conditions by extending Exception or RuntimeException", "To disable exception handling", "To improve runtime performance"], "ans": 1, "explanation": "Custom exceptions let developers model domain-specific error conditions by extending Exception (checked) or RuntimeException (unchecked), improving code clarity." },
        { "q": "Output:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            return;\n        } finally {\n            System.out.println(\"Finally executed\");\n        }\n    }\n}\n```", "options": ["Nothing prints", "Finally executed", "Compilation Error", "Runtime Error"], "ans": 1, "explanation": "The finally block always executes before control actually leaves the method, even when a return statement is present in the try block." },
        { "q": "Which keyword is used to explicitly raise an exception in Java code?", "options": ["throw", "throws", "raise", "except"], "ans": 0, "explanation": "The throw keyword is used to explicitly instantiate and raise an exception object at a specific point in code, e.g., `throw new IllegalArgumentException(\"msg\");`." },
        { "q": "Can a `try` block exist without a `catch` block?", "options": ["No, catch is always mandatory", "Yes, as long as it has a finally block", "No, every try must have exactly one catch", "Yes, but the code inside will never execute"], "ans": 1, "explanation": "A try-finally block (without catch) is valid Java syntax, useful for guaranteed cleanup code even when exceptions propagate up without being caught here." },
        { "q": "What does the try-with-resources statement automatically do?", "options": ["Catches all exceptions silently", "Automatically closes resources like streams once the block finishes", "Prevents exceptions from being thrown", "Requires a manual close() call still"], "ans": 1, "explanation": "try-with-resources (Java 7+) automatically calls close() on any resource implementing AutoCloseable once the try block completes, whether normally or via exception." },
        { "q": "What is the superclass of both checked and unchecked exceptions in Java?", "options": ["Error", "Throwable", "RuntimeException", "Object"], "ans": 1, "explanation": "Throwable is the root class for all errors and exceptions in Java. It has two main subclasses: Exception and Error." },
        { "q": "What happens if an exception is thrown inside a `catch` block and there's a `finally` block present?", "options": ["The finally block is skipped", "The finally block still executes before the exception propagates further", "It causes an infinite loop", "The original exception is silently discarded"], "ans": 1, "explanation": "The finally block always executes regardless of whether the try or catch block completes normally or throws a new exception, though the new exception may then propagate after finally runs." },
        { "q": "Which class represents a runtime exception thrown when dividing an integer by zero?", "options": ["NumberFormatException", "ArithmeticException", "IllegalStateException", "DivideByZeroException"], "ans": 1, "explanation": "Integer division by zero in Java throws an ArithmeticException with the message '/ by zero'. Note that floating-point division by zero does not throw an exception but instead yields Infinity or NaN." }
    ],
    memory: [
        { q: "What is an ArrayList in Java?", options: ["A fixed-size array", "A resizable array class that implements List", "A linked node structure", "A map of key-value pairs"], ans: 1, explanation: "ArrayList is a dynamic resizable array class that implements the List interface." },
        { q: "Which collection stores unique items only?", options: ["ArrayList", "HashMap", "HashSet", "LinkedList"], ans: 2, explanation: "A HashSet stores unique items, filtering out duplicate values." },
        { q: "What is autoboxing in Java collections?", options: ["Auto-resizing list arrays", "Automatic conversion of primitives to their wrapper classes", "Compressing objects into archives", "Garbage collection of references"], ans: 1, explanation: "Autoboxing converts primitives (int) to their object wrapper equivalents (Integer) automatically." },
        { q: "What is the key benefit of specifying generics (e.g. ArrayList<String>)?", options: ["Increases execution speed", "Enforces compile-time type-safety without explicit casting", "Saves stack memory", "Auto-serializes list data"], ans: 1, explanation: "Generics catch type mismatch bugs at compile-time and remove the need for casting." },
        { "q": "What is the time complexity of retrieving an element by index from an ArrayList?", "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"], "ans": 2, "explanation": "ArrayList is backed by an internal array, so accessing an element by index is a constant-time O(1) operation." },
        { "q": "What is the time complexity of inserting an element at the beginning of an ArrayList?", "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"], "ans": 1, "explanation": "Inserting at the beginning of an ArrayList requires shifting all subsequent elements one position to the right, resulting in O(n) time complexity." },
        { "q": "Which collection interface does `HashMap` implement?", "options": ["List", "Set", "Map", "Queue"], "ans": 2, "explanation": "HashMap implements the Map interface, storing data as key-value pairs rather than a simple sequence of elements." },
        { "q": "What data structure typically backs a `LinkedList` in Java's Collections Framework?", "options": ["A dynamic array", "A doubly-linked list", "A hash table", "A binary tree"], "ans": 1, "explanation": "Java's LinkedList class implements a doubly-linked list, allowing efficient insertion and removal at both ends, unlike ArrayList's array-based backing." },
        { "q": "Which of the following collections maintains elements in sorted order automatically?", "options": ["HashSet", "ArrayList", "TreeSet", "LinkedList"], "ans": 2, "explanation": "TreeSet is backed by a Red-Black tree and automatically maintains its elements in their natural sorted order (or according to a provided Comparator)." },
        { "q": "What happens when you try to add a duplicate key to a `HashMap`?", "options": ["A duplicate entry is added", "The new value replaces the old value for that key", "It throws an exception", "It silently ignores the operation"], "ans": 1, "explanation": "HashMap does not allow duplicate keys. Calling put() with an existing key overwrites the previous value associated with it, and returns the old value." },
        { "q": "Which interface must an object implement to be usable as a key in a `HashMap` reliably?", "options": ["Comparable", "Serializable", "Correctly overridden equals() and hashCode()", "Cloneable"], "ans": 2, "explanation": "For reliable HashMap behavior, key objects must have consistent, correctly overridden equals() and hashCode() methods so that logically equal keys map to the same bucket." },
        { "q": "What is the primary difference between `HashSet` and `LinkedHashSet`?", "options": ["LinkedHashSet does not allow duplicates while HashSet does", "LinkedHashSet maintains insertion order, HashSet does not guarantee any order", "HashSet is slower for all operations", "There is no difference"], "ans": 1, "explanation": "LinkedHashSet maintains a predictable iteration order (insertion order) using an internal linked list, while HashSet provides no ordering guarantees." },
        { "q": "Which method is used to iterate over a `Map`'s key-value pairs directly?", "options": ["map.keySet()", "map.entrySet()", "map.values()", "map.iterator()"], "ans": 1, "explanation": "entrySet() returns a Set of Map.Entry objects, each representing a key-value pair, allowing iteration over both keys and values simultaneously." },
        { "q": "What is the load factor's role in a `HashMap`?", "options": ["It determines when the map should be resized (rehashed)", "It defines the maximum number of keys allowed", "It controls thread-safety", "It sorts the entries"], "ans": 0, "explanation": "The load factor (default 0.75) determines the threshold at which the HashMap's internal table is resized and rehashed to maintain efficient O(1) average performance." },
        { "q": "Which collection class would be most appropriate for implementing a FIFO queue?", "options": ["Stack", "ArrayDeque or LinkedList (implementing Queue)", "TreeSet", "HashMap"], "ans": 1, "explanation": "ArrayDeque or LinkedList, both implementing the Queue interface, provide efficient FIFO (First-In-First-Out) operations via offer()/poll() methods." }
    ],
    multithreading: [
        { q: "Which interface should you implement to make a class runnable by a thread?", options: ["Callable", "Runnable", "Threadable", "Executor"], ans: 1, explanation: "Implementing java.lang.Runnable is the standard way to define a thread task." },
        { q: "How do you start a newly created Thread instance named thread?", options: ["thread.run()", "thread.start()", "thread.execute()", "thread.begin()"], ans: 1, explanation: "thread.start() allocates resources and executes the run() method in a new call stack. Calling run() directly runs it synchronously in the main thread." },
        { q: "Which keyword prevents multiple threads from executing a block of code simultaneously?", options: ["volatile", "synchronized", "transient", "static"], ans: 1, explanation: "synchronized locks class/instance locks, allowing only one thread to execute the block at a time." },
        { q: "What does Thread.sleep(1000) do?", options: ["Suspends thread for 1 second", "Terminates the thread", "Yields thread execution", "Locks the thread"], ans: 0, explanation: "Thread.sleep() pauses the execution of the current thread for the specified milliseconds." },
        { "q": "What is the main risk of two threads modifying a shared variable without synchronization?", "options": ["Compilation error", "Race condition leading to inconsistent results", "Automatic deadlock", "The JVM crashes immediately"], "ans": 1, "explanation": "Without proper synchronization, concurrent unsynchronized access to shared mutable state can cause race conditions, leading to unpredictable and inconsistent results." },
        { "q": "What does calling `thread.join()` do?", "options": ["Merges two threads into one", "Makes the calling thread wait until the specified thread finishes execution", "Starts a new thread", "Immediately terminates the thread"], "ans": 1, "explanation": "join() causes the currently executing thread to pause and wait until the thread on which join() was called completes its execution." },
        { "q": "What is a deadlock in multithreading?", "options": ["A thread that runs forever", "Two or more threads waiting indefinitely for each other to release locks", "A thread that crashes unexpectedly", "A single-threaded infinite loop"], "ans": 1, "explanation": "A deadlock occurs when two or more threads are each waiting for a lock held by another, resulting in all of them being permanently blocked." },
        { "q": "Which of the following best describes the `Runnable` interface's single abstract method?", "options": ["void run()", "void call()", "void execute()", "void start()"], "ans": 0, "explanation": "Runnable defines exactly one abstract method, run(), which contains the code executed when the thread is started." },
        { "q": "What is the difference between `Runnable` and `Callable` interfaces?", "options": ["Callable can return a value and throw checked exceptions, Runnable cannot", "Runnable is faster than Callable", "Callable requires extending Thread", "There is no functional difference"], "ans": 0, "explanation": "Callable's call() method can return a result and throw checked exceptions, while Runnable's run() method returns void and cannot throw checked exceptions." },
        { "q": "What does the `synchronized` keyword guarantee when applied to a method?", "options": ["Only one thread can execute that method on the given object instance at a time", "The method runs faster", "The method cannot throw exceptions", "All threads execute the method simultaneously"], "ans": 0, "explanation": "A synchronized instance method acquires the intrinsic lock of the object instance, ensuring that only one thread can execute any synchronized method on that same instance at a time." },
        { "q": "What is the purpose of an `ExecutorService` in Java concurrency?", "options": ["To manually create raw Thread objects", "To manage a pool of reusable threads for executing tasks efficiently", "To replace the synchronized keyword", "To handle file I/O operations"], "ans": 1, "explanation": "ExecutorService provides a higher-level API for managing a pool of worker threads, submitting tasks, and handling their lifecycle, avoiding the overhead of manually creating and destroying threads." },
        { "q": "Which thread state indicates a thread is waiting to acquire a monitor lock to enter a synchronized block?", "options": ["NEW", "RUNNABLE", "BLOCKED", "TERMINATED"], "ans": 2, "explanation": "A thread enters the BLOCKED state when it is waiting to acquire a lock held by another thread in order to enter a synchronized method or block." },
        { "q": "What does declaring a variable as `volatile` guarantee?", "options": ["Atomic compound operations like increment", "Visibility of the latest value across all threads, preventing caching issues", "Thread-safety for all operations", "Automatic synchronization of methods"], "ans": 1, "explanation": "volatile ensures that reads and writes to the variable are always made directly to main memory, making updates immediately visible to other threads, but it does NOT make compound operations (like i++) atomic." },
        { "q": "Which class provides atomic operations on an integer without explicit synchronization?", "options": ["Integer", "AtomicInteger", "int (primitive)", "SynchronizedInt"], "ans": 1, "explanation": "java.util.concurrent.atomic.AtomicInteger provides lock-free, thread-safe operations (like incrementAndGet()) on integer values without requiring explicit synchronization." },
        { "q": "What is a race condition most commonly caused by?", "options": ["Too many threads being created at once", "Multiple threads accessing and modifying shared state without proper synchronization", "Using the volatile keyword incorrectly", "Calling thread.sleep() too often"], "ans": 1, "explanation": "A race condition arises when multiple threads access shared mutable data concurrently and at least one modifies it, without adequate synchronization to coordinate the access, leading to unpredictable outcomes." }
    ],
    java8: [
        { q: "What is a functional interface?", options: ["An interface with public methods only", "An interface with exactly one abstract method", "An interface with static methods only", "An interface with default fields"], ans: 1, explanation: "A functional interface has exactly one abstract method, making it suitable for lambda expressions." },
        { q: "Which Stream operation is an intermediate operation?", options: ["count()", "collect()", "filter()", "forEach()"], ans: 2, explanation: "filter() is intermediate and lazy. count(), collect(), and forEach() are terminal operations." },
        { q: "What syntax represents a method reference in Java 8?", options: ["Class.method", "Class::method", "Class->method", "Class.method()"], ans: 1, explanation: "Class::method is the method reference syntax introduced in Java 8." },
        { q: "Do Java 8 streams modify the underlying collection?", options: ["Yes, always", "No, they produce a new stream/result without changing source", "Depends on operations", "Only on parallel streams"], ans: 1, explanation: "Streams process data pipelines lazily but do not alter the source collection data structure." },
        { "q": "What is the output?\n```java\nimport java.util.List;\nimport java.util.stream.Collectors;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = List.of(1, 2, 3, 4, 5);\n        List<Integer> result = nums.stream()\n            .map(n -> n * n)\n            .collect(Collectors.toList());\n        System.out.println(result);\n    }\n}\n```", "options": ["[1, 4, 9, 16, 25]", "[1, 2, 3, 4, 5]", "[2, 4, 6, 8, 10]", "Compilation Error"], "ans": 0, "explanation": "map(n -> n * n) transforms each element into its square, and collect(Collectors.toList()) gathers the results into a new List: [1, 4, 9, 16, 25]." },
        { "q": "Which functional interface is used with a lambda that takes one argument and returns a boolean?", "options": ["Function<T, R>", "Predicate<T>", "Supplier<T>", "Consumer<T>"], "ans": 1, "explanation": "Predicate<T> has a single abstract method `boolean test(T t)`, making it the appropriate functional interface for a boolean-returning lambda with one argument." },
        { "q": "What does `Optional<T>` primarily help avoid?", "options": ["ArrayIndexOutOfBoundsException", "NullPointerException by explicitly representing potentially absent values", "ClassCastException", "StackOverflowError"], "ans": 1, "explanation": "Optional<T> is a container object used to represent a value that may or may not be present, encouraging explicit handling instead of returning null and risking NullPointerException." },
        { "q": "What is the output?\n```java\nimport java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = List.of(\"apple\", \"banana\", \"cherry\");\n        long count = words.stream().filter(w -> w.length() > 5).count();\n        System.out.println(count);\n    }\n}\n```", "options": ["1", "2", "3", "0"], "ans": 1, "explanation": "Words longer than 5 characters are 'banana' (6) and 'cherry' (6); 'apple' has only 5 characters, so it's excluded. count() returns 2." },
        { "q": "Which Stream method is used to combine all elements into a single result, like summing a list of integers?", "options": ["map()", "filter()", "reduce()", "peek()"], "ans": 2, "explanation": "reduce() is a terminal operation used to combine stream elements into a single cumulative result using an associative accumulation function, such as summing values." },
        { "q": "What does `list.stream().sorted()` do by default when the elements implement `Comparable`?", "options": ["Sorts descending", "Sorts in natural ascending order", "Throws an exception", "Does nothing since streams are immutable"], "ans": 1, "explanation": "sorted() without arguments sorts stream elements according to their natural ordering, as defined by their Comparable implementation, in ascending order." },
        { "q": "Which of the following correctly demonstrates a valid method reference to a static method `Integer.parseInt`?", "options": ["Integer::parseInt", "Integer.parseInt()", "->Integer.parseInt", "parseInt::Integer"], "ans": 0, "explanation": "ClassName::staticMethodName is the correct syntax for a static method reference, e.g., Integer::parseInt, which can be used wherever a matching functional interface is expected." },
        { "q": "What is a key characteristic of Java Streams regarding laziness?", "options": ["All operations execute immediately when defined", "Intermediate operations are lazy and only execute when a terminal operation is invoked", "Streams eagerly evaluate everything at creation", "Only terminal operations are lazy"], "ans": 1, "explanation": "Intermediate operations like filter() and map() build a pipeline but do not execute until a terminal operation (like collect() or forEach()) triggers the actual traversal and computation." },
        { "q": "Which functional interface represents an operation that accepts a single input and returns no result?", "options": ["Function<T, R>", "Supplier<T>", "Consumer<T>", "Predicate<T>"], "ans": 2, "explanation": "Consumer<T> has the abstract method `void accept(T t)`, representing an operation that takes an input and performs a side-effect without returning a value." },
        { "q": "What happens if you call `.stream()` twice on the same Stream object (not the source collection)?", "options": ["It works fine and returns the same results", "It throws IllegalStateException since a stream can only be consumed once", "It resets the stream automatically", "It creates a parallel stream"], "ans": 1, "explanation": "A Java Stream can only be traversed once. Attempting to reuse an already-consumed stream (by calling another terminal operation on it) throws an IllegalStateException." },
        { "q": "What is the purpose of `Collectors.groupingBy()`?", "options": ["To sort a list", "To group stream elements into a Map based on a classifier function", "To remove duplicate elements", "To convert a stream into an array"], "ans": 1, "explanation": "Collectors.groupingBy() is a terminal collector that partitions stream elements into a Map<K, List<T>>, grouping them according to a classification function applied to each element." }
    ],
};
exports.DEBUG = {
    basics: {
        instructions: "Fix the 3 syntax errors so this Java program compiles and prints 'Hello, World!'",
        buggy: "public Class main {\n    public static void Main(String[] args) {\n        System.out.println(\"Hello, World!\")\n    }\n}",
        fixed: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
        hints: ["class keyword is lowercase", "The class name must match Main (uppercase M)", "System.out.println requires a semicolon at the end"],
        expectedOutput: "Hello, World!"
    },
    variables: {
        instructions: "Fix the 3 variable type and constant re-assignment errors in this code.",
        buggy: "public class Main {\n    public static void main(String[] args) {\n        int age = 22.5;\n        final double PI = 3.14;\n        PI = 3.14159;\n        boolean status = \"true\";\n        System.out.println(age);\n    }\n}",
        fixed: "public class Main {\n    public static void main(String[] args) {\n        double age = 22.5;\n        final double PI = 3.14159;\n        boolean status = true;\n        System.out.println(age);\n    }\n}",
        hints: ["An int cannot store decimal values like 22.5 (use double)", "A final variable (PI) cannot be reassigned once initialized", "A boolean accepts literal true/false, not a string \"true\""],
        expectedOutput: "22.5"
    },
    io: {
        instructions: "Fix the 3 errors preventing reading and printing values correctly.",
        buggy: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = Scanner(System.in);\n        int age = scanner.nextString();\n        System.out.printf(\"Age: %s\\n\", age);\n    }\n}",
        fixed: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int age = scanner.nextInt();\n        System.out.printf(\"Age: %d\\n\", age);\n    }\n}",
        hints: ["Instantiate the Scanner using the 'new' keyword", "Use nextInt() to read an integer, not nextString()", "Use %d format specifier for integer types, not %s"],
        expectedOutput: "Age: [input]"
    },
    operators: {
        instructions: "Fix the 3 logical and modulus operator errors in this division check.",
        buggy: "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 0;\n        if (y != 0 & x / y > 2) {\n            System.out.println(\"Valid\");\n        }\n        int remainder = x / 2;\n    }\n}",
        fixed: "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        int y = 0;\n        if (y != 0 && x / y > 2) {\n            System.out.println(\"Valid\");\n        }\n        int remainder = x % 2;\n    }\n}",
        hints: ["Use short-circuit operator && to prevent division by zero", "Change variable 'b' to a declared variable or numeric constant", "Use modulus % to get the remainder instead of division /"],
        expectedOutput: ""
    },
    "control-flow": {
        instructions: "Fix the 3 string comparison and switch syntax bugs in this code.",
        buggy: "public class Main {\n    public static void main(String[] args) {\n        String color = \"red\";\n        if (color == \"red\") {\n            System.out.println(\"Stop\");\n        }\n        switch (color) {\n            case \"red\":\n                System.out.println(\"Red\");\n            case \"green\":\n                System.out.println(\"Green\");\n                break;\n        }\n    }\n}",
        fixed: "public class Main {\n    public static void main(String[] args) {\n        String color = \"red\";\n        if (color.equals(\"red\")) {\n            System.out.println(\"Stop\");\n        }\n        switch (color) {\n            case \"red\":\n                System.out.println(\"Red\");\n                break;\n            case \"green\":\n                System.out.println(\"Green\");\n                break;\n        }\n    }\n}",
        hints: ["Use .equals() for string content comparison rather than ==", "Add break after the first case block to prevent fall-through", "Ensure all switch branches end with break or yield"],
        expectedOutput: "Stop\nRed"
    },
    loops: {
        instructions: "Fix the 3 bugs in this loop to print numbers from 1 to 5.",
        buggy: "public class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        while (i <= 5) {\n            System.out.print(i + \" \")\n            i++\n        }\n    }\n}",
        fixed: "public class Main {\n    public static void main(String[] args) {\n        int i = 1;\n        while (i <= 5) {\n            System.out.print(i + \" \");\n            i++;\n        }\n    }\n}",
        hints: ["Initialize index i to 1 to start printing from 1", "The System.out.print statement requires a semicolon", "The counter update i++ requires a semicolon"],
        expectedOutput: "1 2 3 4 5 "
    },
    functions: {
        instructions: "Fix the 3 method declaration and signature bugs in this helper class.",
        buggy: "public class Main {\n    int doubleVal(n) {\n        n * 2;\n    }\n    public static void main(String[] args) {\n        int result = doubleVal(5);\n        System.out.println(result);\n    }\n}",
        fixed: "public class Main {\n    public static int doubleVal(int n) {\n        return n * 2;\n    }\n    public static void main(String[] args) {\n        int result = doubleVal(5);\n        System.out.println(result);\n    }\n}",
        hints: ["The helper method must be declared static to be called inside main()", "Method parameter must have a data type (int n)", "The method must return the result value using the return keyword"],
        expectedOutput: "10"
    },
    arrays: {
        instructions: "Fix the 3 array initialization and loop bounds bugs in this code.",
        buggy: "public class Main {\n    public static void main(String[] args) {\n        int nums = {1, 2, 3};\n        int sum = 0;\n        for (int i = 0; i <= nums.length; i++) {\n            sum += nums(i);\n        }\n        System.out.println(sum);\n    }\n}",
        fixed: "public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        int sum = 0;\n        for (int i = 0; i < nums.length; i++) {\n            sum += nums[i];\n        }\n        System.out.println(sum);\n    }\n}",
        hints: ["Declare array variables with square brackets int[] nums", "Use < instead of <= to avoid ArrayIndexOutOfBoundsException", "Access array elements using square brackets nums[i] instead of parentheses"],
        expectedOutput: "6"
    },
    strings: {
        instructions: "Fix the 3 string methods and length property bugs.",
        buggy: "public class Main {\n    public static void main(String[] args) {\n        String text = \"Java\";\n        int size = text.length;\n        char letter = text.charAt[1];\n        String upper = text.upper();\n        System.out.println(upper);\n    }\n}",
        fixed: "public class Main {\n    public static void main(String[] args) {\n        String text = \"Java\";\n        int size = text.length();\n        char letter = text.charAt(1);\n        String upper = text.toUpperCase();\n        System.out.println(upper);\n    }\n}",
        hints: ["String length is retrieved using a method call length()", "Use parentheses text.charAt(1) instead of square brackets", "The method to convert string to uppercase is toUpperCase()"],
        expectedOutput: "JAVA"
    },
    pointers: {
        instructions: "Fix the 3 constructor and object instantiation errors in this class.",
        buggy: "public class Dog {\n    private String name;\n    public void Dog(String name) {\n        name = name;\n    }\n    public static void main(String[] args) {\n        Dog d = Dog(\"Rex\");\n    }\n}",
        fixed: "public class Dog {\n    private String name;\n    public Dog(String name) {\n        this.name = name;\n    }\n    public static void main(String[] args) {\n        Dog d = new Dog(\"Rex\");\n    }\n}",
        hints: ["Constructors have no return type — remove void", "Use this.name to assign the constructor parameter to the instance field", "Instantiate the object using the 'new' keyword"],
        expectedOutput: ""
    },
    structures: {
        instructions: "Fix the 3 inheritance and interface implementation bugs in this class.",
        buggy: "interface Flyer {\n    void fly();\n}\nclass Bird implements Flyer {\n    public void fly() {\n        System.out.println(\"Flying\");\n    }\n}\npublic class Eagle extends Bird implements Flyer {\n    void fly() {\n        super.fly();\n    }\n}",
        fixed: "interface Flyer {\n    void fly();\n}\nclass Bird implements Flyer {\n    public void fly() {\n        System.out.println(\"Flying\");\n    }\n}\npublic class Eagle extends Bird {\n    public void fly() {\n        super.fly();\n    }\n}",
        hints: ["Eagle already inherits Flyer implementation from Bird — remove implements Flyer", "Overridden methods in Eagle must retain public visibility", "Verify super.fly() is called correctly inside the overridden method"],
        expectedOutput: ""
    },
    "file-handling": {
        instructions: "Fix the 3 exception handling blocks and try-catch syntax bugs.",
        buggy: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } finally {\n            System.out.println(\"Final\");\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error\");\n        }\n    }\n}",
        fixed: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error\");\n        } finally {\n            System.out.println(\"Final\");\n        }\n    }\n}",
        hints: ["The catch block must precede the finally block", "Verify catch brackets and parentheses match", "Ensure division-by-zero exception is caught correctly"],
        expectedOutput: "Error\nFinal"
    },
    memory: {
        instructions: "Fix the 3 collection ArrayList and primitive storage errors in this method.",
        buggy: "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<int> list = new ArrayList<int>();\n        list.add(10);\n        int val = list.get[0];\n        System.out.println(val);\n    }\n}",
        fixed: "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<Integer>();\n        list.add(10);\n        int val = list.get(0);\n        System.out.println(val);\n    }\n}",
        hints: ["Collections store objects — use wrapper class Integer instead of primitive int", "Retrieve elements from an ArrayList using method get(0), not index brackets", "Ensure all collection packages are imported"],
        expectedOutput: "10"
    },
    multithreading: {
        instructions: "Fix the 3 multithreading and thread class launch bugs.",
        buggy: "class MyTask implements Runnable {\n    public void execute() {\n        System.out.println(\"Running\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyTask task = new MyTask();\n        Thread t = new Thread(task);\n        t.run();\n    }\n}",
        fixed: "class MyTask implements Runnable {\n    public void run() {\n        System.out.println(\"Running\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyTask task = new MyTask();\n        Thread t = new Thread(task);\n        t.start();\n    }\n}",
        hints: ["Runnable interface requires overriding run(), not execute()", "To execute thread concurrently, call start() instead of run()", "Ensure thread tasks implement Runnable or extend Thread"],
        expectedOutput: "Running"
    },
    java8: {
        instructions: "Fix the 3 lambda syntax and streams pipeline compile errors.",
        buggy: "import java.util.Arrays;\nimport java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = Arrays.asList(\"A\", \"B\");\n        list.stream().filter(s -> s = \"A\").forEach(s => System.out.println(s));\n    }\n}",
        fixed: "import java.util.Arrays;\nimport java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = Arrays.asList(\"A\", \"B\");\n        list.stream().filter(s -> s.equals(\"A\")).forEach(s -> System.out.println(s));\n    }\n}",
        hints: ["Inside filter lambda, use s.equals(\"A\") or == for comparisons instead of assignment =", "Java 8 lambdas use arrow -> instead of heavy arrow =>", "Verify stream terminal operations are written correctly"],
        expectedOutput: "A"
    }
};
exports.DRAG_DROP = {
    basics: {
        instructions: "Arrange these lines to create a valid Java program that prints Hello.",
        lines: [
            { id: "a", text: "public class Main {" },
            { id: "b", text: "    public static void main(String[] args) {" },
            { id: "c", text: "        System.out.println(\"Hello\");" },
            { id: "d", text: "    }" },
            { id: "e", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e"]
    },
    variables: {
        instructions: "Arrange these lines to declare variables and print their values.",
        lines: [
            { id: "a", text: "public class Main {" },
            { id: "b", text: "    public static void main(String[] args) {" },
            { id: "c", text: "        int x = 5;" },
            { id: "d", text: "        double y = 10.5;" },
            { id: "e", text: "        System.out.println(x + \" \" + y);" },
            { id: "f", text: "    }" },
            { id: "g", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g"]
    },
    io: {
        instructions: "Arrange these lines to read an integer from console and print it.",
        lines: [
            { id: "a", text: "import java.util.Scanner;" },
            { id: "b", text: "public class Main {" },
            { id: "c", text: "    public static void main(String[] args) {" },
            { id: "d", text: "        Scanner input = new Scanner(System.in);" },
            { id: "e", text: "        int value = input.nextInt();" },
            { id: "f", text: "        System.out.println(value);" },
            { id: "g", text: "    }" },
            { id: "h", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g", "h"]
    },
    operators: {
        instructions: "Arrange these lines to check if x is even using modulus.",
        lines: [
            { id: "a", text: "public class Main {" },
            { id: "b", text: "    public static void main(String[] args) {" },
            { id: "c", text: "        int x = 12;" },
            { id: "d", text: "        boolean isEven = (x % 2 == 0);" },
            { id: "e", text: "        System.out.println(isEven);" },
            { id: "f", text: "    }" },
            { id: "g", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g"]
    },
    "control-flow": {
        instructions: "Arrange these lines to create an if-else check.",
        lines: [
            { id: "a", text: "public class Main {" },
            { id: "b", text: "    public static void main(String[] args) {" },
            { id: "c", text: "        int num = 15;" },
            { id: "d", text: "        if (num > 10) {" },
            { id: "e", text: "            System.out.println(\"Large\");" },
            { id: "f", text: "        } else {" },
            { id: "g", text: "            System.out.println(\"Small\");" },
            { id: "h", text: "        }" },
            { id: "i", text: "    }" },
            { id: "j", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
    },
    loops: {
        instructions: "Arrange these lines to write a for loop that runs 3 times.",
        lines: [
            { id: "a", text: "public class Main {" },
            { id: "b", text: "    public static void main(String[] args) {" },
            { id: "c", text: "        for (int i = 0; i < 3; i++) {" },
            { id: "d", text: "            System.out.println(i);" },
            { id: "e", text: "        }" },
            { id: "f", text: "    }" },
            { id: "g", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g"]
    },
    functions: {
        instructions: "Arrange these lines to call a static method that returns a String.",
        lines: [
            { id: "a", text: "public class Main {" },
            { id: "b", text: "    public static String greet() {" },
            { id: "c", text: "        return \"Hello\";" },
            { id: "d", text: "    }" },
            { id: "e", text: "    public static void main(String[] args) {" },
            { id: "f", text: "        System.out.println(greet());" },
            { id: "g", text: "    }" },
            { id: "h", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g", "h"]
    },
    arrays: {
        instructions: "Arrange these lines to initialize an array and print its first element.",
        lines: [
            { id: "a", text: "public class Main {" },
            { id: "b", text: "    public static void main(String[] args) {" },
            { id: "c", text: "        int[] arr = {10, 20, 30};" },
            { id: "d", text: "        System.out.println(arr[0]);" },
            { id: "e", text: "    }" },
            { id: "f", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f"]
    },
    strings: {
        instructions: "Arrange these lines to concatenate two strings in Java.",
        lines: [
            { id: "a", text: "public class Main {" },
            { id: "b", text: "    public static void main(String[] args) {" },
            { id: "c", text: "        String s1 = \"Java\";" },
            { id: "d", text: "        String s2 = \"SE\";" },
            { id: "e", text: "        String s3 = s1 + s2;" },
            { id: "f", text: "        System.out.println(s3);" },
            { id: "g", text: "    }" },
            { id: "h", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g", "h"]
    },
    pointers: {
        instructions: "Arrange these lines to instantiate a User object in Java.",
        lines: [
            { id: "a", text: "class User {" },
            { id: "b", text: "    String name = \"Tom\";" },
            { id: "c", text: "}" },
            { id: "d", text: "public class Main {" },
            { id: "e", text: "    public static void main(String[] args) {" },
            { id: "f", text: "        User u = new User();" },
            { id: "g", text: "        System.out.println(u.name);" },
            { id: "h", text: "    }" },
            { id: "i", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
    },
    structures: {
        instructions: "Arrange these lines to demonstrate inheritance with class Cat.",
        lines: [
            { id: "a", text: "class Animal {}" },
            { id: "b", text: "class Cat extends Animal {" },
            { id: "c", text: "    void meow() {}" },
            { id: "d", text: "}" },
            { id: "e", text: "public class Main {" },
            { id: "f", text: "    public static void main(String[] args) {" },
            { id: "g", text: "        Cat c = new Cat();" },
            { id: "h", text: "        c.meow();" },
            { id: "i", text: "    }" },
            { id: "j", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
    },
    "file-handling": {
        instructions: "Arrange these lines to create a standard try-catch block.",
        lines: [
            { id: "a", text: "public class Main {" },
            { id: "b", text: "    public static void main(String[] args) {" },
            { id: "c", text: "        try {" },
            { id: "d", text: "            int x = 5 / 0;" },
            { id: "e", text: "        } catch (ArithmeticException e) {" },
            { id: "f", text: "            System.out.println(\"Error\");" },
            { id: "g", text: "        }" },
            { id: "h", text: "    }" },
            { id: "i", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
    },
    memory: {
        instructions: "Arrange these lines to add and retrieve an item from an ArrayList.",
        lines: [
            { id: "a", text: "import java.util.ArrayList;" },
            { id: "b", text: "public class Main {" },
            { id: "c", text: "    public static void main(String[] args) {" },
            { id: "d", text: "        ArrayList<String> list = new ArrayList<>();" },
            { id: "e", text: "        list.add(\"Java\");" },
            { id: "f", text: "        String item = list.get(0);" },
            { id: "g", text: "        System.out.println(item);" },
            { id: "h", text: "    }" },
            { id: "i", text: "}" }
        ],
        order: ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
    },
    multithreading: {
        instructions: "Arrange these lines to create and run a thread using Runnable interface.",
        lines: [
            { id: "a", text: "Runnable r = () -> {" },
            { id: "b", text: "    System.out.println(\"Run\");" },
            { id: "c", text: "};" },
            { id: "d", text: "Thread t = new Thread(r);" },
            { id: "e", text: "t.start();" }
        ],
        order: ["a", "b", "c", "d", "e"]
    },
    java8: {
        instructions: "Arrange these lines to filter a list using Streams API.",
        lines: [
            { id: "a", text: "List<Integer> numbers = Arrays.asList(1, 2, 3);" },
            { id: "b", text: "numbers.stream()" },
            { id: "c", text: "       .filter(n -> n % 2 == 0)" },
            { id: "d", text: "       .forEach(System.out::println);" }
        ],
        order: ["a", "b", "c", "d"]
    }
};
exports.COMPLETE_EXERCISES = {
    basics: [
        { template: "public class Main {\n    public static void ___(String[] args) {\n        System.out.___(\"Hello\");\n    }\n}", answer: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello\");\n    }\n}", blanks: ["main", "println"], instruction: "Fill in the entry method name and the standard output statement." },
    ],
    variables: [
        { template: "public class Main {\n    public static void main(String[] args) {\n        ___ score = 100;\n        ___ name = \"Alice\";\n    }\n}", answer: "public class Main {\n    public static void main(String[] args) {\n        int score = 100;\n        String name = \"Alice\";\n    }\n}", blanks: ["int", "String"], instruction: "Fill in the primitive integer type and reference String type." },
    ],
    io: [
        { template: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = ___ Scanner(System.in);\n        int x = scan.___();\n    }\n}", answer: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scan = new Scanner(System.in);\n        int x = scan.nextInt();\n    }\n}", blanks: ["new", "nextInt"], instruction: "Fill in the instantiation keyword and Scanner method to read integers." },
    ],
    operators: [
        { template: "public class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        int y = x ___ 2; // remainder\n        String res = (y == 1) ___ \"Odd\" : \"Even\";\n    }\n}", answer: "public class Main {\n    public static void main(String[] args) {\n        int x = 5;\n        int y = x % 2; // remainder\n        String res = (y == 1) ? \"Odd\" : \"Even\";\n    }\n}", blanks: ["%", "?"], instruction: "Fill in the remainder operator and ternary condition prefix symbol." },
    ],
    "control-flow": [
        { template: "public class Main {\n    public static void main(String[] args) {\n        String a = \"test\";\n        if (a.___(\"test\")) {\n            System.out.println(\"Matches\");\n        }\n    }\n}", answer: "public class Main {\n    public static void main(String[] args) {\n        String a = \"test\";\n        if (a.equals(\"test\")) {\n            System.out.println(\"Matches\");\n        }\n    }\n}", blanks: ["equals"], instruction: "Fill in the method to compare two string contents in Java." },
    ],
    loops: [
        { template: "public class Main {\n    public static void main(String[] args) {\n        ___ (int i = 0; i < 5; i___) {\n            System.out.println(i);\n        }\n    }\n}", answer: "public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(i);\n        }\n    }\n}", blanks: ["for", "++"], instruction: "Fill in the loop keyword and increment step expression." },
    ],
    functions: [
        { template: "public class Main {\n    public ___ int add(int a, int b) {\n        ___ a + b;\n    }\n}", answer: "public class Main {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n}", blanks: ["static", "return"], instruction: "Fill in static keyword and return keyword inside the method." },
    ],
    arrays: [
        { template: "public class Main {\n    public static void main(String[] args) {\n        int[] values = ___ int[3];\n        int size = values.___;\n    }\n}", answer: "public class Main {\n    public static void main(String[] args) {\n        int[] values = new int[3];\n        int size = values.length;\n    }\n}", blanks: ["new", "length"], instruction: "Fill in array allocation keyword and array size property." },
    ],
    strings: [
        { template: "public class Main {\n    public static void main(String[] args) {\n        String txt = \"Java\";\n        int len = txt.___();\n        char c = txt.___(0);\n    }\n}", answer: "public class Main {\n    public static void main(String[] args) {\n        String txt = \"Java\";\n        int len = txt.length();\n        char c = txt.charAt(0);\n    }\n}", blanks: ["length", "charAt"], instruction: "Fill in string length method and character extraction method." },
    ],
    pointers: [
        { template: "public class User {\n    private String name;\n    public User(String name) {\n        ___.name = name;\n    }\n}", answer: "public class User {\n    private String name;\n    public User(String name) {\n        this.name = name;\n    }\n}", blanks: ["this"], instruction: "Fill in reference keyword to target the current instance's field." },
    ],
    structures: [
        { template: "class Cat ___ Animal {\n    @___ \n    void makeSound() {\n        System.out.println(\"Meow\");\n    }\n}", answer: "class Cat extends Animal {\n    @Override \n    void makeSound() {\n        System.out.println(\"Meow\");\n    }\n}", blanks: ["extends", "Override"], instruction: "Fill in inheritance keyword and overridden method annotation." },
    ],
    "file-handling": [
        { template: "public class Main {\n    public static void main(String[] args) {\n        ___ {\n            int x = 5 / 0;\n        } ___ (ArithmeticException e) {\n            System.out.println(\"Zero Div\");\n        }\n    }\n}", answer: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 5 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Zero Div\");\n        }\n    }\n}", blanks: ["try", "catch"], instruction: "Fill in standard try-catch block keywords." },
    ],
    memory: [
        { template: "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<___> items = new ArrayList<>();\n        items.___(\"Java\");\n    }\n}", answer: "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> items = new ArrayList<>();\n        items.add(\"Java\");\n    }\n}", blanks: ["String", "add"], instruction: "Fill in element type wrapper and insert method for the ArrayList." },
    ],
    multithreading: [
        { template: "class MyThread extends ___ {\n    public void run() {\n        System.out.println(\"Running\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyThread t = new MyThread();\n        t.___();\n    }\n}", answer: "class MyThread extends Thread {\n    public void run() {\n        System.out.println(\"Running\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyThread t = new MyThread();\n        t.start();\n    }\n}", blanks: ["Thread", "start"], instruction: "Fill in the base Thread class name and launch method to start the thread." }
    ],
    java8: [
        { template: "import java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = List.of(\"a\", \"b\");\n        list.___()\n            .filter(s -> s.startsWith(\"a\"))\n            .___((System.out::println));\n    }\n}", answer: "import java.util.List;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = List.of(\"a\", \"b\");\n        list.stream()\n            .filter(s -> s.startsWith(\"a\"))\n            .forEach((System.out::println));\n    }\n}", blanks: ["stream", "forEach"], instruction: "Fill in the stream source pipeline initialization method and terminal output print method." }
    ]
};
exports.CHAPTERS = [
    { id: "basics", label: "01 · Java Basics" },
    { id: "variables", label: "02 · Variables" },
    { id: "io", label: "03 · Input / Output" },
    { id: "operators", label: "04 · Operators" },
    { id: "control-flow", label: "05 · Control Flow" },
    { id: "loops", label: "06 · Loops" },
    { id: "functions", label: "07 · Methods" },
    { id: "arrays", label: "08 · Arrays" },
    { id: "strings", label: "09 · Strings" },
    { id: "pointers", label: "10 · Classes & Objects" },
    { id: "structures", label: "11 · OOP Principles" },
    { id: "file-handling", label: "12 · Exception Handling" },
    { id: "memory", label: "13 · Collections" },
    { id: "multithreading", label: "14 · Multithreading" },
    { id: "java8", label: "15 · Streams & Lambdas" },
    { id: "packages", label: "16 · Packages" },
    { id: "modifiers", label: "17 · Access Modifiers" }
];
function shuffle(arr) {
    var _a;
    var a = __spreadArray([], arr, true);
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [a[j], a[i]], a[i] = _a[0], a[j] = _a[1];
    }
    return a;
}
