import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useContatos } from "@/src/store/useContatos";
import { toast } from "react-toastify";

const fecthDeletarSetorEContato = async ({idSetor}) => {
	const {data} = await api.delete(`/contatos/setor/${idSetor}`);
	return data;
};

export const useDeletarSetorEContato = () => {
	const deletarSetorEContato = useContatos(state => state.deletarSetorEContato);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthDeletarSetorEContato, 
		onSuccess: (data) => {
			toast.success("Setor e contatos deletados com sucesso.");
			deletarSetorEContato(data?.result);
		}, onError: (err) => {
			toast.error("Erro ao deletar setor e contatos");
		}});

	return mutation;
};