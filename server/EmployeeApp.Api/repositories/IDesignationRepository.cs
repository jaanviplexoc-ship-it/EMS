using EmployeeApp.Api.models;

namespace EmployeeApp.Api.repositories;

    public interface IDesignationRepository
    {
        Task<List<Designation>> GetAllAsync();
        Task<Designation?> GetByIdAsync(int id);
        Task<Designation> AddAsync(Designation designation);
        Task<bool> UpdateAsync(Designation designation);
        Task<bool> DeleteAsync(int id);
    }
