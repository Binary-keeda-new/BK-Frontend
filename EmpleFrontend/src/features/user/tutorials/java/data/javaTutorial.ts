import { chapter01_CONTENT, chapter01_MCQ, chapter01_DEBUG, chapter01_DRAG_DROP, chapter01_COMPLETE_EXERCISES } from './chapters/chapter01_basics';
import { chapter02_CONTENT, chapter02_MCQ, chapter02_DEBUG, chapter02_DRAG_DROP, chapter02_COMPLETE_EXERCISES } from './chapters/chapter02_variables';
import { chapter03_CONTENT, chapter03_MCQ, chapter03_DEBUG, chapter03_DRAG_DROP, chapter03_COMPLETE_EXERCISES } from './chapters/chapter03_io';
import { chapter04_CONTENT, chapter04_MCQ, chapter04_DEBUG, chapter04_DRAG_DROP, chapter04_COMPLETE_EXERCISES } from './chapters/chapter04_operators';
import { chapter05_CONTENT, chapter05_MCQ, chapter05_DEBUG, chapter05_DRAG_DROP, chapter05_COMPLETE_EXERCISES } from './chapters/chapter05_control_flow';
import { chapter06_CONTENT, chapter06_MCQ, chapter06_DEBUG, chapter06_DRAG_DROP, chapter06_COMPLETE_EXERCISES } from './chapters/chapter06_loops';
import { chapter07_CONTENT, chapter07_MCQ, chapter07_DEBUG, chapter07_DRAG_DROP, chapter07_COMPLETE_EXERCISES } from './chapters/chapter07_methods';
import { chapter08_CONTENT, chapter08_MCQ, chapter08_DEBUG, chapter08_DRAG_DROP, chapter08_COMPLETE_EXERCISES } from './chapters/chapter08_arrays';
import { chapter09_CONTENT, chapter09_MCQ, chapter09_DEBUG, chapter09_DRAG_DROP, chapter09_COMPLETE_EXERCISES } from './chapters/chapter09_strings';
import { chapter10_CONTENT, chapter10_MCQ, chapter10_DEBUG, chapter10_DRAG_DROP, chapter10_COMPLETE_EXERCISES } from './chapters/chapter10_classes_objects';
import { chapter11_CONTENT, chapter11_MCQ, chapter11_DEBUG, chapter11_DRAG_DROP, chapter11_COMPLETE_EXERCISES } from './chapters/chapter11_oop_principles';
import { chapter12_CONTENT, chapter12_MCQ, chapter12_DEBUG, chapter12_DRAG_DROP, chapter12_COMPLETE_EXERCISES } from './chapters/chapter12_exception_handling';
import { chapter13_CONTENT, chapter13_MCQ, chapter13_DEBUG, chapter13_DRAG_DROP, chapter13_COMPLETE_EXERCISES } from './chapters/chapter13_collections';
import { chapter14_CONTENT, chapter14_MCQ, chapter14_DEBUG, chapter14_DRAG_DROP, chapter14_COMPLETE_EXERCISES } from './chapters/chapter14_multithreading';
import { chapter15_CONTENT, chapter15_MCQ, chapter15_DEBUG, chapter15_DRAG_DROP, chapter15_COMPLETE_EXERCISES } from './chapters/chapter15_streams_lambdas';
import { chapter16_CONTENT, chapter16_MCQ, chapter16_DEBUG, chapter16_DRAG_DROP, chapter16_COMPLETE_EXERCISES } from './chapters/chapter16_jvm_memory';
import { chapter17_CONTENT, chapter17_MCQ, chapter17_DEBUG, chapter17_DRAG_DROP, chapter17_COMPLETE_EXERCISES } from './chapters/chapter17_object_wrappers';
import { chapter18_CONTENT, chapter18_MCQ, chapter18_DEBUG, chapter18_DRAG_DROP, chapter18_COMPLETE_EXERCISES } from './chapters/chapter18_generics';
import { chapter19_CONTENT, chapter19_MCQ, chapter19_DEBUG, chapter19_DRAG_DROP, chapter19_COMPLETE_EXERCISES } from './chapters/chapter19_comparable_comparator';
import { chapter20_CONTENT, chapter20_MCQ, chapter20_DEBUG, chapter20_DRAG_DROP, chapter20_COMPLETE_EXERCISES } from './chapters/chapter20_packages_enums';
import { chapter21_CONTENT, chapter21_MCQ, chapter21_DEBUG, chapter21_DRAG_DROP, chapter21_COMPLETE_EXERCISES } from './chapters/chapter21_nested_classes';
import { chapter22_CONTENT, chapter22_MCQ, chapter22_DEBUG, chapter22_DRAG_DROP, chapter22_COMPLETE_EXERCISES } from './chapters/chapter22_serialization_reflection';
import { chapter23_CONTENT, chapter23_MCQ, chapter23_DEBUG, chapter23_DRAG_DROP, chapter23_COMPLETE_EXERCISES } from './chapters/chapter23_java_keywords';
import { chapter24_CONTENT, chapter24_MCQ, chapter24_DEBUG, chapter24_DRAG_DROP, chapter24_COMPLETE_EXERCISES } from './chapters/chapter24_executor_framework';
import { chapter25_CONTENT, chapter25_MCQ, chapter25_DEBUG, chapter25_DRAG_DROP, chapter25_COMPLETE_EXERCISES } from './chapters/chapter25_modern_java';

