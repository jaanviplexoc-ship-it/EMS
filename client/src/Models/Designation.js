/** Mirrors EmployeeApp.Api/DTOs/Designation/CreateDesignationDto.cs */
export class CreateDesignationRequest {
  constructor({ designationName = "", description = "" } = {}) {
    this.designationName = designationName;
    this.description = description || null;
  }
}

/** Mirrors EmployeeApp.Api/DTOs/Designation/UpdateDesignationDto.cs */
export class UpdateDesignationRequest extends CreateDesignationRequest {
  constructor({ designationId, designationName, description, isActive = true } = {}) {
    super({ designationName, description });
    this.designationId = Number(designationId);
    this.isActive = isActive;
  }
}

/** Mirrors EmployeeApp.Api/models/Designation.cs */
export class Designation {
  constructor(data = {}) {
    this.designationId = data.designationId;
    this.designationName = data.designationName;
    this.description = data.description;
    this.isActive = data.isActive;
  }
}
