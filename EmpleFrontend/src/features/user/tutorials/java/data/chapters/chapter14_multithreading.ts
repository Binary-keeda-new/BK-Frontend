// Chapter 14

export const chapter14_CONTENT = {
  "title": "Concurrency & Shared Data",
  "description": "Multithreading is a Java feature that allows concurrent execution of two or more parts of a program to make maximum use of the CPU.",
  "points": [
    {
      "heading": "Creating a Thread",
      "body": "Two ways: (1) Extend the `Thread` class and override `run()`, or (2) Implement the `Runnable` interface and pass it to a new Thread instance (preferred)."
    },
    {
      "heading": "Thread Lifecycle",
      "body": "Threads can be in states: `New`, `Runnable`, `Blocked`, `Waiting`, `Timed Waiting`, or `Terminated`. Use `thread.start()` to begin execution."
    },
    {
      "heading": "Concurrency & Shared Data",
      "body": "When multiple threads access shared resources, race conditions can occur. Use the `synchronized` keyword or Locks to ensure thread-safety."
    },
    {
      "heading": "Thread Methods",
      "body": "`Thread.sleep(ms)` pauses execution. `thread.join()` waits for a thread to die. `Thread.currentThread()` retrieves the active thread."
    },
    {
      "heading": "Volatile Keyword",
      "body": "Ensures changes to a variable are immediately visible to all threads, preventing local caching of shared variables using `volatile`."
    },
    {
      "heading": "Thread Pool & ExecutorService",
      "body": "Reuses threads from a pool instead of creating new ones for every task, improving performance in concurrent applications."
    }
  ],
  "code": "class MyThread extends Thread {\n    public void run() {\n        System.out.println(\"Thread running: \" + Thread.currentThread().getName());\n    }\n}\n\npublic class Concurrency {\n    public static void main(String[] args) {\n        MyThread t1 = new MyThread();\n        t1.start(); // Start thread execution\n    }\n}"
};

export const chapter14_DEBUG = {
  "instructions": "Fix the 3 multithreading and thread class launch bugs.",
  "buggy": "class MyTask implements Runnable {\n    public void execute() {\n        System.out.println(\"Running\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyTask task = new MyTask();\n        Thread t = new Thread(task);\n        t.run();\n    }\n}",
  "fixed": "class MyTask implements Runnable {\n    public void run() {\n        System.out.println(\"Running\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        MyTask task = new MyTask();\n        Thread t = new Thread(task);\n        t.start();\n    }\n}",
  "hints": [
    "Runnable interface requires overriding run(), not execute()",
    "To execute thread concurrently, call start() instead of run()",
    "Ensure thread tasks implement Runnable or extend Thread"
  ],
  "expectedOutput": "Running"
};

export const chapter14_DRAG_DROP = {
  "instructions": "Arrange these lines to create and run a thread using Runnable interface.",
  "lines": [
    {
      "id": "a",
      "text": "Runnable r = () -> {"
    },
    {
      "id": "b",
      "text": "    System.out.println(\"Run\");"
    },
    {
      "id": "c",
      "text": "};"
    },
    {
      "id": "d",
      "text": "Thread t = new Thread(r);"
    },
    {
      "id": "e",
      "text": "t.start();"
    }
  ],
  "order": [
    "a",
    "b",
    "c",
    "d",
    "e"
  ]
};

