"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Task = {
  id: number;
  text: string;
  done: boolean;
  frequency: "One Time" | "Daily";
  createdAt: string;
  history: { [date: string]: boolean;
  };
};

export default function ProductivityTrend({
tasks,
}: {
tasks: Task[];
}) {

const [view, setView] = useState<
"week" | "month" | "quarter" | "year"
>("week");


let data: {
  day: string;
  score: number;
}[] = [];

const today = new Date();

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

if (view === "week") {
  data = Array.from(
    { length: 7 },
    (_, i) => {
      const date = new Date(today);

      date.setDate(
        today.getDate() - 6 + i
      );

      const dateKey =
        date
          .toISOString()
          .split("T")[0];

      let completed = 0;
      let total = 0;

      tasks.forEach((task) => {
      if (
      task.text.trim() !== "" &&
      isTaskApplicable(task, dateKey)
      ) {
      total++;
      if (task.history[dateKey]) {
      completed++;
      }
      }
      });

      return {
        day: date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),

        score:
          total === 0
            ? 0
            : Math.round(
                (
                  completed /
                  total
                ) *
                  100
              ),
      };
    }
  );
}


if (view === "month") {
  const today = new Date();

  data = Array.from(
    { length: 5 },
    (_, i) => {
      const weekStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        1 + i * 7
      );

      let completed = 0;
      let total = 0;

      tasks.forEach((task) => {
      if (task.text.trim() === "") return;
      for (let d = 0; d < 7; d++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + d);

      if (
      date.getMonth() !==
      today.getMonth()
      ) {
      continue;
      }

    const dateKey =date.toISOString().split("T")[0];

    if (
      isTaskApplicable(task, dateKey)
    ) {
      total++;

      if (task.history[dateKey]) {
        completed++;
      }
    }
  }
});

      return {
        day: `W${i + 1}`,

        score:
          total === 0
            ? 0
            : Math.round(
                (completed / total) *
                  100
              ),
      };
    }
  );
}

if (view === "quarter") {
  const today = new Date();

  data = Array.from(
    { length: 13 },
    (_, i) => {
      const weekStart = new Date(today);

      weekStart.setDate(
        today.getDate() - 84 + i * 7
      );

      let completed = 0;
      let total = 0;

      tasks.forEach((task) => {
  if (task.text.trim() === "") return;

  for (let d = 0; d < 7; d++) {
    const date = new Date(weekStart);

    date.setDate(
      weekStart.getDate() + d
    );

    const dateKey =
      date
        .toISOString()
        .split("T")[0];

    if (isTaskApplicable(task, dateKey)) {
      total++;

      if (task.history[dateKey]) {
        completed++;
      }
    }
  }
});

      return {
        day: `W${i + 1}`,
        score:
          total === 0
            ? 0
            : Math.round(
                (completed / total) *
                  100
              ),
      };
    }
  );
}

if (view === "year") {
  const year = new Date().getFullYear();

  data = Array.from(
    { length: 12 },
    (_, month) => {
      let completed = 0;
      let total = 0;

     tasks.forEach((task) => {
  if (task.text.trim() === "") return;

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    const dateKey = `${year}-${String(
      month + 1
    ).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    if (isTaskApplicable(task, dateKey)) {
      total++;

      if (task.history[dateKey]) {
        completed++;
      }
    }
  }
});

      return {
        day: new Date(
          year,
          month
        ).toLocaleDateString(
          "en-US",
          {
            month: "short",
          }
        ),

        score:
          total === 0
            ? 0
            : Math.round(
                (completed / total) *
                  100
              ),
      };
    }
  );
}


  return (
    <div
    className="
    animated-border-inner
    w-full
    h-[290px]
    bg-[#151a2d]
    rounded-[32px]
    p-4
    "
    >

   <div className="flex items-center justify-between">
  
  <div>
    <h2 className="text-white text-[20px] font-bold ml-2">
      Productivity Trend
    </h2>
  </div>

  <div className="flex bg-[#1d2438] rounded-3xl p-1 gap-1">
    
    <button
      onClick={() => setView("week")}
      className={`px-1 py-1 rounded-2xl ${
        view === "week"
          ? "bg-orange-500 text-black"
          : "text-gray-400"
      }`}
    >
      Week
    </button>

    <button
      onClick={() => setView("month")}
      className={`px-2 py-1 rounded-2xl ${
        view === "month"
          ? "bg-orange-500 text-black"
          : "text-gray-400"
      }`}
    >
      Month
    </button>

    <button
      onClick={() => setView("quarter")}
      className={`px-2 py-1 rounded-2xl ${
        view === "quarter"
          ? "bg-orange-500 text-black"
          : "text-gray-400"
      }`}
    >
      Quarter
    </button>

    <button
      onClick={() => setView("year")}
      className={`px-2 py-1 rounded-2xl ${
        view === "year"
          ? "bg-orange-500 text-black"
          : "text-gray-400"
      }`}
    >
      Year

    </button>
  </div>
</div>

    <div
      className="
      h-[200px]
      mt-4
      rounded-3xl
      bg-[#0f1422]
      p-4
    "
  >
     <div className="w-full h-full">

  <ResponsiveContainer
    width="100%"
    height="100%"
  >

  <LineChart data={data}>

  <CartesianGrid
    stroke="#252b3d"
    strokeDasharray="3 3"
  />

  <XAxis
    dataKey="day"
    stroke="#6b7280"
    interval="preserveStartEnd"
  />

  <YAxis
  stroke="#6b7280"
  domain={[0, 100]}
  ticks={[0, 20, 40, 60, 80, 100]}
  width={50}
  tick={{ fontSize: 14 }}
/>

  <Tooltip
    contentStyle={{
      background: "#131827",
      border: "1px solid #252b3d",
      borderRadius: "12px",
      color: "#fff",
    }}
  />

  <Line
    type="monotone"
    dataKey="score"
    stroke="#f15a22"
    strokeWidth={3}
    dot={{
      r: 5,
      fill: "#f15a22",
    }}
    activeDot={{
      r: 7,
    }}
  />
</LineChart>

</ResponsiveContainer>
      </div>
    </div>
  </div>
);
}