import os
import time
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
import shutil
from playwright.sync_api import sync_playwright

PORT = 8098
OUT_DIR = os.path.abspath("out")
SCREENSHOTS_DIR = os.path.abspath("screenshots")
ARTIFACTS_DIR = r"C:\Users\ASUS\.gemini\antigravity\brain\05bd4ea5-9ac0-4d7b-9de6-d998ce7f044c"

os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=OUT_DIR, **kwargs)

server = HTTPServer(("127.0.0.1", PORT), Handler)
server_thread = threading.Thread(target=server.serve_forever, daemon=True)
server_thread.start()
print(f"Serving {OUT_DIR} at http://127.0.0.1:{PORT}")

with sync_playwright() as p:
    browser = p.chromium.launch()

    console_errors = []

    def on_console(msg):
        if msg.type in ["error", "warning"]:
            print(f"[{msg.type.upper()}] {msg.text}")
            if msg.type == "error":
                console_errors.append(msg.text)

    def on_page_error(err):
        print(f"[PAGE UNCAUGHT ERROR] {err}")
        console_errors.append(str(err))

    # Desktop 1440x900
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.on("console", on_console)
    page.on("pageerror", on_page_error)

    page.goto(f"http://127.0.0.1:{PORT}/")
    # Wait for loader animation and sheet wipe exit (~3.2s)
    time.sleep(3.8)

    # 1. Desktop Hero
    p1 = os.path.join(SCREENSHOTS_DIR, "hero-desktop-1440.png")
    page.screenshot(path=p1)
    shutil.copy(p1, os.path.join(ARTIFACTS_DIR, "hero-desktop-1440.png"))

    # 2. Desktop Identity Check (About - inside pinned scan)
    page.evaluate('window.__lenis ? window.__lenis.scrollTo("#about", { immediate: true }) : document.getElementById("about").scrollIntoView({ behavior: "instant" })')
    time.sleep(2.5)
    p2 = os.path.join(SCREENSHOTS_DIR, "about-desktop-1440.png")
    page.screenshot(path=p2)
    shutil.copy(p2, os.path.join(ARTIFACTS_DIR, "about-desktop-1440.png"))

    # 3. Desktop Selected Work (Reels 3D Carousel)
    page.evaluate('window.__lenis ? window.__lenis.scrollTo("#work", { immediate: true }) : document.getElementById("work").scrollIntoView({ behavior: "instant" })')
    time.sleep(2.5)
    p3 = os.path.join(SCREENSHOTS_DIR, "work-desktop-1440.png")
    page.screenshot(path=p3)
    shutil.copy(p3, os.path.join(ARTIFACTS_DIR, "work-desktop-1440.png"))

    # 4. Desktop Process (How I work)
    page.evaluate('window.__lenis ? window.__lenis.scrollTo("#process", { immediate: true }) : document.getElementById("process").scrollIntoView({ behavior: "instant" })')
    time.sleep(2.0)
    p4 = os.path.join(SCREENSHOTS_DIR, "process-desktop-1440.png")
    page.screenshot(path=p4)
    shutil.copy(p4, os.path.join(ARTIFACTS_DIR, "process-desktop-1440.png"))

    # 5. Desktop Contact
    page.evaluate('window.__lenis ? window.__lenis.scrollTo("#contact", { immediate: true }) : document.getElementById("contact").scrollIntoView({ behavior: "instant" })')
    time.sleep(2.5)
    p5 = os.path.join(SCREENSHOTS_DIR, "contact-desktop-1440.png")
    page.screenshot(path=p5)
    shutil.copy(p5, os.path.join(ARTIFACTS_DIR, "contact-desktop-1440.png"))

    page.close()

    # Mobile 390x844 (iPhone 14 / standard 390px viewport)
    mobile_page = browser.new_page(
        viewport={"width": 390, "height": 844},
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
    )
    mobile_page.on("console", on_console)
    mobile_page.on("pageerror", on_page_error)

    mobile_page.goto(f"http://127.0.0.1:{PORT}/")
    time.sleep(3.8)

    # Mobile Hero
    pm1 = os.path.join(SCREENSHOTS_DIR, "hero-mobile-390.png")
    mobile_page.screenshot(path=pm1)
    shutil.copy(pm1, os.path.join(ARTIFACTS_DIR, "hero-mobile-390.png"))

    # Mobile Identity Check (inside pinned scan)
    mobile_page.evaluate('document.getElementById("about").scrollIntoView({ behavior: "instant" })')
    time.sleep(2.5)
    pm_about = os.path.join(SCREENSHOTS_DIR, "about-mobile-390.png")
    mobile_page.screenshot(path=pm_about)
    shutil.copy(pm_about, os.path.join(ARTIFACTS_DIR, "about-mobile-390.png"))

    # Mobile Work
    mobile_page.evaluate('document.getElementById("work").scrollIntoView({ behavior: "instant" })')
    time.sleep(2.5)
    pm2 = os.path.join(SCREENSHOTS_DIR, "work-mobile-390.png")
    mobile_page.screenshot(path=pm2)
    shutil.copy(pm2, os.path.join(ARTIFACTS_DIR, "work-mobile-390.png"))

    # Mobile Contact
    mobile_page.evaluate('document.getElementById("contact").scrollIntoView({ behavior: "instant" })')
    time.sleep(2.5)
    pm3 = os.path.join(SCREENSHOTS_DIR, "contact-mobile-390.png")
    mobile_page.screenshot(path=pm3)
    shutil.copy(pm3, os.path.join(ARTIFACTS_DIR, "contact-mobile-390.png"))

    mobile_page.close()
    browser.close()

server.shutdown()
print(f"Capture completed. Total console errors detected: {len(console_errors)}")
if console_errors:
    print("Errors found:", console_errors)
else:
    print("CONFIRMED: Zero console errors!")
