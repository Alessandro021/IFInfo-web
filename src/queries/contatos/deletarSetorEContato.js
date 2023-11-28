import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useContatos } from "@/src/store/useContatos";
import { toast } from "react-toastify";

const fetchDeletarSetorEContato = async ({idSetor}) => {
	const {data} = await api.delete(`/contatos/setor/${idSetor}`);
	return data;
};

export const useDeletarSetorEContato = () => {
	const deletarSetorEContato = useContatos(state => state.deletarSetorEContato);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fetchDeletarSetorEContato, 
		onSuccess: (data) => {
			toast.success("Setor e contatos deletados com sucesso.");
			deletarSetorEContato(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao deletar setor e contatos");
		}});

	return mutation;
};