export const CHAPTERS = [
  {
    id: "01",
    title: "01 · Java Basics",
    slug: "java-basics",
    content: chapter01_CONTENT,
    mcq: chapter01_MCQ,
    debug: chapter01_DEBUG,
    dragDrop: chapter01_DRAG_DROP,
    complete: chapter01_COMPLETE_EXERCISES
  },
  {
    id: "02",
    title: "02 · Variables",
    slug: "variables",
    content: chapter02_CONTENT,
    mcq: chapter02_MCQ,
    debug: chapter02_DEBUG,
    dragDrop: chapter02_DRAG_DROP,
    complete: chapter02_COMPLETE_EXERCISES
  },
  {
    id: "03",
    title: "03 · Input / Output",
    slug: "input-output",
    content: chapter03_CONTENT,
    mcq: chapter03_MCQ,
    debug: chapter03_DEBUG,
    dragDrop: chapter03_DRAG_DROP,
    complete: chapter03_COMPLETE_EXERCISES
  },
  {
    id: "04",
    title: "04 · Operators",
    slug: "operators",
    content: chapter04_CONTENT,
    mcq: chapter04_MCQ,
    debug: chapter04_DEBUG,
    dragDrop: chapter04_DRAG_DROP,
    complete: chapter04_COMPLETE_EXERCISES
  },
  {
    id: "05",
    title: "05 · Control Flow",
    slug: "control-flow",
    content: chapter05_CONTENT,
    mcq: chapter05_MCQ,
    debug: chapter05_DEBUG,
    dragDrop: chapter05_DRAG_DROP,
    complete: chapter05_COMPLETE_EXERCISES
  },
  {
    id: "06",
    title: "06 · Loops",
    slug: "loops",
    content: chapter06_CONTENT,
    mcq: chapter06_MCQ,
    debug: chapter06_DEBUG,
    dragDrop: chapter06_DRAG_DROP,
    complete: chapter06_COMPLETE_EXERCISES
  },
  {
    id: "07",
    title: "07 · Methods",
    slug: "methods",
    content: chapter07_CONTENT,
    mcq: chapter07_MCQ,
    debug: chapter07_DEBUG,
    dragDrop: chapter07_DRAG_DROP,
    complete: chapter07_COMPLETE_EXERCISES
  },
  {
    id: "08",
    title: "08 · Arrays",
    slug: "arrays",
    content: chapter08_CONTENT,
    mcq: chapter08_MCQ,
    debug: chapter08_DEBUG,
    dragDrop: chapter08_DRAG_DROP,
    complete: chapter08_COMPLETE_EXERCISES
  },
  {
    id: "09",
    title: "09 · Strings",
    slug: "strings",
    content: chapter09_CONTENT,
    mcq: chapter09_MCQ,
    debug: chapter09_DEBUG,
    dragDrop: chapter09_DRAG_DROP,
    complete: chapter09_COMPLETE_EXERCISES
  },
  {
    id: "10",
    title: "10 · Classes & Objects",
    slug: "classes-objects",
    content: chapter10_CONTENT,
    mcq: chapter10_MCQ,
    debug: chapter10_DEBUG,
    dragDrop: chapter10_DRAG_DROP,
    complete: chapter10_COMPLETE_EXERCISES
  },
  {
    id: "11",
    title: "11 · OOP Principles",
    slug: "oop-principles",
    content: chapter11_CONTENT,
    mcq: chapter11_MCQ,
    debug: chapter11_DEBUG,
    dragDrop: chapter11_DRAG_DROP,
    complete: chapter11_COMPLETE_EXERCISES
  },
  {
    id: "12",
    title: "12 · Exception Handling",
    slug: "exception-handling",
    content: chapter12_CONTENT,
    mcq: chapter12_MCQ,
    debug: chapter12_DEBUG,
    dragDrop: chapter12_DRAG_DROP,
    complete: chapter12_COMPLETE_EXERCISES
  },
  {
    id: "13",
    title: "13 · Collections",
    slug: "collections",
    content: chapter13_CONTENT,
    mcq: chapter13_MCQ,
    debug: chapter13_DEBUG,
    dragDrop: chapter13_DRAG_DROP,
    complete: chapter13_COMPLETE_EXERCISES
  },
  {
    id: "14",
    title: "14 · Multithreading",
    slug: "multithreading",
    content: chapter14_CONTENT,
    mcq: chapter14_MCQ,
    debug: chapter14_DEBUG,
    dragDrop: chapter14_DRAG_DROP,
    complete: chapter14_COMPLETE_EXERCISES
  },
  {
    id: "15",
    title: "15 · Streams & Lambdas",
    slug: "streams-lambdas",
    content: chapter15_CONTENT,
    mcq: chapter15_MCQ,
    debug: chapter15_DEBUG,
    dragDrop: chapter15_DRAG_DROP,
    complete: chapter15_COMPLETE_EXERCISES
  },
  {
    id: "16",
    title: "16 · JVM & Memory Management",
    slug: "jvm-memory-management",
    content: chapter16_CONTENT,
    mcq: chapter16_MCQ,
    debug: chapter16_DEBUG,
    dragDrop: chapter16_DRAG_DROP,
    complete: chapter16_COMPLETE_EXERCISES
  },
  {
    id: "17",
    title: "17 · Object Class & Wrapper Classes",
    slug: "object-class-wrapper-classes",
    content: chapter17_CONTENT,
    mcq: chapter17_MCQ,
    debug: chapter17_DEBUG,
    dragDrop: chapter17_DRAG_DROP,
    complete: chapter17_COMPLETE_EXERCISES
  },
  {
    id: "18",
    title: "18 · Generics",
    slug: "generics",
    content: chapter18_CONTENT,
    mcq: chapter18_MCQ,
    debug: chapter18_DEBUG,
    dragDrop: chapter18_DRAG_DROP,
    complete: chapter18_COMPLETE_EXERCISES
  },
  {
    id: "19",
    title: "19 · Comparable & Comparator",
    slug: "comparable-comparator",
    content: chapter19_CONTENT,
    mcq: chapter19_MCQ,
    debug: chapter19_DEBUG,
    dragDrop: chapter19_DRAG_DROP,
    complete: chapter19_COMPLETE_EXERCISES
  },
  {
    id: "20",
    title: "20 · Packages, Enums & Annotations",
    slug: "packages-enums-annotations",
    content: chapter20_CONTENT,
    mcq: chapter20_MCQ,
    debug: chapter20_DEBUG,
    dragDrop: chapter20_DRAG_DROP,
    complete: chapter20_COMPLETE_EXERCISES
  },
  {
    id: "21",
    title: "21 · Nested Classes & Advanced Interfaces",
    slug: "nested-classes-advanced-interfaces",
    content: chapter21_CONTENT,
    mcq: chapter21_MCQ,
    debug: chapter21_DEBUG,
    dragDrop: chapter21_DRAG_DROP,
    complete: chapter21_COMPLETE_EXERCISES
  },
  {
    id: "22",
    title: "22 · Serialization & Reflection",
    slug: "serialization-reflection",
    content: chapter22_CONTENT,
    mcq: chapter22_MCQ,
    debug: chapter22_DEBUG,
    dragDrop: chapter22_DRAG_DROP,
    complete: chapter22_COMPLETE_EXERCISES
  },
  {
    id: "23",
    title: "23 · Java Keywords Deep Dive",
    slug: "java-keywords-deep-dive",
    content: chapter23_CONTENT,
    mcq: chapter23_MCQ,
    debug: chapter23_DEBUG,
    dragDrop: chapter23_DRAG_DROP,
    complete: chapter23_COMPLETE_EXERCISES
  },
  {
    id: "24",
    title: "24 · Executor Framework & Concurrency Utilities",
    slug: "executor-framework-concurrency-utilities",
    content: chapter24_CONTENT,
    mcq: chapter24_MCQ,
    debug: chapter24_DEBUG,
    dragDrop: chapter24_DRAG_DROP,
    complete: chapter24_COMPLETE_EXERCISES
  },
  {
    id: "25",
    title: "25 · Modern Java Features",
    slug: "modern-java-features",
    content: chapter25_CONTENT,
    mcq: chapter25_MCQ,
    debug: chapter25_DEBUG,
    dragDrop: chapter25_DRAG_DROP,
    complete: chapter25_COMPLETE_EXERCISES
  }
];


