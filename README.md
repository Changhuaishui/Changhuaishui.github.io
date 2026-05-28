# blog-source

Hexo source workspace for `https://changhuaishui.github.io`.

## Local workflow

```bash
pnpm install
pnpm run sync:legacy
pnpm exec hexo clean
pnpm exec hexo server
```

Create a post:

```bash
pnpm exec hexo new post "文章标题"
```

Build locally:

```bash
pnpm exec hexo generate
```

## Legacy static content

This repo keeps a partial passthrough copy of the current deployed static site so old article URLs remain accessible before full Markdown migration.

The import script assumes `blog-source` and `blog-temp` are sibling directories on the Desktop:

```bash
pnpm run sync:legacy
```

## GitHub branch layout

Use the existing `Changhuaishui.github.io` repository with two branches:

- `main`: deployed static site for GitHub Pages
- `source`: Hexo source files from this directory

## GitHub Actions deployment

The workflow in `.github/workflows/deploy.yml` is intended to run on the `source` branch and publish the generated `public/` directory back to the `main` branch of the same repository.

## Notes

- `blog-temp` remains your local checkout of the deployed `main` branch.
- New posts should be written here as Markdown under `source/_posts/`.
- Historical posts can be migrated gradually later.
