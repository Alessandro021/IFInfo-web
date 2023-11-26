import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useCalendario } from "@/src/store/useCalendario";
import { toast } from "react-toastify";

const fecthCriarCalendario = async ({values}) => {
	const {data} = await api.post("/calendario", values);
	return data;
};

export const useCriarCalendario = () => {
	const adicionarCalendario = useCalendario(state => state.adicionarCalendario);

	const mutation = useMutation({mutationKey: ["calendario"], mutationFn: fecthCriarCalendario, 
		onSuccess: (data) => {
			toast.success("Calendário criado com sucesso.");
			adicionarCalendario(data?.result);
		}, onError: (err) => {
			// console.log(err.message);
			toast.error("Erro ao criar calendário");
		}});

	return mutation;
};