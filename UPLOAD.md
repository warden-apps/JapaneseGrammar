# Upload to GitHub

This folder is a complete snapshot of the app, ready to become a repository.
There is no build step and no API key or backend to configure.

## Upload the files

1. Create or open your GitHub repository.
2. Choose **Add file → Upload files** (or the upload link in an empty repository).
3. Open this `github-upload` folder on your computer and drag **everything inside
   it** into the upload area, preserving the `icons`, `build` and `tests` folders.
4. Commit the uploaded files. Check that `index.html` is at the repository's top
   level, next to `README.md` — not inside another `github-upload` folder.

The `.gitignore` excludes generated screenshots, local backups and temporary
files from future Git commits. `.nojekyll` lets Pages serve the static files
directly. Keep both files when uploading.

## Make it a website (optional)

In the repository, open **Settings → Pages**. Under **Build and deployment**,
select **Deploy from a branch**, then the branch containing your upload (usually
`main`), select **/(root)** and save. Pages will show the website URL when the
deployment finishes. See [GitHub's publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Bring your study progress

Before switching from the local app, open **Progress → Download progress backup**.
Keep that downloaded file on your computer; it does not belong in the repository.
Open the new website, go to **Progress → Restore**, paste the backup's JSON text
and confirm Restore. Progress is stored separately for each browser and website
address, so uploading the app does not move your progress automatically.

## Run it locally

With Node.js installed, open a terminal in this folder and run:

```bash
node build/serve.cjs 8775
```

Open http://127.0.0.1:8775/. If the original app is still using that port, use
another available port in the command and URL, such as `8776`.

## Included

- The complete app, its 118-question N2 drill, offline worker, manifest and icons.
- Source notes and attribution in [CONTENT-SOURCES.md](CONTENT-SOURCES.md).
- Development scripts and tests; see [README.md](README.md) for commands.

Downloaded reference PDFs, temporary files, rollback copies, generated test
screenshots and personal progress exports are omitted. The app links directly
to official sources and does not need local copies of the PDFs.

This snapshot was prepared on 23 September 2026. Later edits in the original
project folder are not automatically copied here.
