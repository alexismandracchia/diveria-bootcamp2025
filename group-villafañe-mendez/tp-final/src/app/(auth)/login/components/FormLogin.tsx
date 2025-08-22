"use client";
import { ShadowButton } from "@/components/buttons/Buttons";
import { FloatingInput } from "@/components/inputs/Inputs";
import { useState, useMemo } from "react";
import type { FormEvent } from "react";
import CheckboxField from "@/components/inputs/CheckboxField";
import { validateLoginForm } from "@/lib/validators";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthProvider";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { showToast } = useToast();
  const { login } = useAuth();

  const isValid = useMemo(() => {
    const errors = validateLoginForm(email, password);
    return !errors;
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      showToast("Algunos valores no son válidos, verifica tu información.");
      return;
    }

    try {
      await login(email, password, rememberMe);
    } catch (err: any) {
      showToast(err.message || "Credenciales inválidas");
      setEmailError("Ingresa un email valido");
      setPasswordError("Verifica tu contraseña");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <FloatingInput
        id="email"
        label="Email"
        type="email"
        value={email}
        className="my-3"
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />
      <FloatingInput
        id="password"
        label="Contraseña"
        type="password"
        value={password}
        className="my-3"
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />
      <div className="flex items-center my-4">
        <CheckboxField
          label="Recuedame"
          checked={rememberMe}
          onChange={(checked) => setRememberMe(checked)}
        />
      </div>
      <ShadowButton type="submit" disabled={!isValid}>
        Ingresar
      </ShadowButton>
    </form>
  );
};

export default FormLogin;
