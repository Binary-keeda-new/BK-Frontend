// CHAPTER4_COMPLETE.ts
export const CHAPTER4_COMPLETE = [
  {
    instructions: "Fill in the blanks to correctly read an integer from the user.",
    template: `int age;
printf("Enter your age: ");
scanf("____", ____age);`,
    blanks: ["%d", "&"],
    answer: ["%d", "&"]
  },
  {
    instructions: "Fill in the blanks to output the character 'C' using putchar.",
    template: `char letter = 'C';
____(letter);`,
    blanks: ["putchar"],
    answer: ["putchar"]
  }
];
