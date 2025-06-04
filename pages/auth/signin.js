// pages/auth/signin.js
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function signin() {
  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Attempt to sign in using the creadientials provided
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password
      });

      if (!result.error) {
        // sign in is successful
        router.push('/');
      } else {
        // Handle sign in error
        setError("Invalid email or password");
        setTimeout(() => {
          setError('');
        }, 4000); // remove error message after 3 seconds
      }
    } catch (error) {
      setError("something went wrong. please try again");
      setTimeout(() => {
        setError("");
      }, 4000);
    } finally {
      setLoading(false); // ensure loading in set to false in all cases
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign In</div>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="input"
              placeholder="Enter email Address"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="input"
              placeholder="password"
            />
            <button className="login-button" type="submit">
              sign up
            </button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
