namespace EmployeeApp.Api.DTOs.Designation;

public class UpdateDesignationDto
{
    public int DesignationId { get; set; }

    public required string DesignationName { get; set; }
    public string? Description { get; set; }

    public bool IsActive { get; set; }
}