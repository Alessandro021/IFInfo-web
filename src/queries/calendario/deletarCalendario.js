import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCalendario } from "@/src/store/useCalendario";

const fecthDeletarCalendario = async ({id}) => {
	const {data} = await api.delete(`/calendario/${id}`);
	return data;
};

export const useDeletarCalendario = () => {
	const deletarCalendario = useCalendario(state => state.deletarCalendario);

	const mutation = useMutation({mutationKey: ["calendario"], mutationFn: fecthDeletarCalendario, 
		onSuccess: (data) => {
			alert("Calendário deletado com sucesso.");
			deletarCalendario(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			alert("Erro ao deletar calendário");
		}});

	return mutation;
};