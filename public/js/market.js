var notyf = new Notyf();
var buyBtn = document.querySelector("#buyBtn");

buyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let modelType = document.querySelector("#modelType").value;
  let modelName = document.querySelector("#modelName").value;
  fetch("/market/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      modelType: modelType,
      modelName: modelName,
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
        window.location.href = "/market/pref/1";
      }
    });
});
