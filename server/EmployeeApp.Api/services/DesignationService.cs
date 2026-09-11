using EmployeeApp.Api.DTOs.Designation;
using EmployeeApp.Api.models;
using EmployeeApp.Api.repositories;

namespace EmployeeApp.Api.services;

public class DesignationService : IDesignationService
{
    private readonly IDesignationRepository _repository;

    public DesignationService(IDesignationRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Designation>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Designation?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<Designation> CreateAsync(CreateDesignationDto dto)
    {
        var designation = new Designation
        {
            DesignationName = dto.DesignationName,
            Description = dto.Description
        };

        return await _repository.AddAsync(designation);
    }

    public async Task<bool> UpdateAsync(UpdateDesignationDto dto)
    {
        var designation = new Designation
        {
            DesignationId = dto.DesignationId,
            DesignationName = dto.DesignationName,
            Description = dto.Description,
            IsActive = dto.IsActive
        };

        return await _repository.UpdateAsync(designation);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}