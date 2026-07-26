"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  BarChart2,
  ShieldAlert,
  Award,
  Calendar,
} from "lucide-react";
interface PerformancePoint {
  month: string;
  growth: number; /* percentage growth */
}
export default function PerformancePage() {
  const chartData: PerformancePoint[] = [
    { month: "Jan", growth: 10 },
    { month: "Feb", growth: 18 },
    { month: "Mar", growth: 15 },
    { month: "Apr", growth: 24 },
    { month: "May", growth: 38 },
    { month: "Jun", growth: 42 },
    { month: "Jul", growth: 55 },
    { month: "Aug", growth: 60 },
    { month: "Sep", growth: 72 },
    { month: "Oct", growth: 68 },
    { month: "Nov", growth: 85 },
    { month: "Dec", growth: 95 },
  ];
  const metrics = [
    {
      title: "Average Win Rate",
      value: "84.5%",
      icon: Award,
      desc: "Across last 1,200 advisory signals",
    },
    {
      title: "Profit Factor",
      value: "2.35",
      icon: TrendingUp,
      desc: "Gross wins divided by gross losses",
    },
    {
      title: "Average Risk/Reward",
      value: "1:2.1",
      icon: BarChart2,
      desc: "Strict stops versus targets alignment",
    },
    {
      title: "Sharpe Ratio",
      value: "1.82",
      icon: ShieldAlert,
      desc: "Risk-adjusted performance factor",
    },
  ];
  const returnMatrix = [
    {
      year: "2025",
      jan: "+4.2%",
      feb: "+6.1%",
      mar: "-1.5%",
      apr: "+8.3%",
      may: "+12.4%",
      jun: "+5.1%",
      jul: "+8.9%",
      aug: "+3.2%",
      sep: "+7.8%",
      oct: "-2.1%",
      nov: "+11.5%",
      dec: "+8.2%",
    },
    {
      year: "2024",
      jan: "+3.1%",
      feb: "+5.0%",
      mar: "+2.8%",
      apr: "-2.1%",
      may: "+9.2%",
      jun: "+4.0%",
      jul: "+6.5%",
      aug: "+5.1%",
      sep: "+6.0%",
      oct: "+4.8%",
      nov: "+8.3%",
      dec: "+10.1%",
    },
  ];
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-brand-darker relative">
      {" "}
      <div className="max-w-7xl mx-auto space-y-12">
        {" "}
        {/* Header */}{" "}
        <div className="space-y-2">
          {" "}
          <h1 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
            Historical Trading Performance
          </h1>{" "}
          <p className="text-xs sm:text-sm text-gray-400">
            Audited returns logs, equity growth charts, and key portfolio
            ratios.
          </p>{" "}
        </div>{" "}
        {/* Metrics Grid */}{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {" "}
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-brand-green/15 bg-gradient-to-b from-brand-dark to-brand-darker space-y-4"
              >
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {item.title}
                  </span>{" "}
                  <Icon className="h-4.5 w-4.5 text-brand-green" />{" "}
                </div>{" "}
                <div className="space-y-1">
                  {" "}
                  <p className="text-3xl font-bold font-poppins text-white">
                    {item.value}
                  </p>{" "}
                  <p className="text-[10px] text-gray-400">{item.desc}</p>{" "}
                </div>{" "}
              </div>
            );
          })}{" "}
        </div>{" "}
        {/* Equity Curve Chart */}{" "}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-green/15 bg-[#051122]/70 relative">
          {" "}
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-green mb-6">
            Cumulative Equity Curve (100k Base Growth)
          </h3>{" "}
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(212, 175, 55, 0.05)"
                />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255, 255, 255, 0.4)"
                  fontSize={11}
                />
                <YAxis
                  stroke="rgba(255, 255, 255, 0.4)"
                  fontSize={11}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#081B33",
                    borderColor: "#D4AF37",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "#D4AF37", fontWeight: "bold" }}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    stroke: "#081B33",
                    strokeWidth: 2,
                    fill: "#D4AF37",
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>{" "}
        {/* Monthly Returns Heat Table */}{" "}
        <div className="space-y-6">
          {" "}
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-green flex items-center gap-1.5">
            {" "}
            <Calendar className="h-4.5 w-4.5" /> Monthly Returns Matrix (%){" "}
          </h3>{" "}
          <div className="overflow-x-auto rounded-2xl border border-brand-green/15 shadow-xl">
            {" "}
            <table className="w-full text-center border-collapse bg-[#051122]/70 backdrop-blur-md">
              {" "}
              <thead>
                {" "}
                <tr className="border-b border-brand-green/20 bg-brand-dark">
                  {" "}
                  <th className="p-3 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                    Year
                  </th>{" "}
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((m) => (
                    <th
                      key={m}
                      className="p-3 text-[10px] font-bold text-gray-300 uppercase tracking-wider"
                    >
                      {m}
                    </th>
                  ))}{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody className="divide-y divide-gray-800/60 text-xs">
                {" "}
                {returnMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-brand-darkLight/30 ">
                    {" "}
                    <td className="p-3 font-bold text-white border-r border-gray-800">
                      {row.year}
                    </td>{" "}
                    {Object.keys(row)
                      .filter((key) => key !== "year")
                      .map((key, i) => {
                        const val = row[key as keyof typeof row];
                        const isNeg = val.startsWith("-");
                        return (
                          <td
                            key={i}
                            className={`p-3 font-semibold ${isNeg ? "text-red-400 bg-red-500/5" : "text-emerald-400 bg-emerald-500/5"}`}
                          >
                            {" "}
                            {val}{" "}
                          </td>
                        );
                      })}{" "}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
