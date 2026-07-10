"use client";

import { useState } from "react";

import Cards from "../components/Cards";
import TodoList from "../components/TodoList";
import PerformanceGrid from "../components/PerformanceGrid";
import ProductivityTrend from "../components/ProductivityTrend";
import CategorySplit from "../components/CategorySplit";
import SmartInsights from "../components/SmartInsights";

type Task = {
  id: number;
  text: string;
  done: boolean;
  category:
    | "Study"
    | "Work"
    | "Health"
    | "Finance"
    | "Personal";
  frequency: "One Time" | "Daily";  
  createdAt: string;
  history: {
  [date: string]: boolean;
  };
};

export default function ProductivityPage() {
 const [tasks, setTasks] = useState<Task[]>([]);

const isTaskApplicable = (
  task: Task,
  dateKey: string
) => {
  if (task.frequency === "One Time") {
    return dateKey === task.createdAt;
  }

  if (task.frequency === "Daily") {
    return dateKey >= task.createdAt;
  }

  return false;
};

const calculateStreak = () => {
  let streak = 0;

  // Aaj se backwards check karenge
  const current = new Date();

  // Safety limit: max 365 days backwards
  for (let i = 0; i < 365; i++) {
    const dateKey =
      current.toLocaleDateString("en-CA");

    const applicableTasks = tasks.filter(
      (task) =>
        task.text.trim() !== "" &&
        isTaskApplicable(task, dateKey)
    );

    // Is din koi applicable task nahi tha:
    // streak na increase hogi, na break hogi
    if (applicableTasks.length === 0) {
      current.setDate(current.getDate() - 1);
      continue;
    }

    const allCompleted =
      applicableTasks.every(
        (task) => task.history[dateKey]
      );

    // Saare applicable tasks complete hue
    if (allCompleted) {
      streak++;
      current.setDate(current.getDate() - 1);
      continue;
    }

    // Aaj ke tasks abhi incomplete ho sakte hain,
    // isliye current day streak ko immediately break nahi karega
    const todayKey =
      new Date().toLocaleDateString("en-CA");

    if (dateKey === todayKey) {
      current.setDate(current.getDate() - 1);
      continue;
    }

    // Past applicable day par task miss hua => streak break
    break;
  }

  return streak;
};

const todayKey = new Date().toLocaleDateString("en-CA");

const streak = calculateStreak();

const todayApplicableTasks = tasks.filter(
  (task) =>
    task.text.trim() !== "" &&
    isTaskApplicable(task, todayKey)
);

const todayCompletedTasks = todayApplicableTasks.filter(
  (task) => task.history[todayKey]
).length;

const progress =
  todayApplicableTasks.length === 0
    ? 0
    : Math.round(
        (todayCompletedTasks /
          todayApplicableTasks.length) *
          100
      );

    const today = new Date();

const weekStart = new Date(today);
weekStart.setDate(today.getDate() - 6);

let weeklyCompleted = 0;
let weeklyTotal = 0;

tasks.forEach((task) => {
  if (task.text.trim() === "") return;

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);

    const dateKey = date.toLocaleDateString("en-CA");

    if (isTaskApplicable(task, dateKey)) {
      weeklyTotal++;

      if (task.history[dateKey]) {
        weeklyCompleted++;
      }
    }
  }
});

const weeklyProgress =
  weeklyTotal === 0
    ? 0
    : Math.round(
        (weeklyCompleted / weeklyTotal) * 100
      );
    

const monthStart = new Date(today);
monthStart.setDate(today.getDate() - 29);

let monthlyCompleted = 0;
let monthlyTotal = 0;

tasks.forEach((task) => {
  if (task.text.trim() === "") return;

  for (let i = 0; i < 30; i++) {
    const date = new Date(monthStart);
    date.setDate(monthStart.getDate() + i);

    const dateKey = date.toLocaleDateString("en-CA");

    if (isTaskApplicable(task, dateKey)) {
      monthlyTotal++;

      if (task.history[dateKey]) {
        monthlyCompleted++;
      }
    }
  }
});

const monthlyProgress =
  monthlyTotal === 0
    ? 0
    : Math.round(
        (monthlyCompleted / monthlyTotal) * 100
      );


const yearStart = new Date(today);
yearStart.setDate(today.getDate() - 364);

let yearlyCompleted = 0;
let yearlyTotal = 0;

tasks.forEach((task) => {
  if (task.text.trim() === "") return;

  for (let i = 0; i < 365; i++) {
    const date = new Date(yearStart);
    date.setDate(yearStart.getDate() + i);

    const dateKey = date.toLocaleDateString("en-CA");

    if (isTaskApplicable(task, dateKey)) {
      yearlyTotal++;

      if (task.history[dateKey]) {
        yearlyCompleted++;
      }
    }
  }
});

const yearlyProgress =
  yearlyTotal === 0
    ? 0
    : Math.round(
        (yearlyCompleted / yearlyTotal) * 100
      );

  return (
    <div className="pt-6 px-7 w-full">

      <h1 className="font-heading text-white text-3xl font-bold mb-3 ml-1">
      Productivity
      </h1>
       
      <div className="pb-2 border-b border-[#2a3038]">
      <Cards streak={streak} progress={progress}  weeklyProgress={weeklyProgress} monthlyProgress={monthlyProgress}  yearlyProgress={yearlyProgress}/>
      </div>  

      <div className="flex items-stretch w-full py-2">

  {/* LEFT SIDEBAR */}
  <div className=" w-[260px] flex-shrink-0 self-stretch bg-[#161721] rounded-[30px] overflow-hidden mt-1">
    <TodoList
      tasks={tasks}
      setTasks={setTasks}
    />
  </div>

  {/* RIGHT CONTENT */}
  <div className="flex-1 min-w-0 flex flex-col gap-3 pl-3 pt-1">

    <PerformanceGrid
      tasks={tasks}
      setTasks={setTasks}
    />

    <ProductivityTrend tasks={tasks} />

    <div className="flex gap-5 items-start pb-8">

  <div className="w-[300px] flex-shrink-0">
    <CategorySplit tasks={tasks} />
  </div>

  <SmartInsights
    todayProgress={progress}
    weeklyProgress={weeklyProgress}
    monthlyProgress={monthlyProgress}
    streak={streak}
  />
</div>
  </div>
</div>
</div>
);
}