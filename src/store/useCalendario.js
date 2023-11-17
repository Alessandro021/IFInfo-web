import { create } from "zustand";

export const useCalendario = create((set) => ({
	calendarios: [],
	calendario: {},
	pegarTodosCalendarios: (data) => set({calendarios: data}),
	pegarCalendarioPorId: (id) => set((state) => ({calendario: state.calendarios.find((calendario) => calendario.id === id)})),
	adicionarCalendario: (data) => set((state) => ({calendarios: [...state.calendarios, data]})),
	atualizarCalendario: (id, data) => set((state) => ({calendarios: state.calendarios.map((calendario) => calendario.id === id ? data : calendario)})),
	deletarCalendario: (id) => set((state) => ({calendarios: state.calendarios.filter((calendario) => calendario.id !== id)})),
}));