import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useHorarios } from "@/src/store/useHorarios.js";
import { toast } from "react-toastify";


const fecthHorario = async ({id, values}) => {
	const {data} = await api.put(`/horarios/${id}`, values);
	return data;
};

export const useAtualizarHorario = () => {
	const atualizarHorario = useHorarios(state => state.atualizarHorario);

	const mutation = useMutation({mutationKey: ["horario"], mutationFn: fecthHorario,
		onSettled: (data, error, variables) => {
			if (error) {
				if(data.message === "Request failed with status code 401"){
					return toast.error("Usuário não autorizado ou token expirado.");
				}
				toast.error(data.message);
			} else {
				atualizarHorario(variables.id, data?.result);
				toast.success("Horario atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
