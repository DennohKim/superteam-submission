import { SolanaMetricsSummaryData } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type MetricKeys = '_col6' | 'fdv_b' | 'price' | 'staked' | 'total_supply_m' | 'tps' | 'validators' | 'w1_change';

const keyToLabelMap: Record<MetricKeys, string> = {
  _col6: "Staked Ratio (%)",
  fdv_b: "Fully Diluted Market Cap ($)",
  price: "SOL Price ($)",
  staked: "SOL Staked Supply ($)",
  total_supply_m: "SOL Total Supply ($)",
  tps: "Transactions Per Second (Past 24hrs)",
  validators: "Active Validators (Past 24hrs)",
  w1_change: "1 Week Price Change (%)"
};

const keyToFormatFunctionMap: Record<MetricKeys, (value: number) => string> = {
    _col6: value => `${value.toFixed(2)}%`,
    fdv_b: value => `$${value.toFixed(2)}B`,
    price: value => `$${value.toFixed(2)}`,
    staked: value => `$${value.toFixed(2)}M`,
    total_supply_m: value => `$${value.toFixed(2)}M`,
    tps: value => value.toString(),
    validators: value => value.toString(),
    w1_change: value => `${(value * 100).toFixed(2)}%`
  };



export default function MetricsSummary({ MetricsSummaryData }: { MetricsSummaryData: SolanaMetricsSummaryData }) {

  const data = MetricsSummaryData.result.rows[0];

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
    {Object.keys(data).map((key, index) => {
      const typedKey = key as MetricKeys; // assert that key is of type MetricKeys
      const label = keyToLabelMap[typedKey];
      const formattedValue = keyToFormatFunctionMap[typedKey](data[typedKey]);
      return (
        <Card key={index} x-chunk={`dashboard-01-chunk-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formattedValue}</div>
          </CardContent>
        </Card>
      );
    })}
  </div>
  );
}
