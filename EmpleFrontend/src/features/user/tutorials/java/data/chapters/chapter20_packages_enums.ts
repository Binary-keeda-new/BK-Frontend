// Chapter 20

export const chapter20_CONTENT = {
    title: "PACKAGES ENUMS",
    description: "Learn about packages enums",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};

export const chapter20_DEBUG = undefined;

export const chapter20_DRAG_DROP = undefined;

export const chapter20_MCQ = [
    {
        q: "Which statement is true regarding the 'default' (no modifier) access modifier in Java? (GATE CS 2012)",
        options: ["It is accessible from anywhere in the application.", "It is accessible only within the same class.", "It is accessible only within the same package.", "It is accessible within the same package and by subclasses outside the package."],
        ans: 2,
        explanation: "If no access modifier is specified, it uses the default (package-private) visibility, meaning the member is accessible only within the same package."
    },
    {
        q: "What is the primary purpose of a Java package? (GATE IT 2007)",
        options: ["To execute native C/C++ code.", "To avoid naming conflicts and group related classes.", "To increase the runtime execution speed of the application.", "To automatically manage memory and garbage collection."],
        ans: 1,
        explanation: "Packages logically group related classes and prevent naming collisions (e.g., distinguishing between java.util.Date and java.sql.Date)."
    },
    {
        q: "Which class do all Java enums implicitly extend? (GATE CS 2014)",
        options: ["java.lang.Object (directly)", "java.lang.Enum", "java.util.Enumeration", "java.lang.Constants"],
        ans: 1,
        explanation: "All enums in Java implicitly extend the abstract class `java.lang.Enum`. As Java does not support multiple class inheritance, enums cannot extend any other class."
    },
    {
        q: "Which of the following can a Java enum NOT have? (GATE CS 2019)",
        options: ["Methods", "Instance variables", "Public constructors", "Interfaces that it implements"],
        ans: 2,
        explanation: "Enum constructors are implicitly private. You cannot create new instances of an enum using the 'new' keyword outside the enum declaration itself."
    },
    {
        q: "Which statement must strictly be the first non-comment line in a Java source file? (GATE CS 2008)",
        options: ["import statement", "class declaration", "interface declaration", "package statement"],
        ans: 3,
        explanation: "If a class belongs to a package, the `package` declaration must be the first line of code in the source file."
    },
    {
        q: "What does the expression `Day.MONDAY == Day.MONDAY` evaluate to, assuming `Day` is an enum? (GATE IT 2010)",
        options: ["true", "false", "Compilation error", "Runtime exception"],
        ans: 0,
        explanation: "Enum constants are singletons. The '==' operator correctly compares memory references, which are identical for the same enum constant."
    },
    {
        q: "Which keyword is used to access public classes from another package? (GATE CS 2006)",
        options: ["include", "using", "import", "package"],
        ans: 2,
        explanation: "The `import` keyword is used in Java to bring classes or entire packages into visibility for the current file."
    },
    {
        q: "Which package is automatically imported into every Java program by default? (GATE CS 2005)",
        options: ["java.util", "java.lang", "java.io", "java.math"],
        ans: 1,
        explanation: "The `java.lang` package, which contains core classes like String, Object, and System, is automatically imported by the compiler."
    },
    {
        q: "Can a Java enum implement an interface? (GATE CS 2017)",
        options: ["Yes, enums can implement multiple interfaces.", "No, enums cannot implement interfaces.", "Yes, but only a single interface.", "Only if the enum contains no fields."],
        ans: 0,
        explanation: "While enums cannot extend other classes (since they already extend `java.lang.Enum`), they are free to implement one or more interfaces."
    },
    {
        q: "What is the return type of the implicitly generated `values()` method in an enum? (GATE IT 2013)",
        options: ["List of the enum type", "Set of the enum type", "Array of the enum type", "Iterator of the enum type"],
        ans: 2,
        explanation: "The compiler automatically generates a static `values()` method that returns an array containing all the constants of the enum, in the order they are declared."
    },
    {
        q: "Which method from `java.lang.Enum` returns the exact name of the enum constant as it was declared? (GATE CS 2016)",
        options: ["toString()", "name()", "getName()", "value()"],
        ans: 1,
        explanation: "The `name()` method returns the exact identifier used in the declaration. While `toString()` often returns the same, `toString()` can be overridden, whereas `name()` is final."
    },
    {
        q: "If a class member is declared as `protected`, where can it be accessed? (GATE CS 2011)",
        options: ["Only within the same class.", "Within the same package, and by subclasses in other packages.", "Only by subclasses, regardless of package.", "Anywhere in the application."],
        ans: 1,
        explanation: "The `protected` modifier allows access to classes within the same package, as well as to subclasses that reside in completely different packages."
    },
    {
        q: "Which modifiers are implicitly applied to all enum constants in Java? (GATE CS 2018)",
        options: ["public abstract", "public static final", "private static final", "protected final"],
        ans: 1,
        explanation: "Every enum constant is essentially a public, static, and final instance of the enum type itself."
    },
    {
        q: "How can you assign custom values (like integers or strings) to enum constants? (GATE IT 2015)",
        options: ["By using the '=' operator during declaration.", "By passing values to a private constructor and storing them in instance variables.", "It is impossible to assign custom values.", "By overriding the `valueOf()` method."],
        ans: 1,
        explanation: "You can assign custom values by declaring instance variables and a private constructor in the enum, then passing the values when declaring each constant (e.g., `MONDAY(1)`)."
    },
    {
        q: "Which of the following is an INVALID package name in Java? (GATE CS 2009)",
        options: ["com.myapp.utils", "org.company_name.project", "package.int.myapp", "net.company.V1"],
        ans: 2,
        explanation: "`int` is a reserved keyword in Java. Package names cannot contain Java keywords. Also, starting a package component with a number is invalid."
    }
];

export const chapter20_COMPLETE_EXERCISES = [
  {
    template: `___ Level {
    LOW, MEDIUM, HIGH
}`,
    blanks: [
      "enum"
    ]
  }
];
