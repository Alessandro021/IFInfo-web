import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useServidoresAdministrativos } from "@/src/store/useServidoresAdministrativos";

const fetchCriarServidorAdministrativo = async ({values}) => {
	const {data} = await api.post("/servidor/administrativo", values);
	return data;
};

export const useCriarServidorAdministrativo = () => {
	const adicionarServidorAdministrativo = useServidoresAdministrativos(state => state.adicionarServidorAdministrativo);

	const mutation = useMutation({mutationKey: ["servidores-administrativo"], mutationFn: fetchCriarServidorAdministrativo, 
		onSuccess: (data) => {
			alert("Servidor administrativo criado com sucesso.");
			adicionarServidorAdministrativo(data?.result);
		}, onError: (err) => {

			alert("Erro ao criar servidor administrativo");
		}});

	return mutation;
};