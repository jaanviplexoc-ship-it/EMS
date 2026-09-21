/** Mirrors EmployeeApp.Api/DTOs/Department/CreateDepartmentDto.cs */
export class CreateDepartmentRequest {
  constructor({ departmentName = "", description = "" } = {}) {
    this.departmentName = departmentName;
    this.description = description || null;
  }
}

/** Mirrors EmployeeApp.Api/DTOs/Department/UpdateDepartmentDto.cs */
export class UpdateDepartmentRequest extends CreateDepartmentRequest {
  constructor({ departmentId, departmentName, description, isActive = true } = {}) {
    super({ departmentName, description });
    this.departmentId = Number(departmentId);
    this.isActive = isActive;
  }
}

/** Mirrors EmployeeApp.Api/models/Department.cs */
export class Department {
  constructor(data = {}) {
    this.departmentId = data.departmentId;
    this.departmentName = data.departmentName;
    this.description = data.description;
    this.isActive = data.isActive;
  }
}
