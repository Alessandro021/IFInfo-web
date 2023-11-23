import { create } from "zustand";

export const useAdministrador = create((set) => ({
	usuarios: [],
	usuario: {},
	pegarTodosUsuarios: (data) => set({usuarios: data}),
	pegarUsuarioPorId: (id) => set((state) => ({usuario: state.usuarios.find((usuario) => usuario.id === id)})),
	adicionarUsuario: (data) => set((state) => ({usuarios: [...state.usuarios, data]})),
	atualizarUsuario: (id, data) => set((state) => ({usuarios: state.usuarios.map((usuario) => usuario.id === id ? data : usuario)})),
	deletarUsuario: (id) => set((state) => ({usuarios: state.usuarios.filter((usuario) => usuario.id !== id)})),
}));