// src/components/OverlayMessage.jsx
"use client";
import React from 'react';

export default function OverlayMessage({ message, onConfirm, onCancel, type = 'alert' }) {
  if (!message) return null;

  const isConfirm = type === 'confirm';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-auto">
        <p className="text-lg font-semibold mb-4 text-gray-800">{message}</p>
        {isConfirm ? (
          <div className="flex justify-center space-x-4">
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Ya
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            >
              Tidak
            </button>
          </div>
        ) : (
          <button
            onClick={onConfirm} // For alert, onConfirm acts as close
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Oke
          </button>
        )}
      </div>
    </div>
  );
}
