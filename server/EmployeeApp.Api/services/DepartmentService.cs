using EmployeeApp.Api.DTOs.Department;
using EmployeeApp.Api.models;
using EmployeeApp.Api.repositories;

namespace EmployeeApp.Api.services;

public class DepartmentService : IDepartmentService
{
    private readonly IDepartmentRepository _repository;

    public DepartmentService(IDepartmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Department>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Department?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<Department> CreateAsync(CreateDepartmentDto dto)
    {
        var department = new Department
        {
            DepartmentName = dto.DepartmentName,
            Description = dto.Description
        };

        return await _repository.AddAsync(department);
    }

    public async Task<bool> UpdateAsync(UpdateDepartmentDto dto)
    {
        var department = new Department
        {
            DepartmentId = dto.DepartmentId,
            DepartmentName = dto.DepartmentName,
            Description = dto.Description,
            IsActive = dto.IsActive
        };

        return await _repository.UpdateAsync(department);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}