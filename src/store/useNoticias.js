import { create } from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

export const useNoticia = create(persist((set) => ({
	noticias: [],
	noticia: {},
	pegarTodasNoticias: (data) => set({noticias: data}),
	pegarNoticiaPorId: (id) => set((state) => ({noticia: state.noticias.find((noticia) => noticia.id === id)})),
	atualizarNoticia: (id, data) => set((state) => ({noticias: state.noticias.map((noticia) => noticia.id === id ? data : noticia)})),
	deletarNoticia: (id) => set((state) => ({noticias: state.noticias.filter((noticia) => noticia.id !== id)})),
}),{
	name: "noticias", // Essa parte do codigo e necessaria para manter a persistencia do esatdo de noticia
	storage: createJSONStorage(() => localStorage)
}));