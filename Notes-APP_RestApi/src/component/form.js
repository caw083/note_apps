class NotesAPI {
  constructor() {
    this.BASE_URL = 'https://notes-api.dicoding.dev/v2';
  }

  async createNote(title, body) {
    const url = `${this.BASE_URL}/notes`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    return response.json();
  }
}
class FormField extends HTMLElement {
  connectedCallback() {
    const placeholder = this.getAttribute('placeholder') || '';
    this.render(placeholder);

    const inputTitle = this.querySelector('input');
    inputTitle.addEventListener('input', () => {
      this.validateInput(inputTitle);
    });

    const textareaBody = this.querySelector('textarea');
    textareaBody.addEventListener('input', () => {
      this.validateInput(textareaBody);
    });

    const form = this.querySelector('.form-field');
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      if (this.validateForm()) {
        try {
          const api = new NotesAPI();
          const title = inputTitle.value.trim();
          const body = textareaBody.value.trim();
          const response = await api.createNote(title, body);
          if (response.status === 'success') {
            this.dispatchEvent(
              new CustomEvent('noteCreated', {
                bubbles: true,
                detail: response.data,
              })
            );
            alert('Form submitted successfully!');
          } else {
            alert('Form submission failed!');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while submitting the form!');
        }
      } else {
        alert('Form is not valid!');
      }
    });
  }

  validateInput(inputElement) {
    const inputValue = inputElement.value.trim();
    const isValid = inputValue !== '';
    inputElement.classList.toggle('invalid', !isValid);

    if (!isValid) {
      alert('invalid');
    }
  }

  validateForm() {
    const inputTitle = this.querySelector('input');
    const textareaBody = this.querySelector('textarea');
    return inputTitle.value.trim() !== '' && textareaBody.value.trim() !== '';
  }

  render(placeholder) {
    this.innerHTML = `
        <form action="" class="form-field">
          <div class="form-group">
            <input type="text" placeholder="${placeholder}" id="textInput">
            <textarea name="" id="textareaInput" cols="30" rows="10" placeholder="Masukkan Body Notes"></textarea>
          </div>
          <div class="form-group">
            <button type="submit" id="submit">Submit</button>
          </div>
        </form>
      `;
  }
}

customElements.define('form-field', FormField);
