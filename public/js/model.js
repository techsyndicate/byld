var notyf = new Notyf();
var modelBuyBtn = document.querySelector("#modelBuyBtn");

modelBuyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let credits = document.querySelector("#credits").value;
  let name = document.querySelector("#name").value;
  let link = document.querySelector("#link").value;

  fetch("/market/model/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credits,
      name,
      link,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 400) {
        notyf.error(data.msg);
      } else {
        notyf.success(data.msg);
        setTimeout(() => {
          window.location.href = "/market/finish";
        }, 3000);
      }
    });
});
