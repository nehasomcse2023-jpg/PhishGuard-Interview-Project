def analyze_url(url):
    score = 0
    reasons = []

    # Check IP address
    if "127.0.0.1" in url or "localhost" in url:
        score += 30
        reasons.append("Uses IP address instead of domain name")

    # Check HTTP vs HTTPS
    if url.startswith("http://"):
        score += 20
        reasons.append("Uses unencrypted HTTP protocol")

    # Check suspicious keywords
    keywords = ["login", "verify", "account", "bank", "secure", "update", "signin"]
    for kw in keywords:
        if kw in url.lower():
            score += 15
            reasons.append(f"Contains suspicious keyword: {kw}")

    # Maximum score limit 100
    score = min(score, 100)

    # Phishing threshold (50+)
    is_phishing = score >= 50

    return {
        "url": url,
        "score": score,
        "is_phishing": is_phishing,
        "reasons": reasons
    }
