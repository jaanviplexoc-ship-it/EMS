import axiosClient from "../api/axiosClient";

// Routes match EmployeeApp.Api/controllers/DesignationController.cs -> /api/Designation

export async function getAllDesignations() {
  const response = await axiosClient.get("/Designation");
  return response.data;
}

export async function getDesignationById(id) {
  const response = await axiosClient.get(`/Designation/${id}`);
  return response.data;
}

export async function createDesignation(dto) {
  const response = await axiosClient.post("/Designation", dto);
  return response.data;
}

export async function updateDesignation(id, dto) {
  const response = await axiosClient.put(`/Designation/${id}`, dto);
  return response.data;
}

export async function deleteDesignation(id) {
  await axiosClient.delete(`/Designation/${id}`);
}
