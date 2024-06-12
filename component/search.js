class navigation extends HTMLElement {
  connectedCallback() {
      const placeholder = this.getAttribute('placeholder') || '';
      this.render(placeholder);
  }

  render(placeholder) {
      this.innerHTML = `
          <header>
              <nav class="nav form-search" >
                <i class="uil uil-bars navOpenBtn"></i>
                <a href="#" class="logo" style="font-weight: bold;">Personal Notes Apps</a>
                <ul class="nav-links">
                  <i class="uil uil-times navCloseBtn"></i>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Products</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
                <i class="uil uil-search search-icon" id="searchIcon"></i>
                <div class="search-box" id="box">
                  <i class="uil uil-search search-icon" id="searchSecond"></i>
                  <input type="text" placeholder="${placeholder}" />
                </div>
               </nav>
          </header>`;

      const nav = document.querySelector(".nav"),
      searchIcon = document.querySelector("#searchIcon"),
      navOpenBtn = document.querySelector(".navOpenBtn"),
      navCloseBtn = document.querySelector(".navCloseBtn"),
      searchIcon2 = document.querySelector("#searchSecond");
    
    searchIcon.addEventListener("click", () => {
      nav.classList.toggle("openSearch");
      nav.classList.remove("openNav");
      if (nav.classList.contains("openSearch")) {
        return searchIcon.classList.replace("uil-search", "uil-times");
      }
      searchIcon.classList.replace("uil-times", "uil-search");
    });
    
    navOpenBtn.addEventListener("click", () => {
      nav.classList.add("openNav");
      nav.classList.remove("openSearch");
      searchIcon.classList.replace("uil-times", "uil-search");
    });
    searchIcon2.addEventListener("click", () => {
      nav.classList.toggle("openSearch");
      nav.classList.remove("openNav");
      if (nav.classList.contains("openSearch")) {
        return searchIcon.classList.replace("uil-search", "uil-times");
      }
      searchIcon.classList.replace("uil-times", "uil-search");
    });
  }
}

customElements.define('navigation-search', navigation);

