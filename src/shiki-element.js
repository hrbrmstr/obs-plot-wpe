import { LitElement, css, html, unsafeCSS } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { default as tachyons } from "tachyons/css/tachyons.min.css?inline"
import { html_beautify } from 'js-beautify/js/lib/beautify-html.js'
import { js_beautify } from 'js-beautify/js/lib/beautify.js'
import * as shiki from 'shiki/dist/index.browser.mjs'

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
