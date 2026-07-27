'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
    total: number;
    limit: number;
    currentPage: number;
}

export default function Pagination({ total, limit, currentPage }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    if (limit === 0 || total <= limit) return null;

    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6 mt-8 gap-4">
            <p className="text-sm text-gray-600">
                Page <span className="font-bold text-gray-900">{currentPage}</span> of{' '}
                <span className="font-bold text-gray-900">{totalPages}</span> (Total {total} products)
            </p>

            <div className="flex items-center space-x-3">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm active:scale-95"
                >
                    ← Previous
                </button>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm active:scale-95"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}