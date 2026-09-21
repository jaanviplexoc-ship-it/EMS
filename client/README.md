# Employee Management System — Frontend (React + Vite)

A separate frontend client for the `EmployeeManagementSystem` .NET backend
(`EmployeeApp.Api`). Built to match its controllers/DTOs exactly.

## Folder structure

```
src/
  api/          axios instance (attaches JWT, base URL from .env)
  models/       JS classes mirroring the backend DTOs (Employee, Department,
                Designation, User/Login/Register requests)
  services/     one file per controller (authService, employeeService,
                departmentService, designationService)
  context/      AuthContext (login/logout/current user, from the JWT)
  utils/        constants, JWT decode, localStorage helpers, form validators
  components/
    layout/     Sidebar, Topbar, DashboardLayout
    common/     Loader, Alert, Modal, ConfirmDialog, StatusBadge
    routes/     ProtectedRoute
  pages/
    auth/       Login, Register
    dashboard/  Dashboard (stat cards + recent employees)
    employees/  EmployeeList, EmployeeForm (add/edit)
    departments/ DepartmentList (modal add/edit)
    designations/ DesignationList (modal add/edit)
```

## 1. IMPORTANT — enable CORS on the backend first

Your `Program.cs` currently has no CORS policy, so the browser will block
every request from this frontend (different origin/port) with a CORS error,
even though login itself would otherwise work. Add this to
`EmployeeApp.Api/Program.cs`:

```csharp
// Add this near the other builder.Services.Add... calls
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Vite dev server
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

And apply it, **before** `app.UseAuthentication()`:

```csharp
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
```

## 2. Configure the API URL

```bash
cp .env.example .env
```

Update `VITE_API_BASE_URL` to match the port your API actually runs on
(check the console when you `dotnet run` — there's no `launchSettings.json`
in the project you sent, so it isn't fixed to a particular port).

## 3. Install & run

```bash
npm install
npm run dev
```

Open http://localhost:5173. You'll land on `/login`.

## Login

Wired to your existing `POST /api/Auth/login`. On success the JWT is stored
in `localStorage` and decoded to get `email`/`role` (your backend writes
these using `ClaimTypes.*`, which serialize as long claim URIs — handled in
`utils/jwt.js`).

## Register — not live yet, ready to wire up

Your backend only has `/api/Auth/login` right now. The **Register page,
form, validation, and `authService.register()` call are fully built**
against `POST /api/Auth/register`, so as soon as you add that endpoint to
`AuthController` + `IAuthService`/`AuthService`, this page will work with
no frontend changes. Suggested response shape: return `{ token }` just like
login does, so the new user is signed in immediately.

## Notes on matching the backend exactly

- Routes are **singular** (`/api/Employee`, `/api/Department`,
  `/api/Designation`) because your controllers use
  `[Route("api/[controller]")]` on classes named `EmployeeController` etc.
- `CreateEmployeeDto` has **no `status` field** — the Employee add form
  doesn't send one either; the backend defaults it. The `status` dropdown
  only appears (and is editable) on the Edit form, since
  `UpdateEmployeeDto.Status` is required there.
- JSON casing: ASP.NET Core's default serializer emits camelCase
  (`employeeId`, `firstName`, ...) and binds incoming JSON
  case-insensitively, so the plain camelCase objects sent by this frontend
  bind correctly to your DTOs.
- Protected routes redirect to `/login` automatically on a 401 response
  (expired/invalid token).
