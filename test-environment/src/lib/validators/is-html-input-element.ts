export const isHTMLInputElement = (
	element: unknown,
): element is HTMLElementTagNameMap["input"] =>
	element instanceof HTMLElement && element.tagName.toLowerCase() === "input";
