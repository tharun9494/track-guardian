import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";

interface VibrationChartProps {
  data: { value: number; time: string; timestamp: number }[];
  isSafe: boolean;
}

const VibrationChart = ({ data, isSafe }: VibrationChartProps) => {
  const strokeColor = isSafe ? "hsl(152, 70%, 45%)" : "hsl(0, 72%, 51%)";
  const fillColor = isSafe ? "hsl(152, 70%, 45%)" : "hsl(0, 72%, 51%)";

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Vibration Waveform
          </h3>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Last 30 data points · Real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">LIVE</span>
        </div>
      </div>

      <div className="h-[280px] md:h-[320px]">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Waiting for data from sensor...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="vibrationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={fillColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(220, 14%, 16%)"
                vertical={false}
              />
              <XAxis
                tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                tickFormatter={(value, index) => (index + 1).toString()}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }}
                tickLine={false}
                axisLine={false}
                domain={[0, 'dataMax + 100']}
              />
              <ReferenceLine
                y={500}
                stroke="hsl(45, 93%, 47%)"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={{
                  value: "Minor Crack",
                  position: "right",
                  fill: "hsl(45, 93%, 47%)",
                  fontSize: 9,
                  style: { fill: "hsl(45, 93%, 47%)" }
                }}
              />
              <ReferenceLine
                y={1000}
                stroke="hsl(32, 95%, 44%)"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={{
                  value: "Little Crack",
                  position: "right",
                  fill: "hsl(32, 95%, 44%)",
                  fontSize: 9,
                  style: { fill: "hsl(32, 95%, 44%)" }
                }}
              />
              <ReferenceLine
                y={2000}
                stroke="hsl(15, 95%, 50%)"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={{
                  value: "Medium Crack",
                  position: "right",
                  fill: "hsl(15, 95%, 50%)",
                  fontSize: 9,
                  style: { fill: "hsl(15, 95%, 50%)" }
                }}
              />
              <ReferenceLine
                y={4000}
                stroke="hsl(0, 72%, 51%)"
                strokeDasharray="5 5"
                strokeWidth={2}
                label={{
                  value: "Danger",
                  position: "right",
                  fill: "hsl(0, 72%, 51%)",
                  fontSize: 10,
                  style: { fill: "hsl(0, 72%, 51%)" }
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 18%, 10%)",
                  border: "1px solid hsl(220, 16%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(210, 20%, 92%)",
                }}
                labelStyle={{ color: "hsl(215, 15%, 55%)" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={2}
                fill="url(#vibrationGradient)"
                dot={false}
                animationDuration={300}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default VibrationChart;
