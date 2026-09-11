using EmployeeApp.Api.data;
using EmployeeApp.Api.models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApp.Api.repositories;

public class DesignationRepository : IDesignationRepository
{
    private readonly EmployeeDbContext _context;

    public DesignationRepository(EmployeeDbContext context)
    {
        _context = context;
    }

    public async Task<List<Designation>> GetAllAsync()
    {
        return await _context.Designations.ToListAsync();
    }

    public async Task<Designation?> GetByIdAsync(int id)
    {
        return await _context.Designations
            .FirstOrDefaultAsync(d => d.DesignationId == id);
    }

    public async Task<Designation> AddAsync(Designation designation)
    {
        _context.Designations.Add(designation);
        await _context.SaveChangesAsync();
        return designation;
    }

    public async Task<bool> UpdateAsync(Designation designation)
    {
        var existingDesignation = await _context.Designations
            .FirstOrDefaultAsync(d => d.DesignationId == designation.DesignationId);

        if (existingDesignation == null)
            return false;

        existingDesignation.DesignationName = designation.DesignationName;
        existingDesignation.Description = designation.Description;
        existingDesignation.IsActive = designation.IsActive;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var designation = await _context.Designations
            .FirstOrDefaultAsync(d => d.DesignationId == id);

        if (designation == null)
            return false;

        _context.Designations.Remove(designation);
        await _context.SaveChangesAsync();
        return true;
    }
}