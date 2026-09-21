import axiosClient from "../api/axiosClient";

// All routes match EmployeeApp.Api/controllers/EmployeeController.cs
// ([Route("api/[controller]")] on a class named EmployeeController -> /api/Employee)

export async function getAllEmployees() {
  const response = await axiosClient.get("/Employee");
  return response.data;
}

export async function getEmployeeById(id) {
  const response = await axiosClient.get(`/Employee/${id}`);
  return response.data;
}

export async function createEmployee(dto) {
  const response = await axiosClient.post("/Employee", dto);
  return response.data;
}

export async function updateEmployee(id, dto) {
  const response = await axiosClient.put(`/Employee/${id}`, dto);
  return response.data;
}

export async function deleteEmployee(id) {
  await axiosClient.delete(`/Employee/${id}`);
}