export const CONTENT: Record<string, any> = {
  "01": chapter01_CONTENT,
  "02": chapter02_CONTENT,
  "03": chapter03_CONTENT,
  "04": chapter04_CONTENT,
  "05": chapter05_CONTENT,
  "06": chapter06_CONTENT,
  "07": chapter07_CONTENT,
  "08": chapter08_CONTENT,
  "09": chapter09_CONTENT,
  "10": chapter10_CONTENT,
  "11": chapter11_CONTENT,
  "12": chapter12_CONTENT,
  "13": chapter13_CONTENT,
  "14": chapter14_CONTENT,
  "15": chapter15_CONTENT,
  "16": chapter16_CONTENT,
  "17": chapter17_CONTENT,
  "18": chapter18_CONTENT,
  "19": chapter19_CONTENT,
  "20": chapter20_CONTENT,
  "21": chapter21_CONTENT,
  "22": chapter22_CONTENT,
  "23": chapter23_CONTENT,
  "24": chapter24_CONTENT,
  "25": chapter25_CONTENT,
};

export const MCQ: Record<string, any> = {
  "01": chapter01_MCQ,
  "02": chapter02_MCQ,
  "03": chapter03_MCQ,
  "04": chapter04_MCQ,
  "05": chapter05_MCQ,
  "06": chapter06_MCQ,
  "07": chapter07_MCQ,
  "08": chapter08_MCQ,
  "09": chapter09_MCQ,
  "10": chapter10_MCQ,
  "11": chapter11_MCQ,
  "12": chapter12_MCQ,
  "13": chapter13_MCQ,
  "14": chapter14_MCQ,
  "15": chapter15_MCQ,
  "16": chapter16_MCQ,
  "17": chapter17_MCQ,
  "18": chapter18_MCQ,
  "19": chapter19_MCQ,
  "20": chapter20_MCQ,
  "21": chapter21_MCQ,
  "22": chapter22_MCQ,
  "23": chapter23_MCQ,
  "24": chapter24_MCQ,
  "25": chapter25_MCQ,
};

