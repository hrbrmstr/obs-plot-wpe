import { LitElement, css, html, unsafeCSS, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { csv, json } from 'https://cdn.jsdelivr.net/npm/d3-fetch@3.0.1/+esm'
import { autoType } from 'https://cdn.jsdelivr.net/npm/d3-dsv@3.0.1/+esm'
import { format } from 'https://cdn.jsdelivr.net/npm/d3-format@3.1.0/+esm'
import * as shiki from '../shiki/dist/index.browser.mjs'
import * as Plot from 'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.10/+esm'

const tachyons_pre = await fetch('https://cdn.jsdelivr.net/npm/tachyons@4.12.0/css/tachyons.min.css')
const tachyons = await tachyons_pre.text()

const mtcars = await csv('data/mtcars.csv', autoType);
const ipBytes = await json('data/ip-bytes.json');
const tagsIps = await json('data/tags-ips.json');

const highlighter = await shiki.getHighlighter({ theme: 'nord-light', wasmPath: '../shiki/dist/' })

const jsbOptions = {
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

export class PlotElement extends LitElement {

  static get properties() {
    return {
      plotSource: { text: String }
    }
  }

  constructor() {
    super()
    this.plotSource = ''
  }

  render() {

    const renderedPlot = eval(`${this.plotSource}`);
    const renderedPlotSource = highlighter.codeToHtml(js_beautify(this.plotSource, jsbOptions), { lang: 'js' })
    const renderedPlotSVG = highlighter.codeToHtml(html_beautify(renderedPlot.outerHTML.replace(/h3><svg/, 'h3>\n<svg'), jsbOptions), { lang: 'html' })

    return html`
    <h2>OJS Plot Code</h2>
    <details>
    <summary>Click/tap to expand</summary>
    ${unsafeHTML(renderedPlotSource)}
    </details>

    <h2>OJS Rendered Plot</h2>
    <details open>
    <summary>Click/tap to expand</summary>
    ${unsafeHTML(renderedPlot.outerHTML)}
    </details>

    <h2>SVG Source Of Rendered Plot</h2>
    <details class='last'>
    <summary>Click/tap to expand</summary>
    ${unsafeHTML(renderedPlotSVG)}
    </details>
    `
  }

  static get styles() {
    return css`
${unsafeCSS(tachyons)}

details {
  margin-bottom: 2em;
}

.last {
  margin-bottom: 1em;
}

pre.shiki {
  overflow: auto;
  overflow-wrap: break-word;
  padding: 2rem;
  margin-top: 1rem;
  white-space: pre-wrap;
  border: 0.5px dotted gray;
}
`
  }
}

window.customElements.define('plot-element', PlotElement)
