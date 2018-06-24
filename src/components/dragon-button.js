import { LitElement, html } from '@polymer/lit-element';

class DragonButton extends LitElement {
  _render({name,title,active,disabled}) {
    return html`
      <style>
        :host { 
          display: inline-block; 
          position: relative;
          width: 160px;
          height: 52px;
          margin: 8px;
          --active-color: #a67a00;
          --inactive-color: #aaa;
        }
        .icon-frame {
          position: absolute;
          left: 16px;
          top: 0px;
          width: 48px;
          height: 48px;
          border-radius: 4px;
          display: inline-block;
          border: solid 2px var(--inactive-color);
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
	  background: linear-gradient(135deg, rgba(96,96,128,1) 0%, rgba(32,32,128,1) 100%);
        }
        .icon-frame[disabled] {
	  background: linear-gradient(135deg, rgba(96,96,96,1) 0%, rgba(32,32,32,1) 100%);
        } 
        .icon-frame[active] {
          border-color: var(--active-color);
        }
        .icon {
          width: 40px;
          height: 40px;
          position: absolute;
          left: 23px;
          top: 7px;
        }
        .icon[disabled] {
          filter: grayscale(80%);
        } 
        .title {
          font-family: "Open Sans", Arial, "Helvetica Neue", Helvetica, sans-serif;
          font-size: 12px;
          position: absolute;
          top: 0px; 
          left: 76px;
          width: 54px;
          height: 52px;
          overflow: hidden;
          text-align: center;
          line-height: 52px;
        }
        .paren {
          width: 16px;
          height: 52px;
          border-radius: 8px;
          position: absolute;
          top: 0px; 
        }
        .paren.begin {
          border-left: solid 4px var(--inactive-color);
          left: 0px;
        }
        .paren.end {
          border-right: solid 4px var(--inactive-color);
          right: 16px;
        }
        .paren.begin[active], .paren.end[active] {
          border-color: var(--active-color);
        }
      </style>
     
      <div class="icon-frame" title$="${title}" active$="${active}" disabled$="${disabled}"></div> 
      <div class="icon" disabled$="${disabled}" style="background-image: url(images/dragons/${name}-40.png);"></div>
      <div class="title">${this.title}</div>
      <div class="paren begin" active$="${active}"></div>
      <div class="paren end" active$="${active}"></div>
    `;
  }

  static get properties() { return {
    name: String,
    title: String,
    active: Boolean,
    disabled: Boolean
  }}
}

window.customElements.define('dragon-button', DragonButton);
