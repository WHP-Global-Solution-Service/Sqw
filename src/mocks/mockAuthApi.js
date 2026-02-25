const USERS_KEY = "mock_users";

function getUsers(){
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ================= LOGIN =================
export async function mockLogin(email,password){
  await wait();

  const users = getUsers();
  const user = users.find(u=>u.email===email && u.password===password);

  if(!user)
    throw new Error("Invalid email or password");

  return {
    token:"mock-token-"+Date.now(),
    user
  };
}

// ================= SIGNUP =================
export async function mockSignup(formData){
  await wait();

  const users = getUsers();
  const email = formData.get("email");

  if(users.some(u=>u.email===email))
    return { error:"Email already exists" };

  const user = Object.fromEntries(formData.entries());

  users.push(user);
  saveUsers(users);

  return { success:true, user };
}

// ================= PROFILE =================
export async function mockGetProfile(){
  await wait();

  const user = JSON.parse(localStorage.getItem("authUser"));
  if(!user) throw new Error("Not logged in");

  return user;
}

// ================= UTILS =================
function wait(ms=400){
  return new Promise(res=>setTimeout(res,ms));
}