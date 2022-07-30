var notyf = new Notyf();
const regBtn = document.querySelector("#regBtn");
// console.log("hello world");

regBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const password2 = document.querySelector("#password").value;

  fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 400) {
        notyf.error(data.message);
      }
      {
        setTimeout(() => {
          notyf.success(data.message);
        }, 3000);
        console.log("user created");
        window.location.href = "/dashboard";
      }
    });
});
