import MetricsSummary from "@/components/stats/MetricsSummary";
import { getMetricsSummary } from "./actions/getMetricsSummary";
import { getSolanaDexVolumeData } from "./actions/getSolanaDexVolumeData";
import { SolanaPriceChart } from "@/components/charts/SolanaPriceChart";
import { SolanaDexVolume } from "@/components/charts/SolanaDexVolume";
import { getNftVolume } from "./actions/getSolanaNftVolume";
import { SolanaNftVolume } from "@/components/charts/SolanaNftVolume";
import { DataTable } from "@/components/table/data-table";
import { z } from "zod";
import { actionSchema } from "@/components/table/schema";
import { columns } from "@/components/table/columns";


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
  const solanaPairDexVolumesData = await getSolanaDexVolumeData({
    limit: 1000,
    queryId: 3916186,
  });


  const actions = solanaPairDexVolumesData.result.rows.map((result) => {
    const action = actionSchema.parse(result);
    return action;
  });


  return (
    <main className="max-w-7xl mx-auto flex flex-col py-12 px-8 space-y-4">
      {/* Summary Metrics */}
      <div>
        <h2 className="font-bold py-4">Solana Metrics Summary</h2>
        <MetricsSummary MetricsSummaryData={solanaMetricsSummaryData} />
      </div>

      {/* Solana charts*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        <h2 className="font-bold py-4">Solana DEX Pair Volume Stats </h2>
        <DataTable data={actions} columns={columns} link_names={true}/>
      </div>
    </main>
  );
}
