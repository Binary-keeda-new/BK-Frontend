"use client";
import { PieChart,Pie,Cell,ResponsiveContainer,Tooltip} from "recharts";

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
  history: {
    [date: string]: boolean;
  };
};

type Props = { tasks: Task[]; };

export default function CategorySplit({
  tasks,
}: Props) {

 const categoryData = [
  {
    name: "Health",
    value: tasks.filter(
      (t) =>
        t.done &&
        t.category === "Health"
    ).length,
    color: "#21c58e",
  },

  {
    name: "Study",
    value: tasks.filter(
      (t) =>
        t.done &&
        t.category === "Study"
    ).length,
    color: "#8b5cf6",
  },

  {
    name: "Work",
    value: tasks.filter(
      (t) =>
        t.done &&
        t.category === "Work"
    ).length,
    color: "#4f8cff",
  },

  {
    name: "Finance",
    value: tasks.filter(
      (t) =>
        t.done &&
        t.category === "Finance"
    ).length,
    color: "#ff4d4f",
  },

  {
    name: "Personal",
    value: tasks.filter(
      (t) =>
        t.done &&
        t.category === "Personal"
    ).length,
    color: "#f59e0b",
  },
];

return (
   <div className="animated-border rounded-[30px] p-[1px] overflow-hidden">
  <div
    className="
      animated-border-inner
      flex
      flex-col
      justify-between
      h-[330px]
      w-full
      bg-[#151a2d]
      rounded-[29px]
      overflow-hidden
      px-8
      pb-8
      pt-4
    "
  >
      <h2 className="text-white text-[20px] font-bold">
        Category Split
      </h2>

      <p className="text-gray-400 mt-1 text-[12px]">
        30-day completions
      </p>

      <div className="h-[280px] mt-4 flex items-center justify-center">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={categoryData}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={5}
        outerRadius={40}
        paddingAngle={2}
        stroke="none"
      >
        {categoryData.map((entry, index) => (
          <Cell
            key={index}
            fill={entry.color}
          />
        ))}
      </Pie>
      <Tooltip
  contentStyle={{
    backgroundColor: "#151a2d",
    border: "1px solid #252b3d",
    borderRadius: "10px",
    padding: "6px 10px",
    fontSize: "12px",
  }}
  itemStyle={{
    color: "#fff",
    fontSize: "12px",
  }}
  labelStyle={{
    fontSize: "11px",
    color: "#9ca3af",
  }}
/>
    </PieChart>
  </ResponsiveContainer>
</div>
<div className="flex flex-wrap gap-x-5 gap-y-3 mt-5">
  {categoryData.map((item) => (
    <div
      key={item.name}
      className="flex items-center gap-2"
    >
      <div
        className="w-3 h-3 rounded-sm"
        style={{ backgroundColor: item.color }}
      />

      <span className="text-gray-400">
  {item.name}
</span>

<span className="text-gray-500">
  {item.value}
</span>
    </div>
  ))}
</div>

      <div className="flex flex-wrap gap-x-5 gap-y-3 mt-4">
      </div>
    </div>
    </div>
);
}