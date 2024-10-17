import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import AnalyticButton from "../components/analyticButton";
import checkIcon from "../assets/checkIcon.svg";
import alarmIcon from "../assets/alarmIcon.svg";
import progressIcon from "../assets/progressIcon.svg";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskStats } from "../store/reducers/tasksSlice";
import Loading from "../components/Loading";

const PIRCOLORS = ["#F05252", "#FACA15", "#0E9F6E"];
const STATCOLORS = ["#98ABFF", "#546FFF", "#10197A"];
const CATCOLORS = [
  "#10197A",
  "#3D53DB",
  "#9F84FD",
  "#98ABFF",
  "#2A3BB7",
  "#1A2793",
  "#546FFF",
];
function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(fetchTaskStats());
  }, [dispatch]);
  if (error) {
    return (
      <div className="text-red-500">
        Failed to load statistics. Please try again later.
      </div>
    );
  }
  if (loading) {
    return <Loading />;
  }
  // Handle the case where stats is null
  if (
    !stats ||
    !stats.statusStats ||
    !stats.priorityStats ||
    !stats.categoryStats ||
    !stats.tasksByDate
  ) {
    return <div>No statistics available.</div>;
  }

  const { statusStats, priorityStats, categoryStats, tasksByDate } = stats;

  // Prepare Data for Recharts
  const statusData = [
    { name: "Completed", value: statusStats?.completed },
    { name: "In Progress", value: statusStats?.inProgress },
    { name: "Pending", value: statusStats?.pending },
  ];

  const priorityData = [
    { name: "High", value: priorityStats?.highPriority },
    { name: "Medium", value: priorityStats?.mediumPriority },
    { name: "Low", value: priorityStats?.lowPriority },
  ];

  const categoryData = categoryStats?.map((cat) => ({
    name: cat.categoryName, // Use the name of the category
    value: cat.count,
  }));
  const tasksByDateData = tasksByDate?.map((date) => ({
    date: date._id,
    count: date.count,
  }));

  return (
    <div className="task-stats-dashboard">
      <h2 className="font-bold text-customBlue900 text-xl m-2">
        Task Stats Dashboard
      </h2>

      {/* Statistic cards */}

      <div className="flex flex-wrap ">
        <AnalyticButton
          imgSrc={checkIcon}
          title="Total Tasks"
          number={
            statusStats.completed + statusStats.pending + statusStats.inProgress
          }
          bgColor={"bg-customBlue500"}
        />

        <AnalyticButton
          imgSrc={alarmIcon}
          title="Pending"
          number={statusStats.pending}
          bgColor={"bg-[#7E95FF]"}
        />

        <AnalyticButton
          imgSrc={progressIcon}
          title="In Progress"
          number={statusStats.inProgress}
          bgColor={"bg-customBlue300"}
        />

        <AnalyticButton
          imgSrc={checkIcon}
          title="Completed"
          number={statusStats.completed}
          bgColor={"bg-customBlue200"}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-2">
        {/* Status Stats */}
        <div className="chart-section border-2 rounded-lg">
          <h3 className="font-bold text-lg text-customBlue900/75 m-4">
            Status Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={statusData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar data={statusData} dataKey={"value"}>
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATCOLORS[index % STATCOLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Stats */}
        <div className="chart-section border-2 rounded-lg">
          <h3 className="font-bold text-lg text-customBlue900/75 m-4">
            Priority Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                // paddingAngle={1}
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  ` ${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIRCOLORS[index % PIRCOLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Stats */}
        <div className="chart-section border-2 rounded-lg">
          <h3 className="font-bold text-lg text-customBlue900/75 m-4">
            Task Categories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={categoryData} // Ensure this data has the correct structure
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />{" "}
              {/* This should match your category name field */}
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CATCOLORS[index % CATCOLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks by Date */}
        <div className="chart-section border-2 rounded-lg">
          <h3 className="font-bold text-lg text-customBlue900/75 m-4">
            Tasks Created Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={tasksByDateData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8e44ad" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
