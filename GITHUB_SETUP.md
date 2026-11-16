# Publish the Cetin Lab website on GitHub Pages

These instructions publish the supplied static files. You do not need Node.js, React, Jekyll, or a paid plan for a public repository.

## 1. Choose the GitHub owner and repository name

The public lab account is [Cetin-Lab](https://github.com/Cetin-Lab). If you have permission to create a repository under that account, use the first option below. Otherwise use your own GitHub account.

| Where to publish | Repository name | Resulting website address |
| --- | --- | --- |
| Cetin-Lab account / organization | `cetin-lab.github.io` | `https://cetin-lab.github.io/` |
| Your personal account, dedicated homepage | `YOUR-USERNAME.github.io` | `https://YOUR-USERNAME.github.io/` |
| Your personal account, separate lab project | `cetin-lab` | `https://YOUR-USERNAME.github.io/cetin-lab/` |

Replace `YOUR-USERNAME` with the exact account name. Use lowercase for the account-name part of a user or organization homepage repository. The addresses above are the expected addresses after deployment, not already-published previews.

## 2. Create the repository

1. Sign in at [GitHub](https://github.com/).
2. Click the **+** menu in the top-right corner and select **New repository**.
3. Choose the correct **Owner**. Use **Cetin-Lab** if that account is available to you.
4. Enter the repository name chosen above. For the lab homepage, enter **`cetin-lab.github.io`**.
5. Choose **Public**. GitHub Pages is available for public repositories on GitHub Free.
6. Leave README, `.gitignore`, and license initialization off; the download already includes a README.
7. Click **Create repository**.

If this repository already exists, inspect its contents before replacing anything. Keep a copy of any existing website or use a separate project repository.

## 3. Upload the extracted website files

1. Download and extract `cetin-lab-website.zip` on your computer.
2. Open the extracted folder. You should see `index.html`, the other HTML files, and `assets/` directly inside it.
3. In the empty repository, click **uploading an existing file**. In an initialized repository, choose **Add file → Upload files**.
4. Drag **the contents of the extracted folder** into GitHub, including the entire `assets` folder. Upload the files, not the ZIP archive and not an extra enclosing folder.
5. Enter a commit message such as **Add Cetin Lab website** and click **Commit changes**.
6. Confirm that **`index.html` is directly at the repository root**, alongside `research.html`, `people.html`, `publications.html`, `software.html`, `contact.html`, and `assets/`.
7. Confirm the `.nojekyll` file is present. It may be hidden by your file manager. If it was not uploaded, use **Add file → Create new file**, name it `.nojekyll`, leave it empty, and commit it to `main`.

The Markdown guides can stay in the repository; they are not added to the website navigation. No dependency installation or build command is needed.

## 4. Enable GitHub Pages

1. In the repository, open **Settings**.
2. In the sidebar under **Code and automation**, open **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and **/(root)**.
5. Click **Save**.

If you used a different default branch, select that branch instead. It must contain `index.html` and `assets/` at its top level.

## 5. Open the live website

Return to **Settings → Pages** and use **Visit site** when deployment completes. GitHub says publication can take up to 10 minutes. For the lab's account-name repository, the website will be:

```text
https://cetin-lab.github.io/
```

You can inspect the **Actions** tab if deployment fails. The workflow GitHub creates for branch publishing is expected; you do not need to add a custom workflow file.

## 6. Make future updates

1. Open a file such as `people.html` or `publications.html` in the repository.
2. Click the pencil icon to edit it.
3. Change the text and commit the update to `main`.
4. GitHub Pages redeploys the site automatically. Refresh the website after deployment succeeds.

See `README.md` for editing examples. To change the top navigation or footer, update all six HTML pages.

## Optional: upload using Git instead of the browser

Create the empty public repository first. Open a terminal **inside the extracted website folder**, then run:

```bash
git init
git add .
git commit -m "Add Cetin Lab website"
git branch -M main
git remote add origin https://github.com/Cetin-Lab/cetin-lab.github.io.git
git push -u origin main
```

Replace the remote URL with your actual repository URL if using another owner or name. These commands assume the destination is empty. Use GitHub's normal credential manager or browser sign-in if Git prompts for authentication. Do not put tokens in website files.

After pushing, enable **Settings → Pages → Deploy from a branch → main → /(root)** as above.

## Common problems

| Problem | What to check |
| --- | --- |
| GitHub shows a README instead of the website | Open the Pages address from **Settings → Pages**, not the repository's `github.com` address. |
| Website shows 404 after the first upload | Wait for deployment; check **Actions** and that Pages uses `main` / `/(root)`. |
| The homepage is still missing | Make sure `index.html` is at the repository root, not inside a second `cetin-lab-website` folder. |
| Text appears without styling or images | Confirm the complete `assets/` folder was uploaded with the same capitalization and filenames. |
| You cannot select Cetin-Lab as owner | You need appropriate access to that account or organization. Publish under your own account in the meantime. |
| You cannot configure Pages | Repository admin or maintainer permissions are required. |
| Changes do not appear immediately | Confirm the deployment succeeded, then hard-refresh the live page with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac). |
| `main` does not appear in the branch menu | Commit/upload the files first. Empty repositories have no publishable branch. |

## Official references

- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

Instructions checked November 16, 2026.
