# Vercel Live Audit

Checked `https://tier1-vet-demo.vercel.app/` in the connected browser. The page does not render the Paws & Pine UI. Instead, the response exposes the bundled server source beginning with `// server/_core/index.ts`, including Express and tRPC implementation code. The root response is HTTP 200 but is not the intended HTML application shell.

Direct HTTP checks previously returned:

| Route | Status | Observation |
|---|---:|---|
| `/` | 200 | Returns a server-bundle response rather than the intended site UI |
| `/services` | 404 | No SPA history fallback |
| `/location` | 404 | No SPA history fallback |
| `/request` | 404 | No SPA history fallback |

The current Vercel deployment was created from the GitHub-connected project before the local compatibility fix was synced. The corrected local checkpoint adds `vercel.json` SPA rewrites and `api/[...path].ts`, but those files are not yet present in the deployed production commit.
