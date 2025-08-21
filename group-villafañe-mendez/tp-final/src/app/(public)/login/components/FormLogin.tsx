"use client";
import { ShadowButton } from "@/components/buttons/Buttons";
import { FloatingInput } from "@/components/inputs/Inputs";
import { useState } from "react";
import type { FormEvent } from "react";
import CheckboxField from "@/components/inputs/CheckboxField";
import { validateLoginForm } from "@/lib/validators";
import { useToast } from "@/app/context/ToastContext";
import { useAuth } from "@/context/AuthProvider";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { showToast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    setEmailError("");
    setPasswordError("");
  
    const errors = validateLoginForm(email, password);
  
    if (errors) {
      setEmailError(errors.email || "");
      setPasswordError(errors.password || "");
      showToast("Algunos valores no son válidos, verifica tu información.");
      return;
    }

    try {
      await login(email, password);
      showToast("¡Bienvenido!");
    } catch (err: any) {
      showToast(err.message || "Error en el inicio de sesión");
      setEmailError(" ");
      setPasswordError(err.message || "Credenciales inválidas");
    }
  };


  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <FloatingInput
        id="email"
        label="Your email"
        type="email"
        value={email}
        className="my-3"
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />
      <FloatingInput
        id="password"
        label="Password"
        type="password"
        value={password}
        className="my-3"
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />
      <div className="flex items-center my-4">
        <CheckboxField label="Remember me" />
      </div>
      <ShadowButton type="submit">Submit</ShadowButton>
    </form>
  );
};

export default FormLogin;
