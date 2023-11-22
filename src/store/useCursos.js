import { create } from "zustand";

export const useCursos = create((set) => ({
	cursosTecnicos: [],
	cursoTecnico: {},

	cursosSuperiores: [],
	cursoSuperior: {},

	pegarTodosCursosTecnicos: (data) => set({cursosTecnicos: data}),
	pegarTodosCursosSuperiores: (data) => set({cursosSuperiores: data}),
    
	pegarCursoTecnicoPorId: (id) => set((state) => ({cursoTecnico: state.cursosTecnicos.find((curso) => curso.id === id)})),
	pegarCursoSuperiorPorId: (id) => set((state) => ({cursoSuperior: state.cursosSuperiores.find((curso) => curso.id === id)})),

	adicionarcursoTecnico: (data) => set((state) => ({cursosTecnicos: [...state.cursosTecnicos, data]})),
	adicionarcursoSuperior: (data) => set((state) => ({cursosSuperiores: [...state.cursosSuperiores, data]})),

	atualizarCursoTecnico: (id, data) => set((state) => ({cursosTecnicos: state.cursosTecnicos.map((curso) => curso.id === id ? data : curso)})),
	atualizarCursoSuperior: (id, data) => set((state) => ({cursosSuperiores: state.cursosSuperiores.map((curso) => curso.id === id ? data : curso)})),

	deletarCursoTecnico: (id) => set((state) => ({cursosTecnicos: state.cursosTecnicos.filter((curso) => curso.id !== id)})),
	deletarCursoSuperior: (id) => set((state) => ({cursosSuperiores: state.cursosSuperiores.filter((curso) => curso.id !== id)})),
}));