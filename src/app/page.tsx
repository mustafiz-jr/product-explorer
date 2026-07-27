'use client';

import SearchInput from '@/app/components/SearchInput';
import ProductGrid from '@/app/components/ProductGrid';
import LimitSelect from '@/app/components/LimitSelect';
import Pagination from '@/app/components/Pagination';
import { ProductsResponse } from '@/app/types/product';
import { useEffect, useState, Suspense } from 'react';

interface PageProps {
  searchParams?: { q?: string; limit?: string; page?: string };
}

export default function HomePage() {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const endpoint = query
          ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=0`
          : `https://dummyjson.com/products?limit=0`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Failed to fetch products');
        const productsData = await res.json();
        setData(productsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const allProducts = data?.products || [];
  const totalProducts = allProducts.length;

  const rawLimit = limit;
  const displayLimit = rawLimit === 0 ? 0 : rawLimit;
  const startIndex = displayLimit === 0 ? 0 : (page - 1) * displayLimit;
  const endIndex = displayLimit === 0 ? totalProducts : startIndex + displayLimit;
  const displayedProducts = allProducts.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-gray-50/50 py-10 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Explorer</h1>
          <p className="text-gray-600 mt-1">Search, Limit and Pagination in Next.js App Router.</p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="h-10 px-4 rounded-xl border border-gray-300 w-full max-w-md"
            />

            <select
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value === 'all' ? 0 : parseInt(e.target.value, 10));
                setPage(1);
              }}
              className="h-10 px-4 rounded-xl border border-gray-300 w-36"
            >
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
              <option value="all">All products</option>
            </select>
          </div>
        </header>

        {error && (
          <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <ProductGrid products={displayedProducts} />

            {displayLimit !== 0 && totalProducts > displayLimit && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {Math.ceil(totalProducts / displayLimit)}
                </span>
                <button
                  onClick={() => setPage(Math.min(Math.ceil(totalProducts / displayLimit), page + 1))}
                  disabled={page >= Math.ceil(totalProducts / displayLimit)}
                  className="px-4 py-2 rounded-xl border border-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
