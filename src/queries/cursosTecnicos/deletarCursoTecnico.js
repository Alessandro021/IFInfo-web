import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCursos } from "@/src/store/useCursos";
import { toast } from "react-toastify";

const fetchDeletarCursoTecnico = async ({id}) => {
	const {data} = await api.delete(`/cursos/tecnicos/${id}`);
	return data;
};

export const useDeletarCursoTecnico = () => {
	const deletarCursoTecnico = useCursos(state => state.deletarCursoTecnico);

	const mutation = useMutation({mutationKey: ["cursos-tecnicos"], mutationFn: fetchDeletarCursoTecnico, 
		onSuccess: (data) => {
			toast.success("Curso tecnico deletado com sucesso.");
			deletarCursoTecnico(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao deletar curso tecnico.");
		}});

	return mutation;
};