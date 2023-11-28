import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useHorarios } from "@/src/store/useHorarios";
import { toast } from "react-toastify";

const fetchCriarHorario = async ({values}) => {
	const {data} = await api.post("/horarios", values);
	return data;
};

export const useCriarHorario = () => {
	const adicionarHorario = useHorarios(state => state.adicionarHorario);

	const mutation = useMutation({mutationKey: ["horario"], mutationFn: fetchCriarHorario, 
		onSuccess: (data) => {
			toast.success("Horário criado com sucesso.");
			adicionarHorario(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao criar horario.");
		}});

	return mutation;
};