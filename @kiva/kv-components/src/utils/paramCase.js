// Convert strings to param case (e.g. "Foo Bar" -> "foo-bar")
export default function paramCase(string) {
	return string.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase();
}
