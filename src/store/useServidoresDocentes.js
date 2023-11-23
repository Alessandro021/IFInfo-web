import { create } from "zustand";

export const useServidoresDocentes = create((set) => ({
	docentes: [],
	docente: {},

	pegarTodosServidoresDocentes: (data) => set({docentes: data}),
	pegarServidorDocentePorId: (id) => set((state) => ({docente: state.docentes.find((docente) => docente.id === id)})),
	adicionarServidorDocente: (data) => set((state) => ({docentes: [...state.docentes, data]})),
	atualizarServidorDocente: (id, data) => set((state) => ({docentes: state.docentes.map((docente) => docente.id === id ? data : docente)})),
	deletarServidorDocente: (id) => set((state) => ({docentes: state.docentes.filter((docente) => docente.id !== id)})),
}));