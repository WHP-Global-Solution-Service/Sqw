import API from "./apiClient.js";// axios instance ของคุณ

// GET PROFILE
export const getProfileAPI = async () => {
  const res = await API.get("/auth/profile");
  return {
    ...res.data,
    name: res.data.first_name + " " + res.data.last_name
  };
};

// UPDATE PROFILE
export const updateProfileAPI = async (data) => {
  const res = await API.put("/auth/profile", data);
  return {
    ...res.data,
    name: res.data.first_name + " " + res.data.last_name
  };
};

// CHANGE PASSWORD
export const changePasswordAPI = async (data) => {
  const res = await API.put("/auth/security/change-password", data);
  return {
    ...res.data,
    name: res.data.first_name + " " + res.data.last_name
  };
};

// TOGGLE 2FA
export const toggle2FAAPI = async (enabled) => {
  const res = await API.post("/auth/security/2fa", { enabled });
  return {
    ...res.data,
    name: res.data.first_name + " " + res.data.last_name
  };
};