import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useContatos } from "@/src/store/useContatos";
import { toast } from "react-toastify";

const fecthDeletarEContato = async ({id}) => {
	const {data} = await api.delete(`/contato/${id}`);
	return data;
};

export const useDeletarContato = () => {
	const deletarContatoPorId = useContatos(state => state.deletarContatoPorId);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthDeletarEContato, 
		onSuccess: (data) => {
			toast.success("Contato deletado com sucesso.");
			// TODO: ver possivel erro ao deltar cotato e ele nao sumir da estato
			deletarContatoPorId(data?.result);
		}, onError: (err) => {
			toast.error("Erro ao deletar contato");
		}});

	return mutation;
};