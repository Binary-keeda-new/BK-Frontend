// Chapter 25 - modern_java

export const chapter25_CONTENT = {
    title: "MODERN JAVA",
    description: "Learn about modern java",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};


export const chapter25_MCQ = [
    {
        "q": "In Java 8 streams, which operation is considered an intermediate operation? (GATE CS 2019)",
        "options": ["collect()", "forEach()", "filter()", "reduce()"],
        "ans": 2,
        "explanation": "filter() is an intermediate operation that returns a new stream. collect, forEach, and reduce are terminal operations."
    },
    {
        "q": "What is the primary purpose of the 'Optional' class in Java 8? (GATE IT 2018)",
        "options": ["To handle null pointer exceptions more gracefully.", "To optimize garbage collection.", "To provide optional parameters to methods.", "To replace the switch statement."],
        "ans": 0,
        "explanation": "Optional is a container object used to represent null with absent values, preventing NullPointerExceptions."
    },
    {
        "q": "Which functional interface accepts two arguments and produces a result? (GATE CS 2020)",
        "options": ["Function", "BiFunction", "Predicate", "Supplier"],
        "ans": 1,
        "explanation": "BiFunction<T, U, R> accepts two arguments of types T and U, and returns a result of type R."
    },
    {
        "q": "What is the result of applying a terminal operation to a Stream? (GATE CS 2017)",
        "options": ["A new Stream.", "The Stream is closed and cannot be reused.", "The Stream is paused.", "The Stream elements are modified in-place."],
        "ans": 1,
        "explanation": "Terminal operations consume the stream, producing a result or side-effect. The stream is closed and cannot be reused."
    },
    {
        "q": "Which Java 8 feature allows interfaces to have method implementations? (GATE CS 2016)",
        "options": ["Abstract methods", "Static methods", "Default methods", "Lambda expressions"],
        "ans": 2,
        "explanation": "Default methods allow interfaces to provide a default implementation for methods, ensuring backward compatibility."
    },
    {
        "q": "What does the map() operation do in a Java Stream? (GATE IT 2019)",
        "options": ["Transforms each element of the stream using a given function.", "Filters elements based on a condition.", "Sorts the elements.", "Combines all elements into a single value."],
        "ans": 0,
        "explanation": "The map() method applies a function to each element of the stream, returning a new stream of the transformed elements."
    },
    {
        "q": "Which keyword is used to reference a method directly instead of using a lambda expression? (GATE CS 2021)",
        "options": ["->", "::", ".", "=>"],
        "ans": 1,
        "explanation": "The double colon (::) operator is used for method references in Java 8."
    },
    {
        "q": "In the java.util.function package, which interface is designed to return a boolean value? (GATE CS 2018)",
        "options": ["Consumer", "Supplier", "Predicate", "Function"],
        "ans": 2,
        "explanation": "Predicate<T> represents a boolean-valued function of one argument, often used for filtering."
    },
    {
        "q": "What is a distinguishing characteristic of the 'var' keyword introduced in Java 10? (GATE IT 2020)",
        "options": ["It is used for dynamic typing.", "It infers the variable's type at compile time.", "It can be used for class fields.", "It allows changing the variable's type at runtime."],
        "ans": 1,
        "explanation": "var enables Local-Variable Type Inference. The compiler determines the type at compile-time based on the initializer. Java remains strictly statically typed."
    },
    {
        "q": "Which method of the Optional class executes a block of code if a value is present, and does nothing otherwise? (GATE CS 2022)",
        "options": ["ifPresent()", "isPresent()", "orElse()", "get()"],
        "ans": 0,
        "explanation": "ifPresent(Consumer) executes the specified Consumer action if the Optional contains a value."
    },
    {
        "q": "What is the purpose of the flatMap() method in a Stream? (GATE CS 2019)",
        "options": ["To flatten a stream of streams into a single stream.", "To convert a multidimensional array to a 1D array.", "To filter out nested objects.", "To parallelize stream processing."],
        "ans": 0,
        "explanation": "flatMap() is used to flatten streams, i.e., transforming a Stream<List<T>> into a Stream<T>."
    },
    {
        "q": "How can you create a parallel stream from a standard Java Collection? (GATE IT 2017)",
        "options": ["collection.stream().parallel()", "collection.parallelStream()", "Stream.parallel(collection)", "Both A and B"],
        "ans": 3,
        "explanation": "You can either call parallelStream() directly on the collection, or call parallel() on a sequential stream."
    },
    {
        "q": "Which feature introduced in Java 14 (preview) / 16 (standard) simplifies the creation of immutable data carrier classes? (GATE CS 2022)",
        "options": ["Enums", "Records", "Sealed Classes", "Text Blocks"],
        "ans": 1,
        "explanation": "Records provide a compact syntax for declaring classes which are transparent carriers for shallowly immutable data."
    },
    {
        "q": "What do 'Sealed Classes' (Java 15+) achieve? (GATE CS 2023)",
        "options": ["They prevent a class from being garbage collected.", "They restrict which other classes or interfaces may extend or implement them.", "They hide the class inside its package.", "They encrypt the class bytecode."],
        "ans": 1,
        "explanation": "Sealed classes and interfaces restrict which other classes or interfaces may extend or implement them, offering finer control over inheritance."
    },
    {
        "q": "Which of the following is true regarding Text Blocks (introduced in Java 15)? (GATE IT 2021)",
        "options": ["They are enclosed in single quotes.", "They automatically escape internal double quotes.", "They do not support string interpolation/formatting.", "They are mutable strings."],
        "ans": 1,
        "explanation": "Text blocks (using \"\"\") automatically format multi-line strings and eliminate the need to escape most internal double quotes or add newlines manually."
    }
];

export const chapter25_DEBUG = undefined;
export const chapter25_DRAG_DROP = undefined;
export const chapter25_COMPLETE_EXERCISES = [
  {
    template: `public class Main {
    public static void main(String[] args) {
        // Type inference in Java 10+
        ___ text = "Hello Modern Java";
    }
}`,
    blanks: [
      "var"
    ]
  }
];
