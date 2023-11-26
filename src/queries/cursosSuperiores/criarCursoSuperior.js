import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCursos } from "@/src/store/useCursos";
import { toast } from "react-toastify";

const fetchCriarCursoSuprior = async ({values}) => {
	const {data} = await api.post("/cursos/superiores", values);
	return data;
};

export const useCriarCursoSuperior = () => {
	const adicionarcursoSuperior = useCursos(state => state.adicionarcursoSuperior);

	const mutation = useMutation({mutationKey: ["cursos-superiores"], mutationFn: fetchCriarCursoSuprior, 
		onSuccess: (data) => {
			toast.success("Curso superior criado com sucesso.");
			adicionarcursoSuperior(data?.result);
		}, onError: (err) => {
			toast.error("Erro ao criar curso superior");
		}});

	return mutation;
};