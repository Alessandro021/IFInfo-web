import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useContatos } from "@/src/store/useContatos";
import { toast } from "react-toastify";

const fecthCriarContato = async ({values}) => {
	const {data} = await api.post("/contato", values);
	return data;
};

export const useCriarContato = () => {
	const adicionarContato = useContatos(state => state.adicionarContato);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthCriarContato, 
		onSuccess: (data, variables) => {
			toast.success("Contato criado com sucesso.");
			adicionarContato(variables?.values?.idSetor, data?.result);
		}, onError: (err) => {
			toast.error("Erro ao criar contato");
		}});

	return mutation;
};