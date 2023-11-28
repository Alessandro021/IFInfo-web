import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCalendario } from "@/src/store/useCalendario";
import { toast } from "react-toastify";

const fetchCriarCalendario = async ({values}) => {
	const {data} = await api.post("/calendario", values);
	return data;
};

export const useCriarCalendario = () => {
	const adicionarCalendario = useCalendario(state => state.adicionarCalendario);

	const mutation = useMutation({mutationKey: ["calendario"], mutationFn: fetchCriarCalendario, 
		onSuccess: (data) => {
			toast.success("Calendário criado com sucesso.");
			adicionarCalendario(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao criar calendario.");
		}});

	return mutation;
};