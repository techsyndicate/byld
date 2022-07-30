var notyf = new Notyf();
var modelBtn = document.getElementById("modelBtn");

modelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let descriptipn = document.getElementById("description").value;
  fetch("/dashboard/model/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
    }),
  }).catch((err) => console.log(err));
});
