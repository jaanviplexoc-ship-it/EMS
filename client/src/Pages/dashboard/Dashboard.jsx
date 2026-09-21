import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";
import Alert from "../../components/common/Alert";
import { getAllEmployees } from "../../services/employeeService";
import { getAllDepartments } from "../../services/departmentService";
import { getAllDesignations } from "../../services/designationService";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    async function loadAll() {
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
        setError("Could not load dashboard data. Check the API is running and reachable.");
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const activeEmployees = employees.filter((e) => e.status === "Active").length;
  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate))
    .slice(0, 5);

  function departmentName(id) {
    return departments.find((d) => d.departmentId === id)?.departmentName || "-";
  }

  return (
    <DashboardLayout title="Dashboard">
      <Alert type="error">{error}</Alert>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="label">Total Employees</div>
              <div className="value">{employees.length}</div>
            </div>
            <div className="stat-card">
              <div className="label">Active Employees</div>
              <div className="value">{activeEmployees}</div>
            </div>
            <div className="stat-card">
              <div className="label">Departments</div>
              <div className="value">{departments.length}</div>
            </div>
            <div className="stat-card">
              <div className="label">Designations</div>
              <div className="value">{designations.length}</div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Recently Joined</h2>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Joining Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="empty-state">No employees yet.</div>
                      </td>
                    </tr>
                  ) : (
                    recentEmployees.map((emp) => (
                      <tr key={emp.employeeId}>
                        <td>{emp.employeeCode}</td>
                        <td>
                          {emp.firstName} {emp.lastName}
                        </td>
                        <td>{departmentName(emp.departmentId)}</td>
                        <td>
                          {emp.joiningDate
                            ? new Date(emp.joiningDate).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>{emp.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
