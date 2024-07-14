"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./date-table-column-header";
import { Action } from "./schema";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractTokenPair, formatUSDVolume } from "@/lib/utils";

export const columns: ColumnDef<Action>[] = [
  {
    accessorKey: "token_pair",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Token Pair"
        className="md:text-base"
      />
    ),
  },
  {
    accessorKey: "one_day_volume",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="1 day Volume"
        className="md:text-base"
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("one_day_volume") as number;
      return <div className="font-medium">{formatUSDVolume(amount)}</div>;
    },
  },

  {
    accessorKey: "seven_day_volume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="7 Day Volume" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("seven_day_volume") as number;
      return <div className="font-medium">{formatUSDVolume(amount)}</div>;
    },
  },

  {
    accessorKey: "thirty_day_volume",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="30 day Volume"
        className="md:text-base"
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("thirty_day_volume") as number;
      return <div className="font-medium">{formatUSDVolume(amount)}</div>;
    },
  },

  {
    accessorKey: "ninety_day_volume",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="90 day Volume"
        className="md:text-base"
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("ninety_day_volume") as number;
      return <div className="font-medium">{formatUSDVolume(amount)}</div>;
    },
  },

  {
    accessorKey: "usd_liquidity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="USD Liquidity"
        className="md:text-base"
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("usd_liquidity") as number;
      return <div className="font-medium">{formatUSDVolume(amount)}</div>;
    },
  },
];
