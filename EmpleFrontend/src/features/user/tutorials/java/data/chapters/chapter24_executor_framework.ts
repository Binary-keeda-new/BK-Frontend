// Chapter 24 - executor_framework

export const chapter24_CONTENT = {
    title: "EXECUTOR FRAMEWORK",
    description: "Learn about executor framework",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};


export const chapter24_MCQ = [
    {
        "q": "Which interface represents a task that returns a result and may throw an exception? (GATE CS 2018)",
        "options": ["Runnable", "Callable", "Future", "Executor"],
        "ans": 1,
        "explanation": "The Callable interface has a call() method that can return a value and throw a checked exception, unlike Runnable."
    },
    {
        "q": "What does a Future object represent in Java's concurrency utilities? (GATE IT 2016)",
        "options": ["A thread that will run in the future.", "The result of an asynchronous computation.", "A callback method.", "A lock on a synchronized block."],
        "ans": 1,
        "explanation": "A Future represents the result of an asynchronous computation. It provides methods to check if the computation is complete, wait for completion, and retrieve the result."
    },
    {
        "q": "Which factory class provides methods to create thread pools like newFixedThreadPool and newCachedThreadPool? (GATE CS 2014)",
        "options": ["ThreadPools", "Executors", "ExecutorService", "ThreadFactory"],
        "ans": 1,
        "explanation": "The Executors class provides factory and utility methods for Executor, ExecutorService, and ThreadFactory."
    },
    {
        "q": "What is the difference between execute() and submit() methods in ExecutorService? (GATE CS 2017)",
        "options": ["execute() can return a Future, submit() cannot.", "submit() can take a Callable and return a Future, execute() only takes a Runnable and returns void.", "execute() is synchronized, submit() is not.", "There is no difference."],
        "ans": 1,
        "explanation": "submit() can accept both Runnable and Callable and returns a Future. execute() only accepts Runnable and returns void."
    },
    {
        "q": "What happens if a task submitted to a newFixedThreadPool throws an unhandled RuntimeException? (GATE IT 2013)",
        "options": ["The thread pool shuts down.", "The thread executing the task dies, and a new thread is created to replace it.", "The exception is ignored completely.", "All other tasks in the queue are cancelled."],
        "ans": 1,
        "explanation": "If a thread terminates due to an exception during execution, a new thread will be created to replace it in the pool for subsequent tasks."
    },
    {
        "q": "Which ExecutorService method initiates an orderly shutdown where previously submitted tasks are executed, but no new tasks are accepted? (GATE CS 2019)",
        "options": ["shutdown()", "shutdownNow()", "stop()", "halt()"],
        "ans": 0,
        "explanation": "shutdown() initiates an orderly shutdown. shutdownNow() attempts to stop all actively executing tasks and halts the processing of waiting tasks."
    },
    {
        "q": "What is a ScheduledExecutorService used for? (GATE CS 2012)",
        "options": ["To prioritize threads based on ID.", "To schedule tasks to run after a given delay or periodically.", "To enforce strict order of execution among submitted tasks.", "To execute tasks only on weekends."],
        "ans": 1,
        "explanation": "ScheduledExecutorService can schedule commands to run after a given delay, or to execute periodically."
    },
    {
        "q": "Which component manages a pool of worker threads and a task queue? (GATE CS 2015)",
        "options": ["ThreadManager", "ExecutorService", "RunnableQueue", "FutureTask"],
        "ans": 1,
        "explanation": "ExecutorService manages thread pools and execution queues for asynchronous task execution."
    },
    {
        "q": "If Future.get() is called before the task is complete, what happens? (GATE IT 2011)",
        "options": ["It returns null immediately.", "It throws an IllegalStateException.", "It blocks the current thread until the task completes.", "It cancels the task."],
        "ans": 2,
        "explanation": "The get() method of a Future object blocks if the computation has not yet completed."
    },
    {
        "q": "How does newCachedThreadPool manage threads? (GATE CS 2020)",
        "options": ["It creates a pool with a fixed number of threads.", "It creates new threads as needed, but reuses previously constructed threads when they are available.", "It only creates one single background thread.", "It creates a pool that schedules tasks to run periodically."],
        "ans": 1,
        "explanation": "newCachedThreadPool creates an unbounded thread pool that reuses idle threads and creates new ones as needed, terminating threads that are idle for 60 seconds."
    },
    {
        "q": "What exception is thrown by Future.get() if the underlying task throws an exception? (GATE CS 2010)",
        "options": ["ExecutionException", "InterruptedException", "RuntimeException", "CancellationException"],
        "ans": 0,
        "explanation": "If the computation threw an exception, Future.get() wraps it in an ExecutionException and throws it."
    },
    {
        "q": "Can a Callable task be submitted to a standard Executor? (GATE IT 2009)",
        "options": ["Yes, Executor has a submit() method.", "No, Executor only has an execute(Runnable) method. Callable requires ExecutorService.", "Yes, but it won't return a value.", "No, Callable is strictly for parallel streams."],
        "ans": 1,
        "explanation": "The basic Executor interface only defines execute(Runnable). To submit a Callable, you need an ExecutorService."
    },
    {
        "q": "Which thread pool is optimal for executing many short-lived asynchronous tasks? (GATE CS 2021)",
        "options": ["newSingleThreadExecutor", "newFixedThreadPool(10)", "newCachedThreadPool", "newScheduledThreadPool"],
        "ans": 2,
        "explanation": "newCachedThreadPool is ideal for many short-lived tasks because it aggressively creates and reuses threads."
    },
    {
        "q": "Which mechanism can be used to wait for multiple Future tasks to complete? (GATE CS 2016)",
        "options": ["ExecutorService.awaitTermination()", "ExecutorService.invokeAll()", "Thread.join()", "CompletableFuture.wait()"],
        "ans": 1,
        "explanation": "invokeAll() takes a collection of Callable tasks and returns a list of Futures, blocking until all of them are complete."
    },
    {
        "q": "What is the primary interface from which all executor frameworks inherit? (GATE IT 2014)",
        "options": ["java.util.concurrent.Executor", "java.util.concurrent.Executors", "java.lang.Runnable", "java.lang.Thread"],
        "ans": 0,
        "explanation": "Executor is the root interface of the framework, which decouples task submission from the mechanics of how each task will be run."
    }
];

export const chapter24_DEBUG = undefined;
export const chapter24_DRAG_DROP = undefined;
export const chapter24_COMPLETE_EXERCISES = [
  {
    template: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.___(5);
    }
}`,
    blanks: [
      "newFixedThreadPool"
    ]
  }
];