export const DEBUG: Record<string, any> = {
  "01": chapter01_DEBUG,
  "02": chapter02_DEBUG,
  "03": chapter03_DEBUG,
  "04": chapter04_DEBUG,
  "05": chapter05_DEBUG,
  "06": chapter06_DEBUG,
  "07": chapter07_DEBUG,
  "08": chapter08_DEBUG,
  "09": chapter09_DEBUG,
  "10": chapter10_DEBUG,
  "11": chapter11_DEBUG,
  "12": chapter12_DEBUG,
  "13": chapter13_DEBUG,
  "14": chapter14_DEBUG,
  "15": chapter15_DEBUG,
  "16": chapter16_DEBUG,
  "17": chapter17_DEBUG,
  "18": chapter18_DEBUG,
  "19": chapter19_DEBUG,
  "20": chapter20_DEBUG,
  "21": chapter21_DEBUG,
  "22": chapter22_DEBUG,
  "23": chapter23_DEBUG,
  "24": chapter24_DEBUG,
  "25": chapter25_DEBUG,
};

export const DRAG_DROP: Record<string, any> = {
  "01": chapter01_DRAG_DROP,
  "02": chapter02_DRAG_DROP,
  "03": chapter03_DRAG_DROP,
  "04": chapter04_DRAG_DROP,
  "05": chapter05_DRAG_DROP,
  "06": chapter06_DRAG_DROP,
  "07": chapter07_DRAG_DROP,
  "08": chapter08_DRAG_DROP,
  "09": chapter09_DRAG_DROP,
  "10": chapter10_DRAG_DROP,
  "11": chapter11_DRAG_DROP,
  "12": chapter12_DRAG_DROP,
  "13": chapter13_DRAG_DROP,
  "14": chapter14_DRAG_DROP,
  "15": chapter15_DRAG_DROP,
  "16": chapter16_DRAG_DROP,
  "17": chapter17_DRAG_DROP,
  "18": chapter18_DRAG_DROP,
  "19": chapter19_DRAG_DROP,
  "20": chapter20_DRAG_DROP,
  "21": chapter21_DRAG_DROP,
  "22": chapter22_DRAG_DROP,
  "23": chapter23_DRAG_DROP,
  "24": chapter24_DRAG_DROP,
  "25": chapter25_DRAG_DROP,
};

