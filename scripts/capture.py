import os
import time
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
import shutil
from playwright.sync_api import sync_playwright

PORT = 8095
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

    # 1. Desktop Loader (1440x900)
    print("Capturing Desktop Loader (1440x900)...")
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"http://127.0.0.1:{PORT}/")
    time.sleep(1.0)
    loader_path = os.path.join(SCREENSHOTS_DIR, "loader-desktop-1440.png")
    page.screenshot(path=loader_path)
    shutil.copy(loader_path, os.path.join(ARTIFACTS_DIR, "loader-desktop-1440.png"))
    print("Saved loader screenshot.")

    # 2. Desktop Hero (1440x900)
    print("Waiting for loader to finish and Hero to settle...")
    page.wait_for_selector('aside[aria-label="Loading animation"]', state='detached', timeout=15000)
    time.sleep(1.5)
    hero_desktop_path = os.path.join(SCREENSHOTS_DIR, "hero-desktop-1440.png")
    page.screenshot(path=hero_desktop_path)
    shutil.copy(hero_desktop_path, os.path.join(ARTIFACTS_DIR, "hero-desktop-1440.png"))
    print("Saved desktop hero screenshot.")
    page.close()

    # 3. Mobile Hero (390x844)
    print("Capturing Mobile Hero (390x844)...")
    mobile_page = browser.new_page(
        viewport={"width": 390, "height": 844},
        user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
    )
    mobile_page.goto(f"http://127.0.0.1:{PORT}/")
    mobile_page.wait_for_selector('aside[aria-label="Loading animation"]', state='detached', timeout=15000)
    time.sleep(1.5)
    hero_mobile_path = os.path.join(SCREENSHOTS_DIR, "hero-mobile-390.png")
    mobile_page.screenshot(path=hero_mobile_path)
    shutil.copy(hero_mobile_path, os.path.join(ARTIFACTS_DIR, "hero-mobile-390.png"))
    print("Saved mobile hero screenshot.")
    mobile_page.close()

    browser.close()

server.shutdown()
print("All screenshots successfully captured!")
