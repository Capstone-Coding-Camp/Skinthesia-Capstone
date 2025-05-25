const USER_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export function getStoredUsers() {
  const users = localStorage.getItem(USER_KEY);
  return users ? JSON.parse(users) : [];
}

export function saveUser(user) {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

export function findUser(email, password) {
  const users = getStoredUsers();
  return (
    users.find((u) => u.email === email && u.password === password) || null
  );
}

export function saveCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function removeCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
