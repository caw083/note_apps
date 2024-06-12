class FormField extends HTMLElement {
    connectedCallback() {
      const placeholder = this.getAttribute('placeholder') || '';
      this.render(placeholder);
  
      const inputTitle = this.querySelector('input');
      inputTitle.addEventListener('input', () => {
        this.validateInput(inputTitle);
      });

      const textareaBody = this.querySelector('textarea')
      textareaBody.addEventListener('input', () => {
        this.validateInput(textareaBody);
      });

      const form = this.querySelector('.form-field');
      form.addEventListener('submit', (event) => {
          event.preventDefault(); // Prevent the default form submission behavior
          if (this.validateForm()) {
              // If form is valid, you can perform further actions here, such as submitting data
              alert('Form submitted successfully!');
          } else {
              // If form is not valid, you can display an error message or take other actions
              alert('Form is not valid!');
          }
      });


    }
  
    validateInput(inputElement) {
        const inputValue = inputElement.value.trim();
        const isValid = inputValue !== '';
        inputElement.classList.toggle('invalid', !isValid);
        
        if (!isValid) {
            alert("invalid");
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
  