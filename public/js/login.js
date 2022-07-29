var notyf = new Notyf();
const logBtn = document.querySelector("#logBtn");

logBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 400) {
        notyf.error(data.message);
      } else {
        setTimeout(() => {
          notyf.success(data.message);
        }, 3000);
        window.location.href = "/dashboard";
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
