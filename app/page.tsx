export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 ">
      <div className="bg-white shadow-lg p-5 w-full rounded-3xl max-w-screen-sm flex flex-col md:flex-row gap-2">
        <input
          className="w-full rounded-full h-10 bg-gray-200 pl-5 outline-none ring ring-transparent focus:ring-green-500 focus:ring-offset-2 transition-shadow placeholder:drop-shadow invalid:focus:ring-red-500 peer"
          type="email"
          placeholder="Email Address"
          required
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block">
          Email is required.
        </span>
        <button className="text-white py-2 rounded-full active:scale-90 transition-transform font-medium outline-none md:px-10 bg-black peer-required:bg-green-500">
          Log in
        </button>
      </div>
    </main>
  );
}
