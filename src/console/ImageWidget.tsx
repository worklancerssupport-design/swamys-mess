import { useEffect, useCallback } from "react";

const SCRIPT = "https://upload-widget.cloudinary.com/latest/global/all.js";
const ENV = import.meta.env;

declare global {
  interface Window {
    cloudinary?: { openUploadWidget: (...args: any[]) => any };
  }
}

let ready = false;
let loading: Promise<void> | null = null;

function ensure(): Promise<void> {
  if (ready) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise((ok, fail) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => { ready = true; ok(); };
    s.onerror = fail;
    document.head.appendChild(s);
  });
  return loading;
}

export function useImageUpload() {
  useEffect(() => { ensure(); }, []);

  return useCallback((onDone: (url: string) => void) => {
    if (!window.cloudinary) return;
    window.cloudinary.openUploadWidget(
      {
        cloudName: ENV.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: ENV.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera"],
        multiple: false,
        maxFileSize: 5000000,
        resourceType: "image",
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      },
      (err: any, res: any) => {
        if (!err && res?.event === "success") {
          const raw: string = res.info.secure_url;
          onDone(raw.replace("/upload/", "/upload/q_auto,f_auto/"));
        }
      },
    );
  }, []);
}
