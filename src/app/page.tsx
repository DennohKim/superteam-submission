import { getSolanaDexVolumeData } from "./actions/getSolanaDexVolumeData";

export default async function Home() {

  const data = await getSolanaDexVolumeData({ limit: 3, queryId: 3913811 });
  console.log(data.result.rows);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
     <p>Mans like Chizaa</p>
    </main>
  );
}
