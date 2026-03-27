from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import random

app = FastAPI(title="Akansh OS Kernel", description="Real-time backend data fusion serving Akansh Saxena Portfolio.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Kernel Active", "author": "Akansh Saxena", "institute": "J.K. Institute"}

@app.get("/system-logs")
def get_system_logs():
    """
    Simulates live data incoming from the Aether Gateway & GitHub APIs regarding authorized commits.
    """
    mock_logs = [
        "[Kernel]: Docker bridge network mapping resolved gracefully (0.0.0.0:8000).",
        "[Security]: Authorized Commit Verified by Akansh Saxena via J.K. Institute SSL Tunnel.",
        "[Metrics]: Multimodal Engine returning emotion vector arrays < 50ms latency.",
        f"[TimeSync]: Pulse registered at {datetime.now().strftime('%H:%M:%S')}."
    ]
    return {
        "fusionState": "Synchronized",
        "liveLog": random.choice(mock_logs)
    }

if __name__ == "__main__":
    import uvicorn
    # Emulating the Uvicorn Docker port fix manually tested on Render for pure correctness
    uvicorn.run(app, host="0.0.0.0", port=8000)
