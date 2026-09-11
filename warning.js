document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");
    const score = params.get("score");

    document.getElementById("url").textContent = url || "Unknown URL";
    document.getElementById("score").textContent = "Risk Score: " + (score || "0") + "/100";

    document.getElementById("backBtn").addEventListener("click", () => {
        history.back();
    });
});