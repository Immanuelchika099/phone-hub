import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiArrowLeft, FiLock, FiMail, FiUser, FiMoon, FiSun } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import "./Auth.css";
import "./Commerce.css";
import { useAuth } from "../context/AuthContext";

function Signup({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);
    try {
      const data = await signUp(form);
      if (data.session) {
        navigate(redirect, { replace: true });
      } else {
        setMessage("Account created. Check your email to confirm your account, then sign in.");
      }
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-topbar">
        <Link to="/" className="auth-back"><FiArrowLeft /> Back</Link>
        <button className="auth-theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
      <motion.div className="auth-orb auth-orb-one" animate={{ y: [0, -18, 0] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="auth-orb auth-orb-two" animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }} />
      <motion.section className="auth-card" initial={{ opacity: 0, y: 35, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="auth-brand"><span>PHONE</span>HUB</div>
        <p className="auth-eyebrow">JOIN PHONEHUB</p>
        <h1 className="auth-title">Create your account.</h1>
        <p className="auth-subtitle">Join PhoneHub and make your next device search simpler.</p>
        {error && <div className="commerce-error">{error}</div>}
        {message && <div className="commerce-success">{message}</div>}
        <motion.button type="button" className="google-submit" whileHover={{ y: -2 }} whileTap={{ scale: .98 }} onClick={() => setError("Google sign-in is not connected yet. Use email and password for now.")}><FcGoogle /> Continue with Google</motion.button>
        <div className="auth-divider"><span>or continue with email</span></div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Full name</label>
          <div className="auth-input-wrap"><FiUser /><input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your name" required /></div>
          <label>Email address</label>
          <div className="auth-input-wrap"><FiMail /><input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com" required /></div>
          <label>Password</label>
          <div className="auth-input-wrap"><FiLock /><input name="password" value={form.password} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Create a password" minLength="6" required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <FiEyeOff /> : <FiEye />}</button></div>
          <label className="terms"><input type="checkbox" required /> I agree to the terms and privacy policy.</label>
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: .98 }} className="auth-submit" type="submit" disabled={busy}>{busy ? "Creating account…" : "Create account"}</motion.button>
        </form>
        <p className="auth-switch">Already have an account? <Link to={`/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}>Sign in</Link></p>
      </motion.section>
    </main>
  );
}
export default Signup;
