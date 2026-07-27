'use client';

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const initialQuery = searchParams.get('q')?.toString() || '';
    const [searchTerm, setSearchTerm] = useState(initialQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) {
                params.set('q', searchTerm);
            } else {
                params.delete('q');
            }
            params.set('page', '1');

            replace(`${pathname}?${params.toString()}`);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm, pathname, replace]);

    return (
        <div className="relative w-full max-w-md my-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search product..."
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none shadow-sm"
            />
        </div>
    );
}