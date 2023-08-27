import { LitElement, css, html, unsafeCSS, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import * as shiki from '../shiki/dist/index.browser.mjs'

import { tachyons, mtcars, ipBytes, tagsIps, jsbOptions } from '../js/shared.js'

const highlighter = await shiki.getHighlighter({ theme: 'nord-light', wasmPath: '../shiki/dist/' })

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
