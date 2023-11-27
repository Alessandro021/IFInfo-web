import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useCursos } from "@/src/store/useCursos.js";
import { toast } from "react-toastify";


const fetchAtualizarCursoSuperior = async ({id, values}) => {
	const {data} = await api.put(`/cursos/superiores/${id}`, values);
	return data;
};

export const useAtualizarCursoSuperior = () => {
	const atualizarCursoSuperior = useCursos(state => state.atualizarCursoSuperior);

	const mutation = useMutation({mutationKey: ["cursos-superiores"], mutationFn: fetchAtualizarCursoSuperior,
		onSettled: (data, error, variables) => {
			if (error) {
				if(data.message === "Request failed with status code 401"){
					return toast.error("Usuário não autorizado ou token expirado.");
				}
				toast.error(data.message);
			} else {
				atualizarCursoSuperior(variables.id, data?.result);
				toast.success("Curso superior atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
