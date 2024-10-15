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

const PIRCOLORS = ["#0E9F6E", "#FACA15", "#F05252"];
const STATCOLORS = ["#98ABFF", "#546FFF", "#10197A"];
const CATCOLORS = [
  "#3D53DB",
  "#2A3BB7",
  "#1A2793",
  "#546FFF",
  "#9F84FD",
  "#98ABFF",
];
function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(fetchTaskStats());
  }, [dispatch]);

  // Handle the case where stats is null
  if (!stats) {
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
    name: cat._id,
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
          imgSrc={checkIcon} // Pass the imported SVG as a prop
          title="Total Tasks"
          number={27}
          bgColor={"bg-customBlue500"}
        />

        <AnalyticButton
          imgSrc={alarmIcon} // Pass the imported SVG as a prop
          title="Pending"
          number={5}
          bgColor={"bg-[#7E95FF]"}
        />

        <AnalyticButton
          imgSrc={progressIcon} // Pass the imported SVG as a prop
          title="In Progress"
          number={12}
          bgColor={"bg-customBlue300"}
        />

        <AnalyticButton
          imgSrc={checkIcon} // Pass the imported SVG as a prop
          title="Completed"
          number={10}
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
              {/* <Legend
                formatter={(value, entry, index) => (
                  <span
                    style={{ color: STATCOLORS[index % STATCOLORS.length] }}
                  >
                    {statusData[index].name}{" "}
                  </span>
                )}
              />  */}

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
              data={categoryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
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
