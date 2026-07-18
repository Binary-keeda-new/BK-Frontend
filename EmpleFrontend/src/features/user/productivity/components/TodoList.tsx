"use client";

import { RotateCcw } from "lucide-react";
import React, { Dispatch, SetStateAction , useState, useEffect, useRef,} from "react";
import { Trash2 } from "lucide-react";
import { useWallet } from "@/providers/WalletProvider";
import { useNotification } from "@/providers/NotificationProvider";
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

type TodoListProps = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function TodoList({
  tasks,
  setTasks,
}: TodoListProps) {
  const { config, refreshWallet } = useWallet();
  const { notifyReward } = useNotification();
  const todoReward = config?.TODO?.COMPLETION_REWARD || 5;


const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);

const [openCategory, setOpenCategory] = useState<number | null>(null);

const [openFrequency, setOpenFrequency] = useState<number | null>(null);

const dropdownRef = useRef<HTMLDivElement>(null);

const frequencyDropdownRef = useRef<HTMLDivElement>(null);

const addTaskFormRef = useRef<HTMLDivElement>(null);

const [showAddTaskForm, setShowAddTaskForm] = useState(false);

const [newTaskName, setNewTaskName] = useState("");

const [newTaskCategory, setNewTaskCategory] = useState<Task["category"]>("Study");

const [newTaskFrequency, setNewTaskFrequency] = useState<Task["frequency"]>("One Time");

const handleRestore = () => {
  setTasks([
  {
    id: 1,
    text: "",
    done: false,
    category: "Study",
    frequency: "One Time",
    createdAt: new Date().toLocaleDateString("en-CA"),
    history: {},
  },
]);
  };

const deleteTask = (id: number) => {
  const taskToDelete = tasks.find(
    (task) => task.id === id
  );

  if (
    taskToDelete &&
    taskToDelete.text.trim() !== ""
  ) {
    setDeletedTasks((prev) => [
      taskToDelete,
      ...prev,
    ]);
  }

  setTasks((prev) =>
    prev.filter((task) => task.id !== id)
  );
};

const restoreLastDeleted = () => {
  if (deletedTasks.length === 0)
    return;

  const taskToRestore =
    deletedTasks[0];

  setTasks((prev) => [
    ...prev,
    taskToRestore,
  ]);

  setDeletedTasks((prev) =>
    prev.slice(1)
  );
};

const handleFocus = (index: number) => {};

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;

    if (
      openCategory !== null &&
      dropdownRef.current &&
      !dropdownRef.current.contains(target)
    ) {
      setOpenCategory(null);
    }

    if (
      openFrequency !== null &&
      frequencyDropdownRef.current &&
      !frequencyDropdownRef.current.contains(target)
    ) {
      setOpenFrequency(null);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
  document.removeEventListener("mousedown", handleClickOutside);
  };
}, [openCategory, openFrequency]);


