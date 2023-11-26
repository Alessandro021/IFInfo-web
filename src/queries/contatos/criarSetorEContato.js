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
		}, onError: (err) => {
			toast.error("Erro ao criar setor e contato");
		}});

	return mutation;
};