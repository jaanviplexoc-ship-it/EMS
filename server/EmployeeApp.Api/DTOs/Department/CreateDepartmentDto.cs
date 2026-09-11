namespace EmployeeApp.Api.DTOs.Department;

public class CreateDepartmentDto
{
    public required string DepartmentName { get; set; }
    public string? Description { get; set; }
}