import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useServidoresAdministrativos } from "@/src/store/useServidoresAdministrativos";
import { toast } from "react-toastify";

const fetchCriarServidorAdministrativo = async ({values}) => {
	const {data} = await api.post("/servidor/administrativo", values);
	return data;
};

export const useCriarServidorAdministrativo = () => {
	const adicionarServidorAdministrativo = useServidoresAdministrativos(state => state.adicionarServidorAdministrativo);

	const mutation = useMutation({mutationKey: ["servidores-administrativo"], mutationFn: fetchCriarServidorAdministrativo, 
		onSuccess: (data) => {
			toast.success("Servidor administrativo criado com sucesso.");
			adicionarServidorAdministrativo(data?.result);
		}, onError: (err) => {
			toast.error("Erro ao criar servidor administrativo");
		}});

	return mutation;
};