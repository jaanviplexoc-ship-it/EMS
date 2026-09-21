import axiosClient from "../api/axiosClient";

/**
 * POST /api/Auth/login  (matches AuthController.Login)
 * Backend returns: { token: "<jwt>" }
 */
export async function login({ email, password }) {
  const response = await axiosClient.post("/Auth/login", { email, password });
  return response.data; // { token }
}

/**
 * POST /api/Auth/register  — NOT YET IMPLEMENTED ON THE BACKEND.
 * Kept here so the Register page has a real call to switch on the moment
 * you add [HttpPost("register")] to AuthController + a RegisterAsync method
 * to IAuthService/AuthService.
 *
 * Suggested backend shape to keep this frontend working unchanged:
 *   POST /api/Auth/register
 *   body: { email, password, role, employeeId }
 *   response: 200 OK (or 201) with { token } so the user is logged in
 *             immediately, same as login.
 */
export async function register({ email, password, role, employeeId }) {
  const response = await axiosClient.post("/Auth/register", {
    email,
    password,
    role,
    employeeId,
  });
  return response.data;
}
