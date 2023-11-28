import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useCalendario } from "@/src/store/useCalendario.js";
import { toast } from "react-toastify";


const fetchCalendario = async ({id, values}) => {
	const {data} = await api.put(`/calendario/${id}`, values);
	return data;
};

export const useAtualizarCalendario = () => {
	const atualizarCalendario = useCalendario(state => state.atualizarCalendario);

	const mutation = useMutation({mutationKey: ["calendario"], mutationFn: fetchCalendario,
		onSettled: (data, error, variables) => {
			if (error) {
				if(data.message === "Request failed with status code 401"){
					return toast.error("Usuário não autorizado ou token expirado.");
				}
				toast.error(data.message);
			} else {
				atualizarCalendario(variables.id, data?.result);
				toast.success("Calendario atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
