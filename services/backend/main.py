from fastapi import FastAPI
import os

app = FastAPI(title="Backend Data Processing Service")

@app.get("/api/v1/data")
def read_data():
    return {
        "status": "success",
        "service": "backend",
        "message": "Data retrieved securely from backend microservice!"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
