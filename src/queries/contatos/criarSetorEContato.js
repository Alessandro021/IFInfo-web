import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useContatos } from "@/src/store/useContatos";
import { toast } from "react-toastify";

const fecthCriarSetorEContato = async ({values}) => {
	const {data} = await api.post("/contato/setor", values);
	return data;
};

export const useCriarSetorEContato = () => {
	const adicionarContatoESetor = useContatos(state => state.adicionarContatoESetor);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthCriarSetorEContato, 
		onSuccess: (data) => {
			toast.success("Setor e Contato criado com sucesso.");
			adicionarContatoESetor(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao criar contato e setor.");
		}});

	return mutation;
};