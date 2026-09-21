export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

export function isValidPhone(phone) {
  return /^[0-9+\-\s]{7,15}$/.test(phone);
}

/**
 * Validates the Login form.
 * Returns an { field: message } object; empty object means valid.
 */
export function validateLogin({ email, password }) {
  const errors = {};
  if (!isRequired(email)) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";

  if (!isRequired(password)) errors.password = "Password is required.";

  return errors;
}

/**
 * Validates the Register form.
 * NOTE: the backend does not have a /register endpoint yet — this validates
 * the shape the frontend will send once it exists.
 */
export function validateRegister({ email, password, confirmPassword }) {
  const errors = {};
  if (!isRequired(email)) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";

  if (!isRequired(password)) errors.password = "Password is required.";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters.";

  if (confirmPassword !== password)
    errors.confirmPassword = "Passwords do not match.";

  return errors;
}

export function validateEmployee(values) {
  const errors = {};
  if (!isRequired(values.employeeCode)) errors.employeeCode = "Employee code is required.";
  if (!isRequired(values.firstName)) errors.firstName = "First name is required.";
  if (!isRequired(values.lastName)) errors.lastName = "Last name is required.";
  if (!isRequired(values.email)) errors.email = "Email is required.";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email address.";
  if (!isRequired(values.phone)) errors.phone = "Phone is required.";
  else if (!isValidPhone(values.phone)) errors.phone = "Enter a valid phone number.";
  if (!isRequired(values.joiningDate)) errors.joiningDate = "Joining date is required.";
  if (!isRequired(values.salary)) errors.salary = "Salary is required.";
  if (!isRequired(values.departmentId)) errors.departmentId = "Department is required.";
  if (!isRequired(values.designationId)) errors.designationId = "Designation is required.";
  return errors;
}

export function validateDepartment(values) {
  const errors = {};
  if (!isRequired(values.departmentName)) errors.departmentName = "Department name is required.";
  return errors;
}

export function validateDesignation(values) {
  const errors = {};
  if (!isRequired(values.designationName)) errors.designationName = "Designation name is required.";
  return errors;
}
