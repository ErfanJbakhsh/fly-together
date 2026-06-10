import { Track } from "@/app/types/Track";

interface props {
  deleteModal: boolean;
  setDeleteModal: (value: boolean) => void;
  handleDeleteTrack: (track: Track) => void;
}

export default function DeleteModal({
  deleteModal,
  setDeleteModal,
  handleDeleteTrack,
}: props) {
  return (
    <>
      {deleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111] border border-white/5 rounded-xl p-6 w-80">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E24B4A"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </div>
              <p className="text-white font-medium text-sm">Delete track</p>
            </div>
            <p className="text-white/30 text-sm mb-5 pl-11">
              Are you sure you want to delete? This can't be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-white/40 text-sm hover:text-white/60 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTrack}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
