# Vercel Preview Audit

Checked `https://tier1-vet-demo-l4si4vst7-keion-cmds-projects.vercel.app/` in the connected browser. The preview is not rendering the Paws & Pine UI. Its root response exposes the bundled server source, beginning with `// server/_core/index.ts`, rather than the built client HTML shell.

The preview deployment is marked READY by Vercel, but READY only indicates that the configured build completed; it does not confirm the correct runtime routing. The branch contains the SPA rewrite file and the serverless API entrypoint, but the current Vercel build configuration still appears to serve the wrong output at `/`.
