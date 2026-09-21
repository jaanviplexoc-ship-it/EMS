import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";
import Alert from "../../components/common/Alert";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import {
  getAllDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
} from "../../services/designationService";
import {
  CreateDesignationRequest,
  UpdateDesignationRequest,
} from "../../models/Designation";
import { validateDesignation } from "../../utils/validators";

const emptyForm = { designationName: "", description: "", isActive: true };

export default function DesignationList() {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllDesignations();
      setDesignations(data);
    } catch (err) {
      setError("Failed to load designations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(desig) {
    setEditing(desig);
    setForm({
      designationName: desig.designationName,
      description: desig.description || "",
      isActive: desig.isActive,
    });
    setErrors({});
    setModalOpen(true);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSave() {
    const validationErrors = validateDesignation(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    setError("");
    try {
      if (editing) {
        const dto = new UpdateDesignationRequest({
          designationId: editing.designationId,
          ...form,
        });
        await updateDesignation(editing.designationId, dto);
      } else {
        const dto = new CreateDesignationRequest(form);
        await createDesignation(dto);
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      setError("Failed to save designation.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteConfirmed() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteDesignation(pendingDelete.designationId);
      setDesignations((prev) =>
        prev.filter((d) => d.designationId !== pendingDelete.designationId)
      );
      setPendingDelete(null);
    } catch (err) {
      setError("Failed to delete designation.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <DashboardLayout title="Designations">
      <Alert type="error">{error}</Alert>

      <div className="toolbar">
        <div />
        <button className="btn btn-primary" onClick={openCreate}>
          + Add Designation
        </button>
      </div>

      <div className="card">
        {loading ? (
          <Loader />
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {designations.length === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="empty-state">No designations yet.</div>
                    </td>
                  </tr>
                ) : (
                  designations.map((desig) => (
                    <tr key={desig.designationId}>
                      <td>{desig.designationName}</td>
                      <td>{desig.description || "-"}</td>
                      <td>
                        <StatusBadge active={desig.isActive} />
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => openEdit(desig)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => setPendingDelete(desig)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <Modal
          title={editing ? "Edit Designation" : "New Designation"}
          onClose={() => setModalOpen(false)}
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setModalOpen(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </>
          }
        >
          <div className="form-group">
            <label htmlFor="designationName">Designation Name</label>
            <input
              id="designationName"
              name="designationName"
              value={form.designationName}
              onChange={handleChange}
            />
            {errors.designationName && (
              <div className="field-error">{errors.designationName}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </div>
          {editing && (
            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  style={{ width: "auto" }}
                />
                Active
              </label>
            </div>
          )}
        </Modal>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete designation"
          message={`Are you sure you want to delete "${pendingDelete.designationName}"?`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setPendingDelete(null)}
          loading={deleting}
        />
      )}
    </DashboardLayout>
  );
}
