export default function Member() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6">Member Area</h1>

      <p className="text-gray-300 text-lg max-w-xl text-center mb-8">
        Access exclusive member-only content, profiles, and rewards.
      </p>

      {/* Example login box */}
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-4 text-center">Login</h3>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 bg-gray-800 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 bg-gray-800 rounded"
        />

        <button className="w-full bg-blue-600 p-3 rounded text-lg">
          Sign In
        </button>
      </div>
    </div>
  );
}
