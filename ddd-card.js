/**
 * Copyright 2025 BetaGam3r
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-card`
 * 
 * @demo index.html
 * @element ddd-card
 */
export class DddCard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-card";
  }

  constructor() {
    super();
    this.title = "",
    this.link = "",
    this.image = "",
    this.primary = "",
    
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-card-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      link: { type: String },
      image: { type: String },
      primary: { type: String, reflect: true, attribute: "data-primary" },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-primary);
        font-family: var(--ddd-font-navigation);
        width: 100%;
        max-width: 420px;
        height: 100%;
        overflow: hidden;
        background-color: var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-sm);
      }

      .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        min-height: 627px;
        flex: 1;
      }

      .image-container {
        position: relative;
        width: 100%;
        overflow: hidden;
      }

      .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      
      .bar {
        position: absolute;
        bottom: var(--ddd-spacing-0);
        width: 100%;
        height: 12px;
        background-color: var(--ddd-primary-2);
      }

      .content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: var(--ddd-spacing-3) var(--ddd-spacing-3) var(--ddd-spacing-0) var(--ddd-spacing-3);
        margin: var(--ddd-spacing-1);
        overflow: hidden;
      }

      .title {
        font-weight: var(--ddd-font-weight-bold);
        font-size: var(--ddd-font-size-m);
        font-family: var(--ddd-font-primary);
        color: var(--ddd-primary-2);
        margin: var(--ddd-spacing-0);
        text-align: left;
      }

      .desc {
        font-size: var(--ddd-font-size-3xs);
        font-family: var(--ddd-font-primary);
        color: var(--ddd-primary-2);
        line-height: 1.4;
        text-align: left;
        margin-bottom: var(--ddd-spacing-2);
        max-height: 200px;
        overflow-y: auto;
        padding-right: var(--ddd-spacing-2);
      }

      .link {
        display: block;
        text-align: center;
        padding: var(--ddd-spacing-2);
        margin-top: auto;
        margin-bottom: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-beaverBlue);
        color: var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-sm);
        transition: background-color 0.2s ease-in-out;
      }

      .link a {
        display: block;
        padding: var(--ddd-spacing-2);
        color: var(--ddd-theme-default-white);
        font-weight: var(--ddd-font-weight-regular);
        font-family: var(--ddd-font-primary);
        text-decoration: none;
      }

      .link:hover {
        background-color: var(--ddd-primary-2);
      }
      
    `];
  }
  

  updated(changedProperties) {
    super.updated(changedProperties);

    if (this.primary) {
      const barElement = this.shadowRoot.querySelector('.bar');
      if (barElement) {
        barElement.style.setProperty(
          'background-color',
          `var(--ddd-primary-${this.primary})`
        );
      }
    }
  }
 
  // Lit render the HTML
  render() {
    return html`
    <div class ="card">
      <div class="image-container">
        <img src="${this.image}" alt="">
        <div class="bar"></div>
      </div>
      <div class="content">
        <h2 class="title">${this.title}</h2>
        <p class="desc"><slot></slot></p>
        <div class="link">
          <a href="${this.link}" target="_blank">Explore ></a>
        </div>
      </div>
    </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddCard.tag, DddCard);