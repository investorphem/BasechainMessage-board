'use client';

export default function BottomSheet({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="absolute bottom-0 w-full bg-slate-900 rounded-t-3xl p-4">
        {children}
      </div>
    </div>
  );
}