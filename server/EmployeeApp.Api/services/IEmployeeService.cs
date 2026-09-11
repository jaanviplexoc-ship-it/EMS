using EmployeeApp.Api.DTOs.Employee;
using EmployeeApp.Api.models;

namespace EmployeeApp.Api.services;

public interface IEmployeeService
{
    Task<List<Employee>> GetAllAsync();
    Task<Employee?> GetByIdAsync(int id);

    Task<Employee> CreateAsync(CreateEmployeeDto dto);
    Task<bool> UpdateAsync(UpdateEmployeeDto dto);

    Task<bool> DeleteAsync(int id);
}