export const COMPLETE_EXERCISES: Record<string, any> = {
  "01": chapter01_COMPLETE_EXERCISES,
  "02": chapter02_COMPLETE_EXERCISES,
  "03": chapter03_COMPLETE_EXERCISES,
  "04": chapter04_COMPLETE_EXERCISES,
  "05": chapter05_COMPLETE_EXERCISES,
  "06": chapter06_COMPLETE_EXERCISES,
  "07": chapter07_COMPLETE_EXERCISES,
  "08": chapter08_COMPLETE_EXERCISES,
  "09": chapter09_COMPLETE_EXERCISES,
  "10": chapter10_COMPLETE_EXERCISES,
  "11": chapter11_COMPLETE_EXERCISES,
  "12": chapter12_COMPLETE_EXERCISES,
  "13": chapter13_COMPLETE_EXERCISES,
  "14": chapter14_COMPLETE_EXERCISES,
  "15": chapter15_COMPLETE_EXERCISES,
  "16": chapter16_COMPLETE_EXERCISES,
  "17": chapter17_COMPLETE_EXERCISES,
  "18": chapter18_COMPLETE_EXERCISES,
  "19": chapter19_COMPLETE_EXERCISES,
  "20": chapter20_COMPLETE_EXERCISES,
  "21": chapter21_COMPLETE_EXERCISES,
  "22": chapter22_COMPLETE_EXERCISES,
  "23": chapter23_COMPLETE_EXERCISES,
  "24": chapter24_COMPLETE_EXERCISES,
  "25": chapter25_COMPLETE_EXERCISES,
};


export function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
