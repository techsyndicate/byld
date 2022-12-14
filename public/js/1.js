var notyf = new Notyf();
var q1Btn = document.querySelector("#q1Btn");

q1Btn.addEventListener("click", (e) => {
  e.preventDefault();
  let prompt = document.querySelector("#prompt").value;
  fetch("/market/pref/q1", {
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
        console.log("data", data);
        notyf.success(data.msg);
        setTimeout(() => {
          window.location.href = "/market/pref/2";
        }, 3000);
      }
    });
});
