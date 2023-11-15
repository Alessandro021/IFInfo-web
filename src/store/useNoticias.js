import { create } from "zustand";
import {persist} from "zustand/middleware";

export const useNoticia = create(persist((set) => ({
	noticias: [],
	noticia: {},
	pegarToadaAsNoticias: (data) => set({noticias: data}),
	pegarNoticiaPorId: (id) => set((state) => ({noticia: state.noticias.find((noticia) => noticia.id === id)})),
	atualizarNoticia: (id, data) => set((state) => ({noticias: state.noticias.map((noticia) => noticia.id === id ? data : noticia)})),
	deletarNoticia: (id) => set((state) => ({noticias: state.noticias.filter((noticia) => noticia.id !== id)})),
}),{
	name: "noticias",
	getStorage: () => localStorage
}));