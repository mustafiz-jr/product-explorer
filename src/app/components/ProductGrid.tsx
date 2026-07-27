'use client';

import { useState } from 'react';
import { Product } from '@/app/types/product';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    if (products.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg font-medium">Not Found Any Produc Search Something Defferent!</p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onSelectProduct={(prod) => setSelectedProduct(prod)}
                    />
                ))}
            </div>

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </ div>
    );
}