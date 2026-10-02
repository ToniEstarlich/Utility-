from pathlib import Path
from tempfile import NamedTemporaryFile

from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from compress import compress_pdf


app = FastAPI(
    title="Utility - Compress PDF",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "tool": "compress-pdf",
    }


@app.post("/compress")
async def compress_pdf_endpoint(file: UploadFile):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file provided.",
        )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported.",
        )

    input_path = None
    output_path = None

    try:
        with NamedTemporaryFile(
            suffix=".pdf",
            delete=False,
        ) as input_file:
            input_path = Path(input_file.name)

            while chunk := await file.read(1024 * 1024):
                input_file.write(chunk)

        with NamedTemporaryFile(
            suffix=".pdf",
            delete=False,
        ) as output_file:
            output_path = Path(output_file.name)

        compress_pdf(
            str(input_path),
            str(output_path),
        )

        original_name = Path(file.filename).stem
        download_name = f"{original_name}-compressed.pdf"

        return FileResponse(
            path=output_path,
            media_type="application/pdf",
            filename=download_name,
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"PDF compression failed: {error}",
        )

    finally:
        if input_path and input_path.exists():
            input_path.unlink()