class ShareBlock extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "share-block", ShareBlock);
		}
	}

	static get observedAttributes() {
		return ["mode", "url", "title", "text"];
	}

	title = document.title;
	url = location.href;
	text = document.querySelector(`meta[name="description"]`)?.content;

	shareLinks(platform) {
		const title = encodeURIComponent(this.title);
		const url = encodeURIComponent(this.url);
		const text = encodeURIComponent(this.text);
		switch (platform) {
			case "email":
				return `mailto:?subject=${title}&body=${url}${text ? `%0D%0A${text}` : ""}`;
			case "fediverse":
				return `https://s2f.kytta.dev/?text=${title}%0D%0A${url}${text ? `%0D%0A${text}` : ""}`;
			case "mastodon":
				return `https://toot.kytta.dev/?text=${title}%0D%0A${url}${text ? `%0D%0A${text}` : ""}`;
			case "micro.blog":
				return `https://micro.blog/post?text=${title}%0D%0A${url}${text ? `%0D%0A${text}` : ""}`;
			case "bluesky":
				return `https://bsky.app/intent/compose?text=${title}%0D%0A${url}${text ? `%0D%0A${text}` : ""}`;
			case "tumblr":
				return `https://www.tumblr.com/widgets/share/tool?posttype=link&title=${title}&content=${url}&canonicalUrl=${url}${
					text ? `&caption=${text}` : ""
				}`;
			case "linkedin":
				return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
		}
	}

	constructor() {
		super();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			if (name === "url") {
				this[name] = new URL(/^(?:(?:[a-z]+:)?\/\/)/.test(newValue) ? newValue : `https://${newValue}`);
			} else {
				this[name] = newValue;
			}
		}
	}

	connectedCallback() {
		this.querySelectorAll("button[data-type]").forEach((button) => {
			// If it's a share button and the Web Share API is not supported then remove the button
			if (button.dataset.type === "share" && !("share" in navigator)) button.remove();
			// If it's a copy button and the Clipboard API is not supported then remove the button
			if (button.dataset.type === "copy" && !("clipboard" in navigator)) button.remove();
			// If it's a print button and the print method is not supported then remove the button
			if (button.dataset.type === "print" && !("print" in window)) button.remove();
			// If the mode is set to combined and the Web Share API is supported then remove the copy button
			if (this.mode === "combined" && "share" in navigator && button.dataset.type === "copy") button.remove();

			button.addEventListener("click", async () => {
				try {
					switch (button.dataset.type) {
						case "share":
							await navigator.share({
								title: this.title,
								url: this.url,
								text: this.text,
							});
							break;
						case "copy":
							await navigator.clipboard.writeText(this.url);
							break;
						case "print":
							print();
							break;
					}
				} catch (error) {
					console.error(error);
				}
			});
		});

		this.querySelectorAll("a[data-type]").forEach((link) => {
			link.href = this.shareLinks(link.dataset.type);
		});
	}
}

ShareBlock.register();
