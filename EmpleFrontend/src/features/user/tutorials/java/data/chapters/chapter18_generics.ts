// Chapter 18

export const chapter18_CONTENT = {
    title: "GENERICS",
    description: "Learn about generics",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};

export const chapter18_DEBUG = undefined;

export const chapter18_DRAG_DROP = undefined;

export const chapter18_MCQ = [
    {
        q: "Why does Java use type erasure for Generics? (GATE CS 2018)",
        options: ["To increase runtime performance by removing type checks.", "To allow backward compatibility with legacy code written before Java 5.", "To reduce the size of the compiled bytecode.", "To prevent reflection from modifying generic objects."],
        ans: 1,
        explanation: "Type erasure ensures that generic code is translated into non-generic code by the compiler, allowing it to interoperate seamlessly with older Java code that does not use generics."
    },
    {
        q: "Given `List<Integer> list = new ArrayList<>();`, which of the following is true at runtime due to type erasure? (GATE CS 2014)",
        options: ["The list retains its Integer type information.", "The list behaves as a List of Objects.", "A runtime exception is thrown if you add a String to it via reflection.", "The instanceof operator can distinguish it from List<String>."],
        ans: 1,
        explanation: "At runtime, type parameters are erased, and the JVM sees a raw ArrayList (acting as a collection of Object). Reflection can actually bypass compile-time checks and add a String."
    },
    {
        q: "What is the meaning of the generic signature `public void printList(List<? extends Number> list)`? (GATE IT 2010)",
        options: ["The method accepts a List of Object.", "The method accepts a List containing exactly Number objects.", "The method accepts a List of any class that inherits from Number.", "The method accepts a List of any class that is a superclass of Number."],
        ans: 2,
        explanation: "`? extends Number` is an upper bounded wildcard, meaning it accepts a list of Number or any of its subclasses (like Integer, Double)."
    },
    {
        q: "Which of the following is a VALID generic declaration in Java? (GATE CS 2016)",
        options: ["List<int> list = new ArrayList<int>();", "List<String> list = new ArrayList<>();", "List<Object> list = new ArrayList<String>();", "List<String> list = new ArrayList<Object>();"],
        ans: 1,
        explanation: "Java generics do not support primitive types, so <int> is invalid. Also, generics are invariant, meaning List<String> is not a subclass of List<Object>. The diamond operator <> is correctly used in option 2."
    },
    {
        q: "Can you use primitive types as type arguments in Java generics? (GATE CS 2008)",
        options: ["Yes, but they are automatically boxed.", "Yes, without any performance penalty.", "No, only reference types (objects) can be used.", "No, except for boolean and char."],
        ans: 2,
        explanation: "Java generics only accept reference types. To store primitive values, you must use their corresponding wrapper classes (e.g., Integer instead of int)."
    },
    {
        q: "What is the output of the following comparison? `new ArrayList<Integer>().getClass() == new ArrayList<String>().getClass()` (GATE IT 2011)",
        options: ["true", "false", "Compilation Error", "Runtime Exception"],
        ans: 0,
        explanation: "Due to type erasure, both `ArrayList<Integer>` and `ArrayList<String>` erase to the raw type `ArrayList` at runtime, so their Class objects are identical."
    },
    {
        q: "Which wildcard represents a lower bound in Java generics? (GATE CS 2015)",
        options: ["<? extends T>", "<?>", "<? super T>", "<T>"],
        ans: 2,
        explanation: "`<? super T>` represents a lower bounded wildcard, meaning it restricts the unknown type to be a specific type or a supertype of that type."
    },
    {
        q: "What happens if you try to evaluate `obj instanceof List<String>` in Java? (GATE CS 2009)",
        options: ["It returns true if obj is a List of Strings.", "It returns false if obj is a List of Integers.", "It causes a compilation error.", "It throws a ClassCastException at runtime."],
        ans: 2,
        explanation: "Because generic type information is erased at runtime, the JVM cannot distinguish between `List<String>` and `List<Integer>`. The compiler prevents this and throws an error."
    },
    {
        q: "When bounding a type parameter, which keyword is used to specify that the type must implement a specific interface? (GATE IT 2007)",
        options: ["implements", "extends", "super", "instanceof"],
        ans: 1,
        explanation: "In generics, the `extends` keyword is used as a general term to mean either 'extends a class' or 'implements an interface'."
    },
    {
        q: "In the generic declaration `<T extends Comparable<T>>`, what does it imply? (GATE CS 2013)",
        options: ["T must be a subclass of the Comparable class.", "T must implement the Comparable interface for type T.", "T must be comparable to any object.", "T must be a primitive type."],
        ans: 1,
        explanation: "It bounds the type parameter T to only those types that implement the Comparable interface, specifically parameterized with T itself."
    },
    {
        q: "Which of the following wildcards allows you to safely ADD elements to a generic collection? (GATE CS 2012)",
        options: ["Upper bounded wildcard `(? extends T)", "Lower bounded wildcard `(? super T)", "Unbounded wildcard `(?)", "Both upper and lower bounds"],
        ans: 1,
        explanation: "With a lower bounded wildcard `(? super T)`, it is safe to write instances of T or its subclasses to the collection. Upper bounds only allow safe reading."
    },
    {
        q: "Why cannot arrays of generic types (e.g., `new List<String>[10]`) be created directly in Java? (GATE CS 2017)",
        options: ["Arrays do not support reference types.", "Generic types are erased at runtime, but arrays require runtime type information.", "The array size must be generic as well.", "It causes a StackOverflowError."],
        ans: 1,
        explanation: "Arrays are reified, meaning they enforce their element types at runtime. Generics use type erasure, so a `List<String>[]` would just be a `List[]` at runtime, defeating array safety checks."
    },
    {
        q: "Given `class MyGen<T> { T obj; }`, what is the type of `obj` in the compiled bytecode? (GATE CS 2006)",
        options: ["T", "Object", "String", "Number"],
        ans: 1,
        explanation: "If no bound is specified, type erasure replaces the generic type parameter T with `Object` in the compiled bytecode."
    },
    {
        q: "Which declaration correctly restricts type parameter `T` to be a subclass of `Number` AND implement `Comparable`? (GATE IT 2015)",
        options: ["<T extends Number & Comparable>", "<T extends Number, Comparable>", "<T extends Number | Comparable>", "<T implements Number, Comparable>"],
        ans: 0,
        explanation: "Java allows multiple bounds using the `&` symbol. The class must be listed first, followed by interfaces."
    },
    {
        q: "What is the main advantage of using Generics in Java? (GATE CS 2005)",
        options: ["Increasing execution speed.", "Reducing memory footprint.", "Providing compile-time type safety and eliminating casts.", "Allowing multiple inheritance in classes."],
        ans: 2,
        explanation: "Generics shift type checking from runtime to compile time, catching ClassCastExceptions early and removing the need for manual type casting."
    }
];

export const chapter18_COMPLETE_EXERCISES = [
  {
    template: `public class Box<___> {
    private T item;
    public void set(T item) { this.item = item; }
}`,
    blanks: [
      "T"
    ]
  }
];
