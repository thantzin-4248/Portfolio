
import { useEffect, useRef } from "react";

export default function ProjectFormModal({
  isOpen,
  onClose,
  children,
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleEscape(event) {
    // Keep the dialog open until the parent decides whether to close it.
    event.preventDefault();
    onClose();
  }

  function handleDialogClick(event) {
    // Clicking inside the dialog must not close it.
    // The backdrop click targets the dialog element itself.
    if (event.target === dialogRef.current) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleEscape}
      onClick={handleDialogClick}
      aria-labelledby="project-modal-title"
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/70 dark:bg-slate-950 dark:text-white"
    >
      {isOpen && (
        <div className="relative p-5 sm:p-8">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => onClose()}
            aria-label="Close project form"
            className="absolute right-4 top-4 rounded-lg p-2 text-2xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <div className="pr-8">{children}</div>
        </div>
      )}
    </dialog>
  );
}
