'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface LimitSelectProps {
    currentLimit: number;
}

export default function LimitSelect({ currentLimit }: LimitSelectProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleLimitChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', value);
        params.set('page', '1');
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2 text-sm text-gray-700">
            <label htmlFor="limit-select" className="font-semibold whitespace-nowrap">
                Items per Page:
            </label>
            <select
                id="limit-select"
                value={currentLimit === 0 ? 'all' : currentLimit}
                onChange={(e) => handleLimitChange(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2 bg-white focus:outline-none  cursor-pointer font-medium"
            >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="all">All</option>
            </select>
        </div>
    );
}