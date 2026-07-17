export const CHAPTER13_DRAG = [
  {
    instructions: "Arrange the lines to safely write 'Data' to a file.",
    lines: [
      { id: "a", text: 'FILE *fp = fopen("log.txt", "w");' },
      { id: "b", text: 'if (fp != NULL) {' },
      { id: "c", text: '    fprintf(fp, "Data\\n");' },
      { id: "d", text: '    fclose(fp);' },
      { id: "e", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e"]
  },
  {
    instructions: "Arrange the lines to read a string from a file using fgets.",
    lines: [
      { id: "a", text: 'char buf[50];' },
      { id: "b", text: 'FILE *fp = fopen("in.txt", "r");' },
      { id: "c", text: 'if (fp != NULL) {' },
      { id: "d", text: '    fgets(buf, 50, fp);' },
      { id: "e", text: '    fclose(fp);' },
      { id: "f", text: '}' }
    ],
    order: ["a", "b", "c", "d", "e", "f"]
  }
];
