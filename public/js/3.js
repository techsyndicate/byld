var notyf = new Notyf();
var q3Btn = document.querySelector("#q3Btn");

q3Btn.addEventListener("click", (e) => {
  e.preventDefault();
  let prompt = document.querySelector("#prompt").value;
  console.log(prompt);
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
      console.log(data);
      if (data.status == 400) {
        console.log("error");
        notyf.error(data.msg);
      } else {
        console.log("helo");
        notyf.success(data.msg);
        setTimeout(() => {
          window.location.href = "/market/pref/end";
        }, 3000);
      }
    });
});
