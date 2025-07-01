"use client";
import { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    if (data.success) setNotes(data.notes);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    if (data.success) {
      setTitle("");
      setContent("");
      fetchNotes();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchNotes();
  };

  const handleUpdateNote = async (e, id) => {
    e.preventDefault();
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });
    const data = await res.json();
    if (data.success) {
      setEditingId(null);
      fetchNotes();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {username && (
        <div className="w-full max-w-4xl mb-4 text-center">
          <h1 className="text-2xl text-white drop-shadow">
            Selamat datang, <span className="font-bold text-glass-blue-light">{username}</span>!
          </h1>
        </div>
      )}
      <div className="relative glass w-full max-w-4xl p-8 mb-8 shadow-lg border-2 border-white/70">
        <h2 className="relative z-10 text-2xl font-bold mb-4 text-glass-blue-dark drop-shadow-lg bg-white/70 px-4 py-2 rounded-lg inline-block shadow-md">Tambah Catatan</h2>
        <form onSubmit={handleAddNote} className="relative z-10 space-y-4">
          <input
            className="w-full p-3 rounded bg-glass-white/30 text-white placeholder-white border border-glass-blue-light focus:outline-none focus:ring-2 focus:ring-glass-blue-light"
            placeholder="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-3 rounded bg-glass-white/30 text-white placeholder-white border border-glass-blue-light focus:outline-none focus:ring-2 focus:ring-glass-blue-light"
            placeholder="Isi catatan"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="bg-glass-blue-light/80 hover:bg-glass-blue border border-glass-blue-light text-white py-2 px-4 rounded shadow-glass transition"
          >
            Simpan
          </button>
        </form>
      </div>

      <div className="relative glass w-full max-w-4xl p-8 shadow-lg border-2 border-white/70">
        <h2 className="relative z-10 text-2xl font-bold mb-4 text-glass-blue-dark drop-shadow-lg bg-white/70 px-4 py-2 rounded-lg inline-block shadow-md">Daftar Catatan</h2>
        {notes.map((note) => (
          <div key={note._id} className="mb-6 border-b-2 border-glass-blue-light/60 pb-4 bg-glass-white/30 text-white rounded-xl shadow-md border border-glass-blue-light">
            {editingId === note._id ? (
              <form onSubmit={(e) => handleUpdateNote(e, note._id)} className="space-y-2">
                <input
                  className="w-full p-2 rounded bg-glass-white/30 text-white border border-glass-blue-light focus:outline-none focus:ring-2 focus:ring-glass-blue-light"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="w-full p-2 rounded bg-glass-white/30 text-white border border-glass-blue-light focus:outline-none focus:ring-2 focus:ring-glass-blue-light"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-glass-blue-light/80 px-3 py-1 rounded text-white shadow-glass">Simpan</button>
                  <button type="button" onClick={() => setEditingId(null)} className="bg-gray-500/40 px-3 py-1 rounded text-white">Batal</button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-glass-blue-light drop-shadow pl-4">{note.title}</h3>
                <p className="text-white/90 whitespace-pre-line pl-4">{note.content}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-sm bg-red-500/60 hover:bg-red-500/80 px-3 py-1 rounded shadow-glass ml-4"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(note._id);
                      setEditTitle(note.title);
                      setEditContent(note.content);
                    }}
                    className="text-sm bg-glass-blue-light/80 hover:bg-glass-blue px-3 py-1 rounded shadow-glass"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
