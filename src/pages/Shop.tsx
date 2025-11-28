export default function Shop() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6">Shop</h1>

      <p className="text-gray-300 text-lg max-w-xl text-center mb-8">
        Browse our premium products. More items coming soon.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Example product */}
        <div className="bg-gray-900 p-5 rounded-xl shadow-lg hover:scale-105 transition">
          <div className="h-40 bg-gray-800 rounded mb-4"></div>
          <h3 className="text-xl font-semibold">Product Name</h3>
          <p className="text-gray-400 text-sm">Product description...</p>
          <button className="mt-3 px-4 py-2 bg-blue-600 rounded">Buy Now</button>
        </div>

      </div>
    </div>
  );
}
