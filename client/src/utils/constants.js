// These claim type keys are exactly what ASP.NET Core writes into the JWT
// payload for this backend, because AuthService.cs builds the token with
// System.Security.Claims.ClaimTypes constants directly (new JwtSecurityToken
// with raw Claims, no outbound short-name mapping). So the decoded payload
// keys are the long URIs below, not "sub"/"email"/"role".
export const JWT_CLAIM_KEYS = {
  NAME_IDENTIFIER: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  EMAIL: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  ROLE: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
};

export const EMPLOYEE_STATUS_OPTIONS = ["Active", "Inactive"];

export const GENDER_OPTIONS = ["Male", "Female", "Other"];

export const TOKEN_STORAGE_KEY = "ems_token";
export const USER_STORAGE_KEY = "ems_user";
