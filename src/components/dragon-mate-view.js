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
import { spawnDragon, slayDragon } from '../actions/dragons.js';

// We are lazy loading its reducer.
import dragons, { activeDisabledKindsSelector } from '../reducers/dragons.js';
store.addReducers({
  dragons
});

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class DragonMateView extends connect(store)(PageViewElement) {
  _render({_active,_disabled}) {
    return html`
      ${SharedStyles}
      <section>
        <table border=0><tr><td> 
          <dragon-button name="eel" title="Ål"
            active?="${_active.has('eel')}" disabled?="${_disabled.has('eel')}"></dragon-button><br>
          <dragon-button name="fire" title="Eld"
            active?="${_active.has('fire')}" disabled?="${_disabled.has('fire')}"></dragon-button><br>
          </td><td>
          <dragon-button name="ground" title="Grundis"
            active?="${_active.has('ground')}" disabled?="${_disabled.has('ground')}"></dragon-button><br>
        </td><td>
          <dragon-button name="green" title="Grön"
            active?="${_active.has('green')}" disabled?="${_disabled.has('green')}"></dragon-button><br>
          <dragon-button name="clay" title="Lera"
            active?="${_active.has('clay')}" disabled?="${_disabled.has('clay')}"></dragon-button><br>
          <dragon-button name="lava" title="Lava"
            active?="${_active.has('lava')}" disabled?="${_disabled.has('lava')}"></dragon-button><br>
          <dragon-button name="smelt" title="Smält"
            active?="${_active.has('smelt')}" disabled?="${_disabled.has('smelt')}"></dragon-button><br>
        </td><td>
          <dragon-button name="hard" title="Hård"
            active?="${_active.has('hard')}" disabled?="${_disabled.has('hard')}"></dragon-button><br>
          <dragon-button name="air" title="Luft"
            active?="${_active.has('air')}" disabled?="${_disabled.has('air')}"></dragon-button><br>
        </td><td>
          <dragon-button name="stone" title="Sten"
            active?="${_active.has('stone')}" disabled?="${_disabled.has('stone')}"></dragon-button><br>
          <dragon-button name="odd" disabled title="Udda"
            active?="${_active.has('odd')}" disabled?="${_disabled.has('odd')}"></dragon-button><br>
          <dragon-button name="crystal" active title="Kristall"
            active?="${_active.has('crystal')}" disabled?="${_disabled.has('crystal')}"></dragon-button><br>
        </td></tr></table>
      </section>
    `
  }

  static get properties() { return {
    // This is the data from the store.
    _active: Object,
    _disabled: Object
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    const status = activeDisabledKindsSelector(state);
    console.log('Status', status);
    this._active = status.active;
    this._disabled = status.disabled;
  }
}

window.customElements.define('dragon-mate-view', DragonMateView);