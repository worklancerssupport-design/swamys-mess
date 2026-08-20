/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_USERNAME: string;
  readonly VITE_ADMIN_PASSWORD: string;
  readonly VITE_GITHUB_PAT: string;
  readonly VITE_GITHUB_OWNER: string;
  readonly VITE_GITHUB_REPO: string;
  readonly VITE_GITHUB_BRANCH: string;
  readonly VITE_GITHUB_FILE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
