var notyf = new Notyf();
var creditBtn = document.querySelector("#creditBtn");

creditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let credit = document.querySelector("#credits").value;
  fetch("/market/credit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credit: credit,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 400) {
        notyf.error(data.msg);
      } else {
        setTimeout(() => {
          notyf.success(data.msg);
        }, 3000);
        window.location.reload();
      }
    });
});
