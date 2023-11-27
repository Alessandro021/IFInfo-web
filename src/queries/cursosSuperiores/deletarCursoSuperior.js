import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCursos } from "@/src/store/useCursos";
import { toast } from "react-toastify";

const fetchDeletarCursoSuperior = async ({id}) => {
	const {data} = await api.delete(`/cursos/superiores/${id}`);
	return data;
};

export const useDeletarCursoSuperior = () => {
	const deletarCursoSuperior = useCursos(state => state.deletarCursoSuperior);

	const mutation = useMutation({mutationKey: ["cursos-superiores"], mutationFn: fetchDeletarCursoSuperior, 
		onSuccess: (data) => {
			toast.success("Curso superior deletado com sucesso.");
			deletarCursoSuperior(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao deletar curso superior.");
		}});

	return mutation;
};