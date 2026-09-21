import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const initial = user?.email ? user.email[0].toUpperCase() : "?";

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-user">
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 600 }}>{user?.email}</div>
          <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            {user?.role}
          </div>
        </div>
        <div className="user-badge">{initial}</div>
        <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
