const BLYNK_TOKEN = "R2sZS7wwDr7aN_UT_woOHyZujoHItK_x";  
const SHEET_ID = "AKfycby3xsuYQEjRsKE7eGGEdH-RfF8c2M_WLW-cKcpovw6Ai7xRbkPmjDrjnckrXAxBM7mF1g";             

async function fetchBlynk(vpin) {
  const res = await fetch(`https://blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&vpin=${vpin}`);
  return await res.text();
}

async function loadRealtime() {
  const hr = await fetchBlynk("V1");
  const spo2 = await fetchBlynk("V2");
  const temp = await fetchBlynk("V3");

  document.getElementById("hr").textContent = hr;
  document.getElementById("spo2").textContent = spo2;
  document.getElementById("temp").textContent = temp;

  updateChart(hr, spo2);
}
setInterval(loadRealtime, 3000);
loadRealtime();

// Google Sheets Reader
async function loadSheet() {
  const res = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`);
  const txt = await res.text();
  const json = JSON.parse(txt.substring(47).slice(0, -2
