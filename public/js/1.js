var notyf = new Notyf();
var q1Btn = document.querySelector("#q1Btn");

q1Btn.addEventListener("click", (e) => {
  e.preventDefault();
  let prompt = document.querySelector("#prompt").value;
  fetch("/market/q1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
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
        window.location.href = "/market/pref/2";
      }
    });
});
