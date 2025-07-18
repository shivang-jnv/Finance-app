import {
  Tooltip,
  XAxis,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { formatPercentage } from "@/lib/utils";
import CategoryTooltip from "@/components/category-tooltip";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data?: {
    value: number;
    name: string;
  }[];
};

const PieVariant = ({ data }: Props) => {

  //calculating percentage
  const total = data?.reduce((sum, item) => sum + item.value, 0) || 0;
  
  const dataWithPercentage = data?.map(item => ({
    ...item,
    percent: total > 0 ? (item.value / total) : 0
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }) => (
            <ul className="flex flex-col space-y-2">
              {payload?.map((entry: any, index: number) => (
                <li
                  key={`item-${index}`}
                  className="flex items-center space-x-2"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{
                      backgroundColor: entry?.color,
                    }}
                  />
                  <div className="space-x-1">
                    <span className="text-sm text-muted-foreground">
                      {entry?.value}
                    </span>
                    <span className="text-sm">
                      {formatPercentage(entry?.payload.percent * 100)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        />
        <Tooltip content={CategoryTooltip} />
        <Pie
          data={dataWithPercentage}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey={"value"}
          labelLine={false}
        >
          {data?.map((_entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieVariant;