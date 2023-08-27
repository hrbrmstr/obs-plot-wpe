import { csv, json } from 'https://cdn.jsdelivr.net/npm/d3-fetch@3.0.1/+esm'
import { autoType } from 'https://cdn.jsdelivr.net/npm/d3-dsv@3.0.1/+esm'

const tachyons_pre = await fetch('https://cdn.jsdelivr.net/npm/tachyons@4.12.0/css/tachyons.min.css')
export const tachyons = await tachyons_pre.text()

export const mtcars = await csv('data/mtcars.csv', autoType);
export const ipBytes = await json('data/ip-bytes.json');
export const tagsIps = await json('data/tags-ips.json');

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
