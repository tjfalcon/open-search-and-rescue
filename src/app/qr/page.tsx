"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export default function QRPage() {
  const [url, setUrl] = useState("https://open-search-and-rescue.vercel.app");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin); // points to your live site root
    }
  }, []);
  return (
    <div className="card">
      <h1 className="h1">Share by Quick Response (QR) Code</h1>
      <p>Scan to open the live Search and Rescue status page.</p>
      <div className="mt-4 center">
        <QRCodeCanvas value={url} size={256} includeMargin />
      </div>
      <p className="mt-4 center"><a className="btn" href={url} target="_blank">Open Status Page</a></p>
    </div>
  );
}
