document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const showPasswordCheckbox = document.getElementById("showPassword");

  if (!passwordInput || !showPasswordCheckbox) return; // safety check

  showPasswordCheckbox.addEventListener("change", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
});

function validateEmail(email) {
  // Simple regex to check email format (not perfect but practical)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}