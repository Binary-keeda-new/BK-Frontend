// CHAPTER2_CONTENT_PREMIUM.ts
export const CHAPTER2_CONTENT = {
title:"Variables and Data Types",
description: `At the heart of every program is data, and variables are the containers we use to store that data in memory. In C, memory management is strict, which means every variable must have a specific Data Type that defines exactly what kind of data it holds, how much memory it consumes, and what operations are valid. In this chapter, you will learn how to declare and initialize variables, understand the nuances of primitive data types (like int, float, and char), and explore how C represents these values under the hood.`,
points:[
{heading:"Why Variables are Needed",body:`Variables are the foundation of every C program. Whenever a program accepts input, performs calculations or displays results, it relies on variables to temporarily store information in memory. Think of a variable as a labelled storage box. Instead of remembering a memory address, programmers use meaningful names like age, salary or marks. The compiler internally maps these names to actual memory locations.

Memory Example:
Address 1000 -> age = 21
Address 1004 -> marks = 95
Address 1008 -> grade = 'A'

Variables make programs dynamic because their values can change during execution. Without variables, programs could only work with fixed values.`},
{heading:"Variable Declaration",body:`A declaration tells the compiler what type of data a variable will store. Syntax: dataType variableName; Examples: int age; float salary; char grade; Choosing descriptive names improves readability and maintenance.`},
{heading:"Variable Initialization",body:`Initialization assigns the first value when a variable is created. Example: int age = 20; float pi = 3.14f; Always initialize variables because reading an uninitialized local variable results in undefined behaviour.`},
{heading:"Scope and Lifetime",body:`Scope defines where a variable is accessible. Lifetime defines how long it exists in memory. Local variables exist only inside a function. Global variables exist until the program terminates. Static variables preserve their values between function calls.`},
{heading:"Constants",body:`Constants never change during execution. Use const to create read-only variables. Example: const float PI = 3.14159f; This prevents accidental modification and improves program safety.`},
{heading:"Primitive Data Types",body:`The primitive data types are int, char, float, double and void. Each data type has a different purpose, size and range. Selecting the appropriate data type improves memory usage and performance.`},
{heading:"Type Modifiers",body:`short, long, signed and unsigned modify integer types to increase range or optimize storage.`},
{heading:"ASCII Values Under the Hood (Advanced)",body:`In C, characters (\`char\`) are actually stored as integers under the hood using the ASCII table. For example, the character \`'A'\` is stored in memory as the number \`65\`, and \`'a'\` is \`97\`.\n\nThis means you can do math on characters! \`'A' + 1\` actually results in \`'B'\` (65 + 1 = 66). This is a crucial concept for string manipulation and cryptography in C.`},
{heading:"Integer Overflow & Underflow (Advanced)",body:`Data types have strict maximum and minimum limits. If an \`unsigned int\` can hold a maximum of 4,294,967,295, and you add 1 to it, it doesn't crash?"it **overflows** and wraps back around to \`0\` (like a car odometer rolling over).\n\nSimilarly, subtracting 1 from a \`0\` unsigned integer **underflows** and wraps around to the absolute maximum value. Always ensure your chosen data type is large enough for your calculations!`},
{heading:"Format Specifiers Cheat Sheet",body:`To print or read these data types using \`printf\` or \`scanf\`, you must use the correct format specifier:\n\n• \`%d\` or \`%i\` - Signed Integer (\`int\`)\n• \`%f\` - Floating-point (\`float\`)\n• \`%lf\` - Double-precision (\`double\`)\n• \`%c\` - Character (\`char\`)\n• \`%s\` - String (Array of characters)\n• \`%zu\` - Size format (returned by \`sizeof\`)\n\nUsing the wrong specifier (like printing a float with \`%d\`) will result in garbage output!`},
{heading:"Derived and User-defined Data Types",body:`Arrays, pointers and functions are derived data types. Structures, unions, enums and typedef allow programmers to build custom data types that improve code organization.`},
{heading:"Storage Classes",body:`auto, register, static and extern determine a variable's scope, lifetime and storage location. Interview questions frequently compare static and auto variables.`},
{heading:"Type Conversion and sizeof",body:`Implicit conversion is automatic. Explicit conversion uses casting such as (float)a/b. The sizeof operator returns the memory occupied by a data type or variable and is widely used in system programming.`},
{heading:"Best Practices",body:`Initialize variables, use meaningful names, minimize global variables, prefer const where possible and choose the smallest suitable data type. These habits make programs safer and easier to maintain.`}
],
code:`#include <stdio.h>

int main() {
    int age = 21;
    float salary = 55000.75f;
    char grade = 'A';
    const float PI = 3.14159f;

    printf("Age: %d\\n", age);
    printf("Salary: %.2f\\n", salary);
    printf("Grade: %c\\n", grade);
    printf("PI: %.5f\\n", PI);
    
    // ASCII Demonstration
    printf("The ASCII value of '%c' is %d\\n", grade, grade);

    printf("sizeof(int) = %zu\\n", sizeof(int));
    printf("sizeof(float) = %zu\\n", sizeof(float));
    printf("sizeof(char) = %zu\\n", sizeof(char));

    return 0;
}`
};
export default CHAPTER2_CONTENT;