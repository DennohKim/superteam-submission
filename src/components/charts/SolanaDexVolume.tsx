"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SolanaDexVolumeData } from "@/types/data";

const chartConfig = {
  raydium: {
    label: "Raydium",
    color: "hsl(var(--chart-1))",
  },
  meteora: {
    label: "Meteora",
    color: "hsl(var(--chart-2))",
  },
  goosefx_ssl: {
    label: "GooseFX SSL",
    color: "hsl(var(--chart-3))",
  },
  lifinity: {
    label: "Lifinity",
    color: "hsl(var(--chart-4))",
  },
  phoenix: {
    label: "Phoenix",
    color: "hsl(var(--chart-5))",
  },
  whirlpool: {
    label: "Whirlpool",
    color: "hsl(var(--chart-6))",
  },
  orca: {
    label: "orca",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig;

type ChartConfigKey = keyof typeof chartConfig;


const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  interface GroupedDataItem {
    month: string;
    [key: string]: number | string;
  }

export function SolanaDexVolume({
  DexVolumeData,
}: {
  DexVolumeData: SolanaDexVolumeData;
}) {
    console.log(DexVolumeData);

  const groupedData = DexVolumeData.result.rows.reduce(
    (acc: GroupedDataItem[], { amount_usd, project, time }) => {
        const date = new Date(time);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const monthYear = `${month} ${year}`;
        const existingMonthYear = acc.find(item => item.month === monthYear);
      
        if (existingMonthYear) {
            existingMonthYear[project] = ((existingMonthYear[project] as number) || 0) + amount_usd;
        } else {
          acc.push({ month: monthYear, [project]: amount_usd });
        }
      return acc;
    },
    []
  );


// Sort the grouped data by month and year
const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
groupedData.sort((a, b) => {
  const [aMonth, aYear] = a.month.split(' ');
  const [bMonth, bYear] = b.month.split(' ');
  const yearDiff = parseInt(aYear) - parseInt(bYear);
  return yearDiff !== 0 ? yearDiff : monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solana DEX Volumes in USD</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={300} data={groupedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split(' ')[0].slice(0, 3) + ' ' + value.split(' ')[1].slice(-2)}
            />
           
            <ChartTooltip formatter={(value) => formatCurrency(value as number)} />
            <ChartLegend content={<ChartLegendContent />} />

            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={chartConfig[key as ChartConfigKey].color}
                name={chartConfig[key as ChartConfigKey].label}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
