"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
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
import { SolanaNftVolumeData } from "@/types/data";
import { formatLargeNumber } from "@/lib/utils";


const chartConfig = {
  magiceden: {
    label: "Magic Eden",
    color: "hsl(var(--chart-1))",
  },
  tensorswap: {
    label: "Tensor Swap",
    color: "hsl(var(--chart-2))",
  },
  
} satisfies ChartConfig;

type ChartConfigKey = keyof typeof chartConfig;

interface GroupedDataItem {
  month: string;
  [key: string]: number | string;
}


const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

 
export function SolanaNftVolume({
  SolanaNftVolumeData,
}: {
SolanaNftVolumeData: SolanaNftVolumeData;
}) {
    console.log(SolanaNftVolumeData);
    
  const groupedData = SolanaNftVolumeData.result.rows.reduce(
    (acc: GroupedDataItem[], { volume, project, time }) => {
        const date = new Date(time);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const monthYear = `${month} ${year}`;
        const existingMonthYear = acc.find(item => item.month === monthYear);
      
        if (existingMonthYear) {
          existingMonthYear[project] = (existingMonthYear[project] as number || 0) + volume;
        } else {
          acc.push({ month: monthYear, [project]: volume });
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
        <CardDescription>Solana NFT Volumes in USD</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart width={600} height={300} data={groupedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split(' ')[0].slice(0, 3) + ' ' + value.split(' ')[1].slice(-2)}
            />
             <YAxis
              tickFormatter={(value) => formatLargeNumber(value as number)}
            />
           
            <ChartTooltip formatter={(value) => formatCurrency(value as number)} />
            <ChartLegend content={<ChartLegendContent />} />

            {Object.keys(chartConfig).map((key) => (
              <Area
                key={key}
                dataKey={key}
                stackId="a"
                fill={chartConfig[key as ChartConfigKey].color}
                name={chartConfig[key as ChartConfigKey].label}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
