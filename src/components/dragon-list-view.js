/**
@license
Copyright (c) 2018 Markus Mårtensson. All rights reserved.
*/

import { html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { spawnDragon, slayDragon } from '../actions/dragons.js';

// We are lazy loading its reducer.
import dragons, { aliveSelector, deadSelector } from '../reducers/dragons.js';
store.addReducers({
  dragons
});

// These are the elements needed by this element.
import './dragon-button.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class DragonListView extends connect(store)(PageViewElement) {
  _render({_alive,_dead}) {
    const btn = kind => {
      return html`<dragon-button kind="${kind}" active="true"></dragon-button>`;
    }

    return html`
      ${SharedStyles}
      <section>
        <ul>
          ${repeat(_alive, (i) => i.id, (i, index) => html`
            <li><dragon-button kind="${i.kind}" level="${i.level}" active="true"></dragon-button></li>`)}
        </ul>
      </section>
    `
  }

  static get properties() { return {
    // This is the data from the store.
    _alive: Array,
    _dead: Array
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._alive = aliveSelector(state);
    this._dead = deadSelector(state);
  }
}

window.customElements.define('dragon-list-view', DragonListView);
