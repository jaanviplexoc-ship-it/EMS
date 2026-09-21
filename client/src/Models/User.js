/**
 * Mirrors EmployeeApp.Api/models/User.cs (fields we get back via the JWT,
 * since AuthController never returns the User object directly, only a token).
 */
export class User {
  constructor({ userId = null, email = "", role = "", employeeId = null } = {}) {
    this.userId = userId;
    this.email = email;
    this.role = role;
    this.employeeId = employeeId;
  }
}

/** Mirrors EmployeeApp.Api/DTOs/LoginDto.cs */
export class LoginRequest {
  constructor({ email = "", password = "" } = {}) {
    this.email = email;
    this.password = password;
  }
}

/**
 * Shape for the future register endpoint. The backend does not expose
 * POST /api/Auth/register yet — this is the payload the frontend is
 * ready to send once it does.
 */
export class RegisterRequest {
  constructor({ email = "", password = "", role = "Employee", employeeId = null } = {}) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.employeeId = employeeId;
  }
}
