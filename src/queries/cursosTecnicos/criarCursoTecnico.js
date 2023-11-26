import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCursos } from "@/src/store/useCursos";
import { toast } from "react-toastify";

const fetchCriarCursotecnico = async ({values}) => {
	const {data} = await api.post("/cursos/tecnicos", values);
	return data;
};

export const useCriarCursoTecnico = () => {
	const adicionarcursoTecnico = useCursos(state => state.adicionarcursoTecnico);

	const mutation = useMutation({mutationKey: ["cursos-tecnicos"], mutationFn: fetchCriarCursotecnico, 
		onSuccess: (data) => {
			toast.success("Curso tecnico criado com sucesso.");
			adicionarcursoTecnico(data?.result);
		}, onError: (err) => {
			toast.error("Erro ao curso tecnico");
		}});

	return mutation;
};