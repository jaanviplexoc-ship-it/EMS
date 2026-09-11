namespace EmployeeApp.Api.DTOs.Designation;

public class CreateDesignationDto
{
    public required string DesignationName { get; set; }
    public string? Description { get; set; }
}