$content = @"
export const chapter16_MCQ = [
    {
        q: `"Which of the following components of the JVM memory is shared among all threads? (GATE CS 2011)`",
        options: [`"JVM Stack`", `"Program Counter Register`", `"Native Method Stack`", `"Method Area`"],
        ans: 3,
        explanation: `"The Method Area and Heap are shared among all threads. The JVM Stack, PC Register, and Native Method Stack are private to each thread.`"
    },
    {
        q: `"In Java, an OutOfMemoryError is thrown when the JVM cannot allocate an object because it is out of memory. Which memory area does NOT throw an OutOfMemoryError? (GATE IT 2008)`",
        options: [`"Heap`", `"Method Area`", `"Program Counter (PC) Register`", `"JVM Stack`"],
        ans: 2,
        explanation: `"The PC Register is the only runtime data area in the JVM specification that does not throw an OutOfMemoryError.`"
    },
    {
        q: `"Consider the execution of a Java program. Where are local variables stored? (GATE CS 2014)`",
        options: [`"Heap`", `"Method Area`", `"Stack`", `"PC Register`"],
        ans: 2,
        explanation: `"Local variables are stored in the JVM Stack, specifically within the frame of the method currently being executed.`"
    },
    {
        q: `"Which of the following is responsible for converting bytecode into machine-specific code at runtime in the JVM? (GATE CS 2017)`",
        options: [`"Garbage Collector`", `"Bytecode Verifier`", `"Just-In-Time (JIT) Compiler`", `"ClassLoader`"],
        ans: 2,
        explanation: `"The Just-In-Time (JIT) compiler is part of the Execution Engine and improves performance by compiling bytecode into native machine code at runtime.`"
    },
    {
        q: `"In which part of the JVM heap are newly created objects initially allocated? (GATE CS 2015)`",
        options: [`"Old Generation`", `"Tenured Space`", `"Survivor Space`", `"Eden Space`"],
        ans: 3,
        explanation: `"Newly created objects are initially allocated in the Eden Space of the Young Generation.`"
    },
    {
        q: `"What is the primary purpose of the Java garbage collector? (GATE CS 2004)`",
        options: [`"To free memory occupied by objects that are no longer reachable`", `"To destroy objects explicitly requested by the programmer`", `"To allocate memory for new objects`", `"To compile bytecode into native code`"],
        ans: 0,
        explanation: `"The garbage collector reclaims heap space by destroying unreachable objects, ensuring efficient memory utilization.`"
    },
    {
        q: `"Which tool is primarily used to compile Java source code into bytecode? (GATE CS 2007)`",
        options: [`"java`", `"javah`", `"javap`", `"javac`"],
        ans: 3,
        explanation: `"The 'javac' command invokes the Java compiler, converting .java source files into .class files containing bytecode.`"
    },
    {
        q: `"How does the JVM ensure that a downloaded class file is safe to execute? (GATE IT 2006)`",
        options: [`"By using the Bytecode Verifier`", `"By executing it in a sandbox`", `"By checking the digital signature`", `"By running it through the JIT compiler`"],
        ans: 0,
        explanation: `"The Bytecode Verifier checks the structure and format of the bytecode to ensure it does not violate Java's access restrictions or security policies.`"
    },
    {
        q: `"Which generation of the Heap memory is typically garbage-collected most frequently? (GATE CS 2012)`",
        options: [`"Old Generation`", `"Permanent Generation`", `"Young Generation`", `"Tenured Space`"],
        ans: 2,
        explanation: `"Minor Garbage Collection runs frequently in the Young Generation to quickly clear short-lived objects.`"
    },
    {
        q: `"Which runtime data area stores the runtime constant pool, field, and method data? (GATE IT 2014)`",
        options: [`"Heap`", `"Method Area`", `"Native Method Stack`", `"JVM Stack`"],
        ans: 1,
        explanation: `"The Method Area is a logical part of the heap that stores class structures such as the runtime constant pool, fields, and method data.`"
    },
    {
        q: `"In Java, what is the primary role of the ClassLoader subsystem? (GATE CS 2016)`",
        options: [`"Execution of bytecode`", `"Loading, linking, and initialization of class files`", `"Garbage collection`", `"Memory allocation`"],
        ans: 1,
        explanation: `"The ClassLoader subsystem is responsible for dynamically loading class files into memory, linking them, and initializing them.`"
    },
    {
        q: `"If a thread requires a larger stack than is allowed, what error does the JVM throw? (GATE CS 2010)`",
        options: [`"OutOfMemoryError`", `"StackOverflowError`", `"VirtualMachineError`", `"IllegalThreadStateException`"],
        ans: 1,
        explanation: `"A StackOverflowError is thrown when a thread's stack size exceeds the maximum limit, often due to deep or infinite recursion.`"
    },
    {
        q: `"Which of the following statements about the Java Heap is correct? (GATE CS 2019)`",
        options: [`"All class instances and arrays are allocated on the heap`", `"Primitive local variables are allocated on the heap`", `"It is private to each thread`", `"It does not undergo garbage collection`"],
        ans: 0,
        explanation: `"The heap is the runtime data area from which memory for all class instances and arrays is allocated, and it is shared among all threads.`"
    },
    {
        q: `"What primarily occurs during the 'mark-and-sweep' garbage collection algorithm? (GATE CS 2008)`",
        options: [`"All objects are deleted and recreated`", `"Reachable objects are marked, and then unmarked objects are cleared`", `"Memory is continuously compacted during allocation`", `"Only the oldest objects are destroyed`"],
        ans: 1,
        explanation: `"In mark-and-sweep, the GC traverses object references to mark reachable objects, then sweeps through memory to free the unmarked ones.`"
    },
    {
        q: `"Which of the following scenarios causes an object to become eligible for garbage collection? (GATE IT 2007)`",
        options: [`"When the object's finalize() method is called explicitly`", `"When all references to the object are dropped or reassigned`", `"When the object has existed for more than 10 minutes`", `"When system memory is full`"],
        ans: 1,
        explanation: `"An object becomes eligible for garbage collection when there are no more active references pointing to it from the application code.`"
    }
];
"@
Set-Content -Path "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter16_mcq_tmp.txt" -Value $content


$file = "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter16_jvm_memory.ts"
$content = Get-Content $file
$start = 19
$end = 51
$mcq = Get-Content "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter16_mcq_tmp.txt"
$newContent = $content[0..($start-1)] + $mcq + $content[($end+1)..($content.Length-1)]
Set-Content -Path $file -Value $newContent


$content = @"
export const chapter17_MCQ = [
    {
        q: `"What will be the output of the following Java snippet? \n```java\nInteger i1 = 127;\nInteger i2 = 127;\nInteger i3 = 128;\nInteger i4 = 128;\nSystem.out.println((i1 == i2) + \", \" + (i3 == i4));\n``` (GATE IT 2012)`",
        options: [`"true, true`", `"true, false`", `"false, true`", `"false, false`"],
        ans: 1,
        explanation: `"Java caches Integer objects in the range -128 to 127. Therefore, i1 and i2 refer to the same cached object (true). However, 128 is outside this range, so i3 and i4 refer to different objects (false).`"
    },
    {
        q: `"Which of the following is true regarding Java wrapper classes? (GATE CS 2016)`",
        options: [`"They are mutable objects.`", `"They allow primitives to be used in generic collections.`", `"They cannot be used with the 'new' keyword.`", `"They do not participate in polymorphism.`"],
        ans: 1,
        explanation: `"Wrapper classes are immutable. They are primarily used so that primitive types can be treated as objects, allowing them to be used in generic collections like ArrayList<Integer>.`"
    },
    {
        q: `"What is the result of the following code? \n```java\nBoolean b1 = new Boolean(\"true\");\nBoolean b2 = new Boolean(\"True\");\nBoolean b3 = new Boolean(\"tRuE\");\nSystem.out.println(b1 == b2);\nSystem.out.println(b1.equals(b3));\n``` (GATE CS 2007)`",
        options: [`"true\ntrue`", `"false\ntrue`", `"true\nfalse`", `"false\nfalse`"],
        ans: 1,
        explanation: `"The '==' operator checks for reference equality, so b1 == b2 is false. The equals() method checks the boolean value, and the Boolean constructor is case-insensitive, so b1.equals(b3) is true.`"
    },
    {
        q: `"What happens when a primitive value is assigned to a wrapper class reference? (GATE IT 2014)`",
        options: [`"A compilation error occurs`", `"A runtime exception is thrown`", `"The JVM performs autoboxing`", `"The JVM performs unboxing`"],
        ans: 2,
        explanation: `"Assigning a primitive value to a wrapper class reference triggers autoboxing, where the compiler automatically converts the primitive type into its corresponding wrapper object.`"
    },
    {
        q: `"Which of the following methods is used to parse a String into a primitive int? (GATE CS 2015)`",
        options: [`"Integer.valueOf()`", `"Integer.parseInt()`", `"Integer.getInt()`", `"Integer.toUnsignedInt()`"],
        ans: 1,
        explanation: `"Integer.parseInt() returns a primitive int, whereas Integer.valueOf() returns an Integer object.`"
    },
    {
        q: `"What is the process of converting a wrapper class object back to its corresponding primitive type called? (GATE CS 2009)`",
        options: [`"Autoboxing`", `"Casting`", `"Unboxing`", `"Parsing`"],
        ans: 2,
        explanation: `"Unboxing is the automatic conversion by the Java compiler of a wrapper class object into its corresponding primitive type.`"
    },
    {
        q: `"Are Java wrapper classes mutable or immutable? (GATE IT 2011)`",
        options: [`"Mutable`", `"Immutable`", `"Depends on the JVM`", `"Only Integer and Double are immutable`"],
        ans: 1,
        explanation: `"All standard wrapper classes in Java (Integer, Double, Boolean, etc.) are immutable. Once created, their internal primitive value cannot be changed.`"
    },
    {
        q: `"What will be the output of the following code? \n```java\nDouble d1 = 10.0;\nDouble d2 = 10.0;\nSystem.out.print(d1 == d2);\n``` (GATE CS 2013)`",
        options: [`"true`", `"false`", `"Compilation error`", `"Runtime Exception`"],
        ans: 1,
        explanation: `"Unlike Integer and Long, the Double and Float classes do not cache instances. Every autoboxing of a floating-point literal creates a new object.`"
    },
    {
        q: `"Which of the following wrapper classes does NOT cache instances within a specific range? (GATE CS 2008)`",
        options: [`"Integer`", `"Long`", `"Short`", `"Float`"],
        ans: 3,
        explanation: `"Float and Double do not cache values. Integer, Short, Byte, Long (within -128 to 127) and Character (0 to 127) cache objects.`"
    },
    {
        q: `"Can a wrapper class reference be assigned a null value? (GATE IT 2015)`",
        options: [`"No, it will cause a compilation error`", `"Yes, but it causes a compilation error when unboxed`", `"Yes, but it will throw a NullPointerException if unboxed`", `"No, wrapper classes default to 0`"],
        ans: 2,
        explanation: `"Wrapper classes are objects and can be null. However, if Java attempts to unbox a null wrapper object, it throws a NullPointerException.`"
    },
    {
        q: `"Which package contains all the Java wrapper classes? (GATE CS 2010)`",
        options: [`"java.util`", `"java.lang`", `"java.math`", `"java.io`"],
        ans: 1,
        explanation: `"All standard wrapper classes (Integer, Double, Boolean, etc.) are defined in the java.lang package, which is imported by default.`"
    },
    {
        q: `"What is the output of the following code? \n```java\nInteger a = new Integer(10);\nint b = 10;\nSystem.out.print(a == b);\n``` (GATE CS 2018)`",
        options: [`"true`", `"false`", `"Compilation error`", `"Runtime Exception`"],
        ans: 0,
        explanation: `"When comparing a wrapper object to a primitive using '==', the wrapper object is unboxed into a primitive. Thus, the comparison is 10 == 10, which is true.`"
    },
    {
        q: `"Which class is the superclass of numerical wrapper classes like Integer, Double, and Float? (GATE IT 2005)`",
        options: [`"Object`", `"Number`", `"Math`", `"Numeric`"],
        ans: 1,
        explanation: `"The java.lang.Number class is the abstract superclass for all numerical wrapper classes (Byte, Short, Integer, Long, Float, Double).`"
    },
    {
        q: `"What does the expression `Integer.valueOf(10) == Integer.valueOf(10)` evaluate to? (GATE CS 2017)`",
        options: [`"true`", `"false`", `"Compilation error`", `"NullPointerException`"],
        ans: 0,
        explanation: `"The valueOf() method returns cached objects for values between -128 and 127. Since both calls request 10, they return the same reference.`"
    },
    {
        q: `"What will happen when the following code is executed? \n```java\nInteger x = null;\nint y = x;\n``` (GATE CS 2019)`",
        options: [`"y is assigned 0`", `"y is assigned null`", `"NullPointerException is thrown at runtime`", `"Compilation error`"],
        ans: 2,
        explanation: `"Assigning an Integer object to an int primitive causes the compiler to insert unboxing code (x.intValue()). Since x is null, this throws a NullPointerException.`"
    }
];
"@
Set-Content -Path "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter17_mcq_tmp.txt" -Value $content


$file = "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter17_object_wrappers.ts"
$start = (Get-Content $file | Select-String -Pattern "export const chapter17_MCQ").LineNumber
$end = (Get-Content $file | Select-String -Pattern "export const chapter17_DEBUG").LineNumber
Write-Output "$start to $end"


$file = "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter17_object_wrappers.ts"
$content = Get-Content $file
$start = 20
$end = 53
$mcq = Get-Content "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter17_mcq_tmp.txt"
$newContent = $content[0..($start-2)] + $mcq + $content[($end-1)..($content.Length-1)]
Set-Content -Path $file -Value $newContent


Get-Content -Path "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter17_object_wrappers.ts" | Select-String -Pattern "y = x;"

$content = @'
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
        options: ["Upper bounded wildcard `(? extends T)`", "Lower bounded wildcard `(? super T)`", "Unbounded wildcard `(?)`", "Both upper and lower bounds"],
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
'@
Set-Content -Path "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter18_mcq_tmp.txt" -Value $content


$file = "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter18_generics.ts"
$start = (Get-Content $file | Select-String -Pattern "export const chapter18_MCQ").LineNumber
$end = (Get-Content $file | Select-String -Pattern "export const chapter18_DEBUG").LineNumber
Write-Output "$start to $end"


$file = "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter18_generics.ts"
$content = Get-Content $file
$start = 20
$end = 53
$mcq = Get-Content "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter18_mcq_tmp.txt"
$newContent = $content[0..($start-2)] + $mcq + $content[($end-1)..($content.Length-1)]
Set-Content -Path $file -Value $newContent


$content = @'
export const chapter19_MCQ = [
    {
        q: "If a class implements the Comparable interface, which method must it override? (GATE IT 2011)",
        options: ["compare()", "compareTo()", "equals()", "sort()"],
        ans: 1,
        explanation: "A class implementing Comparable must override the `compareTo(T o)` method to establish its natural ordering."
    },
    {
        q: "When would you prefer Comparator over Comparable? (GATE CS 2013)",
        options: ["When defining the default natural ordering for a class.", "When you want to sort objects of a class you did not write and cannot modify.", "When you want sorting to run faster in memory.", "When you are sorting an array of primitive types."],
        ans: 1,
        explanation: "Comparator is external to the class being sorted, making it ideal for sorting classes you don't control, or when you need multiple distinct sorting criteria."
    },
    {
        q: "What does the `compare(T o1, T o2)` method in Comparator return if o1 is strictly less than o2? (GATE CS 2015)",
        options: ["0", "A positive integer", "A negative integer", "A boolean false"],
        ans: 2,
        explanation: "The `compare` method returns a negative integer if the first argument is less than the second, zero if they are equal, and a positive integer if the first is greater."
    },
    {
        q: "Which interface allows for defining multiple different sorting criteria for the same class? (GATE CS 2017)",
        options: ["Comparable", "Comparator", "Cloneable", "Serializable"],
        ans: 1,
        explanation: "Since Comparator is external to the class, you can create multiple Comparator implementations (e.g., SortByName, SortByAge) for the same class."
    },
    {
        q: "In which package is the Comparable interface defined? (GATE CS 2008)",
        options: ["java.util", "java.io", "java.lang", "java.math"],
        ans: 2,
        explanation: "The Comparable interface is part of the core java.lang package and is implicitly available to all Java programs."
    },
    {
        q: "In which package is the Comparator interface defined? (GATE IT 2006)",
        options: ["java.util", "java.lang", "java.io", "java.text"],
        ans: 0,
        explanation: "The Comparator interface is part of the java.util package, alongside collections framework utilities."
    },
    {
        q: "Which utility method is commonly used to sort a List of objects that implement Comparable? (GATE CS 2010)",
        options: ["Arrays.sort(list)", "List.sort() (prior to Java 8)", "Collections.sort(list)", "TreeSet.sort()"],
        ans: 2,
        explanation: "Collections.sort(List) sorts a list according to the natural ordering of its elements (which must implement Comparable)."
    },
    {
        q: "What happens if you invoke `Collections.sort(list)` and the objects in the list do NOT implement Comparable? (GATE CS 2014)",
        options: ["The list is not sorted silently.", "A ClassCastException is thrown at runtime.", "A compilation error occurs.", "The elements are sorted by their memory addresses."],
        ans: 2,
        explanation: "The method signature of Collections.sort demands that the elements implement the Comparable interface. Failing this results in a compile-time error."
    },
    {
        q: "How can you override the default natural ordering when using `Collections.sort()`? (GATE CS 2016)",
        options: ["By throwing a NotComparableException.", "By passing a Comparator as the second argument.", "By modifying the Comparable interface dynamically.", "You cannot override natural ordering."],
        ans: 1,
        explanation: "The overloaded method `Collections.sort(List, Comparator)` allows you to provide a custom sorting rule, ignoring the natural ordering of the elements."
    },
    {
        q: "Which interface should be used to sort instances of `java.lang.String` by their length instead of alphabetically? (GATE IT 2012)",
        options: ["Comparable", "Comparator", "StringSorter", "LengthComparable"],
        ans: 1,
        explanation: "Since you cannot modify the java.lang.String class to change its Comparable implementation, you must use a custom Comparator to sort strings by length."
    },
    {
        q: "What is the return type of the `compareTo` method defined in the Comparable interface? (GATE CS 2009)",
        options: ["boolean", "String", "void", "int"],
        ans: 3,
        explanation: "The `compareTo` method returns an integer: negative if less, zero if equal, and positive if greater."
    },
    {
        q: "According to standard Java practices, if `a.compareTo(b) == 0`, what is ideally expected of `a.equals(b)`? (GATE CS 2018)",
        options: ["It should throw an exception.", "It should return false.", "It should return true.", "It is irrelevant."],
        ans: 2,
        explanation: "It is strongly recommended (though not strictly required) that natural orderings be consistent with equals. If compareTo returns 0, equals should return true."
    },
    {
        q: "Which sorting algorithm is internally used by `Collections.sort()` or `Arrays.sort(Object[])` in modern Java versions? (GATE CS 2019)",
        options: ["QuickSort", "TimSort", "BubbleSort", "HeapSort"],
        ans: 1,
        explanation: "Modern Java (since Java 7) uses TimSort, a hybrid sorting algorithm derived from merge sort and insertion sort, for sorting objects."
    },
    {
        q: "In Java 8 and later, the Comparator interface is considered a functional interface. What does this imply? (GATE CS 2020)",
        options: ["It can only be used with functions, not methods.", "It cannot be implemented by a class.", "It can be instantiated using lambda expressions.", "It has no abstract methods."],
        ans: 2,
        explanation: "Because Comparator has exactly one abstract method (compare), it is a functional interface and can be concisely implemented using lambda expressions."
    },
    {
        q: "If a class `Employee` implements `Comparable<Employee>`, what is the correct signature of the overridden method? (GATE IT 2015)",
        options: ["public int compareTo(Object obj)", "public boolean compareTo(Employee e)", "public int compareTo(Employee e)", "public void compare(Employee e1, Employee e2)"],
        ans: 2,
        explanation: "When parameterized as `Comparable<Employee>`, the generic type ensures the `compareTo` method specifically accepts an `Employee` argument, returning an int."
    }
];
'@
Set-Content -Path "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter19_mcq_tmp.txt" -Value $content


$file = "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter19_comparable_comparator.ts"
$start = (Get-Content $file | Select-String -Pattern "export const chapter19_MCQ").LineNumber
$end = (Get-Content $file | Select-String -Pattern "export const chapter19_DEBUG").LineNumber
Write-Output "$start to $end"


$file = "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter19_comparable_comparator.ts"
$content = Get-Content $file
$start = 20
$end = 53
$mcq = Get-Content "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter19_mcq_tmp.txt"
$newContent = $content[0..($start-2)] + $mcq + $content[($end-1)..($content.Length-1)]
Set-Content -Path $file -Value $newContent


$content = @'
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
'@
Set-Content -Path "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter20_mcq_tmp.txt" -Value $content


$file = "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter20_packages_enums.ts"
$start = (Get-Content $file | Select-String -Pattern "export const chapter20_MCQ").LineNumber
$end = (Get-Content $file | Select-String -Pattern "export const chapter20_DEBUG").LineNumber
Write-Output "$start to $end"


$file = "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter20_packages_enums.ts"
$content = Get-Content $file
$start = 20
$end = 53
$mcq = Get-Content "C:\Users\ADITI JAIN\OneDrive\Desktop\Emple\BK-Frontend\EmpleFrontend\src\features\user\tutorials\java\data\chapters\chapter20_mcq_tmp.txt"
$newContent = $content[0..($start-2)] + $mcq + $content[($end-1)..($content.Length-1)]
Set-Content -Path $file -Value $newContent


