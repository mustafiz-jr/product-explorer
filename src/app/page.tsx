import SearchInput from '@/app/components/SearchInput';
import ProductGrid from '@/app/components/ProductGrid';
import LimitSelect from '@/app/components/LimitSelect';
import Pagination from '@/app/components/Pagination';
import { ProductsResponse } from '@/app/types/product';
import { Suspense } from 'react';

async function getAllProducts(query: string): Promise<ProductsResponse> {
  const endpoint = query
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=0`
    : `https://dummyjson.com/products?limit=0`;

  const res = await fetch(endpoint, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

interface PageProps {
  searchParams: { q?: string; limit?: string; page?: string };
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = searchParams;

  const query = resolvedParams.q || '';
  const rawLimit = resolvedParams.limit || '10';
  const limit = rawLimit === 'all' ? 0 : parseInt(rawLimit, 10) || 10;
  const page = parseInt(resolvedParams.page || '1', 10) || 1;

  const data = await getAllProducts(query);
  const allProducts = data.products;
  const totalProducts = allProducts.length;

  const startIndex = limit === 0 ? 0 : (page - 1) * limit;
  const endIndex = limit === 0 ? totalProducts : startIndex + limit;
  const displayedProducts = allProducts.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-gray-50/50 py-10 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Explorer</h1>
          <p className="text-gray-600 mt-1">Search, Limit and Pagination in Next.js App Router.</p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
            <Suspense fallback={<div className="h-10 bg-gray-200 animate-pulse rounded-xl w-full max-w-md" />}>
              <SearchInput />
            </Suspense>

            <Suspense fallback={<div className="h-10 bg-gray-200 animate-pulse rounded-xl w-36" />}>
              <LimitSelect currentLimit={limit} />
            </Suspense>
          </div>
        </header>

        <ProductGrid products={displayedProducts} />

        <Suspense fallback={null}>
          <Pagination total={totalProducts} limit={limit} currentPage={page} />
        </Suspense>
      </div>
    </main>
  );
}
