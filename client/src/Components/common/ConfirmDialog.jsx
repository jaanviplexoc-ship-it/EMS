import Modal from "./Modal";

export default function ConfirmDialog({
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-danger-solid"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmLabel}
          </button>
        </>
      }
    >
      <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-muted)" }}>
        {message}
      </p>
    </Modal>
  );
}
