# Vercel API Preview Audit

The latest preview deployment for commit `3db430c188954c87b14097f6ffb8d37391d0ae6d` is READY, but opening it in the connected browser redirects to Vercel's Login page through `/api/sso`. This indicates Vercel Deployment Protection is enabled for the preview environment.

The production alias `https://tier1-vet-demo.vercel.app` serves the client pages successfully, but the valid tRPC health request still returns HTTP 404. The current production deployment therefore needs the latest API routing fix promoted from the `vercel-compat-fix` branch after review.
