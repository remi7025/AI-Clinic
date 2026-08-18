"""Sync root data files into the React web app public folder."""

from pathlib import Path
import shutil

ROOT = Path(__file__).parent
WEB_PUBLIC = ROOT / "web" / "public"

shutil.copy2(ROOT / "data" / "compliance_dataset.json", WEB_PUBLIC / "data" / "compliance_dataset.json")
print("Synced dataset to web/public/")
