import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useContatos } from "@/src/store/useContatos";

const fecthCriarSetorEContato = async ({values}) => {
	const {data} = await api.post("/contato/setor", values);
	return data;
};

export const useCriarSetorEContato = () => {
	const adicionarContatoESetor = useContatos(state => state.adicionarContatoESetor);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthCriarSetorEContato, 
		onSuccess: (data) => {
			alert("Setor e Contato criado com sucesso.");
			adicionarContatoESetor(data?.result);
		}, onError: (err) => {

			alert("Erro ao criar setor e contato");
		}});

	return mutation;
};