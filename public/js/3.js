var notyf = new Notyf();
var q3Btn = document.querySelector("#q3Btn");

q3Btn.addEventListener("click", (e) => {
  e.preventDefault();
  let prompt = document.querySelector("#prompt").value;
  fetch("/market/pref/q3", {
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
      if ((data.status = 400)) {
        notyf.error(data.msg);
      } else {
        notyf.success(data.msg);
        setTimeout(() => {
          window.location.href = "/market/pref/end";
        }, 3000);
      }
    });
});
