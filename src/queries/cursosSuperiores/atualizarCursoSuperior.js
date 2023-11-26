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
				toast.error(error.message);
			} else {
				atualizarCursoSuperior(variables.id, data?.result);
				toast.success("Curso superior atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
