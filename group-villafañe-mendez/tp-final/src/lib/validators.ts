export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export function validateLoginForm(
  email: string,
  password: string
): LoginFormErrors | null {
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

export interface ProductFormErrors {
  title?: string;
  price?: string;
  stock?: string;
}

export function validateProductForm(formData: {
  title: string;
  price: number;
  stock: number;
}): ProductFormErrors | null {
  const errors: ProductFormErrors = {};

  const title = formData.title.trim();
  if (!title) {
    errors.title = "El nombre del producto es obligatorio";
  } else if (title.length < 3) {
    errors.title = "El nombre debe tener al menos 3 caracteres";
  } else if (title.length > 50) {
    errors.title = "El nombre no puede superar 50 caracteres";
  } else if (/[^a-zA-Z0-9\s]/.test(title)) {
    errors.title = "El nombre no puede contener símbolos especiales";
  }

  if (formData.price <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  } else if (/^0\d+/.test(formData.price.toString())) {
    errors.price = "El precio no puede tener ceros adelante";
  }

  if (formData.stock <= 0) {
    errors.stock = "El stock debe ser mayor a 0";
  } else if (!Number.isInteger(formData.stock)) {
    errors.stock = "El stock debe ser un número entero";
  } else if (/^0\d+/.test(formData.stock.toString())) {
    errors.stock = "El stock no puede tener ceros adelante";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
