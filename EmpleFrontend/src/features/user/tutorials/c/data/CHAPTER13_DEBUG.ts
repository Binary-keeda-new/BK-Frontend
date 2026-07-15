export const CHAPTER13_DEBUG = [
  {
    title: "File Opening Bug",
    instruction: "Fix the bug in the following code so it safely checks for file open errors.",
    buggy: `FILE *fp = fopen("missing.txt", "r");
printf("File opened successfully.");
fclose(fp);`,
    fixed: `FILE *fp = fopen("missing.txt", "r");
if (fp != NULL) {
    printf("File opened successfully.");
    fclose(fp);
} else {
    printf("Error opening file.");
}`,
    expectedOutput: "Error opening file.",
    hints: ["Check if `fopen` returns NULL.", "Only call `fclose` if the file was successfully opened."]
  },
  {
    title: "End of File Checking",
    instruction: "Fix the loop condition so it correctly stops at EOF.",
    buggy: `FILE *fp = fopen("data.txt", "r");
char c;
if (fp != NULL) {
    while ((c = fgetc(fp)) != 0) {
        printf("%c", c);
    }
    fclose(fp);
}`,
    fixed: `FILE *fp = fopen("data.txt", "r");
int c;
if (fp != NULL) {
    while ((c = fgetc(fp)) != EOF) {
        printf("%c", c);
    }
    fclose(fp);
}`,
    expectedOutput: "Outputs the contents of data.txt",
    hints: ["fgetc returns an int to accommodate EOF.", "The end of file macro is EOF, not 0."]
  },
  {
    title: "Wrong Formatting Function",
    instruction: "Correct the function used to write text to the file.",
    buggy: `FILE *fp = fopen("out.txt", "w");
if (fp != NULL) {
    printf(fp, "Hello %s", "World");
    fclose(fp);
}`,
    fixed: `FILE *fp = fopen("out.txt", "w");
if (fp != NULL) {
    fprintf(fp, "Hello %s", "World");
    fclose(fp);
}`,
    expectedOutput: "Writes 'Hello World' to out.txt",
    hints: ["`printf` writes to stdout.", "Use `fprintf` to write formatted data to a specific file pointer."]
  }
];
