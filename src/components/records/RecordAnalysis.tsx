'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
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
import { AUTH_STICKY_TOP } from '@/lib/layout';
import { cn } from '@/lib/utils';

interface EmotionCategorySummary {
  id: number;
  slug: string;
  name: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  happy: '#FFE589',
  expectation: '#F8C18F',
  relieved: '#CEE5AF',
  unstable: '#E0CACA',
  amazed: '#B4B9E7',
  sadness: '#C5DDE8',
  hate: '#D6CAC0',
  anger: '#E0AEAE',
  others: '#EBEBEB',
};

const CATEGORY_ORDER = [
  'happy',
  'expectation',
  'relieved',
  'unstable',
  'amazed',
  'sadness',
  'hate',
  'anger',
  'others',
] as const;

interface ChartData {
  slug: string;
  name: string;
  count: number;
  color: string;
  percentage?: number;
}

interface RecordAnalysisProps {
  categories: EmotionCategorySummary[];
}

export function RecordAnalysis({ categories }: RecordAnalysisProps) {
  const t = useTranslations('records.analysis');
  const tToast = useTranslations('toast.analysis');
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) {
      toast.warning(tToast('startDateRequired'));
      return;
    }
    if (!endDate) {
      toast.warning(tToast('endDateRequired'));
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.warning(tToast('invalidDateRange'));
      return;
    }

    setLoading(true);
    setNoData(false);

    try {
      const params = new URLSearchParams({ startDate, endDate });
      const res = await fetch(`/api/records/analysis?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || tToast('failed'));
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

      const categoryNameMap = new Map(
        categories.map((category) => [category.slug, category.name])
      );

      const result: ChartData[] = CATEGORY_ORDER
        .filter((slug) => (categoryCounts as Record<string, number>)[slug] > 0)
        .map((slug) => ({
          slug,
          name: categoryNameMap.get(slug) || slug,
          count: (categoryCounts as Record<string, number>)[slug],
          color: CATEGORY_COLORS[slug] || '#EBEBEB',
          percentage: Number((((categoryCounts as Record<string, number>)[slug] / total) * 100).toFixed(1)),
        }));

      setChartData(result);
    } catch {
      toast.error(tToast('unexpected'));
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
    <div className={cn('sticky z-30 pb-1 bg-gray-100/75 dark:bg-gray-900/75 backdrop-blur-sm', AUTH_STICKY_TOP)}>
      <div className="container mx-auto pt-4 px-3 sm:px-0">
        {/* Title */}
        <div className="mb-5 pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
          <h2>{t('title')}</h2>
          <div className="flex gap-2">
            <Link href="/records">
              <Button
                variant="outline"
                className="type-button rounded-full border-2 border-main text-main hover:bg-main hover:text-white font-bold"
              >
                {t('tabs.records')}
              </Button>
            </Link>
            <div className="type-button px-4 py-2 font-bold text-white bg-main rounded-full cursor-default">
              {t('tabs.analysis')}
            </div>
          </div>
        </div>

        {/* Search area */}
        <form onSubmit={handleAnalyze}>
          <div className="mb-6 flex flex-col md:flex-row items-center gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="date"
                className="type-button px-4 py-1.5 border-2 border-main-tint02 rounded-full text-main-tint01 text-center bg-gray-100 dark:bg-gray-900"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <span className="text-main-tint01">{t('dateRangeSeparator')}</span>
              <input
                type="date"
                className="type-button px-4 py-1.5 border-2 border-main-tint02 rounded-full text-main-tint01 text-center bg-gray-100 dark:bg-gray-900"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="type-button bg-main hover:bg-main-dark text-white rounded-full px-6 py-2 font-bold"
              disabled={loading}
            >
              {loading ? t('loading') : t('analyze')}
            </Button>
          </div>
        </form>
      </div>
    </div>
    <div className="px-3 sm:px-0">
    <div className="container mx-auto pb-10 md:pb-12">

      {/* No data message */}
      {noData && (
        <div className="type-page-title py-12 text-center text-gray-500 dark:text-gray-300">
          {t('empty.noData')}
        </div>
      )}

      {/* Charts */}
      {chartData && chartData.length > 0 && (
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
          {/* Bar Chart - Category Counts */}
          <div className="flex-1">
            <h3 className="type-subsection-title mb-2 py-1 border-b border-main-tint02">
              {t('charts.frequency.title')}
            </h3>
            <p className="type-body-sm mb-1 text-gray-800 dark:text-gray-100">
              {t('charts.frequency.description1')}
            </p>
            <p className="type-body-sm mb-8 text-gray-800 dark:text-gray-100">
              {t('charts.frequency.description2')}
            </p>
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 'var(--type-body-sm)', fontWeight: 700 }}
                    axisLine={{ stroke: '#313131', strokeWidth: 2 }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 'var(--type-body-sm)' }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: t('charts.frequency.unit'), position: 'top', offset: 10, style: { fontSize: 'var(--type-caption)', fill: '#818181' } }}
                  />
                  <RechartsTooltip
                    formatter={(value) => [t('charts.frequency.tooltipValue', { value: String(value) }), '']}
                    separator=""
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
            <h3 className="type-subsection-title mb-2 py-1 border-b border-main-tint02">
              {t('charts.ratio.title')}
            </h3>
            <p className="type-body-sm mb-1 text-gray-800 dark:text-gray-100">
              {t('charts.ratio.description1')}
            </p>
            <p className="type-body-sm mb-8 text-gray-800 dark:text-gray-100">
              {t('charts.ratio.description2')}
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
                    formatter={(value) => [t('charts.ratio.tooltipValue', { value: String(value) }), '']}
                    separator=""
                    contentStyle={{ borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value: string) => (
                      <span className="type-body-sm text-gray-800 dark:text-gray-100">{value}</span>
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
            <Image src="/images/lime-analyze.svg" alt={t('illustrationAlt')} width={300} height={300} className="max-w-[300px]" />
          </div>
          <div className="text-right mb-8">
            <span className="type-caption text-gray-500 dark:text-gray-300">
              Illustration by{' '}
              <a
                className="text-gray-500 dark:text-gray-300 hover:text-main hover:underline"
                href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
                target="_blank"
                rel="noreferrer"
              >
                Tanya Krasutska
              </a>{' '}
              from{' '}
              <a
                className="text-gray-500 dark:text-gray-300 hover:text-main hover:underline"
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
    </section>
  );
}
