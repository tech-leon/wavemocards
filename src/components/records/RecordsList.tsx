'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, RotateCcw, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Types for the API response
interface CardInfo {
  id: number;
  name: string;
  category_id: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

interface RecordItem {
  id: string;
  created_at: string;
  card_1_id: number | null;
  card_2_id: number | null;
  card_3_id: number | null;
  before_level_1: number | null;
  before_level_2: number | null;
  before_level_3: number | null;
  card_1: CardInfo | null;
  card_2: CardInfo | null;
  card_3: CardInfo | null;
  story: string | null;
}

interface PaginationInfo {
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export function RecordsList() {
  const t = useTranslations('records.list');
  const tToast = useTranslations('toast.records');
  const tAria = useTranslations('aria');
  const router = useRouter();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Search state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keyword, setKeyword] = useState('');

  // Selection state for batch delete
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Delete dialog state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Current page
  const [currentPage, setCurrentPage] = useState(1);
  const latestRequestIdRef = useRef(0);
  const fetchRecordsRef = useRef<
    (page?: number, overrides?: { startDate?: string; endDate?: string; keyword?: string }) => Promise<void>
  >(async () => {});

  // Get today's date string for max attribute
  const today = new Date().toISOString().split('T')[0];

  const fetchRecords = useCallback(async (
    page = 1,
    overrides?: {
      startDate?: string;
      endDate?: string;
      keyword?: string;
    },
  ) => {
    const requestId = ++latestRequestIdRef.current;
    const effectiveStartDate = overrides?.startDate ?? startDate;
    const effectiveEndDate = overrides?.endDate ?? endDate;
    const effectiveKeyword = overrides?.keyword ?? keyword;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('perPage', '10');
      if (effectiveStartDate) params.set('startDate', effectiveStartDate);
      if (effectiveEndDate) params.set('endDate', effectiveEndDate);
      if (effectiveKeyword.trim()) params.set('keyword', effectiveKeyword.trim());

      const res = await fetch(`/api/records?${params.toString()}`);
      const data = await res.json();

      if (requestId !== latestRequestIdRef.current) {
        return;
      }

      if (res.ok) {
        setRecords(data.records || []);
        setPagination(data.pagination || null);
        setCurrentPage(page);
        setSelectedIds(new Set());
      } else {
        toast.error(data.error || tToast('loadFailed'));
      }
    } catch {
      if (requestId === latestRequestIdRef.current) {
        toast.error(tToast('loadUnexpected'));
      }
    } finally {
      if (requestId === latestRequestIdRef.current) {
        setLoading(false);
      }
    }
  }, [startDate, endDate, keyword, tToast]);

  useEffect(() => {
    fetchRecordsRef.current = fetchRecords;
  }, [fetchRecords]);

  useEffect(() => {
    fetchRecordsRef.current(1);
  }, []);

  // Handle search
  const handleSearch = () => {
    fetchRecords(1);
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextKeyword = event.target.value;
    setKeyword(nextKeyword);

    if (nextKeyword === '') {
      fetchRecords(1, { keyword: '' });
    }
  };

