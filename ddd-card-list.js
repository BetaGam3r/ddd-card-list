/**
 * Copyright 2025 BetaGam3r
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./ddd-card.js";
/**
 * `ddd-card-list`
 * 
 * @demo index.html
 * @element ddd-card-list
 */
export class DddCardList extends DDDSuper(I18NMixin(LitElement)) {
  
  static get tag() {
    return "ddd-card-list";
  }

  constructor() {
    super();
    this.accent = "";
    this.primary = "";
    

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
      accent: { type: String, reflect: true, attribute: "ddd-accent" },
      primary: { type: String, reflect: true, attribute: "data-primary" },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        border: var(--ddd-border-sm);
      }
      
      .container {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 420px));
        justify-content: center;
        gap: var(--ddd-spacing-8);
        width: 100%;
        padding: var(--ddd-spacing-8);
        box-sizing: border-box;
      }

      @media (max-width: 1024px) {
        .container {
          grid-template-columns: repeat(2, minmax(0,420px));
        }
      }

      
      @media (max-width: 768px) {
        .container {
          grid-template-columns: 1fr;
          gap: var(--ddd-spacing-4);
          padding: var(--ddd-spacing-3);
        }

        ::slotted(ddd-card) {
          width: 100%;
          max-width: 100%;
          } 
      }

    `];
  }

  updated(changedProperties){
    super.updated(changedProperties);
    this.updatedCardProperties();
    this.updateAccentColor();
  }


  updatedCardProperties() {
    const cards = this.querySelectorAll("ddd-card");
    cards.forEach((card) => {
      if(this.primary) {
        card.primary = this.primary;
      }
    });
  }

  updateAccentColor() {
    if (this.accent) {
      this.style.setProperty(
        'background-color',
        `var(--ddd-accent-${this.accent})`
      );
    }
  }

  
  // Lit render the HTML
  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddCardList.tag, DddCardList);