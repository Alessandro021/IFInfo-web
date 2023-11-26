import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useCalendario } from "@/src/store/useCalendario.js";
import { toast } from "react-toastify";


const fecthCalendario = async ({id, values}) => {
	const {data} = await api.put(`/calendario/${id}`, values);
	return data;
};

export const useAtualizarCalendario = () => {
	const atualizarCalendario = useCalendario(state => state.atualizarCalendario);

	const mutation = useMutation({mutationKey: ["calendario"], mutationFn: fecthCalendario,
		onSettled: (data, error, variables) => {
			if (error) {
				toast.error(error.message);
			} else {
				atualizarCalendario(variables.id, data?.result);
				toast.success("Calendario atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
