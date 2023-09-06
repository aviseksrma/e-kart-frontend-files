import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./LoginPage.css";
import { getUser, login } from "../../services/userServices";

const schema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }).min(5),
  password: z
    .string()
    .min(8, { message: "Passowrd must be at least 8 charecters" }),
});

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await login(formData);

      const { state } = location;
      window.location = state ? state.from : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to='/' />;
  }

  return (
    <section className='align_center form_page'>
      <form className='authentication_form' onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className='form_inputs'>
          <div>
            <label htmlFor=''>Email</label>
            <input
              type='email'
              className='form_text_input'
              placeholder='Enter your Email'
              {...register("email")}
            />
            {errors.email && (
              <em className='form_error'>{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor=''>Password</label>
            <input
              type='password'
              className='form_text_input'
              placeholder='Enter your Password'
              {...register("password")}
            />
            {errors.password && (
              <em className='form_error'>{errors.password.message}</em>
            )}
          </div>

          {formError && <em className='form_error'>{formError}</em>}

          <button type='submit' className='search_button form_submit'>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
