import { LitElement, css, html, unsafeCSS } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { default as tachyons } from "tachyons/css/tachyons.min.css?inline"
import { html_beautify } from 'js-beautify/js/lib/beautify-html.js'
import { js_beautify } from 'js-beautify/js/lib/beautify.js'
import { csv, json } from 'd3-fetch'
import { autoType } from 'd3-dsv'
import { format } from 'd3-format'
import * as shiki from 'shiki/dist/index.browser.mjs'
import * as Plot from '@observablehq/plot'

// I don't trust optimizers to not get rid of the Plot import
Plot.plot({})

const mtcars = await csv('/data/mtcars.csv', autoType);
const ipBytes = await json('/data/ip-bytes.json');
const tagsIps = await json('/data/tags-ips.json');

const highlighter = await shiki.getHighlighter({ theme: 'nord-light' })

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
    const renderedPlotSVG = highlighter.codeToHtml(html_beautify(renderedPlot.outerHTML.replace(/h3><svg/, 'h3>\n<svg'), jsbOptions), {lang : 'html'})

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