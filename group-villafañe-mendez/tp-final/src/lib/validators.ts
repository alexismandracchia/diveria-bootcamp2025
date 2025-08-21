export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export function validateLoginForm(email: string, password: string): LoginFormErrors | null {
  const errors: LoginFormErrors = {};

  if (!email) {
    errors.email = "El email es obligatorio";
  } else if (!isValidEmail(email)) {
    errors.email = "El email no es válido";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria";
  } else if (!isValidPassword(password)) {
    errors.password =
      "La contraseña debe tener 8-20 caracteres, mayúscula, minúscula, número y símbolo";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;
  return passwordRegex.test(password);
}
