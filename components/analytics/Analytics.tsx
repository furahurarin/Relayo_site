'use client';
import Script from 'next/script';

export default function Analytics() {
  return (
    <Script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id="a1e259fe-78c5-4a8d-a2ba-949ff330771b"
      strategy="afterInteractive"
    />
  );
}
