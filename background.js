chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    // Only check the main page
    if (details.frameId !== 0) return;

    // Only check normal HTTP/HTTPS websites
    if (!details.url.startsWith("http")) return;

    // Ignore warning page itself to prevent infinite loop
    if (details.url.includes("warning.html")) return;

    try {
        const response = await fetch("http://127.0.0.1:5000/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: details.url })
        });

        const result = await response.json();
        console.log("PhishGuard Analysis:", result);

        // ONLY redirect if is_phishing is TRUE AND risk score is >= 50
        if (result.is_phishing === true && (result.score || 0) >= 50) {
            const warningUrl = chrome.runtime.getURL(
                "warning.html?url=" + encodeURIComponent(details.url) +
                "&score=" + encodeURIComponent(result.score || 0)
            );

            await chrome.tabs.update(details.tabId, { url: warningUrl });
        }
    } catch (error) {
        console.error("PhishGuard Server Connection Error:", error);
    }
});