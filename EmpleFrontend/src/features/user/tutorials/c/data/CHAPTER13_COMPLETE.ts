export const CHAPTER13_COMPLETE = [
  {
    instruction: "Fill in the blanks to open a file in write mode and close it.",
    template: `FILE *fp = ___( "test.txt", "___" );
if (fp != NULL) {
    ___(fp);
}`,
    answer: `FILE *fp = fopen( "test.txt", "w" );
if (fp != NULL) {
    fclose(fp);
}`,
    blanks: ["fopen", "w", "fclose"]
  },
  {
    instruction: "Fill in the blanks to read a single character from a file until EOF.",
    template: `int ch;
FILE *fp = fopen("file.txt", "r");
if (fp != NULL) {
    while ((ch = ___(fp)) != ___) {
        putchar(ch);
    }
    fclose(fp);
}`,
    answer: `int ch;
FILE *fp = fopen("file.txt", "r");
if (fp != NULL) {
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }
    fclose(fp);
}`,
    blanks: ["fgetc", "EOF"]
  }
];
