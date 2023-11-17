import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useCalendario } from "@/src/store/useCalendario.js";


const fecthCalendario = async ({id, values}) => {
	const {data} = await api.put(`/calendario/${id}`, values);
	return data;
};

export const useAtualizarCalendario = () => {
	const atualizarCalendario = useCalendario(state => state.atualizarCalendario);

	const mutation = useMutation({mutationKey: ["calendario"], mutationFn: fecthCalendario,
		onSettled: (data, error, variables) => {
			if (error) {
				alert(error.message);
			} else {
				atualizarCalendario(variables.id, data?.result);
				alert("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};
