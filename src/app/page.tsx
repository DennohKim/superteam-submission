import MetricsSummary from "@/components/stats/MetricsSummary";
import { getMetricsSummary } from "./actions/getMetricsSummary";
import { getSolanaDexVolumeData } from "./actions/getSolanaDexVolumeData";
import { SolanaPriceChart } from "@/components/charts/SolanaPriceChart";
import { SolanaDexVolume } from "@/components/charts/SolanaDexVolume";
import { getNftVolume } from "./actions/getSolanaNftVolume";
import { SolanaNftVolume } from "@/components/charts/SolanaNftVolume";

export default async function Home() {
  const solanaDexVolumeData = await getSolanaDexVolumeData({
    limit: 1000,
    queryId: 3913811,
  });
  const solanaNftVolumeData = await getNftVolume({ limit: 1000, queryId: 3916474 });
  const solanaMetricsSummaryData = await getMetricsSummary({
    limit: 3,
    queryId: 3915819,
  });

  console.log(solanaNftVolumeData);

  return (
    <main className="max-w-7xl mx-auto flex flex-col py-12 px-8 space-y-4">
      {/* Summary Metrics */}
      <div>
        <h2 className="font-bold py-4">Solana Metrics Summary</h2>
        <MetricsSummary MetricsSummaryData={solanaMetricsSummaryData} />
      </div>

      {/* Solana charts*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-bold py-4">Solana DEX Volumes</h2>
          <SolanaDexVolume DexVolumeData={solanaDexVolumeData} />
        </div>
        <div>
          <h2 className="font-bold py-4">Solana NFT Volume</h2>
          <SolanaNftVolume SolanaNftVolumeData={solanaNftVolumeData} />
        </div>
      </div>

      <div>
        <h2 className="font-bold py-4">Solana  </h2>
        <MetricsSummary MetricsSummaryData={solanaMetricsSummaryData} />
      </div>
    </main>
  );
}
