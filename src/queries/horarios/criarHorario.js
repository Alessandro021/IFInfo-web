import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useHorarios } from "@/src/store/useHorarios";

const fecthCriarHorario = async ({values}) => {
	const {data} = await api.post("/horarios", values);
	return data;
};

export const useCriarHorario = () => {
	const adicionarHorario = useHorarios(state => state.adicionarHorario);

	const mutation = useMutation({mutationKey: ["horario"], mutationFn: fecthCriarHorario, 
		onSuccess: (data) => {
			alert("Horário criado com sucesso.");
			adicionarHorario(data?.result);
		}, onError: (err) => {

			alert("Erro ao criar horário");
		}});

	return mutation;
};