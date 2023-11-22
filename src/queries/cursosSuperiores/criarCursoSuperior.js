import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCursos } from "@/src/store/useCursos";

const fetchCriarCursoSuprior = async ({values}) => {
	const {data} = await api.post("/cursos/superiores", values);
	return data;
};

export const useCriarCursoSuperior = () => {
	const adicionarcursoSuperior = useCursos(state => state.adicionarcursoSuperior);

	const mutation = useMutation({mutationKey: ["cursos-superiores"], mutationFn: fetchCriarCursoSuprior, 
		onSuccess: (data) => {
			alert("Curso superior criado com sucesso.");
			adicionarcursoSuperior(data?.result);
		}, onError: (err) => {

			alert("Erro ao curso superior");
		}});

	return mutation;
};