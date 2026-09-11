using EmployeeApp.Api.DTOs.Employee;
using EmployeeApp.Api.models;
using EmployeeApp.Api.repositories;

namespace EmployeeApp.Api.services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repository;

    public EmployeeService(IEmployeeRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Employee>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Employee?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<Employee> CreateAsync(CreateEmployeeDto dto)
    {
        var employee = new Employee
        {
            EmployeeCode = dto.EmployeeCode,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Phone = dto.Phone,
            DateOfBirth = dto.DateOfBirth,
            Gender = dto.Gender,
            JoiningDate = dto.JoiningDate,
            Salary = dto.Salary,
            DepartmentId = dto.DepartmentId,
            DesignationId = dto.DesignationId,
            Address = dto.Address,
            City = dto.City,
            State = dto.State,
            Country = dto.Country,
            Pincode = dto.Pincode
        };

        return await _repository.AddAsync(employee);
    }

    public async Task<bool> UpdateAsync(UpdateEmployeeDto dto)
    {
        var employee = new Employee
        {
            EmployeeId = dto.EmployeeId,
            EmployeeCode = dto.EmployeeCode,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Phone = dto.Phone,
            DateOfBirth = dto.DateOfBirth,
            Gender = dto.Gender,
            JoiningDate = dto.JoiningDate,
            Salary = dto.Salary,
            DepartmentId = dto.DepartmentId,
            DesignationId = dto.DesignationId,
            Status = dto.Status,
            Address = dto.Address,
            City = dto.City,
            State = dto.State,
            Country = dto.Country,
            Pincode = dto.Pincode
        };

        return await _repository.UpdateAsync(employee);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}