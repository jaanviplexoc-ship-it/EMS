using EmployeeApp.Api.DTOs.Employee;
using EmployeeApp.Api.services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApp.Api.controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _service;

    public EmployeeController(IEmployeeService service)
    {
        _service = service;
    }

    // GET: api/Employee
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _service.GetAllAsync();

        return Ok(employees);
    }

    // GET: api/Employee/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await _service.GetByIdAsync(id);

        if (employee == null)
            return NotFound();

        return Ok(employee);
    }

    // POST: api/Employee
    [HttpPost]
    public async Task<IActionResult> Create(CreateEmployeeDto dto)
    {
        var employee = await _service.CreateAsync(dto);

        return Ok(employee);
    }

    // PUT: api/Employee/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateEmployeeDto dto)
    {
        if (id != dto.EmployeeId)
            return BadRequest();

        var updated = await _service.UpdateAsync(dto);

        if (!updated)
            return NotFound();

        return Ok(dto);
    }

    // DELETE: api/Employee/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}