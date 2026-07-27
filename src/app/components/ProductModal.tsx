'use client';

import { Product } from '@/app/types/product';
import { useEffect } from 'react';
import Image from 'next/image';


interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!product) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm transition"
                >
                    ✕
                </button>

                <div className="relative w-full bg-gray-100 overflow-hidden">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase">
                            {product.brand || 'Brand'}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 mt-3">{product.title}</h2>
                        <p className="text-gray-600 text-sm mt-3 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="mt-6 border-t border-gray-100 pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-3xl font-extrabold text-emerald-600">${product.price}</span>
                            <span className="text-sm bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-lg font-semibold">
                                ★ {product.rating} / 5
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}