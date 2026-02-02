import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: {
  page: number;
  perPage: number;
  search?: string;
}): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params: { page, perPage, search },
      headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
    }
  );

  return response.data;
};

export const createNote = async ({
  title,
  content,
  tag,
}: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    { title, content, tag },
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
    }
  );

  return response.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
    }
  );

  return response.data;}