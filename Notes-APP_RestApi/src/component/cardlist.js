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

  async archiveNote(noteId) {
    const url = `${this.BASE_URL}/notes/${noteId}/archive`;
    const response = await fetch(url, {
      method: 'POST',
    });
    return response.json();
  }

  async unarchiveNote(noteId) {
    const url = `${this.BASE_URL}/notes/${noteId}/unarchive`;
    const response = await fetch(url, {
      method: 'POST',
    });
    return response.json();
  }

  async getUnarchivedNotes() {
    const url = `${this.BASE_URL}/notes`;
    const response = await fetch(url);
    return response.json();
  }

  async getArchivedNotes() {
    const url = `${this.BASE_URL}/notes/archived`;
    const response = await fetch(url);
    return response.json();
  }

  async deleteNote(noteId) {
    const url = `${this.BASE_URL}/notes/${noteId}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return response.json();
  }
}

class Cards extends HTMLElement {
  connectedCallback() {
    this.updateCards();
    document.addEventListener('noteCreated', this.handleNoteCreated.bind(this));
  }

  handleNoteCreated() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'inline-block';

    setTimeout(() => {
      loader.style.display = 'none';
      this.updateCards();
    }, 2000);
  }

  async updateCards() {
    const api = new NotesAPI();
    try {
      const notesData = await api.getUnarchivedNotes();
      this.render(notesData.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  }

  async handleArchive(noteId) {
    const api = new NotesAPI();
    try {
      await api.archiveNote(noteId);
      this.updateCards();
    } catch (error) {
      console.error('Failed to archive note:', error);
    }
  }

  async handleDelete(noteId) {
    const api = new NotesAPI();
    try {
      await api.deleteNote(noteId);
      this.updateCards();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }

  render(notesData) {
    this.innerHTML = notesData
      .map(
        (item) => `
            <div class="card">
                <div>
                    <button class="button button2" onclick="document.querySelector('card-list').handleArchive('${item.id}')">Archive</button>
                    <button class="button button3" onclick="document.querySelector('card-list').handleDelete('${item.id}')">Delete</button>
                </div>
                <p class="heading">${item.title}</p>
                <p>${item.body}</p>
                <p>${new Date(item.createdAt).toLocaleString()}</p>
            </div>
        `
      )
      .join('');
  }
}

customElements.define('card-list', Cards);
