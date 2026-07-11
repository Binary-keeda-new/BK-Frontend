"use client";

type SmartInsightsProps = {
  todayProgress: number;
  weeklyProgress: number;
  monthlyProgress: number;
  streak: number;
};

export default function SmartInsights({
  todayProgress,
  weeklyProgress,
  monthlyProgress,
  streak,
}: SmartInsightsProps) {
  const insights = [];

  // Today's performance
if (todayProgress === 0) {
  insights.push({
    text: "Complete a task today to start building your productivity score.",
    color: "#8b5cf6",
  });
} else if (todayProgress === 100) {
  insights.push({
    text: "You completed all your applicable tasks today. Great consistency!",
    color: "#8b5cf6",
  });
} else {
  insights.push({
    text: `You've completed ${todayProgress}% of your applicable tasks today.`,
    color: "#8b5cf6",
  });
}

  // Weekly performance
if (weeklyProgress === 0) {
  insights.push({
    text: "No weekly progress yet. Complete an applicable task to get started.",
    color: "#3b82f6",
  });
} else if (weeklyProgress < 50) {
  insights.push({
    text: `Your weekly progress is ${weeklyProgress}%. A little more consistency can improve your score.`,
    color: "#3b82f6",
  });
} else if (weeklyProgress < 80) {
  insights.push({
    text: `You're at ${weeklyProgress}% weekly progress. Keep the momentum going.`,
    color: "#3b82f6",
  });
} else if (weeklyProgress < 100) {
  insights.push({
    text: `Strong week! You've completed ${weeklyProgress}% of your applicable tasks.`,
    color: "#3b82f6",
  });
} else {
  insights.push({
    text: "Perfect weekly progress — all applicable tasks completed!",
    color: "#3b82f6",
  });
}

  // Streak insight
if (streak === 0) {
  insights.push({
    text: "Complete your applicable tasks to start building a streak.",
    color: "#22c55e",
  });
} else if (streak < 3) {
  insights.push({
    text: `You're on a ${streak}-day streak. Keep building the habit!`,
    color: "#22c55e",
  });
} else if (streak < 7) {
  insights.push({
    text: `Nice consistency! Your current streak is ${streak} days.`,
    color: "#22c55e",
  });
} else if (streak < 30) {
  insights.push({
    text: `Great momentum — you've maintained a ${streak}-day streak!`,
    color: "#22c55e",
  });
} else {
  insights.push({
    text: `Outstanding consistency! Your streak has reached ${streak} days.`,
    color: "#22c55e",
  });
}

 // Weekly vs Monthly comparison
const progressDifference = weeklyProgress - monthlyProgress;

if (weeklyProgress === 0 && monthlyProgress === 0) {
  insights.push({
    text: "Complete tasks consistently to start tracking your performance trends.",
    color: "#f59e0b",
  });
} else if (progressDifference >= 20) {
  insights.push({
    text: `You're improving! Weekly progress is ${progressDifference}% higher than your monthly progress.`,
    color: "#f59e0b",
  });
} else if (progressDifference > 0) {
  insights.push({
    text: "Your weekly performance is slightly above your monthly progress. Keep it going!",
    color: "#f59e0b",
  });
} else if (progressDifference === 0) {
  insights.push({
    text: "Your weekly and monthly performance are currently balanced.",
    color: "#f59e0b",
  });
} else if (progressDifference <= -20) {
  insights.push({
    text: `Weekly progress is ${Math.abs(
      progressDifference
    )}% below your monthly progress. Focus on consistency this week.`,
    color: "#f59e0b",
  });
} else {
  insights.push({
    text: "Your weekly progress is slightly below your monthly performance. A few completed tasks can close the gap.",
    color: "#f59e0b",
  });
}

  return (
    <div className="animated-border rounded-[30px] p-[1px] overflow-hidden flex-1 min-w-0">
  <div
    className="
      animated-border-inner
      h-[300px]
      w-full
      bg-[#151a2d]
      rounded-[29px]
      overflow-hidden
      px-6
      pb-6
      pt-3
    "
  >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 ">

        <h2 className="text-white text-xl font-bold">
          Smart Insights
        </h2>
      </div>

      {/* Insights */}
      <div className="flex flex-col gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="
              bg-[#1d2438]
              rounded-xl
              px-4
              py-3
              text-white
              text-sm
            "
            style={{
              borderLeft: `4px solid ${insight.color}`,
            }}
          >
            {insight.text}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}