export const chapter14_MCQ = [
  {
    "q": "(GATE CS 2001) Which of the following is/are TRUE regarding threads?\\n1. Threads belonging to the same process share the same heap.\\n2. Threads belonging to the same process share the same stack.",
    "options": [
      "1 only",
      "2 only",
      "Both 1 and 2",
      "Neither 1 nor 2"
    ],
    "ans": 0,
    "explanation": "Threads belonging to the same process share the same memory space, including the heap (where objects are allocated), but each thread has its own separate call stack."
  },
  {
    "q": "(GATE CS 2013) Two threads T1 and T2 concurrently execute the instruction `x = x + 1` where `x` is a shared variable initialized to 0. What are the possible values of `x` after both threads finish?",
    "options": [
      "Only 2",
      "Only 1",
      "Either 1 or 2",
      "Always 0"
    ],
    "ans": 2,
    "explanation": "If the threads execute sequentially, the value is 2. However, due to race conditions (e.g., both read 0, both increment to 1, both write 1), the final value can be 1."
  },
  {
    "q": "(GATE IT 2008) In Java, how can we prevent multiple threads from concurrently modifying a shared data structure and causing race conditions?",
    "options": [
      "By marking the variable as `volatile",
      "By using the `synchronized` keyword or explicit Locks",
      "By calling `Thread.sleep()",
      "By increasing the thread priority"
    ],
    "ans": 1,
    "explanation": "The `synchronized` keyword (or using `java.util.concurrent.locks`) enforces mutual exclusion, ensuring that only one thread can access the critical section at a time."
  },
  {
    "q": "(GATE CS 2005) What is the primary purpose of a monitor (like Java's synchronized methods/blocks) in concurrent programming?",
    "options": [
      "To detect deadlocks at runtime",
      "To provide mutual exclusion and condition synchronization for shared resources",
      "To increase the execution speed of threads",
      "To spawn multiple processes"
    ],
    "ans": 1,
    "explanation": "Monitors encapsulate shared state and provide mutual exclusion (only one thread can execute within the monitor) as well as wait/notify mechanisms for condition synchronization."
  },
  {
    "q": "(GATE CS 2011) Which of the following conditions is NOT required for a deadlock to occur?",
    "options": [
      "Mutual Exclusion",
      "Hold and Wait",
      "Preemption",
      "Circular Wait"
    ],
    "ans": 2,
    "explanation": "The four Coffman conditions necessary for deadlock are Mutual Exclusion, Hold and Wait, NO Preemption, and Circular Wait. Thus, Preemption is NOT a condition for deadlock (in fact, it prevents it)."
  },
  {
    "q": "(GATE CS 1999) When a thread calls the `join()` method on another thread `T`, what happens to the calling thread?",
    "options": [
      "It terminates immediately",
      "It enters the blocked/waiting state until thread `T` finishes execution",
      "It interrupts thread `T",
      "It yields the CPU voluntarily but remains runnable"
    ],
    "ans": 1,
    "explanation": "Calling `T.join()` causes the current (calling) thread to pause execution and wait until thread `T` completes."
  },
  {
    "q": "(GATE CS 2004) Which method in the Java `Thread` class is used to begin the execution of a thread?",
    "options": [
      "run()",
      "execute()",
      "start()",
      "init()"
    ],
    "ans": 2,
    "explanation": "The `start()` method causes the thread to begin execution, and the JVM calls the `run()` method of the thread concurrently."
  },
  {
    "q": "(GATE CS 2006) What is the main difference between `yield()` and `sleep()` in Java?",
    "options": [
      "yield() throws InterruptedException, sleep() does not.",
      "yield() suggests the scheduler to let other threads run, sleep() forces a pause for a specified time.",
      "sleep() releases the monitor lock, yield() does not.",
      "yield() can only be called from synchronized blocks."
    ],
    "ans": 1,
    "explanation": "`yield()` is a hint to the scheduler that the current thread is willing to yield its current use of a processor. `sleep()` causes the thread to sleep for a specified duration."
  },
  {
    "q": "(GATE CS 2015) In Java, what is the primary effect of declaring a variable as `volatile`?",
    "options": [
      "It makes the variable a constant.",
      "It ensures threads always read the most recent value from main memory.",
      "It provides mutual exclusion like synchronized.",
      "It prevents the variable from being serialized."
    ],
    "ans": 1,
    "explanation": "The `volatile` modifier guarantees visibility of changes to variables across threads. It does not provide atomicity."
  },
  {
    "q": "(GATE IT 2007) Which of the following is true about the `wait()` method in Java?",
    "options": [
      "It belongs to the Thread class.",
      "It can be called from anywhere without restriction.",
      "It must be called from within a synchronized context (block or method).",
      "It causes the thread to sleep for exactly 1 second."
    ],
    "ans": 2,
    "explanation": "`wait()` is defined in the `Object` class and must be called by a thread that currently holds the object's monitor lock (inside a synchronized block/method)."
  },
  {
    "q": "(GATE CS 2002) A binary semaphore is used for synchronization. What is a binary semaphore equivalent to in Java's concurrency framework?",
    "options": [
      "A condition variable",
      "A ReentrantLock (Mutex)",
      "A ReadWriteLock",
      "A ThreadPool"
    ],
    "ans": 1,
    "explanation": "A binary semaphore (which can be 0 or 1) operates similarly to a mutual exclusion lock (mutex)."
  },
  {
    "q": "(GATE CS 2014) Which interface should a class implement so that its instances can be executed by a Thread?",
    "options": [
      "Callable",
      "Executable",
      "Runnable",
      "Threadable"
    ],
    "ans": 2,
    "explanation": "A class can implement the `Runnable` interface, which requires implementing the `run()` method, to be executed by a thread."
  },
  {
    "q": "(GATE IT 2005) What happens if a programmer calls the `run()` method directly instead of calling `start()` on a Thread object?",
    "options": [
      "A compilation error occurs.",
      "A RuntimeException is thrown.",
      "It executes the method in the current thread instead of starting a new thread.",
      "It behaves exactly like calling start()."
    ],
    "ans": 2,
    "explanation": "Calling `run()` directly is just a normal method call. No new thread is spawned, and the code executes sequentially in the calling thread."
  },
  {
    "q": "(GATE CS 2009) Thread starvation in a concurrent program occurs when:",
    "options": [
      "Two threads wait on each other forever.",
      "A thread is perpetually denied access to resources it needs to proceed.",
      "A thread finishes execution too quickly.",
      "A thread consumes too much memory."
    ],
    "ans": 1,
    "explanation": "Starvation happens when one or more threads are continually unable to access shared resources because other 'greedy' threads are monopolizing them."
  },
  {
    "q": "(GATE CS 2012) The `wait()`, `notify()`, and `notifyAll()` methods are defined in which Java class?",
    "options": [
      "java.lang.Thread",
      "java.lang.Runnable",
      "java.util.concurrent.Locks",
      "java.lang.Object"
    ],
    "ans": 3,
    "explanation": "These methods are part of the monitor concept in Java and are defined in the root `Object` class, so that every Java object can act as a monitor."
  }
];

export const chapter14_COMPLETE_EXERCISES = [];
