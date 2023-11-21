import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useContatos } from "@/src/store/useContatos";

const fecthDeletarEContato = async ({id}) => {
	const {data} = await api.delete(`/contato/${id}`);
	return data;
};

export const useDeletarContato = () => {
	const deletarContatoPorId = useContatos(state => state.deletarContatoPorId);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthDeletarEContato, 
		onSuccess: (data) => {
			alert("Contato deletado com sucesso.");
			deletarContatoPorId(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			alert("Erro ao deletar contato");
		}});

	return mutation;
};