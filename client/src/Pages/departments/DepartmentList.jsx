import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";
import Alert from "../../components/common/Alert";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../services/departmentService";
import {
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "../../models/Department";
import { validateDepartment } from "../../utils/validators";

const emptyForm = { departmentName: "", description: "", isActive: true };

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create mode
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (err) {
      setError("Failed to load departments.");
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

  function openEdit(dept) {
    setEditing(dept);
    setForm({
      departmentName: dept.departmentName,
      description: dept.description || "",
      isActive: dept.isActive,
    });
    setErrors({});
    setModalOpen(true);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSave() {
    const validationErrors = validateDepartment(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    setError("");
    try {
      if (editing) {
        const dto = new UpdateDepartmentRequest({
          departmentId: editing.departmentId,
          ...form,
        });
        await updateDepartment(editing.departmentId, dto);
      } else {
        const dto = new CreateDepartmentRequest(form);
        await createDepartment(dto);
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      setError("Failed to save department.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteConfirmed() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteDepartment(pendingDelete.departmentId);
      setDepartments((prev) =>
        prev.filter((d) => d.departmentId !== pendingDelete.departmentId)
      );
      setPendingDelete(null);
    } catch (err) {
      setError("Failed to delete department.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <DashboardLayout title="Departments">
      <Alert type="error">{error}</Alert>

      <div className="toolbar">
        <div />
        <button className="btn btn-primary" onClick={openCreate}>
          + Add Department
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
                {departments.length === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="empty-state">No departments yet.</div>
                    </td>
                  </tr>
                ) : (
                  departments.map((dept) => (
                    <tr key={dept.departmentId}>
                      <td>{dept.departmentName}</td>
                      <td>{dept.description || "-"}</td>
                      <td>
                        <StatusBadge active={dept.isActive} />
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => openEdit(dept)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => setPendingDelete(dept)}
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
          title={editing ? "Edit Department" : "New Department"}
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
            <label htmlFor="departmentName">Department Name</label>
            <input
              id="departmentName"
              name="departmentName"
              value={form.departmentName}
              onChange={handleChange}
            />
            {errors.departmentName && (
              <div className="field-error">{errors.departmentName}</div>
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
          title="Delete department"
          message={`Are you sure you want to delete "${pendingDelete.departmentName}"?`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setPendingDelete(null)}
          loading={deleting}
        />
      )}
    </DashboardLayout>
  );
}
