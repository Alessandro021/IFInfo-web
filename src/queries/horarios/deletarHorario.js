import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useHorarios } from "@/src/store/useHorarios";
import { toast } from "react-toastify";

const fetchDeletarHorario = async ({id}) => {
	const {data} = await api.delete(`/horarios/${id}`);
	return data;
};

export const useDeletarHorario = () => {
	const deletarHorario = useHorarios(state => state.deletarHorario);

	const mutation = useMutation({mutationKey: ["horario"], mutationFn: fetchDeletarHorario, 
		onSuccess: (data) => {
			toast.success("Horário deletado com sucesso.");
			deletarHorario(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao deletar horario.");
		}});

	return mutation;
};