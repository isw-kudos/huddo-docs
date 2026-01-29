# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Huddo Docs is a technical documentation site for Huddo enterprise productivity products (Boards, Analytics, Badges, CCM Migrator). Built with MkDocs and mkdocs-material, deployed to GitHub Pages via GitHub Actions.

## Commands

### Local Development
```bash
docker compose up
# Preview at http://127.0.0.1:8000
```

### Manual Deploy (rarely needed - CI handles this)
```bash
mkdocs gh-deploy
```

## Documentation Structure

- `docs/` - All markdown documentation files
- `mkdocs.yml` - Site configuration and navigation structure
- Navigation hierarchy defined in `mkdocs.yml` under `nav:`

### Main Product Sections
- `docs/boards/` - Huddo Boards (cloud, self-hosted, hybrid deployments)
    - `docs/boards/howto/` - End-user documentation (as opposed to admin/installation docs)
- `docs/analytics/` - Analytics installation and user guides
    - `docs/analytics/user-guide/` - End-user documentation for reports and dashboards
- `docs/badges/` - Badges product documentation
- `docs/ccm-migrator/` - CCM Migrator tool
    - `docs/ccm-migrator/usage.md` - End-user documentation for operating the migration tool

## Writing Conventions

### Markdown Formatting
- Use 4-space indentation for markdown (configured in `.prettierrc.yaml`, `biome.json`, `.markdownlint.json`)
- Use admonitions for callouts:
  ```markdown
  !!! info

      This is an information admonition
  ```
  Available types: info, warning, danger, note, tip, question (see [mkdocs-material admonitions](https://squidfunk.github.io/mkdocs-material/reference/admonitions/))

### Links
- Use relative paths for internal links: `[Link Text](../path/to/file.md)`
- External links use full URLs

## Adding New Plugins

When adding MkDocs plugins, update both:
1. `Dockerfile` - for local development
2. `.github/workflows/ci.yml` - for CI/CD deployment
