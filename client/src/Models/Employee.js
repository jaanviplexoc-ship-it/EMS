/**
 * Mirrors EmployeeApp.Api/DTOs/Employee/CreateEmployeeDto.cs
 * NOTE: Create does NOT include "status" — the backend defaults it itself.
 */
export class CreateEmployeeRequest {
  constructor({
    employeeCode = "",
    firstName = "",
    lastName = "",
    email = "",
    phone = "",
    dateOfBirth = null,
    gender = "",
    joiningDate = "",
    salary = 0,
    departmentId = "",
    designationId = "",
    address = "",
    city = "",
    state = "",
    country = "",
    pincode = "",
  } = {}) {
    this.employeeCode = employeeCode;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.dateOfBirth = dateOfBirth || null;
    this.gender = gender || null;
    this.joiningDate = joiningDate;
    this.salary = Number(salary);
    this.departmentId = Number(departmentId);
    this.designationId = Number(designationId);
    this.address = address || null;
    this.city = city || null;
    this.state = state || null;
    this.country = country || null;
    this.pincode = pincode || null;
  }
}

/**
 * Mirrors EmployeeApp.Api/DTOs/Employee/UpdateEmployeeDto.cs
 * Includes employeeId + status, both required by the backend on update.
 */
export class UpdateEmployeeRequest extends CreateEmployeeRequest {
  constructor(values = {}) {
    super(values);
    this.employeeId = Number(values.employeeId);
    this.status = values.status || "Active";
  }
}

/** Mirrors EmployeeApp.Api/models/Employee.cs (shape of GET responses) */
export class Employee {
  constructor(data = {}) {
    this.employeeId = data.employeeId;
    this.employeeCode = data.employeeCode;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.dateOfBirth = data.dateOfBirth;
    this.gender = data.gender;
    this.joiningDate = data.joiningDate;
    this.salary = data.salary;
    this.departmentId = data.departmentId;
    this.designationId = data.designationId;
    this.status = data.status;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.country = data.country;
    this.pincode = data.pincode;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
