function checkAdminAccess() {
  const user = getUser();
  if (!user || user.role !== "admin") {
    window.location.href = "login.html";
  }
}