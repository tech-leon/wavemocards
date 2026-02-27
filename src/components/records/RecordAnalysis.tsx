'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Emotion category color mapping (matches old version)
const CATEGORY_COLORS: Record<string, string> = {
  快樂: '#FFE589',
  期待: '#F8C18F',
  安心: '#CEE5AF',
  不安: '#E0CACA',
  驚訝: '#B4B9E7',
  低落: '#C5DDE8',
  討厭: '#D6CAC0',
  生氣: '#E0AEAE',
  其他: '#EBEBEB',
};

// Category order
const CATEGORY_ORDER = ['快樂', '期待', '安心', '不安', '驚訝', '低落', '討厭', '生氣', '其他'];

interface ChartData {
  name: string;
  count: number;
  color: string;
  percentage?: number;
}

export function RecordAnalysis() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) {
      toast.warning('請輸入起始日期');
      return;
    }
    if (!endDate) {
      toast.warning('請輸入結束日期');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.warning('開始時間不可晚於結束時間');
      return;
    }

    setLoading(true);
    setNoData(false);

    try {
      const params = new URLSearchParams({ startDate, endDate });
      const res = await fetch(`/api/records/analysis?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || '分析失敗');
        setChartData(null);
        return;
      }

      const { categoryCounts } = data;

      if (!categoryCounts || Object.keys(categoryCounts).length === 0) {
        setNoData(true);
        setChartData(null);
        return;
      }

      // Build chart data in category order
      const total = Object.values(categoryCounts as Record<string, number>).reduce(
        (sum: number, val: number) => sum + val,
        0
      );

      const result: ChartData[] = CATEGORY_ORDER
        .filter((cat) => (categoryCounts as Record<string, number>)[cat] > 0)
        .map((cat) => ({
          name: cat,
          count: (categoryCounts as Record<string, number>)[cat],
          color: CATEGORY_COLORS[cat] || '#EBEBEB',
          percentage: Number((((categoryCounts as Record<string, number>)[cat] / total) * 100).toFixed(1)),
        }));

      setChartData(result);
    } catch {
      toast.error('分析時發生錯誤');
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3 sm:px-0">
    <div className="container mx-auto pt-4 pb-16">
      {/* Title */}
      <div className="mb-5 pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#3C9DAE]">我的紀錄｜分析</h2>
        <div className="flex gap-2">
          <Link href="/records">
            <Button
              variant="outline"
              className="rounded-full border-2 border-main text-main hover:bg-main hover:text-white text-sm font-bold"
            >
              紀錄
            </Button>
          </Link>
          <div className="px-4 py-2 text-sm font-bold text-white bg-main rounded-full cursor-default">
            分析
          </div>
        </div>
      </div>

      {/* Search area */}
      <form onSubmit={handleAnalyze}>
        <div className="mb-6 flex flex-col md:flex-row items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="date"
              className="px-4 py-1.5 border-2 border-main-tint02 rounded-full text-main-tint01 text-center text-sm bg-gray-100 dark:bg-gray-900"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <span className="text-main-tint01">～</span>
            <input
              type="date"
              className="px-4 py-1.5 border-2 border-main-tint02 rounded-full text-main-tint01 text-center text-sm bg-gray-100 dark:bg-gray-900"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-main hover:bg-main-dark text-white rounded-full px-6 py-2 text-sm font-bold"
            disabled={loading}
          >
            {loading ? '讀取中...' : '分析'}
          </Button>
        </div>
      </form>

      {/* No data message */}
      {noData && (
        <div className="text-center text-2xl text-gray-500 dark:text-gray-300 py-12">
          這段期間沒有資料
        </div>
      )}

      {/* Charts */}
      {chartData && chartData.length > 0 && (
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
          {/* Bar Chart - Category Counts */}
          <div className="flex-1">
            <h3 className="mb-2 py-1 text-lg font-bold text-main border-b border-main-tint02">
              情緒類組次數
            </h3>
            <p className="mb-1 text-sm text-gray-800 dark:text-gray-100">
              下圖為您在此期間記錄的情緒卡，在以下分類中所出現的次數的長條圖。
            </p>
            <p className="mb-8 text-sm text-gray-800 dark:text-gray-100">
              若您想看該類別出現的次數，您可將游標停留在該類別的長條上。
            </p>
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 14, fontWeight: 700 }}
                    axisLine={{ stroke: '#313131', strokeWidth: 2 }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 14 }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: '(次)', position: 'top', offset: 10, style: { fontSize: 12, fill: '#818181' } }}
                  />
                  <RechartsTooltip
                    formatter={(value) => [`${value} 次`, '']}
                    labelFormatter={(label) => String(label)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                  <Bar dataKey="count" radius={[50, 50, 0, 0]} barSize={28}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Category Proportions */}
          <div className="flex-1">
            <h3 className="mb-2 py-1 text-lg font-bold text-main border-b border-main-tint02">
              情緒類組比例
            </h3>
            <p className="mb-1 text-sm text-gray-800 dark:text-gray-100">
              下圖為您在此期間記錄的情緒卡，在以下分類中所出現的次數比例的圓餅圖。
            </p>
            <p className="mb-8 text-sm text-gray-800 dark:text-gray-100">
              若您想看該類別所佔的比例，您可將游標停留在圓餅圖中該類別的色塊上。
            </p>
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="50%"
                    outerRadius="80%"
                    paddingAngle={2}
                    label={({ name, payload }) => `${name} ${payload?.percentage ?? ''}%`}
                    labelLine={{ stroke: '#aaa', strokeWidth: 1 }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value) => [`${value}%`, '']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value: string) => (
                      <span className="text-sm text-gray-800 dark:text-gray-100">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Illustration (shown when no chart) */}
      {!chartData && !noData && (
        <div className="px-3 sm:px-0">
          <div className="flex justify-end">
            <Image src="/images/lime-analyze.svg" alt="分析" width={300} height={300} className="max-w-[300px]" />
          </div>
          <div className="text-right mb-12">
            <span className="text-gray-500 dark:text-gray-300 text-xs">
              Illustration by{' '}
              <a
                className="text-gray-500 dark:text-gray-300 hover:text-[#3C9DAE] hover:underline"
                href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
                target="_blank"
                rel="noreferrer"
              >
                Tanya Krasutska
              </a>{' '}
              from{' '}
              <a
                className="text-gray-500 dark:text-gray-300 hover:text-[#3C9DAE] hover:underline"
                href="https://icons8.com/illustrations"
                target="_blank"
                rel="noreferrer"
              >
                Ouch!
              </a>
            </span>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
