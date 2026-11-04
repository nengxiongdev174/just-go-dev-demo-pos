"use client";

import React from "react";
import { Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, convertCurrency } from "@/lib/formatters";
import { type RecentOrdersTableProps } from "@/types/dashboard";
import { useLanguage } from "@/context/LanguageContext";

export function RecentOrdersTable({ orders, currency }: RecentOrdersTableProps) {
  const { dictionary } = useLanguage();

  return (
    <Card className="border-border bg-card rounded-2xl shadow-2xs">
      <CardHeader className="p-5 border-b border-border flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-bold text-foreground">
            {dictionary.dashboard.recentTransactions}
          </CardTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {dictionary.dashboard.liveOrdersDesc}
          </p>
        </div>
        <Badge variant="secondary" className="text-[10px] rounded-lg">
          {orders.length} {dictionary.dashboard.totalBadge}
        </Badge>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">{dictionary.dashboard.tableCustomer}</TableHead>
              <TableHead className="text-xs">{dictionary.dashboard.timeCashier}</TableHead>
              <TableHead className="text-xs">{dictionary.common.paymentMethod}</TableHead>
              <TableHead className="text-xs text-right">{dictionary.dashboard.tableAmount}</TableHead>
              <TableHead className="text-xs text-center">{dictionary.dashboard.tableStatus}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-xs text-muted-foreground">
                  {dictionary.dashboard.noOrdersRecorded}
                </TableCell>
              </TableRow>
            ) : (
              orders.slice().reverse().map((ord) => (
                <TableRow key={ord.id} className="text-xs">
                  <TableCell className="font-semibold font-mono text-primary">
                    {ord.orderNumber}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{ord.createdAt}</span>
                      <span>• {ord.cashierName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] uppercase font-mono py-0 rounded-md">
                      {ord.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold font-mono">
                    {formatCurrency(convertCurrency(ord.total, ord.currency || "LAK", currency), currency)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="success" className="text-[10px] py-0 rounded-md">
                      {dictionary.dashboard.statusCompleted}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

