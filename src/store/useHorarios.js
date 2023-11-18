import { create } from "zustand";

export const useHorarios = create((set) => ({
	horarios: [],
	horario: {},
	pegarTodosHorarios: (data) => set({horarios: data}),
	pegarHorarioPorId: (id) => set((state) => ({horario: state.horarios.find((horario) => horario.id === id)})),
	adicionarHorario: (data) => set((state) => ({horarios: [...state.horarios, data]})),
	atualizarHorario: (id, data) => set((state) => ({horarios: state.horarios.map((horario) => horario.id === id ? data : horario)})),
	deletarHorario: (id) => set((state) => ({horarios: state.horarios.filter((horario) => horario.id !== id)})),
}));