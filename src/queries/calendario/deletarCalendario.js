import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCalendario } from "@/src/store/useCalendario";
import { toast } from "react-toastify";

const fecthDeletarCalendario = async ({id}) => {
	const {data} = await api.delete(`/calendario/${id}`);
	return data;
};

export const useDeletarCalendario = () => {
	const deletarCalendario = useCalendario(state => state.deletarCalendario);

	const mutation = useMutation({mutationKey: ["calendario"], mutationFn: fecthDeletarCalendario, 
		onSuccess: (data) => {
			toast.success("Calendário deletado com sucesso.");
			deletarCalendario(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			toast.error("Erro ao deletar calendário");
		}});

	return mutation;
};