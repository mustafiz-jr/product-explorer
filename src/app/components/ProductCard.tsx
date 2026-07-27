'use client';

import { Product } from '@/app/types/product';
import Image from 'next/image';
interface ProductCardProps {
    product: Product;
    onSelectProduct: (product: Product) => void;
}

export default function ProductCard({ product, onSelectProduct }: ProductCardProps) {
    return (
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
            <div>
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="p-5">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {product.category}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg mt-3 line-clamp-1">{product.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                    <span className="text-2xl font-extrabold text-gray-900">${product.price}</span>
                </div>
                <button
                    onClick={() => onSelectProduct(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition shadow-sm active:scale-95"
                >
                    Quick View
                </button>
            </div>
        </div>
    );
}