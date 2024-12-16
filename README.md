# `share-block`

A Web Component for adding a block of buttons and links for sharing.

**[Demo](https://ellyloel.github.io/share-block/demo.html)**

## Examples

General usage example:

```html
<script type="module" src="share-block.js"></script>

<share-block>
	<button type="button" data-type="share">Share</button>
	<button type="button" data-type="copy">Copy link</button>
	<button type="button" data-type="print">Print</button>
	<a data-type="email">Email</a>
</share-block>
```

## Example setting `mode`

### `mode="split"` (default)

```html
<script type="module" src="share-block.js"></script>

<share-block mode="combined">
	<button type="button" data-type="share">Share</button>
	<button type="button" data-type="copy">Copy link</button>
</share-block>
```

### `mode="combined"`

```html
<script type="module" src="share-block.js"></script>

<share-block mode="combined">
	<button type="button" data-type="share">Share</button>
	<button type="button" data-type="copy">Copy link</button>
</share-block>
```

## Example setting custom `url`, `title`, and `text`

```html
<script type="module" src="share-block.js"></script>

<share-block url="example.com" title="Example title" text="This is some example text.">
	<button type="button" data-type="share">Share</button>
	<button type="button" data-type="copy">Copy link</button>
	<button type="button" data-type="print">Print</button>
	<a data-type="email">Email</a>
</share-block>
```

## Features

Supported `data-type`s:

- `share`
- `copy`
- `print`
- `email`
- `fediverse`
- `mastodon`
- `micro.blog`
- `bluesky`
- `tumblr`
- `linkedin`

## Installation

You have a few options (choose one of these):

1. [Download the source manually from GitHub](https://github.com/ellyloel/share-block/releases) into your project.
1. 3rd party CDN (not recommended for production use)

### Usage

Make sure you include the `<script>` in your project:

```html
<script type="module" src="share-block.js"></script>
```
