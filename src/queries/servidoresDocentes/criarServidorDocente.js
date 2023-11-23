import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useServidoresDocentes } from "@/src/store/useServidoresDocentes";

const fetchCriarServidorDocente = async ({values}) => {
	const {data} = await api.post("/servidor/docente", values);
	return data;
};

export const useCriarServidorDocente = () => {
	const adicionarServidorDocente = useServidoresDocentes(state => state.adicionarServidorDocente);

	const mutation = useMutation({mutationKey: ["servidores-docentes"], mutationFn: fetchCriarServidorDocente, 
		onSuccess: (data) => {
			alert("Servidor docente criado com sucesso.");
			adicionarServidorDocente(data?.result);
		}, onError: (err) => {

			alert("Erro ao criar servidor docente");
		}});

	return mutation;
};