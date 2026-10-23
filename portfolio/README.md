# Portfolio

Victor Kimani's portfolio, built with Next.js and TypeScript.

## Local development

Use Node.js 22 or a newer Vercel-supported version. The Blob SDK requires
Node.js 20 or later.

Run these commands from this directory (`portfolio/` inside the repository):

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Run `pnpm lint` and `pnpm build`
before deploying. In WSL, use an interactive shell so nvm loads, for example
`bash -ic 'pnpm build'`.

## Vercel deployment and Blob OIDC

1. In the Vercel project's build settings, confirm the **Root Directory** is
   `portfolio`, the Next.js app directory. Use the Next.js framework preset and
   Node.js 22 (or a newer supported version). If install/build commands are
   overridden, use `pnpm install --frozen-lockfile` and `pnpm build`.
2. Under the Blob store's **Projects** tab, confirm the `portfolio` project is
   connected to the intended environments (Production and Preview; Development
   if you need local SDK access). OIDC has already been enabled for this project;
   there is no need to force the upgrade again.
3. Keep the Vercel-managed `BLOB_STORE_ID` and `BLOB_WEBHOOK_PUBLIC_KEY` variables.
   Vercel supplies and rotates `VERCEL_OIDC_TOKEN` automatically on deployments.
   Do not manually copy a token or add a `NEXT_PUBLIC_` prefix to Blob variables.
4. Deploy the updated commit. `@vercel/blob` is now a direct production dependency
   at `^2.8.2`, above the OIDC minimum of `2.4.0`. Both npm and pnpm lockfiles are
   updated. A new deployment is needed to pick up dependencies and environment
   changes.
5. Check the Pelmio Visit button, the Resume link, existing project images, and
   video previews on the deployed site. Once verified, remove an old
   `BLOB_READ_WRITE_TOKEN` from this project's environments if nothing else uses
   it. Check other scripts and connected projects before revoking a shared token.

The portfolio currently reads public Blob URLs directly for its images, videos,
and résumé. It has no Blob SDK calls or upload endpoints, so those reads need no
credentials and keep working after the OIDC upgrade. The SDK dependency is
included for Vercel's compatibility check and future server-side Blob operations;
no upload endpoint is needed for this change. Keep the existing store public so
these links remain accessible.

For future server-side SDK calls on Vercel, let the SDK use the managed OIDC
credentials automatically rather than passing a read-write token explicitly.
`BLOB_WEBHOOK_PUBLIC_KEY` is used to verify upload callbacks; this portfolio has
no such callbacks to configure.

Local browsing and builds need no Blob variables. If you later need local SDK
access, use an up-to-date Vercel CLI from this directory:

```bash
vercel link
vercel env pull
```

Keep the resulting `.env.local` uncommitted (it is already ignored).

References: [Vercel Blob SDK authentication](https://vercel.com/docs/vercel-blob/using-blob-sdk#authentication)
and [upgrading an existing store to OIDC](https://vercel.com/changelog/vercel-blob-now-supports-oidc-authentication).
