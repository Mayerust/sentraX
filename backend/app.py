import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pentest.recon import do_recon
from pentest.scan import do_scan
from pentest.exploit import do_exploit
from pentest.persist import do_persist
from pentest.cleanup import do_cleanup
from pentest.report import do_report
from utils.logger import setup_logger
from dotenv import load_dotenv

load_dotenv()
logger = setup_logger()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Targets(BaseModel):
    targets: str  # comma-separated IPs

@app.post("/api/scan")
async def scan_targets(payload: Targets):
    ips = [ip.strip() for ip in payload.targets.split(",") if ip.strip()]
    if not ips:
        raise HTTPException(400, "No valid targets provided.")
    full_log = ""
    for ip in ips:
        logger.info(f"Starting pentest for {ip}")
        recon = do_recon(ip, logger)
        scan = do_scan(ip, recon, logger)
        exploit = do_exploit(ip, scan, logger)
        persist = do_persist(ip, exploit, logger)
        cleanup = do_cleanup(ip, persist, logger)
        report_txt = do_report(ip, recon, scan, exploit, persist, cleanup, logger)
        full_log += f"\n\n=== Report for {ip} ===\n{report_txt}"
    return {"log": full_log}