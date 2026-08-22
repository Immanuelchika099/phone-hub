import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiArrowLeft, FiLock, FiMail } from "react-icons/fi";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main className="auth-page">
      <motion.div className="auth-orb auth-orb-one" animate={{ y: [0, -18, 0] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="auth-orb auth-orb-two" animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }} />

      <motion.section
        className="auth-card"
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className="auth-back"><FiArrowLeft /> Back to PhoneHub</Link>

        <div className="auth-brand"><span>PHONE</span>HUB</div>
        <p className="auth-eyebrow">WELCOME BACK</p>
        <h1>Sign in to your account.</h1>
        <p className="auth-subtitle">Access your PhoneHub experience and keep exploring the latest devices.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email address</label>
          <div className="auth-input-wrap">
            <FiMail />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>

          <label>Password</label>
          <div className="auth-input-wrap">
            <FiLock />
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="auth-options"><label className="remember"><input type="checkbox" /> Remember me</label><button type="button" className="auth-link">Forgot password?</button></div>
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="auth-submit" type="submit">Sign in</motion.button>
        </form>

        <p className="auth-switch">Don't have an account? <Link to="/signup">Create one</Link></p>
      </motion.section>
    </main>
  );
}

export default Login;
