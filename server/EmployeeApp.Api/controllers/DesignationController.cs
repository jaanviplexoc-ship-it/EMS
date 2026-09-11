using EmployeeApp.Api.DTOs.Designation;
using EmployeeApp.Api.services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApp.Api.controllers;

[ApiController]
[Route("api/[controller]")]
public class DesignationController : ControllerBase
{
    private readonly IDesignationService _service;

    public DesignationController(IDesignationService service)
    {
        _service = service;
    }

    // GET: api/Designation
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var designations = await _service.GetAllAsync();

        return Ok(designations);
    }

    // GET: api/Designation/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var designation = await _service.GetByIdAsync(id);

        if (designation == null)
            return NotFound();

        return Ok(designation);
    }

    // POST: api/Designation
    [HttpPost]
    public async Task<IActionResult> Create(CreateDesignationDto dto)
    {
        var designation = await _service.CreateAsync(dto);

        return Ok(designation);
    }

    // PUT: api/Designation/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateDesignationDto dto)
    {
        if (id != dto.DesignationId)
            return BadRequest();

        var updated = await _service.UpdateAsync(dto);

        if (!updated)
            return NotFound();

        return Ok(dto);
    }

    // DELETE: api/Designation/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}