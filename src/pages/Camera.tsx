export default function Camera() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6">Camera</h1>

      <p className="text-gray-300 text-lg max-w-xl text-center mb-6">
        Test your camera or explore camera features for your project.
      </p>

      {/* Example Camera UI placeholder */}
      <div className="w-full max-w-lg h-80 bg-gray-900 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Camera preview will go here</p>
      </div>

      <button className="mt-6 px-6 py-2 bg-blue-600 rounded-lg">
        Start Camera
      </button>
    </div>
  );
}
