// ====================================================
// CHAPTER2_MCQ.ts
// Chapter 2 - Variables and Data Types
// ====================================================

export const CHAPTER2_MCQ = [
{
q: "Which storage class retains a local variable's value between function calls? **GATE 2021**",
options: ["auto","register","static","extern"],
ans: 2,
explanation: "A static local variable is initialized only once and retains its value throughout program execution."
},
{
q: "Which of the following declarations is valid in C? **GATE 2010**",
options: ["int 2num;","float value = 5.5;","char 'A';","double float x;"],
ans: 1,
explanation: "Identifiers cannot start with digits. 'float value = 5.5;' is syntactically correct."
},
{
q: "What is the value of sizeof(char) in standard C? **GATE 2014**",
options: ["0","1","2","Compiler dependent"],
ans: 1,
explanation: "The C standard guarantees sizeof(char) is always 1 byte."
},
{
q: "Which keyword is used to declare a read-only variable? **GATE 2004**",
options: ["readonly","constant","const","fixed"],
ans: 2,
explanation: "The const keyword prevents modification after initialization."
},
{
q: "What is the default storage class of a local variable? **GATE 2006**",
options: ["extern","static","auto","register"],
ans: 2,
explanation: "Local variables are auto by default."
},
{
q: "Which data type stores a single character? **GATE 2008**",
options: ["int","char","string","text"],
ans: 1,
explanation: "char stores exactly one character enclosed in single quotes."
},
{
q: "What is the value of y? int x=5; float y=x/2; **GATE 2019**",
options: ["2.0","2.5","5.0","Compilation Error"],
ans: 0,
explanation: "Integer division occurs first, producing 2, which is then converted to 2.0."
},
{
q: "Which statement performs explicit type conversion? **GATE 2005**",
options: ["float x=5;","int a=(int)3.9;","double y=10;","char c='A';"],
ans: 1,
explanation: "Casting with (int) is explicit type conversion."
},
{
q: "Which user-defined data type groups variables of different types? **GATE 2022**",
options: ["enum","typedef","struct","pointer"],
ans: 2,
explanation: "A structure groups related members of different data types."
},
{
q: "The extern keyword indicates that a variable: **GATE 2022**",
options: ["Is constant","Is stored in register","Is defined elsewhere","Is local"],
ans: 2,
explanation: "extern declares a variable that is defined in another source file or scope."
}
];
