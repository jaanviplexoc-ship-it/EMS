import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateRegister } from "../../utils/validators";
import Alert from "../../components/common/Alert";

// NOTE: EmployeeApp.Api does not have a /api/Auth/register endpoint yet
// (only /api/Auth/login exists today). This page is fully built and wired
// to authService.register(), so it will start working the moment you add
// that endpoint on the backend — see services/authService.js for the
// suggested request/response shape.

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");

    const validationErrors = validateRegister(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const result = await register({
        email: form.email,
        password: form.password,
        role: "Employee",
        employeeId: null,
      });
      if (result) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setApiError(
          "Registration endpoint isn't available on the backend yet (POST /api/Auth/register). Add it to AuthController, then this form will work as-is."
        );
      } else if (err.code === "ERR_NETWORK") {
        setApiError(
          "Could not reach the API. Is the backend running, and is CORS enabled for this origin?"
        );
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="subtitle">Register for Employee Management System</p>

        <Alert type="error">{apiError}</Alert>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
            {errors.password && (
              <div className="field-error">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && (
              <div className="field-error">{errors.confirmPassword}</div>
            )}
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
