// Chapter 23 - java_keywords

export const chapter23_CONTENT = {
    title: "JAVA KEYWORDS",
    description: "Learn about java keywords",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};


export const chapter23_MCQ = [
    {
        q: "Which keyword is used to indicate that a variable's value may be changed by multiple threads simultaneously? (GATE CS 2019)",
        options: ["synchronized", "volatile", "transient", "static"],
        ans: 1,
        explanation: "The volatile keyword guarantees visibility of changes to variables across threads."
    },
    {
        q: "What is the primary effect of the 'final' keyword on a class? (GATE IT 2008)",
        options: ["It prevents the class from being instantiated.", "It prevents the class from being inherited.", "It requires all methods in the class to be static.", "It makes all fields in the class implicitly static."],
        ans: 1,
        explanation: "A final class cannot be subclassed or extended."
    },
    {
        q: "Which of the following is true about the 'static' keyword? (GATE CS 2014)",
        options: ["A static method can directly call non-static methods of the same class.", "Static variables are initialized when the first object is created.", "A static block is executed when the class is loaded into memory.", "Static methods can be overridden to achieve polymorphism."],
        ans: 2,
        explanation: "Static initialization blocks are executed once when the class is loaded by the ClassLoader."
    },
    {
        q: "What does the 'strictfp' keyword do in Java? (GATE CS 2005)",
        options: ["It restricts floating-point calculations to ensure portability across platforms.", "It forces strict exception handling.", "It makes a class strictly final.", "It optimizes floating-point operations for speed."],
        ans: 0,
        explanation: "The strictfp keyword ensures that floating-point operations yield exactly the same results on all platforms."
    },
    {
        q: "Which keyword is used to invoke a parent class's constructor? (GATE IT 2006)",
        options: ["this", "parent", "super", "extends"],
        ans: 2,
        explanation: "The super() keyword is used to explicitly call a constructor from the immediate superclass."
    },
    {
        q: "Which of the following is NOT a reserved keyword in Java? (GATE CS 2011)",
        options: ["goto", "const", "include", "native"],
        ans: 2,
        explanation: "'include' is not a keyword in Java. 'goto' and 'const' are reserved keywords even though they are not used."
    },
    {
        q: "Can a 'final' method be overridden? (GATE CS 2009)",
        options: ["Yes, by using the @Override annotation.", "Yes, if the subclass is in the same package.", "No, final methods cannot be overridden.", "No, but they can be hidden by static methods."],
        ans: 2,
        explanation: "The final keyword applied to a method prevents subclasses from overriding it."
    },
    {
        q: "What happens when a variable is declared as 'volatile'? (GATE CS 2017)",
        options: ["The variable is stored in thread-local cache.", "Reads and writes to the variable bypass CPU cache and go straight to main memory.", "The variable becomes immutable.", "The variable is synchronized for all object instances."],
        ans: 1,
        explanation: "volatile ensures that threads read the most recent value from main memory rather than a local thread cache."
    },
    {
        q: "Which keyword is used to call a method written in another language (like C or C++)? (GATE IT 2012)",
        options: ["foreign", "external", "native", "JNI"],
        ans: 2,
        explanation: "The native keyword marks a method that is implemented in another language."
    },
    {
        q: "Can a constructor be declared as 'final'? (GATE CS 2007)",
        options: ["Yes, it prevents instantiation.", "Yes, it prevents overriding.", "No, constructors cannot be final.", "No, constructors are implicitly final."],
        ans: 2,
        explanation: "Constructors cannot be declared final, static, abstract, or synchronized."
    },
    {
        q: "What is the purpose of the 'instanceof' keyword? (GATE CS 2013)",
        options: ["To create an instance of a class.", "To test if an object is of a specific type (class, subclass, or interface).", "To cast an object to a specific type.", "To check if an instance is null."],
        ans: 1,
        explanation: "The instanceof operator is used to test whether the object is an instance of the specified type."
    },
    {
        q: "What happens if a static variable is not explicitly initialized? (GATE IT 2010)",
        options: ["Compilation error.", "It gets a random memory value.", "It receives a default value (e.g., 0, false, null).", "It throws a runtime exception when accessed."],
        ans: 2,
        explanation: "Like instance variables, static variables are initialized to their default values when the class is loaded."
    },
    {
        q: "Which keyword restricts access to members only within the same package and subclasses? (GATE CS 2016)",
        options: ["public", "private", "protected", "default"],
        ans: 2,
        explanation: "The protected keyword allows access within the same package and to subclasses in different packages."
    },
    {
        q: "Why is 'goto' a reserved keyword in Java despite not being used? (GATE CS 2004)",
        options: ["To allow future implementations.", "To catch programmers migrating from C/C++ and prevent its use.", "It is used internally by the JVM.", "It is used for labeled break statements."],
        ans: 1,
        explanation: "'goto' and 'const' were reserved to provide clear error messages for C/C++ developers and prevent their use, promoting better control structures."
    },
    {
        q: "Is it allowed to declare a class as both abstract and final? (GATE IT 2015)",
        options: ["Yes, it means the class is a constant template.", "No, it causes a compile-time error.", "Yes, but it cannot contain any methods.", "No, unless it extends an abstract class."],
        ans: 1,
        explanation: "abstract classes must be subclassed to be used, while final classes cannot be subclassed. The two keywords are mutually exclusive."
    }
];

export const chapter23_DEBUG = undefined;
export const chapter23_DRAG_DROP = undefined;
export const chapter23_COMPLETE_EXERCISES = [
  {
    template: `public class Main {
    // A variable that cannot be changed
    public static ___ int MAX = 100;
}`,
    blanks: [
      "final"
    ]
  }
];
