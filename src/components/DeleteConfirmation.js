import React from 'react';

function DeleteConfirmation({ isOpen, onClose, onConfirm, userName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded max-w-md mx-auto p-6">
        <h2 className="text-lg font-medium mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete the user "{userName}"? This action cannot be undone.
        </p>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="mr-2 px-4 py-2 text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;