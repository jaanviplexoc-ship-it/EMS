namespace EmployeeApp.Api.DTOs.Department;

public class UpdateDepartmentDto
{
    public int DepartmentId { get; set; }

    public required string DepartmentName { get; set; }
    public string? Description { get; set; }

    public bool IsActive { get; set; }
}