import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useHorarios } from "@/src/store/useHorarios.js";


const fecthHorario = async ({id, values}) => {
	const {data} = await api.put(`/horarios/${id}`, values);
	return data;
};

export const useAtualizarHorario = () => {
	const atualizarHorario = useHorarios(state => state.atualizarHorario);

	const mutation = useMutation({mutationKey: ["horario"], mutationFn: fecthHorario,
		onSettled: (data, error, variables) => {
			if (error) {
				alert(error.message);
			} else {
				atualizarHorario(variables.id, data?.result);
				alert("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};
