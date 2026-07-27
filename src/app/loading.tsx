export default function Loading() {
    return (
        <main className="min-h-screen bg-gray-50/50 py-10 px-4 md:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 w-72 bg-gray-200 animate-pulse rounded-md mb-6"></div>
                <div className="h-10 w-full max-w-md bg-gray-200 animate-pulse rounded-xl mb-8"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-white border rounded-2xl h-80 animate-pulse p-4 flex flex-col justify-between">
                            <div className="bg-gray-200 h-40 rounded-xl mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-8 bg-gray-200 rounded-xl mt-4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}