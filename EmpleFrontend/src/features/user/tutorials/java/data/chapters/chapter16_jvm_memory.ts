// Chapter 16

export const chapter16_CONTENT = {
    title: "JVM MEMORY",
    description: "Learn about jvm memory",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};

export const chapter16_DEBUG = undefined;

export const chapter16_DRAG_DROP = undefined;

export const chapter16_MCQ = [
    {
        q: "Which of the following components of the JVM memory is shared among all threads? (GATE CS 2011)",
        options: ["JVM Stack", "Program Counter Register", "Native Method Stack", "Method Area"],
        ans: 3,
        explanation: "The Method Area and Heap are shared among all threads. The JVM Stack, PC Register, and Native Method Stack are private to each thread."
    },
    {
        q: "In Java, an OutOfMemoryError is thrown when the JVM cannot allocate an object because it is out of memory. Which memory area does NOT throw an OutOfMemoryError? (GATE IT 2008)",
        options: ["Heap", "Method Area", "Program Counter (PC) Register", "JVM Stack"],
        ans: 2,
        explanation: "The PC Register is the only runtime data area in the JVM specification that does not throw an OutOfMemoryError."
    },
    {
        q: "Consider the execution of a Java program. Where are local variables stored? (GATE CS 2014)",
        options: ["Heap", "Method Area", "Stack", "PC Register"],
        ans: 2,
        explanation: "Local variables are stored in the JVM Stack, specifically within the frame of the method currently being executed."
    },
    {
        q: "Which of the following is responsible for converting bytecode into machine-specific code at runtime in the JVM? (GATE CS 2017)",
        options: ["Garbage Collector", "Bytecode Verifier", "Just-In-Time (JIT) Compiler", "ClassLoader"],
        ans: 2,
        explanation: "The Just-In-Time (JIT) compiler is part of the Execution Engine and improves performance by compiling bytecode into native machine code at runtime."
    },
    {
        q: "In which part of the JVM heap are newly created objects initially allocated? (GATE CS 2015)",
        options: ["Old Generation", "Tenured Space", "Survivor Space", "Eden Space"],
        ans: 3,
        explanation: "Newly created objects are initially allocated in the Eden Space of the Young Generation."
    },
    {
        q: "What is the primary purpose of the Java garbage collector? (GATE CS 2004)",
        options: ["To free memory occupied by objects that are no longer reachable", "To destroy objects explicitly requested by the programmer", "To allocate memory for new objects", "To compile bytecode into native code"],
        ans: 0,
        explanation: "The garbage collector reclaims heap space by destroying unreachable objects, ensuring efficient memory utilization."
    },
    {
        q: "Which tool is primarily used to compile Java source code into bytecode? (GATE CS 2007)",
        options: ["java", "javah", "javap", "javac"],
        ans: 3,
        explanation: "The 'javac' command invokes the Java compiler, converting .java source files into .class files containing bytecode."
    },
    {
        q: "How does the JVM ensure that a downloaded class file is safe to execute? (GATE IT 2006)",
        options: ["By using the Bytecode Verifier", "By executing it in a sandbox", "By checking the digital signature", "By running it through the JIT compiler"],
        ans: 0,
        explanation: "The Bytecode Verifier checks the structure and format of the bytecode to ensure it does not violate Java's access restrictions or security policies."
    },
    {
        q: "Which generation of the Heap memory is typically garbage-collected most frequently? (GATE CS 2012)",
        options: ["Old Generation", "Permanent Generation", "Young Generation", "Tenured Space"],
        ans: 2,
        explanation: "Minor Garbage Collection runs frequently in the Young Generation to quickly clear short-lived objects."
    },
    {
        q: "Which runtime data area stores the runtime constant pool, field, and method data? (GATE IT 2014)",
        options: ["Heap", "Method Area", "Native Method Stack", "JVM Stack"],
        ans: 1,
        explanation: "The Method Area is a logical part of the heap that stores class structures such as the runtime constant pool, fields, and method data."
    },
    {
        q: "In Java, what is the primary role of the ClassLoader subsystem? (GATE CS 2016)",
        options: ["Execution of bytecode", "Loading, linking, and initialization of class files", "Garbage collection", "Memory allocation"],
        ans: 1,
        explanation: "The ClassLoader subsystem is responsible for dynamically loading class files into memory, linking them, and initializing them."
    },
    {
        q: "If a thread requires a larger stack than is allowed, what error does the JVM throw? (GATE CS 2010)",
        options: ["OutOfMemoryError", "StackOverflowError", "VirtualMachineError", "IllegalThreadStateException"],
        ans: 1,
        explanation: "A StackOverflowError is thrown when a thread's stack size exceeds the maximum limit, often due to deep or infinite recursion."
    },
    {
        q: "Which of the following statements about the Java Heap is correct? (GATE CS 2019)",
        options: ["All class instances and arrays are allocated on the heap", "Primitive local variables are allocated on the heap", "It is private to each thread", "It does not undergo garbage collection"],
        ans: 0,
        explanation: "The heap is the runtime data area from which memory for all class instances and arrays is allocated, and it is shared among all threads."
    },
    {
        q: "What primarily occurs during the 'mark-and-sweep' garbage collection algorithm? (GATE CS 2008)",
        options: ["All objects are deleted and recreated", "Reachable objects are marked, and then unmarked objects are cleared", "Memory is continuously compacted during allocation", "Only the oldest objects are destroyed"],
        ans: 1,
        explanation: "In mark-and-sweep, the GC traverses object references to mark reachable objects, then sweeps through memory to free the unmarked ones."
    },
    {
        q: "Which of the following scenarios causes an object to become eligible for garbage collection? (GATE IT 2007)",
        options: ["When the object's finalize() method is called explicitly", "When all references to the object are dropped or reassigned", "When the object has existed for more than 10 minutes", "When system memory is full"],
        ans: 1,
        explanation: "An object becomes eligible for garbage collection when there are no more active references pointing to it from the application code."
    }
];

export const chapter16_COMPLETE_EXERCISES = [];
