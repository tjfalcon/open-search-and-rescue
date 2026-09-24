"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useSyncExternalStore } from "react";

const fallbackUrl = "https://open-search-and-rescue.vercel.app";
const subscribe = () => () => undefined;

export default function QRPage() {
  const url = useSyncExternalStore(
    subscribe,
    () => window.location.origin,
    () => fallbackUrl,
  );
  return (
    <div className="card">
      <h1 className="h1">Share by Quick Response (QR) Code</h1>
      <p>Scan to open the synthetic Open Search and Rescue demonstration.</p>
      <div className="mt-4 center">
        <QRCodeCanvas value={url} size={256} includeMargin />
      </div>
      <p className="mt-4 center"><a className="btn" href={url} target="_blank">Open Demo Page</a></p>
    </div>
  );
}
