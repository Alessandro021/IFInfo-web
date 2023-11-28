import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useContatos } from "@/src/store/useContatos";
import { toast } from "react-toastify";

const fetchCriarContato = async ({values}) => {
	const {data} = await api.post("/contato", values);
	return data;
};

export const useCriarContato = () => {
	const adicionarContato = useContatos(state => state.adicionarContato);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fetchCriarContato, 
		onSuccess: (data, variables) => {
			toast.success("Contato criado com sucesso.");
			adicionarContato(variables?.values?.idSetor, data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao criar contato.");
		}});

	return mutation;
};