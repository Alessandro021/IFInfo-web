import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useHorarios } from "@/src/store/useHorarios.js";
import { toast } from "react-toastify";


const fetchHorario = async ({id, values}) => {
	const {data} = await api.put(`/horarios/${id}`, values);
	return data;
};

export const useAtualizarHorario = () => {
	const atualizarHorario = useHorarios(state => state.atualizarHorario);

	const mutation = useMutation({mutationKey: ["horario"], mutationFn: fetchHorario,
		onSettled: (data, error, variables) => {
			if (error) {
				if(error.message === "Request failed with status code 401"){
					return toast.error("Usuário não autorizado ou token expirado.");
				}
				if(error.response?.data?.message){
					toast.error(error.response?.data?.message);
				} else {
					toast.error("Error ao atualizar horario.");
				}
			} else {
				atualizarHorario(variables.id, data?.result);
				toast.success("Horario atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