useEffect(() => {
  function handleClickOutsideAddTask(event: MouseEvent) {
    if (
      showAddTaskForm &&
      addTaskFormRef.current &&
      !addTaskFormRef.current.contains(event.target as Node)
    ) {
      setShowAddTaskForm(false);
      setNewTaskName("");
      setNewTaskCategory("Study");
      setNewTaskFrequency("One Time");
    }
  }

  document.addEventListener("mousedown", handleClickOutsideAddTask);

  return () => {
    document.removeEventListener("mousedown", handleClickOutsideAddTask);
  };
}, [showAddTaskForm]);


  return (
    <div className="h-full w-full flex-shrink-0">
    <div
    className="
    h-full
    w-full
    p-5
    overflow-visible
    flex
    flex-col
    "
    style={{
      backgroundColor:  "#161721",
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  >

  {/* Header */}
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-white text-xl font-bold">
        Task List
      </h2>

      <button
         onClick={restoreLastDeleted}
          className="
            w-8
            h-8
            rounded-full
            flex
            items-center
            justify-center
            bg-[rgba(249,115,22,0.12)]
            text-[#f97316]
            hover:scale-110
            transition-all
            duration-300
          "
        >
        <RotateCcw size={22} />
        </button>
    </div>
    
    <div className="mb-4">
      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-md text-xs font-medium">
        <span>🪙</span> Earn {todoReward} Coins on completing 3 daily todos
      </div>
    </div>

    {/* Add Task Button */}
  <button
  onClick={() => setShowAddTaskForm(true)}
  className="
    w-full
    h-8
    mb-5
    rounded-3xl
    bg-orange-500
    text-black
    font-medium
    flex
    items-center
    justify-center
    gap-1
    transition-all
    duration-200
  "
>
  <span className="text-xl leading-none">+</span>
  Add Task
</button>

{/* Add Task Form */}
{showAddTaskForm && (
  <div
    ref={addTaskFormRef}
    className="
      mb-6
      p-4
      rounded-xl
      border
      border-[#2a3038]
      bg-[#1b2030]
      flex
      flex-col
      gap-4
    "
  >
    {/* Task Name */}
    <input
      type="text"
      value={newTaskName}
      onChange={(e) => setNewTaskName(e.target.value)}
      placeholder="Add task name"
      className="
        w-full
        bg-[#161721]
        border
        border-[#2a3038]
        rounded-lg
        px-3
        py-1.5
        text-sm
        text-white
        outline-none
        placeholder:text-gray-500
      "
    />

    {/* Category */}
    <select
      value={newTaskCategory}
      onChange={(e) =>setNewTaskCategory(e.target.value as Task["category"])}
      className="
        w-full
        bg-[#161721]
        border
        border-[#2a3038]
        rounded-lg
        pr-8
        text-[15px]
        pl-1
        px-3
        py-1.5
        text-sm
        text-gray-300
        outline-none
      "
    >
      <option value="Study">Study</option>
      <option value="Work">Work</option>
      <option value="Health">Health</option>
      <option value="Finance">Finance</option>
      <option value="Personal">Personal</option>
    </select>

    {/* Frequency */}
  <select
  value={newTaskFrequency}
  onChange={(e) =>
    setNewTaskFrequency(
      e.target.value as Task["frequency"]
    )
  }
  className="
    w-full
    bg-[#161721]
    border
    border-[#2a3038]
    rounded-lg
    pr-8
    text-[15px]
    pl-1
    px-3
    py-1.5
    text-sm
    text-gray-300
    outline-none
  "
>
  <option value="One Time">One Time</option>
  <option value="Daily">Daily</option>
</select>

    {/* Save */}
    <button
    onClick={() => {
    if (newTaskName.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newTaskName.trim(),
        done: false,
        category: newTaskCategory,
        frequency: newTaskFrequency,
        createdAt: new Date().toLocaleDateString("en-CA"),
        history: {},
      },
    ]);

    setNewTaskName("");
    setNewTaskCategory("Study");
    setNewTaskFrequency("One Time");
    setShowAddTaskForm(false);
  }}
  className="
    w-full
    h-6
    rounded-3xl
    bg-orange-500
    text-black
    font-medium
    transition-all
    text-sm
  "
>
  Save
</button>
  </div>
)}

  {/* Tasks */}   
    <div
  className="
  space-y-6
  pr-2
"
>
  {(tasks ?? []).map((task, index) => (
  <div
    key={index}
     className="flex items-start gap-3 min-w-0 group relative"
  >
     
{/* Checkbox */}
  <input
   type="checkbox"
    checked={task.done}
    onChange={() => {
    if (task.text.trim() === "") return;
      const updated = [...tasks];
      const d = new Date();
      const today = `${d.getFullYear()}-${String(
        d.getMonth() + 1
        ).padStart(2, "0")}-${String(
        d.getDate()
        ).padStart(2, "0")}`;

        const isNowDone = !updated[index].done;
        updated[index].done = isNowDone;

        updated[index].history = {
        ...updated[index].history,
        [today]: updated[index].done,
        };

        setTasks(updated);
        
        if (isNowDone) {
          const completedCount = updated.filter(t => t.done && t.text.trim() !== "").length;
          if (completedCount >= 3) {
            const rewardKey = `todo_reward_${today}`;
            if (!localStorage.getItem(rewardKey)) {
              notifyReward("Todo Milestone", "3 tasks completed!", todoReward);
              refreshWallet();
              localStorage.setItem(rewardKey, 'true');
            }
          }
        }
        }}
        className="
          w-5
          h-5
          accent-[#f97316]
          cursor-pointer
          "
          />

<div className="flex flex-col flex-1 min-w-0">

{/* Text Input */}
  <input
  type="text"
  value={task.text}
  placeholder="Add your task..."

  onChange={(e) => { const updated = [...tasks];
  updated[index].text = e.target.value;

  setTasks(updated);
  }}

        className={`
              todo-input
              flex-1
              min-w-0
              bg-transparent
              text-x1
              outline-none
              placeholder:text-gray-500
              ${
              task.done
                ? "line-through text-gray-500"
                : "text-white"
              }
            `}
          />


<div className="mt-0.5 flex items-center justify-between -ml-2">   
 
<div className="flex items-center gap-2">
{/* category chip */} 
<button
  onClick={() =>
    setOpenCategory(
      openCategory === task.id ? null : task.id
    )
  }
  className={`
    mt-1
    w-fit
    px-3
    py-1
    rounded-[340px]
    text-xs
    font-medium
    transition-all
    hover:scale-105

    ${
      task.category === "Study"
        ? "bg-purple-500/20 text-purple-400"
        : task.category === "Work"
        ? "bg-blue-500/20 text-blue-400"
        : task.category === "Health"
        ? "bg-green-500/20 text-green-400"
        : task.category === "Finance"
        ? "bg-red-500/20 text-red-400"
        : "bg-orange-500/20 text-orange-400"
    }
  `}
>
  {task.category}
</button>

 {/* Frequency */}
  <button
    onClick={() =>setOpenFrequency(openFrequency === task.id ? null : task.id)}
    className="
      mt-1
      w-fit
      px-3
      py-1
      rounded-[340px]
      text-xs
      font-medium
      bg-gray-500/20
      text-gray-400
      transition-all
      hover:scale-105
    "
  >
    {task.frequency}
  </button>
  {openFrequency === task.id && (
  <div
    ref={frequencyDropdownRef}
    className="
      absolute
      left-0
      top-full
      z-50
      mt-2
      w-36
      rounded-xl
      bg-[#151a2d]
      border
      border-[#252b3d]
      shadow-xl
      overflow-hidden
    "
  >
    {["One Time", "Daily"].map((freq) => (
      <button
        key={freq}
        onClick={() => {
          const updated = [...tasks];

          updated[index].frequency =
            freq as Task["frequency"];

          setTasks(updated);
          setOpenFrequency(null);
        }}
        className="
          w-full
          text-left
          px-3
          py-2
          text-sm
          text-gray-300
          hover:bg-[#1d2438]
          transition-all
        "
      >
        {freq}
      </button>
    ))}
  </div>
)}
</div>

{/* Delete Button */}
{task.text.trim() !== "" && (
  <button
    onClick={() => deleteTask(task.id)}
    className="
      text-gray-500
      hover:text-red-500
      transition-all
      duration-200
    "
  >
    <Trash2 size={16} />
  </button>
)}
</div>

{openCategory === task.id && (
  <div
  ref={dropdownRef}
      className="
      absolute
      left-0
      top-full
      z-50
      mt-2
      w-36
      rounded-xl
      bg-[#151a2d]
      border
      border-[#252b3d]
      shadow-xl
      overflow-hidden
    "
  >
    {[
      "Study",
      "Work",
      "Health",
      "Finance",
      "Personal",
    ].map((cat) => (
      <button
        key={cat}
        onClick={() => {
          const updated = [...tasks];
          updated[index].category =
            cat as Task["category"];
          setTasks(updated);
          setOpenCategory(null);
        }}
        className="
          w-full
          text-left
          px-3
          py-2
          text-sm
          text-gray-300
          hover:bg-[#1d2438]
          transition-all
        "
      >
        {cat}
      </button>
    ))}
  </div>
)}
</div> 
</div>  
))}       
</div>      
</div>     
</div>     
);
}