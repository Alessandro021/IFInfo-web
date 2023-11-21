import { create } from "zustand";

export const useContatos = create((set) => ({
	contatos: [],
	contato: {},
	setor: {},
	pegarTodosContatos: (data) => set({contatos: data}),
	pegarContatoPorId: (idSetor, idContato) => set((state) => {
		const setor = state.contatos.find((setor) => setor.id === idSetor);
		if (setor) {
			const contato = setor.contato.find((contato) => contato.id === idContato);
			return { contato: contato };
		}
		return { contato: {} };
	}),
	pegarSetorPorId: (idSetor) => set((state) =>  ({setor: state.contatos.find((setor) => setor.id === idSetor)})),
	adicionarContatoESetor: (data) => set((state) => ({contatos: [...state.contatos, data]})),
	adicionarContato: (id, data) => set((state) => ({contatos: state.contatos.map((setor) => setor.id === id ? setor = {...setor, contato: [...data]} : setor)})),
	atualizarContato: (idSetor, data) => set((state) => ({
		contatos: state.contatos.map((setor) => {
			if (setor.id === idSetor) {
				setor.contato = data;
			}
			return setor;
		}),
	})),
	atualizarSetor: (idSetor, newSetor) => set((state) => ({
		contatos: state.contatos.map((setor) => 
			setor.id === idSetor 
				? {...newSetor, contato: [...setor.contato]} 
				: setor
		)
	})),
	deletarSetorEContato: (idSetor) => set((state) => ({contatos: state.contatos.filter((contato) => contato.id !== idSetor)})),
	deletarContatoPorId: (idContato) => set((state) => ({
		contatos: state.contatos.map((setor) => {
			return {
				...setor,
				contato: setor.contato.filter((contato) => contato.id !== idContato)
			};
		})
	})),
}));