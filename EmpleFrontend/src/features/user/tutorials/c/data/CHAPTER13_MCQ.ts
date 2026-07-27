export const CHAPTER13_MCQ = [
  {
    q: "Which function is used to open a file in C? **GATE 2012**",
    options: ["open()", "fopen()", "file_open()", "file()"],
    ans: 1,
    explanation: "In C, `fopen()` is the standard library function used to open a file and return a FILE pointer."
  },
  {
    q: "What is the return type of the `fopen()` function? **GATE 2015**",
    options: ["int", "void", "FILE *", "char *"],
    ans: 2,
    explanation: "`fopen()` returns a pointer to a FILE object which is used to control the stream. It returns NULL on failure."
  },
  {
    q: "Which mode opens a file for writing, but appends data to the end if the file already exists? **GATE 2017**",
    options: ["w", "w+", "a", "a+"],
    ans: 2,
    explanation: "The 'a' (append) mode opens a file for writing at the end of the file. If the file does not exist, it is created."
  },
  {
    q: "What does the `fseek()` function do in C? **GATE 2019**",
    options: ["Finds a specific string in a file", "Sets the file position indicator", "Reads data from a file", "Closes a file"],
    ans: 1,
    explanation: "`fseek()` sets the file position indicator for the given stream to a specific offset."
  },
  {
    q: "Which function is used to read formatted data from a file? **GATE 2014**",
    options: ["printf()", "fprintf()", "scanf()", "fscanf()"],
    ans: 3,
    explanation: "`fscanf()` reads formatted input from a stream, similar to how `scanf()` reads from stdin."
  },
  {
    q: "What happens if you use `fopen()` with 'w' mode on an existing file? **GATE 2021**",
    options: ["It appends to the file", "It creates a backup", "It truncates the file to zero length", "It returns NULL"],
    ans: 2,
    explanation: "Opening an existing file in 'w' mode truncates it to zero length, effectively erasing its previous contents."
  },
  {
    q: "Which of the following functions is primarily used to read binary data from a file? **GATE 2018**",
    options: ["fscanf()", "fgets()", "fread()", "fgetc()"],
    ans: 2,
    explanation: "`fread()` is used to read blocks of binary data from a file into a buffer."
  },
  {
    q: "What is the value of EOF macro in C? **GATE 2016**",
    options: ["0", "-1", "1", "NULL"],
    ans: 1,
    explanation: "EOF (End of File) is typically defined as a negative integer, most commonly -1, used to indicate the end of a file or an error."
  },
  {
    q: "Which standard stream corresponds to normal terminal output? **GATE 2013**",
    options: ["stdin", "stdout", "stderr", "stdprn"],
    ans: 1,
    explanation: "`stdout` is the standard output stream in C, typically directed to the terminal screen."
  },
  {
    q: "What is the purpose of `fflush()` function? **GATE 2020**",
    options: ["Deletes a file", "Flushes the output buffer of a stream", "Renames a file", "Closes a stream"],
    ans: 1,
    explanation: "`fflush()` forces a write of all user-space buffered data for the given output or update stream."
  }
];
