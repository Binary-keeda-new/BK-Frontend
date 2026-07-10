"use client";

import { Check } from "lucide-react";

import { useState } from "react";

export const formatDateKey = (
  date: Date
) => {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


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

type PerformanceGridProps = {
  tasks: Task[];
  setTasks: React.Dispatch<
    React.SetStateAction<Task[]>
  >;
};

export default function PerformanceGrid({
  tasks,
  setTasks,
}: PerformanceGridProps) {
  const [view, setView] = useState<
    "week" | "month" | "quarter" | "year"
  >("week");

  type Column = {
  label: string;
  dateKey: string;
   day?: string;
};

let columns: Column[] = [];

  if (view === "week") {
  const today = new Date();

  const startOfWeek = new Date(today);

  const day = startOfWeek.getDay();

  const diff =
    day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(
    startOfWeek.getDate() + diff
  );

  columns = Array.from(
    { length: 7 },
    (_, i) => {
      const date = new Date(
  startOfWeek.getFullYear(),
  startOfWeek.getMonth(),
  startOfWeek.getDate() + i
);

      date.setDate(
        startOfWeek.getDate() + i
      );

      return {
  label: String(date.getDate()),

  day: date.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
    }
  ),

  dateKey: formatDateKey(date),
};
    }
  );
}

if (view === "month") {
  const now = new Date();

  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  columns = Array.from(
  { length: daysInMonth },
  (_, i) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      i + 1
    );

    return {
      label: String(i + 1),

      day: date.toLocaleDateString(
        "en-US",
        {
          weekday: "short",
        }
      ),

      dateKey: formatDateKey(date),
    };
  }
);
}

if (view === "quarter") {
  const today = new Date();

  columns = Array.from(
    { length: 91 },
    (_, i) => {

      const date = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 45 + i
);

      return {
        label: String(
          date.getDate()
        ),

        day: date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),

       dateKey: formatDateKey(date),
      };
    }
  );
}


 if (view === "year") {
  const today = new Date();

  columns = Array.from(
    { length: 365 },
    (_, i) => {

      const date = new Date(
  today.getFullYear(),
  0,
  i + 1
);

      return {
        label: String(
          date.getDate()
        ),

        day: date.toLocaleDateString(
          "en-US",
          {
            month: "short",
          }
        ),

        dateKey: formatDateKey(date),
      };
    }
  );
}
   
  const getTodayKey = () => {
  return formatDateKey(
    new Date()
  );
};

const isTaskApplicable = (
  task: Task,
  dateKey: string
) => {
  // One Time task sirf created date par applicable hai
  if (task.frequency === "One Time") {
    return dateKey === task.createdAt;
  }

  // Daily task created date se start hoga
  if (task.frequency === "Daily") {
    return dateKey >= task.createdAt;
  }
  return false;
};

  const toggleCell = (
  taskId: number,
  dateKey: string
) => {
  setTasks((prev) =>
    prev.map((task) => {
      if (task.id !== taskId) return task;
      const newHistory = {
        ...task.history,
        [dateKey]: !task.history[dateKey],
      };

      return {
        ...task,
        history: newHistory,

        // TaskList sync
        done: Object.values(newHistory).some(Boolean),
      };
    })
  );
};

  return (
    <div className="w-full">
  <div
    className="
    animated-border-inner
    w-full

    bg-[#151a2d]
    rounded-[32px]
    p-3

    flex
    flex-col
    "
  >
      {/* Header + Tabs */}
    <div className="flex items-center justify-between mb-1 pb-2">
    <h2
    className="
    text-white
    text-xl
    font-bold
    "
    >
    Performance Grid
    </h2>

  <div className="flex items-center bg-[#1d2438] rounded-3xl p-1 w-fit">
        <button
  onClick={() => setView("week")}
  className={`
    px-2 py-1 rounded-3xl transition-all
    ${
      view === "week"
        ? "bg-orange-500 text-black border-2 border-white"
        : "text-gray-400"
    }
  `}
>
  Week
</button>

        <button
  onClick={() => setView("month")}
  className={`
    px-2 py-1 rounded-3xl transition-all
    ${
      view === "month"
        ? "bg-orange-500 text-black border-2 border-white"
        : "text-gray-400"
    }
  `}
>
  Month
</button> 

        <button
  onClick={() => setView("quarter")}
  className={`
    px-2 py-1 rounded-3xl transition-all
    ${
      view === "quarter"
        ? "bg-orange-500 text-black border-2 border-white"
        : "text-gray-400"
    }
  `}
>
  Quarter
</button>

        <button
  onClick={() => setView("year")}
  className={`
    px-2 py-1 rounded-3xl transition-all
    ${
      view === "year"
        ? "bg-orange-500 text-black border-2 border-white"
        : "text-gray-400"
    }
  `}
>
  Year
</button>
      </div>
      </div>


      {/* Grid */}
  <div className="flex-1 overflow-auto relative">
  <div
  className="
    absolute
    top-0
    bottom-0
    left-[190px]
    w-px
    bg-[#2a3038]
    z-10
    pointer-events-none
  "
/>
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-[#2a3038]">
          <th
            className="
             sticky
             left-0
             z-30
             bg-[var(--surface)]
             text-left
             text-gray-400
             p-3
             w-[280px]
             min-w-[280px]
             border-r
             border-[#2a3038]
            "
           >
          Tasks
          </th>

          {columns.map((column) => (
            <th
  key={column.dateKey}
  className={`
    text-sm
    px-1.5
    py-3
    min-w-[48px]

    ${
      column.dateKey ===
      formatDateKey(new Date())
        ? "text-orange-500 font-bold"
        : "text-gray-400"
    }
  `}
>
        <div className="flex flex-col items-center leading-tight">
  {column.day && (
    <span className="text-xs text-gray-500">
      {column.day}
    </span>
  )}

  <span className="mt-1">
    {column.label}
  </span>
</div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="border-t border-[#2a3038]">
        {tasks.map((task) => (
          <tr
            key={task.id}
            className="
            border-b
            border-[#2a3038]
            "
          >
            <td
              className="
              sticky
              left-0
              z-20
              bg-[var(--surface)]
              text-white
              p-3
              font-medium
              max-w-[180px]
              w-[280px]
              min-w-[280px]
              border-r
              border-[#2a3038]
              "
            >
               <div className="truncate">
              {task.text}
               </div>
            </td>

          {columns.map((column) => {const applicable = isTaskApplicable(task,column.dateKey);

    return (
    <td
      key={column.dateKey}
      className="p-3 px-2 text-center"
    >
      {applicable ? (
        <div
          onClick={() =>
            toggleCell(task.id, column.dateKey)
          }
          className={`
            mx-auto
            w-7
            h-7
            rounded-md
            cursor-pointer
            transition-all
            duration-200
            flex
            items-center
            justify-center

            ${
              task.history[column.dateKey]
                ? "bg-orange-500"
                : "bg-[#1d2438]"
            }
          `}
        >
          {task.history[column.dateKey] && (
            <Check
              size={16}
              className="text-black"
            />
          )}
        </div>
      ) : (
        <span className="text-gray-600 text-lg">
          -
        </span>
      )}
    </td>
  );
})}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
 </div>
 </div>
  );
}