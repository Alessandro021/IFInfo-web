import { create } from "zustand";

export const useServidoresAdministrativos = create((set) => ({
	administrativos: [],
	administrativo: {},

	pegarTodosServidoresAdministrativos: (data) => set({administrativos: data}),
	pegarServidoradministrativoPorId: (id) => set((state) => ({administrativo: state.administrativos.find((administrativo) => administrativo.id === id)})),
	adicionarServidorAdministrativo: (data) => set((state) => ({administrativos: [...state.administrativos, data]})),
	atualizarServidorAdministrativo: (id, data) => set((state) => ({administrativos: state.administrativos.map((administrativo) => administrativo.id === id ? data : administrativo)})),
	deletarServidorAdministrativo: (id) => set((state) => ({administrativos: state.administrativos.filter((administrativo) => administrativo.id !== id)})),
}));