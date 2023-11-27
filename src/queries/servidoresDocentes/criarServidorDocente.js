import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useServidoresDocentes } from "@/src/store/useServidoresDocentes";
import { toast } from "react-toastify";

const fetchCriarServidorDocente = async ({values}) => {
	const {data} = await api.post("/servidor/docente", values);
	return data;
};

export const useCriarServidorDocente = () => {
	const adicionarServidorDocente = useServidoresDocentes(state => state.adicionarServidorDocente);

	const mutation = useMutation({mutationKey: ["servidores-docentes"], mutationFn: fetchCriarServidorDocente, 
		onSuccess: (data) => {
			toast.success("Servidor docente criado com sucesso.");
			adicionarServidorDocente(data?.result);
		}, onError: (data) => {
			if(data.message === "Request failed with status code 401"){
				return toast.error("Usuário não autorizado ou token expirado.");
			}
			toast.error("Erro ao criar servidor docente.");
		}});

	return mutation;
};