import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useHorarios } from "@/src/store/useHorarios";

const fecthDeletarHorario = async ({id}) => {
	const {data} = await api.delete(`/horarios/${id}`);
	return data;
};

export const useDeletarHorario = () => {
	const deletarHorario = useHorarios(state => state.deletarHorario);

	const mutation = useMutation({mutationKey: ["horario"], mutationFn: fecthDeletarHorario, 
		onSuccess: (data) => {
			alert("Horário deletado com sucesso.");
			deletarHorario(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			alert("Erro ao deletar horário");
		}});

	return mutation;
};