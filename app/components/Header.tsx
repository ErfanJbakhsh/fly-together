export default function Header() {
  return (
    <div className="bg-[#101015]">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            ✈
          </span>
          <p className="font-bold text-purple-500 text-xl tracking-wide">
            Fly Together
          </p>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="search"
          className="w-64 rounded-xl border border-purple-500/30 bg-[#1E1D22] text-white px-4 py-2 
                   placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50
                   transition-all duration-300"
        />

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <div
            className="bg-[#1E1D22] text-[#71717A] border border-[#71717A]/30 rounded-2xl text-sm px-4 py-2
                        hover:border-[#71717A] hover:text-[#71717A]/80 cursor-pointer transition-all duration-300"
          >
            Listener
          </div>
          <div
            className="bg-purple-500/10 text-purple-500 border border-purple-500/30 rounded-2xl text-sm px-4 py-2
                        hover:bg-purple-500/20 hover:border-purple-500 cursor-pointer transition-all duration-300"
          >
            Host
          </div>
        </div>
      </div>
      <div className="border-t-1 border-[#71717A] mx-5"></div>
      <div className="flex justify-start items-center gap-5 px-8 py-2">
        <div className="flex">
          <span className="bg-green-500 rounded-full"></span>
          <p className="text-white text-[12px]">Connected</p>
        </div>
        <div
          className="bg-[#1E1D22] text-[#71717A] border border-[#71717A]/30 rounded-2xl text-sm px-4 py-2
                        hover:border-[#71717A] hover:text-[#71717A]/80 cursor-pointer transition-all duration-300"
        >
          No requests to be host
        </div>
      </div>
    </div>
  );
}
