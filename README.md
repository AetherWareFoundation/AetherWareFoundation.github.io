# Aether website and user documentation

This is the website and user documentation for the Aether project.

## I just want to contribute to the documentation!

Look no further! Just edit the files in the `content/docs` directory and submit a pull request.

Additionally, if you want your documentation to be extra fancy, you can use [Fumadocs components](https://fumadocs.dev/docs/ui/components).

Additional supported components are:

### [Mermaid](https://mermaid.js.org/)

````markdown
# Just write Mermaid code between the ```mermaid tags.

```mermaid
graph TD
    A[Start] --> B[Stop]
```
````

## Development

Install `bun`:
```bash
# macOS and linux
curl -fsSL https://bun.sh/install | bash

# windows
powershell -c "irm bun.sh/install.ps1 | iex"
```

Install dependencies:
```bash
bun install
```

Start the development server:
```bash
bun dev
```
