import notesData  from "../data/data.js";

class Cards extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = notesData.map(item => `
      <div class="card">
        <p class="heading">${item.title}</p>
        <p>${item.body}</p>
        <p>${item.createdAt}</p>
      </div>
    `).join(' ');
  }
}

customElements.define('card-list', Cards);
