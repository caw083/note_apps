import './component/cardlist.js';
import './component/search.js';
import './component/form.js';
import './style/button.css';
import './style/main.css';
import './style/header.css';
import './style/form.css';
import './style/navigation.css';
import './style/responsive.css';
import './style/card.css';
import './style/button.css';
import './style/loader.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  app.innerHTML = `
      <div class="loader"></div>
      <navigation-search placeholder="Search your notes"></navigation-search>
      <form-field placeholder="Masukkan judul notes"></form-field>
      <h2 style="color: #F7EEDD;">My Notes</h2>
      <card-list class="container-note"></card-list>
    `;
  document.body.appendChild(app);
});
