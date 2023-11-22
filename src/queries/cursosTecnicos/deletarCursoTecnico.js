import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCursos } from "@/src/store/useCursos";

const fetchDeletarCursoTecnico = async ({id}) => {
	const {data} = await api.delete(`/cursos/tecnicos/${id}`);
	return data;
};

export const useDeletarCursoTecnico = () => {
	const deletarCursoTecnico = useCursos(state => state.deletarCursoTecnico);

	const mutation = useMutation({mutationKey: ["cursos-tecnicos"], mutationFn: fetchDeletarCursoTecnico, 
		onSuccess: (data) => {
			alert("Curso tecnico deletado com sucesso.");
			deletarCursoTecnico(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			alert("Erro ao deletar curso tecnico");
		}});

	return mutation;
};