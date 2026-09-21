import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";
import Alert from "../../components/common/Alert";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import {
  getAllEmployees,
  deleteEmployee,
} from "../../services/employeeService";
import { getAllDepartments } from "../../services/departmentService";
import { getAllDesignations } from "../../services/designationService";

export default function EmployeeList() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [empData, deptData, desigData] = await Promise.all([
        getAllEmployees(),
        getAllDepartments(),
        getAllDesignations(),
      ]);
      setEmployees(empData);
      setDepartments(deptData);
      setDesignations(desigData);
    } catch (err) {
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function departmentName(id) {
    return departments.find((d) => d.departmentId === id)?.departmentName || "-";
  }

  function designationName(id) {
    return designations.find((d) => d.designationId === id)?.designationName || "-";
  }

  const filtered = useMemo(() => {
    return employees.filter((emp) => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const matchesSearch =
        !search ||
        fullName.includes(search.toLowerCase()) ||
        emp.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase());
      const matchesDept =
        !departmentFilter || emp.departmentId === Number(departmentFilter);
      const matchesStatus = !statusFilter || emp.status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, search, departmentFilter, statusFilter]);

  async function handleDeleteConfirmed() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteEmployee(pendingDelete.employeeId);
      setEmployees((prev) =>
        prev.filter((e) => e.employeeId !== pendingDelete.employeeId)
      );
      setPendingDelete(null);
    } catch (err) {
      setError("Failed to delete employee.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <DashboardLayout title="Employees">
      <Alert type="error">{error}</Alert>

      <div className="toolbar">
        <div className="filters">
          <input
            className="search-input"
            placeholder="Search by name, code or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All departments</option>
            {departments.map((d) => (
              <option key={d.departmentId} value={d.departmentId}>
                {d.departmentName}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/employees/new")}>
          + Add Employee
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
                  <th>Code</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="empty-state">No employees found.</div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((emp) => (
                    <tr key={emp.employeeId}>
                      <td>{emp.employeeCode}</td>
                      <td>
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td>{emp.email}</td>
                      <td>{departmentName(emp.departmentId)}</td>
                      <td>{designationName(emp.designationId)}</td>
                      <td>
                        <StatusBadge active={emp.status === "Active"} />
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => navigate(`/employees/${emp.employeeId}/edit`)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => setPendingDelete(emp)}
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

      {pendingDelete && (
        <ConfirmDialog
          title="Delete employee"
          message={`Are you sure you want to delete ${pendingDelete.firstName} ${pendingDelete.lastName}? This cannot be undone.`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setPendingDelete(null)}
          loading={deleting}
        />
      )}
    </DashboardLayout>
  );
}
