class NotesAPI {
  constructor() {
      this.BASE_URL = "https://notes-api.dicoding.dev/v2";
  }

  async createNote(title, body) {
      const url = `${this.BASE_URL}/notes`;
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, body })
      });
      return response.json();
  }

  async archiveNote(noteId) {
      const url = `${this.BASE_URL}/notes/${noteId}/archive`;
      const response = await fetch(url, {
          method: 'POST'
      });
      return response.json();
  }

  async unarchiveNote(noteId) {
      const url = `${this.BASE_URL}/notes/${noteId}/unarchive`;
      const response = await fetch(url, {
          method: 'POST'
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
          method: 'DELETE'
      });
      return response.json();
  }
}

async function main() {
    try {
        const api = new NotesAPI();
        
        // Membuat catatan baru
        const createResponse = await api.createNote("Judul Catatan", "Isi Catatan");
        console.log("Catatan baru:", createResponse);
        
        const noteId = createResponse.data.id;

        // Mendapatkan semua catatan yang belum diarsipkan
        const unarchivedNotes = await api.getUnarchivedNotes();
        console.log("Catatan belum diarsipkan:", unarchivedNotes);

        // Mengarsipkan catatan
        const archiveResponse = await api.archiveNote(noteId);
        console.log("Catatan diarsipkan:", archiveResponse);

        // Mendapatkan semua catatan yang diarsipkan
        const archivedNotes = await api.getArchivedNotes();
        console.log("Catatan diarsipkan:", archivedNotes);

        // Mengembalikan catatan dari arsip
        const unarchiveResponse = await api.unarchiveNote(noteId);
        console.log("Catatan dikembalikan dari arsip:", unarchiveResponse);

        // Menghapus catatan
        const deleteResponse = await api.deleteNote(noteId);
        console.log("Catatan dihapus:", deleteResponse);
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
}

// Jalankan fungsi utama jika skrip dieksekusi langsung
if (require.main === module) {
  main();
}
