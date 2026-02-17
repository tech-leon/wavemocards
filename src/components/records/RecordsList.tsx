'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, RotateCcw, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Get today's date string for max attribute
  const today = new Date().toISOString().split('T')[0];

  const fetchRecords = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('perPage', '10');
      if (startDate) params.set('startDate', startDate);
      if (endDate) params.set('endDate', endDate);
      if (keyword.trim()) params.set('keyword', keyword.trim());

      const res = await fetch(`/api/records?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setRecords(data.records || []);
        setPagination(data.pagination || null);
        setCurrentPage(page);
        setSelectedIds(new Set());
      } else {
        toast.error(data.error || '載入紀錄失敗');
      }
    } catch {
      toast.error('載入紀錄時發生錯誤');
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, keyword]);

  useEffect(() => {
    fetchRecords(1);
  }, [fetchRecords]);

  // Handle search
  const handleSearch = () => {
    fetchRecords(1);
  };

  // Handle reset
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setKeyword('');
    // Reset and fetch with cleared params
    setTimeout(() => fetchRecords(1), 0);
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
      toast.warning('請先勾選欲刪除的項目');
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
      toast.success(`成功刪除 ${successCount} 筆紀錄`);
    }
    if (failCount > 0) {
      toast.error(`${failCount} 筆紀錄刪除失敗`);
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
    <div className="container mx-auto pt-4 pb-16">
      {/* Title */}
      <div className="mb-5 pb-2 border-b-2 border-main-tint02 flex justify-between items-center">
        <h2 className="text-2xl font-bold">我的紀錄</h2>
        <div className="flex gap-2">
          <div className="px-4 py-2 text-sm font-bold text-white bg-main rounded-full cursor-default">
            紀錄
          </div>
          <Link href="/records/analysis">
            <Button
              variant="outline"
              className="rounded-full border-2 border-main text-main hover:bg-main hover:text-white text-sm font-bold"
            >
              分析
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
            className="px-4 py-1.5 border-2 border-main-tint02 rounded-full text-main-tint01 text-center text-sm"
            value={startDate}
            max={today}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="text-main-tint01">～</span>
          <input
            type="date"
            className="px-4 py-1.5 border-2 border-main-tint02 rounded-full text-main-tint01 text-center text-sm"
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
              className="w-full pl-9 pr-4 py-2.5 border-2 border-main-tint02 rounded-full text-sm placeholder:text-gray-400"
              placeholder="請輸入關鍵字，以「空格」做區隔"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              onClick={handleSearch}
              className="bg-main hover:bg-main-dark text-white rounded-full px-6 py-2 text-sm font-bold"
            >
              搜尋
            </Button>
            <button
              onClick={handleReset}
              className="p-2 rounded-full text-main hover:bg-main-tint03 transition-colors"
              title="重整｜顯示全部"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            {/* Delete button */}
            <button
              onClick={handleBatchDelete}
              className="hidden md:block p-2 rounded-full text-main hover:bg-main-tint03 transition-colors"
              title="刪除"
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
        <div className="py-20 text-center text-gray-400 text-lg">
          目前沒有紀錄
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-main-tint01 text-white text-center">
                  <th className="py-2 px-3 w-10">
                    <span className="sr-only">選取</span>
                  </th>
                  <th className="py-2 px-3 whitespace-nowrap text-sm font-medium">日期</th>
                  <th className="py-2 px-3 whitespace-nowrap text-sm font-medium">情緒與強度</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => {
                  const emotions = buildEmotionDisplay(record);
                  return (
                    <tr
                      key={record.id}
                      onClick={() => router.push(`/records/${record.id}`)}
                      className={`text-center border-b border-gray-200 hover:bg-main-tint03/50 transition-colors cursor-pointer ${
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
                      <td className="py-3 px-3 text-sm whitespace-nowrap">
                        {formatDate(record.created_at)}
                      </td>
                      <td className="py-3 px-3 text-sm">
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
              title="刪除"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center md:justify-end pt-6">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => fetchRecords(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="p-2 rounded-full disabled:opacity-30 hover:bg-main-tint03 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-main" />
                </button>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => fetchRecords(pageNum)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
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
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center">
            <p className="mb-3 text-2xl font-bold text-pink">確定要刪除嗎？</p>
            <p className="mb-4 text-sm text-gray-700">
              您選擇刪除
              <span className="px-1 text-pink font-bold">{selectedIds.size} 筆</span>
              資料，刪除後便
              <span className="pl-1 text-pink font-bold">不可再復原</span>
              ，確定要刪除嗎？
            </p>
            <div className="w-[45%] mb-4">
              <Image className="w-full" src="/images/sureToDelete.svg" alt="確認刪除" width={200} height={200} />
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="rounded-full border-2 border-pink text-pink hover:bg-pink/10 px-6"
                disabled={deleting}
              >
                取消
              </Button>
              <Button
                onClick={confirmDelete}
                className="rounded-full bg-pink hover:bg-pink-dark text-white px-6"
                disabled={deleting}
              >
                {deleting ? '刪除中...' : '確定刪除'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
