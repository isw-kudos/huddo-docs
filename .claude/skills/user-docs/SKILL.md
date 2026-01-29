---
name: user-docs
description: Write user-facing documentation for Huddo products. Use when creating how-to guides, feature tutorials, or end-user instructions (not admin/installation docs).
argument-hint: "[topic]"
---

# Write User-Facing Documentation

You are writing **end-user documentation** for Huddo products. This is how-to content for people using the product day-to-day, NOT installation or admin documentation.

## User Documentation Locations

- `docs/boards/howto/` - Boards user guides
- `docs/analytics/user-guide/` - Analytics user guides
- `docs/ccm-migrator/usage.md` - CCM Migrator usage

## Before Writing

1. Read existing docs in the target section to match the established style
2. Check `mkdocs.yml` for navigation structure if adding new pages
3. Look for related docs to link to

## Writing Style

### Tone
- Friendly and conversational, but concise
- Action-oriented ("Click on...", "Select...", "Type in...")
- Assume the reader is a capable professional learning a new tool

### Structure
- Start with a brief intro explaining what the feature/task is about
- Use `###` headings for major sections
- Use numbered lists for step-by-step procedures
- Use horizontal rules (`---`) to separate major sections
- Keep paragraphs short (2-4 sentences)

### UI References
- Use _italics_ for UI element names: _Members_, _Add a list_
- Use `backticks` for button text: `Create`, `Add Members`
- Be specific about location: "from the menu on the right-hand side"

### Images
- Place screenshots after the step that references them
- Use relative paths: `![Description](./image-name.png)`
- For branding header (optional): `![Boards](../../../assets/images/boards-logo.jpg){ style="float: right" width=200 }`

### Links
- Use relative paths for internal links: `[link text](../other-doc/index.md)`
- Link to related docs when mentioning features covered elsewhere

## Formatting Rules

- 4-space indentation (project standard)
- Use admonitions for callouts:
  ```markdown
  !!! tip

      Helpful tip for the user
  ```
  Types: `tip`, `info`, `warning`, `note`

## Example Structure

```markdown
![Boards](../../../assets/images/boards-logo.jpg){ style="float: right" width=200 }

Brief intro explaining what this guide covers and why it's useful.

---

### Do the First Thing

Introductory context for this section.

1. Navigate to _Section Name_ in the sidebar
1. Click `Button Name`
1. Enter the required information

   ![Screenshot description](./screenshot.png)

1. Click `Save`

---

### Do the Next Thing

Continue with the next major task...
```

## Checklist Before Finishing

- [ ] Intro explains what and why
- [ ] Steps are numbered and actionable
- [ ] UI elements use correct formatting (_italics_ vs `backticks`)
- [ ] Screenshots referenced after relevant steps
- [ ] Links use relative paths
- [ ] 4-space indentation throughout
