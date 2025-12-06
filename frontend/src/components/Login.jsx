import React from 'react'
import { loginStyles,  } from '../assets/dummyStyles'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, LogIn, Mail } from 'lucide-react'
import { useState } from 'react'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = ({onLoginSuccess = null }) => {

    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const API_BASE =  'http://localhost:4000/';
    const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError("");

    const validation= validate();
    setErrors(validation);
    if (Object.keys(validation).length ) return;
    setLoading (true);
   try {
  setLoading(true);

  const payload = {
    email: email.trim().toLowerCase(),
    password,
  };

  const resp = await fetch(`${API_BASE}api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  let data=null;

  // ✅ Properly parse JSON
 try {
      data = await resp.json();
    
 } catch (e) { /* empty */ }

  // ✅ If response is NOT OK → show error
  if (!resp.ok) {
    const msg = data?.message || "Login failed";
    setSubmitError(msg);
    return;
  }

  // ✅ If token exists → save to localStorage
  if (data?.token) {
    try {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user || { email: payload.email })
      );
    } catch (e) {
      console.error("LocalStorage error:", e);
    }
  }

  // ✅ Handle successful login
  const user = data.user || { email: payload.email };

  window.dispatchEvent(
    new CustomEvent("authChanged", { detail: { user } })
  );

  if (typeof onLoginSuccess === "function") onLoginSuccess(user);

  navigate("/", { replace: true });

} catch (err) {
  console.error("Login error:", err);
  setSubmitError("An error occurred during login. Please try again.");
} finally {
  setLoading(false);
}
    }

    


   const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";

    if (!password) e.password = "Password is required";
    return e;
  };



  return (
    <div className= {loginStyles.pageContainer}>
        <div className={loginStyles.bubble1}></div>
            <div className={loginStyles.bubble2}></div>
            <Link to ='/' className={loginStyles.backButton}>
            <ArrowLeft className={loginStyles.backButtonIcon}/>
            <span className={loginStyles.backButtonText}>Home</span>
            </Link>
            <div className={loginStyles.formContainer}>
                <form onSubmit={handleSubmit}  className={loginStyles.form} noValidate>
                    <div className={loginStyles.formWrapper}>
                        <div className={loginStyles.animatedBorder}>
                            <div className={loginStyles.formContent}>
                                <h2 className={loginStyles.heading}>
                                    <span className={loginStyles.headingIcon }>
                                        <LogIn className={loginStyles.headingIconInner}/>
                                    </span>
                                    <span className={loginStyles.headingText}>
                                        Login
                                    </span>
                                    </h2>
                                    <p className={loginStyles.subtitle}>

                                        Welcome back! Please enter your credentials to log in.
                                    </p>
                                    <label className={loginStyles.label}>
                                        <span className={loginStyles.labelText}>Email</span>
                                        <div className={loginStyles.inputContainer}>
                                            <span className={loginStyles.inputIcon}>
                                                <Mail className={loginStyles.inputIconInner} /></span>
                                                <input type='email' name='email' value={email} onChange={(e)=>{
                                                    setEmail(e.target.value);
                                                    if(errors.email)
                                                        setErrors((s)=> ({ 
                                                    ...s,
                                                    email:undefined,
                                                    
                                                    
                                                        }));
                                                }}
                                                
                                                
                                                className={`${loginStyles.input} ${
                                                    errors.email ? loginStyles.inputError 
                                                    : loginStyles.inputNormal
                                                }`} 
                                                placeholder='your@example'
                                                required />
                                        </div>

                                        {errors.email && (
                                            <p className={loginStyles.errorText}>{errors.email}</p>
                                        )}
                                    </label>


                                     <label className={loginStyles.label}>
                                        <span className={loginStyles.labelText}>Password</span>
                                        <div className={loginStyles.inputContainer}>
                                            <span className={loginStyles.inputIcon}>
                                                <Mail className={loginStyles.inputIconInner} /></span>
                                                <input type={showPassword ? 'text' : 'password'}
                                                 name='password'
                                                  value={password} onChange={(e)=>{
                                                    setPassword(e.target.value);
                                                    if(errors.email)
                                                        setErrors((s)=> ({ 
                                                    ...s,
                                                    password:undefined,
                                                    
                                                    
                                                        }));
                                                }}
                                                
                                                
                                                className={`${loginStyles.input} ${ loginStyles.passwordInput}${
                                                    errors.password ? loginStyles.inputError 
                                                    : loginStyles.inputNormal
                                                }`} 
                                                placeholder='enter password'
                                                required />


                                                <button type='button' onClick={()=>setShowPassword((s)=>!s)} className={loginStyles.passwordToggle}>
                                                    {showPassword ? (
                                                        <EyeOff className={loginStyles.passwordToggleIcon}/>
                                                    ) : (
                                                        <Eye className={loginStyles.passwordToggleIcon}/>
                                                    )}

                                                </button>
                                        </div>

                                        {errors.password && (
                                            <p className={loginStyles.errorText}>{errors.password}</p>
                                        )}
                                    </label>
                                    {submitError && (
                                        <p className={loginStyles.submitErrorText}>{submitError}</p>
                                    )}
                                   <div className={loginStyles.buttonsContainer}>
  <button
    type="submit"
    disabled={loading}
    className={loginStyles.submitButton}
  >
    {loading ? (
      "Logging in..."
    ) : (
      <>
        <LogIn className={loginStyles.submitButtonIcon} />
        <span className={loginStyles.submitButtonText}>Login</span>
      </>
    )}
  </button>

  <div className={loginStyles.signupContainer}>
    <div className={loginStyles.signupContent}>

        <span className={loginStyles.signupText}>Don't have an account?</span>
        <Link to="/signup" className={loginStyles.signupLink}>Create Account</Link>
    </div>

  </div>
</div>

                                             

                                               
                                       
                                   
                                
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <style>{loginStyles.animations}</style>
    </div>




  )
}

export default Login;