function loadTrips() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  fetch(`/trips?from=${from}&to=${to}`)
    .then(res => res.json())
    .then(trips => renderTrips(trips));
}

function renderTrips(trips) {
  const now = new Date();
  const container = document.getElementById("results");
  container.innerHTML = "<h2>Розклад</h2>";

  let closest = null;

  trips.forEach(t => {
    const [h,m] = t.time.split(":");
    const tripTime = new Date();
    tripTime.setHours(h,m,0);

    if (!closest && tripTime > now) closest = t;
  });

  trips.forEach(t => {
    const div = document.createElement("div");
    div.className = "trip";
    if (t === closest) div.classList.add("closest");

    div.innerHTML = `
      <b>${t.time}</b> | ${t.station}
      ${t === closest ? `<p>Зайнято: сидячих ${t.seats.length}/17</p>
      <p>${t.seats.map(s => "№"+s).join(", ")}</p>` : ""}
    `;
    container.appendChild(div);
  });
}

document.getElementById("loginLink").onclick = () => {
  const code = prompt("Введіть код станції:");
  fetch("/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ code })
  }).then(r=>r.json()).then(d=>{
    if(d.success) location.href = `staff.html?code=${code}`;
    else alert("Невірний код");
  });
};
