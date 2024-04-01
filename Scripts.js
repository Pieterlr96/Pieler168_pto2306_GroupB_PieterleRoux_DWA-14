import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';


const MAX_NUMBER = 10;
const MIN_NUMBER = -10;
const STEP_AMOUNT = 1;

class TallyApp extends LitElement {

  static properties = {
    count: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
  }

  subtractHandler() {
    this.count -= STEP_AMOUNT;
    this.requestUpdate();
    if (this.count === MIN_NUMBER) {
      console.log("Limit reached");
      setTimeout(() => {
        this.showSnackbar("Minimum counter limit reached!");
      });
    }
  }

  addHandler() {
    this.count += STEP_AMOUNT;
    this.requestUpdate();
    if (this.count === MAX_NUMBER) {
      console.log("Limit reached");
      setTimeout(() => {
        this.showSnackbar("Maximum counter limit reached!");
      });
    }
  }

  resetHandler() {
    this.count = 0;
    this.requestUpdate();
    setTimeout(() => {
      this.showSnackbar('Counter has been reset.');
    });
  }


  showSnackbar(message) {
    const snackbar = this.shadowRoot.querySelector('.snackbar');
    snackbar.textContent = message;
    snackbar.classList.add('show');
    setTimeout(() => {
      snackbar.classList.remove('show');
      snackbar.textContent = '';
    }, 3000);
  }

  render() {
    return html`
      <main class="counter">
        <input class="counter_value" type="number" .value=${this.count} disabled/>

        <div class="counter_actions">
          <button type="subtract" class="counter_button" @click=${this.subtractHandler} ?disabled=${this.count <= MIN_NUMBER}>
            -
          </button>

          <button type="add" class="counter_button" @click=${this.addHandler} ?disabled=${this.count >= MAX_NUMBER}>
            +
          </button>
        </div>

        <div>
          <button type="reset" @click=${this.resetHandler}>
            Reset
          </button>
        </div>
        <div type="snackbar" class="snackbar"></div>
      </main>
    `;
  }
  static styles = css `
  :root {
    --color-green: #32c48d;
    --color-white: #ffffff;
    --color-dark-grey: #33333d;
    --color-medium-grey: #424250;
    --color-light-grey: #9ca3ae;
  }
  
   *{
    box-sizing: border-box;
  }
  html {
      height: 100vh;
  }
  
  body {
    margin: 0;
    background-color: var(--color-medium-grey);
    color: var(--color-white);
    font-family: Roboto, Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  
  /* header */
  
  .header {
    text-align: center;
  }
  
  .header_title {
    font-size: 3rem;
    font-weight: 900;
    color: var(--color-light-grey);
  }
  
  /* controls */
  
  .controls {
    background-color: yellow;
  }
  
  /* counter */
  
  .counter {
    background-color: var(--color-dark-grey);
  }
  
  .counter_value {
    width: 100%;
    height: 15rem;
    text-align: center;
    font-size: 6rem;
    font-weight: 900;
    color: var(--color-white);
    background: none;
    border-width: 0;
    border-bottom: 1px solid var(--color-light-grey);
  }
  
  .counter_actions {
    display: flex;
  }
  
  .counter_button {
    background: none;
    width: 50%;
    border-width: 0;
    color: var(--color-white);
    font-size: 3rem;
    height: 10rem;
    border-bottom: 1px solid var(--color-light-grey);
    transition: transform 0.1s;
    transform: translateY(0);
  }
  
  .counter_button:disabled {
      opacity: 0.2;
  }
  
  .counter_button:active {
    background: var(--color-medium-grey);
    transform: translateY(2%);
  }
  
  .counter_button_first {
    border-right: 1px solid var(--color-light-grey);
  }
}`
}


customElements.define("tally-app", TallyApp);