  // Handle reset
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setKeyword('');
    fetchRecords(1, {
      startDate: '',
      endDate: '',
      keyword: '',
    });
  };

  // Handle checkbox toggle
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Handle batch delete
  const handleBatchDelete = () => {
    if (selectedIds.size === 0) {
      toast.warning(tToast('deleteSelectionRequired'));
      return;
    }
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    let successCount = 0;
    let failCount = 0;

    for (const id of selectedIds) {
      try {
        const res = await fetch(`/api/records/${id}`, { method: 'DELETE' });
        if (res.ok) {
          successCount++;
        } else {
          failCount++;
        }
      } catch {
        failCount++;
      }
    }

    setDeleting(false);
    setShowDeleteDialog(false);

    if (successCount > 0) {
      toast.success(tToast('batchDeleteSuccess', { count: successCount }));
    }
    if (failCount > 0) {
      toast.error(tToast('batchDeleteFailed', { count: failCount }));
    }

    fetchRecords(currentPage);
  };

  // Format date display
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Build emotion + strength display
  const buildEmotionDisplay = (record: RecordItem) => {
    const parts: { name: string; level: number | null }[] = [];
    if (record.card_1) parts.push({ name: record.card_1.name, level: record.before_level_1 });
    if (record.card_2) parts.push({ name: record.card_2.name, level: record.before_level_2 });
    if (record.card_3) parts.push({ name: record.card_3.name, level: record.before_level_3 });
    return parts;
  };

  return (
    <div className="px-3 sm:px-0">
    <div className="container mx-auto pt-4 pb-10 md:pb-12">
      {/* Title */}
      <div className="mb-5 pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
        <h2>{t('title')}</h2>
        <div className="flex gap-2">
          <div className="type-button px-4 py-2 font-bold text-white bg-main rounded-full cursor-default">
            {t('tabs.records')}
          </div>
          <Link href="/records/analysis">
            <Button
              variant="outline"
              className="type-button rounded-full border-2 border-main text-main hover:bg-main hover:text-white font-bold"
            >
              {t('tabs.analysis')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Search area */}
      <div className="w-full mb-3 md:mb-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
        {/* Date range */}
        <div className="flex w-full sm:w-auto shrink-0 items-center justify-center sm:justify-start gap-2">
          <input
            type="date"
            className="type-button px-4 py-1.5 border-2 border-main-tint02 rounded-full text-main-tint01 text-center bg-gray-100 dark:bg-gray-900"
            value={startDate}
            max={today}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="text-main-tint01">{t('search.dateRangeSeparator')}</span>
          <input
            type="date"
            className="type-button px-4 py-1.5 border-2 border-main-tint02 rounded-full text-main-tint01 text-center bg-gray-100 dark:bg-gray-900"
            value={endDate}
            max={today}
            min={startDate || undefined}
            disabled={!startDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Keyword search + actions */}
        <div className="flex w-full sm:flex-1 min-w-0 items-center gap-2">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-main-tint01" />
            <input
              type="search"
              className="type-button w-full pl-9 pr-4 py-2.5 border-2 border-main-tint02 rounded-full bg-gray-100 dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder={t('search.keywordPlaceholder')}
              value={keyword}
              onChange={handleKeywordChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              onClick={handleSearch}
              className="type-button bg-main hover:bg-main-dark text-white rounded-full px-6 py-2 font-bold"
            >
              {t('search.search')}
            </Button>
            <button
              onClick={handleReset}
              className="p-2 rounded-full text-main hover:bg-main-tint03 transition-colors"
              title={t('search.reset')}
              aria-label={t('search.reset')}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            {/* Delete button */}
            <button
              onClick={handleBatchDelete}
              className="hidden md:block p-2 rounded-full text-main hover:bg-main-tint03 transition-colors"
              title={t('actions.delete')}
              aria-label={tAria('delete')}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-4 border-main-tint02 border-t-main rounded-full animate-spin" />
        </div>
      ) : records.length === 0 ? (
        <div className="type-subsection-title py-20 text-center text-gray-500 dark:text-gray-300">
          {t('empty.noRecords')}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-main-tint01 text-white text-center">
                  <th className="py-2 px-3 w-10">
                    <span className="sr-only">{t('table.select')}</span>
                  </th>
                  <th className="type-button py-2 px-3 whitespace-nowrap font-medium">{t('table.date')}</th>
                  <th className="type-button py-2 px-3 whitespace-nowrap font-medium">{t('table.emotionAndStrength')}</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => {
                  const emotions = buildEmotionDisplay(record);
                  return (
                    <tr
                      key={record.id}
                      onClick={() => router.push(`/records/${record.id}`)}
                      className={`text-center border-b border-gray-200 dark:border-gray-700 hover:bg-main-tint03/50 transition-colors cursor-pointer ${
                        index % 2 !== 0 ? 'bg-main-tint03/30' : ''
                      }`}
                    >
                      <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(record.id)}
                          onChange={() => toggleSelect(record.id)}
                          className="w-4 h-4 accent-main cursor-pointer"
                        />
                      </td>
                      <td className="type-body-sm py-3 px-3 whitespace-nowrap">
                        {formatDate(record.created_at)}
                      </td>
                      <td className="type-body-sm py-3 px-3">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1">
                          {emotions.map((emo, i) => (
                            <span key={i}>
                              {i > 0 && <span className="hidden sm:inline text-gray-400">・</span>}
                              {emo.name} {emo.level}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile delete button */}
          <div className="md:hidden flex justify-end mb-4">
            <button
              onClick={handleBatchDelete}
              className="p-2 rounded-full text-main hover:bg-main-tint03 transition-colors"
              title={t('actions.delete')}
              aria-label={tAria('delete')}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center md:justify-end pt-6">
              <nav className="flex items-center gap-2" aria-label={t('title')}>
                <button
                  onClick={() => fetchRecords(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="p-2 rounded-full disabled:opacity-30 hover:bg-main-tint03 transition-colors"
                  aria-label={t('pagination.previous')}
                >
                  <ChevronLeft className="w-5 h-5 text-main" />
                </button>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => fetchRecords(pageNum)}
                    className={`type-button w-9 h-9 rounded-full font-medium transition-colors ${
                      pageNum === currentPage
                        ? 'bg-main text-white'
                        : 'text-main hover:bg-main-tint03'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => fetchRecords(currentPage + 1)}
                  disabled={currentPage >= pagination.totalPages}
                  className="p-2 rounded-full disabled:opacity-30 hover:bg-main-tint03 transition-colors"
                  aria-label={t('pagination.next')}
                >
                  <ChevronRight className="w-5 h-5 text-main" />
                </button>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center">
            <p className="type-page-title mb-3 text-pink">{t('confirmDelete.title')}</p>
            <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
              {t('confirmDelete.description', { count: selectedIds.size })}
            </p>
            <div className="w-[45%] mb-4">
              <Image className="w-full" src="/images/sureToDelete.svg" alt={t('confirmDelete.title')} width={200} height={200} />
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="rounded-full border-2 border-pink text-pink hover:bg-pink/10 px-6"
                disabled={deleting}
              >
                {t('confirmDelete.cancel')}
              </Button>
              <Button
                onClick={confirmDelete}
                className="rounded-full bg-pink hover:bg-pink-dark text-white px-6"
                disabled={deleting}
              >
                {deleting ? t('confirmDelete.deleting') : t('confirmDelete.confirm')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
