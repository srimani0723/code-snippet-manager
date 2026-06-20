import { toast } from "react-toastify";

const ConfirmToast = (message, onConfirm, onCancel) => {
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col gap-2">
        <p className="text-gray-800">{message}</p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-red-200 text-red-800 border-2 border-red-300 rounded-full cursor-pointer"
            onClick={() => {
              onConfirm();
              closeToast();
            }}
          >
            Confirm
          </button>
          <button
            className="px-3 py-1 bg-orange-200 text-orange-800 border-2 border-orange-300 rounded-full cursor-pointer"
            onClick={() => {
              onCancel?.();
              closeToast();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    { autoClose: false }, // keep it open until user acts
  );
};

export default ConfirmToast;
