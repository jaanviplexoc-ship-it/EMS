import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";
import Alert from "../../components/common/Alert";
import {
  getEmployeeById,
  createEmployee,
  updateEmployee,
} from "../../services/employeeService";
import { getAllDepartments } from "../../services/departmentService";
import { getAllDesignations } from "../../services/designationService";
import { CreateEmployeeRequest, UpdateEmployeeRequest } from "../../models/Employee";
import { validateEmployee } from "../../utils/validators";
import { EMPLOYEE_STATUS_OPTIONS, GENDER_OPTIONS } from "../../utils/constants";

const emptyForm = {
  employeeCode: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  joiningDate: "",
  salary: "",
  departmentId: "",
  designationId: "",
  status: "Active",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
};

function toDateInputValue(value) {
  if (!value) return "";
  return String(value).slice(0, 10);
}

export default function EmployeeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setApiError("");
      try {
        const [deptData, desigData] = await Promise.all([
          getAllDepartments(),
          getAllDesignations(),
        ]);
        setDepartments(deptData);
        setDesignations(desigData);

        if (isEdit) {
          const emp = await getEmployeeById(id);
          setForm({
            employeeCode: emp.employeeCode || "",
            firstName: emp.firstName || "",
            lastName: emp.lastName || "",
            email: emp.email || "",
            phone: emp.phone || "",
            dateOfBirth: toDateInputValue(emp.dateOfBirth),
            gender: emp.gender || "",
            joiningDate: toDateInputValue(emp.joiningDate),
            salary: emp.salary ?? "",
            departmentId: emp.departmentId ?? "",
            designationId: emp.designationId ?? "",
            status: emp.status || "Active",
            address: emp.address || "",
            city: emp.city || "",
            state: emp.state || "",
            country: emp.country || "",
            pincode: emp.pincode || "",
          });
        }
      } catch (err) {
        setApiError("Failed to load form data.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");

    const validationErrors = validateEmployee(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      if (isEdit) {
        const dto = new UpdateEmployeeRequest({ ...form, employeeId: id });
        await updateEmployee(id, dto);
      } else {
        // Create DTO intentionally has no "status" field — the backend
        // defaults it (see EmployeeApp.Api/models/Employee.cs).
        const dto = new CreateEmployeeRequest(form);
        await createEmployee(dto);
      }
      navigate("/employees");
    } catch (err) {
      setApiError(
        err.response?.data?.title ||
          err.response?.data ||
          "Failed to save employee. Check the fields and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DashboardLayout title={isEdit ? "Edit Employee" : "Add Employee"}>
      <div className="card">
        <div className="card-header">
          <h2>{isEdit ? "Edit Employee" : "New Employee"}</h2>
        </div>
        <div className="card-body">
          <Alert type="error">{apiError}</Alert>

          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="employeeCode">Employee Code</label>
                  <input
                    id="employeeCode"
                    name="employeeCode"
                    value={form.employeeCode}
                    onChange={handleChange}
                  />
                  {errors.employeeCode && (
                    <div className="field-error">{errors.employeeCode}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    disabled={!isEdit}
                  >
                    {EMPLOYEE_STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {!isEdit && (
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>
                      Set by the backend on create.
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <div className="field-error">{errors.firstName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <div className="field-error">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="field-error">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="field-error">{errors.phone}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="joiningDate">Joining Date</label>
                  <input
                    id="joiningDate"
                    name="joiningDate"
                    type="date"
                    value={form.joiningDate}
                    onChange={handleChange}
                  />
                  {errors.joiningDate && (
                    <div className="field-error">{errors.joiningDate}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="salary">Salary</label>
                  <input
                    id="salary"
                    name="salary"
                    type="number"
                    step="0.01"
                    value={form.salary}
                    onChange={handleChange}
                  />
                  {errors.salary && <div className="field-error">{errors.salary}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="departmentId">Department</label>
                  <select
                    id="departmentId"
                    name="departmentId"
                    value={form.departmentId}
                    onChange={handleChange}
                  >
                    <option value="">Select department</option>
                    {departments.map((d) => (
                      <option key={d.departmentId} value={d.departmentId}>
                        {d.departmentName}
                      </option>
                    ))}
                  </select>
                  {errors.departmentId && (
                    <div className="field-error">{errors.departmentId}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="designationId">Designation</label>
                  <select
                    id="designationId"
                    name="designationId"
                    value={form.designationId}
                    onChange={handleChange}
                  >
                    <option value="">Select designation</option>
                    {designations.map((d) => (
                      <option key={d.designationId} value={d.designationId}>
                        {d.designationName}
                      </option>
                    ))}
                  </select>
                  {errors.designationId && (
                    <div className="field-error">{errors.designationId}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input id="city" name="city" value={form.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    id="pincode"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/employees")}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit" disabled={submitting}>
                  {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Employee"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
