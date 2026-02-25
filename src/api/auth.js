export async function signupAPI(formData) {
  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Signup failed");
  }

  return data;
}

export async function loginAPI(email, password) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function refreshTokenAPI(refreshToken) {
  const res = await fetch("http://localhost:5000/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Refresh token failed");
  }

  return data;
}

export async function forgotPasswordAPI(email) {
  const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Forgot password failed");
  }

  return data;
}


export async function resetPasswordAPI(data) {
  const res = await fetch("http://localhost:5000/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Reset failed");
  }

  return result;
}