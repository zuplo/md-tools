# Zuplo Markdown Tools

> NOTE: This library is currently only published to the Github Registry

Zuplo's standard markdown render using unified, remark, and rehype.

The library is configured to run the following plugins:

* @mapbox/rehype-prism
* rehype-slug
* rehype-stringify
* remark-gfm

It also extracts the documents headings as an array.

## Install

```
npm i @zuplo/md-tools
```

## Usage

```
import { render } from "@zuplo/md-tools";

const { html, headings } = await render("# Markdown here");
```

