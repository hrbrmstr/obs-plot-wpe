import { LitElement, css, html, unsafeCSS, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import * as shiki from '../shiki/dist/index.browser.mjs'

import { tachyons, jsbOptions } from '../js/shared.js'

class ShikiElement extends LitElement {

  highlightedCode = '';
  highlighter;

  static get properties() {
    return {
      sourceCode: { text: String },
      language: { text: String },
      theme: { text: String }
    }
  }

  constructor() {
    super()
    this.sourceCode = ''
    this.language = 'js'
    this.theme = 'nord-light'
  }

  async firstUpdated() {
    await this.setupHighlighter();
    this.updateHighlightedCode();
  }

  updated(changedProperties) {
    if (changedProperties.has('theme')) {
      this.setupHighlighter();
    }

    if (changedProperties.has('sourceCode') || changedProperties.has('language')) {
      this.updateHighlightedCode();
    }
  }

  async setupHighlighter() {
    this.highlighter = await shiki.getHighlighter({
      theme: this.theme
    });
  }

  updateHighlightedCode() {
    if (this.highlighter && this.sourceCode) {

      var code = '';

      if (this.language === 'js') {
        code = js_beautify(this.sourceCode, jsbOptions)
      } else if (code === 'html') {
        code = html_beautify(this.sourceCode, jsbOptions)
      } else {
        code = this.sourceCode
      }

      this.highlightedCode = this.highlighter.codeToHtml(code, { lang: this.language });

      this.requestUpdate('highlightedCode', null);

    }
  }

  render() {

    return html`
  ${unsafeHTML(this.highlightedCode)}
  `;

  }

  static styles = css`
${unsafeCSS(tachyons)}

pre.shiki {
  overflow: auto;
  overflow-wrap: break-word;
  padding: 2rem;
  margin-top: 1rem;
  white-space: pre-wrap;
  border: 0.5px dotted gray;
}
  `;

}

customElements.define('shiki-element', ShikiElement);
