from pathlib import Path

import pymupdf


def compress_pdf(input_path: str, output_path: str) -> Path:
    """
    Compress a PDF without intentionally reducing image quality.

    The compression removes unused PDF objects, merges duplicates,
    compresses uncompressed streams, and packs eligible objects
    into compressed object streams.
    """

    source = Path(input_path)
    destination = Path(output_path)

    if not source.exists():
        raise FileNotFoundError(
            f"Input PDF not found: {source}"
        )

    destination.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    document = pymupdf.open(source)

    try:
        document.save(
            destination,
            garbage=4,
            deflate=True,
            use_objstms=True,
        )
    finally:
        document.close()

    if not destination.exists():
        raise RuntimeError(
            "Compressed PDF was not created."
        )

    return destination