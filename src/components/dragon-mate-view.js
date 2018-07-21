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
import { selectMate, mateDragons } from '../actions/dragons.js';

// We are lazy loading its reducer.
import dragons, { activeDisabledKindsSelector, selectedMatesSelector } from '../reducers/dragons.js';
store.addReducers({
  dragons
});

// These are the elements needed by this element.
import './dragon-button.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class DragonMateView extends connect(store)(PageViewElement) {
  _render({_active,_disabled,_selected}) {
    const btn = kind => {
      return html`<dragon-button kind="${kind}"
        on-click="${() => { if (_active.has(kind)) store.dispatch(selectMate(kind)); }}"
        active?="${_active.has(kind)}"
        selected?="${_selected.has(kind)}"
        disabled?="${_disabled.has(kind)}"></dragon-button>`;
    }

    return html`
      ${SharedStyles}
      <section>
        <table border=0><tr><td>
          ${btn('eel')}
          ${btn('fire')}
        </td><td>
          ${btn('ground')}
        </td><td>
          ${btn('green')}
          ${btn('clay')}
          ${btn('lava')}
          ${btn('smelt')}
        </td><td>
          ${btn('hard')}
          ${btn('air')}
        </td><td>
          ${btn('stone')}
          ${btn('odd')}
          ${btn('crystal')}
        </td></tr></table>

        <div on-click="${() => { store.dispatch(mateDragons(..._selected)); }}">Mate</div>
      </section>
    `;
  }

  static get properties() { return {
    // This is the data from the store.
    _active: Object,
    _disabled: Object,
    _selected: Object
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    const status = activeDisabledKindsSelector(state);
    this._active = status.active;
    this._disabled = status.disabled;
    this._selected = selectedMatesSelector(state);
  }
}

window.customElements.define('dragon-mate-view', DragonMateView);