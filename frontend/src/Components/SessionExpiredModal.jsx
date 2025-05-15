import React from 'react';

const SessionExpiredModal = ({ onOk }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center min-w-[300px]">
      <h2 className="text-3xl font-semibold mb-4 text-indigo-600">Session Expired</h2>
      <p className="mb-6 text-lg">Your session has expired. Please log in again to continue.</p>
      <button
        className="w-full py-2 text-white font-semibold duration-300 outline-none bg-indigo-900 rounded-lg hover:ring-2 ring-indigo-700 gap-x-2"
        onClick={onOk}
        autoFocus
      >
        OK
      </button>
    </div>
  </div>
);

export default SessionExpiredModal;
