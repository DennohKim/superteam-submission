import { SolanaDexPairsVolumeData, SolanaMetricsSummaryData } from "@/types/data";

interface SolanaStatsProps {
    limit: number;
    queryId: number;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getDexPairsVolume({ limit, queryId }: SolanaStatsProps) {
    const url = `${baseUrl}${queryId}/results?limit=${limit}`;
    const headers = new Headers();
    headers.set('X-Dune-API-Key', process.env.NEXT_PUBLIC_X_DUNE_API_KEY!);

    const response = await fetch(url, {
        headers: headers,
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const solanaDexPairsVolumeData: SolanaDexPairsVolumeData = await response.json();

    return solanaDexPairsVolumeData;
}


