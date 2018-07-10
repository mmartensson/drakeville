/**
@license
Copyright (c) 2018 Markus Mårtensson. All rights reserved.
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  authenticate
} from '../actions/app.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import { playerSelector } from '../reducers/app.js';

class AboutView extends connect(store)(PageViewElement) {
  _render({_player}) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Drakeville</h2>
        <p>A father and son project. About dragons.</p>
      </section>
      <section>
        <h2>Player</h2>
        <p>${_player ?
          html`Current player is ${_player.displayName}`
        : html`<button on-click="${() => store.dispatch(authenticate())}">Login with Google</button>`}</p>
      </section>
    `;
  }

  static get properties() { return {
    // This is the data from the store.
    _player: Object
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._player = playerSelector(state);
  }
}

window.customElements.define('about-view', AboutView);