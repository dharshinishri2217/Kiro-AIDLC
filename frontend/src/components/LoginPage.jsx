import { useState } from "react";
import { register, login } from "../api.js";

const floatingEmojis = ["", "", "", "", "", "", "", ""];

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", age: "", gender: "", email: "", password: "", relation: "" });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (mode === "register" && !form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (mode === "register" && (!form.age || form.age < 10 || form.age > 100)) e.age = "Enter a valid age";
    if (mode === "register" && !form.gender) e.gender = "Please select your gender";
    if (mode === "register" && !form.relation) e.relation = "Please select your perspective";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      let result;
      if (mode === "register") {
        result = await register({ name: form.name, email: form.email, password: form.password, age: Number(form.age), gender: form.gender, relation: form.relation });
      } else {
        result = await login(form.email, form.password);
      }
      if (result.token) {
        localStorage.setItem("iss_token", result.token);
        localStorage.setItem("iss_user", JSON.stringify(result.user));
        onLogin(result.user);
      } else {
        setServerError(result.message || "Something went wrong");
      }
    } catch {
      setServerError("Cannot connect to server. Make sure the backend is running.");
    }
    setLoading(false);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem",
    border: `2px solid ${errors[field] ? "#f87171" : focused === field ? "#a855f7" : "#e9d5ff"}`,
    outline: "none", fontSize: "0.875rem", color: "#1f2937",
    background: errors[field] ? "#fff1f2" : "rgba(255,255,255,0.85)",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  });

  const labelStyle = { fontSize: "0.7rem", fontWeight: "700", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.25rem" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2.5rem 1rem", background: "linear-gradient(135deg,#667eea 0%,#764ba2 40%,#f093fb 100%)", position: "relative", overflow: "hidden" }}>
      {floatingEmojis.map((em, i) => (
        <span key={i} style={{ position: "absolute", fontSize: "1.5rem", opacity: 0.15, left: `${(i * 13) % 95}%`, top: `${(i * 17 + 5) % 85}%`, userSelect: "none", pointerEvents: "none" }}>{em}</span>
      ))}

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "420px" }}>
        <div style={{ background: "rgba(255,255,255,0.93)", borderRadius: "1.5rem", boxShadow: "0 25px 50px rgba(0,0,0,0.2)", padding: "2rem", border: "1px solid rgba(255,255,255,0.5)" }}>

          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}></div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#4c1d95", margin: 0 }}>If She Stopped</h1>
            <p style={{ color: "#7c3aed", fontSize: "0.8rem", margin: "0.25rem 0 1rem" }}>An impact simulator for invisible work</p>
            <div style={{ display: "flex", background: "#f3e8ff", borderRadius: "0.75rem", padding: "0.25rem" }}>
              {["login", "register"].map((m) => (
                <button key={m} onClick={() => { setMode(m); setErrors({}); setServerError(""); }}
                  style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "none", fontWeight: "600", fontSize: "0.875rem", cursor: "pointer", transition: "all 0.2s", background: mode === m ? "white" : "transparent", color: mode === m ? "#7c3aed" : "#9ca3af", boxShadow: mode === m ? "0 2px 8px rgba(0,0,0,0.1)" : "none" }}>
                  {m === "login" ? "Sign In" : "Register"}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {mode === "register" && (
              <div>
                <label style={labelStyle}>Your Name</label>
                <input type="text" placeholder="e.g. Amara" value={form.name} style={inputStyle("name")}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} />
                {errors.name && <p style={{ color: "#ef4444", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>{errors.name}</p>}
              </div>
            )}

            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" placeholder="you@example.com" value={form.email} style={inputStyle("email")}
                onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} />
              {errors.email && <p style={{ color: "#ef4444", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>{errors.email}</p>}
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" placeholder="Min. 6 characters" value={form.password} style={inputStyle("password")}
                onFocus={() => setFocused("password")} onBlur={() => setFocused("")}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: "" }); }} />
              {errors.password && <p style={{ color: "#ef4444", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>{errors.password}</p>}
            </div>

            {mode === "register" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>Age</label>
                    <input type="number" placeholder="25" min="10" max="100" value={form.age} style={inputStyle("age")}
                      onFocus={() => setFocused("age")} onBlur={() => setFocused("")}
                      onChange={(e) => { setForm({ ...form, age: e.target.value }); setErrors({ ...errors, age: "" }); }} />
                    {errors.age && <p style={{ color: "#ef4444", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>{errors.age}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Gender</label>
                    <select value={form.gender} style={inputStyle("gender")}
                      onFocus={() => setFocused("gender")} onBlur={() => setFocused("")}
                      onChange={(e) => { setForm({ ...form, gender: e.target.value }); setErrors({ ...errors, gender: "" }); }}>
                      <option value="">Select</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                    {errors.gender && <p style={{ color: "#ef4444", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>{errors.gender}</p>}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>I am here as a...</label>
                  <select value={form.relation} style={inputStyle("relation")}
                    onFocus={() => setFocused("relation")} onBlur={() => setFocused("")}
                    onChange={(e) => { setForm({ ...form, relation: e.target.value }); setErrors({ ...errors, relation: "" }); }}>
                    <option value="">Choose your perspective</option>
                    <option>Someone who carries this work</option>
                    <option>A partner wanting to understand</option>
                    <option>A student or researcher</option>
                    <option>An educator or advocate</option>
                    <option>Just curious</option>
                  </select>
                  {errors.relation && <p style={{ color: "#ef4444", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>{errors.relation}</p>}
                </div>
              </>
            )}

            {serverError && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "0.75rem", padding: "0.75rem", color: "#dc2626", fontSize: "0.8rem" }}>
                 {serverError}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ marginTop: "0.5rem", width: "100%", padding: "0.875rem", borderRadius: "0.75rem", fontWeight: "700", color: "white", fontSize: "1rem", border: "none", background: loading ? "#c4b5fd" : "linear-gradient(135deg,#7c3aed,#a855f7)", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 15px rgba(124,58,237,0.35)", transition: "all 0.2s" }}>
              {loading ? "Please wait..." : mode === "register" ? "Create Account " : "Sign In "}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#9ca3af", marginTop: "1rem" }}>
            Your data is stored securely. No data is shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
