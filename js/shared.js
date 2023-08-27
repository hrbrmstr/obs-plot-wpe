// We need to inline the content from this into the LitElements
const tachyons_pre = await fetch('https://cdn.jsdelivr.net/npm/tachyons@4.12.0/css/tachyons.min.css')
export const tachyons = await tachyons_pre.text()

// could just put these globally
export const mtcars = await d3.csv('data/mtcars.csv', d3.autoType);
export const ipBytes = await d3.json('data/ip-bytes.json');
export const tagsIps = await d3.json('data/tags-ips.json');

// change these at-will
export const jsbOptions = {
  "indent_size": "2",
  "indent_char": " ",
  "max_preserve_newlines": "5",
  "preserve_newlines": true,
  "keep_array_indentation": false,
  "break_chained_methods": true,
  "indent_scripts": "separate",
  "brace_style": "collapse",
  "space_before_conditional": true,
  "unescape_strings": false,
  "jslint_happy": true,
  "end_with_newline": false,
  "wrap_line_length": "80",
  "indent_inner_html": false,
  "comma_first": false,
  "e4x": true,
  "indent_empty_lines": false
}
