using EmployeeApp.Api.DTOs.Department;
using EmployeeApp.Api.services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApp.Api.controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{
    private readonly IDepartmentService _service;

    public DepartmentController(IDepartmentService service)
    {
        _service = service;
    }

    // GET: api/Department
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var departments = await _service.GetAllAsync();

        return Ok(departments);
    }

    // GET: api/Department/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var department = await _service.GetByIdAsync(id);

        if (department == null)
            return NotFound();

        return Ok(department);
    }

    // POST: api/Department
    [HttpPost]
    public async Task<IActionResult> Create(CreateDepartmentDto dto)
    {
        var department = await _service.CreateAsync(dto);

        return Ok(department);
    }

    // PUT: api/Department/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateDepartmentDto dto)
    {
        if (id != dto.DepartmentId)
            return BadRequest();

        var updated = await _service.UpdateAsync(dto);

        if (!updated)
            return NotFound();

        return Ok(dto);
    }

    // DELETE: api/Department/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}