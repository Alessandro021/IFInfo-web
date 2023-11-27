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
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao deletar calendario.");
		}});

	return mutation;
};