import { SolanaStablecoinSupply } from "@/components/charts/SolanaNftVolume";
interface Metadata {
  column_names: string[];
  column_types: string[];
  row_count: number;
  result_set_bytes: number;
  total_row_count: number;
  total_result_set_bytes: number;
  datapoint_count: number;
  pending_time_millis: number;
  execution_time_millis: number;
}

interface BaseData {
  execution_id: string;
  query_id: number;
  is_execution_finished: boolean;
  state: string;
  submitted_at: string;
  expires_at: string;
  execution_started_at: string;
  execution_ended_at: string;
  next_uri?: string;
  next_offset?: number;
}

interface SolanaDexVolumeRow {
  amount_usd: number;
  project: string;
  time: string;
}

interface SolanaDexPairsVolumeRow {
  avg_non_vote_txs: number;
  avg_vote_txs: number;
  blocks_per_minute: number;
  failed_fees: number;
  failure_rate: number;
  sol_price: number | null;
  success_fees: number;
  success_rate: number;
  time: string;
}

interface SolanaMetricsSummaryRow {
  _col6: number;
  fdv_b: number;
  price: number;
  staked: number;
  total_supply_m: number;
  tps: number;
  validators: number;
  w1_change: number;
}

interface SolanaNftVolumeRow {
  project: string;
  time: string ;
  volume: number;
}


interface Result<T> {
  rows: T[];
  metadata: Metadata;
}

export interface SolanaDexVolumeData extends BaseData {
  result: Result<SolanaDexVolumeRow>;
}

export interface SolanaDexPairsVolumeData  extends BaseData {
  result: Result<SolanaDexPairsVolumeRow>;
}

export interface SolanaMetricsSummaryData extends BaseData {
  result: Result<SolanaMetricsSummaryRow>;
}

export interface SolanaNftVolumeData extends BaseData {
  result: Result<SolanaNftVolumeRow>;
}
