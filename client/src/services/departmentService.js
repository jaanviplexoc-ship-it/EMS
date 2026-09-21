import axiosClient from "../api/axiosClient";

// Routes match EmployeeApp.Api/controllers/DepartmentController.cs -> /api/Department

export async function getAllDepartments() {
  const response = await axiosClient.get("/Department");
  return response.data;
}

export async function getDepartmentById(id) {
  const response = await axiosClient.get(`/Department/${id}`);
  return response.data;
}

export async function createDepartment(dto) {
  const response = await axiosClient.post("/Department", dto);
  return response.data;
}

export async function updateDepartment(id, dto) {
  const response = await axiosClient.put(`/Department/${id}`, dto);
  return response.data;
}

export async function deleteDepartment(id) {
  await axiosClient.delete(`/Department/${id}`);
}
