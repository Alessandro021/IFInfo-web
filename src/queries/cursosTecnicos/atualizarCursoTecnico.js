import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useCursos } from "@/src/store/useCursos.js";
import { toast } from "react-toastify";


const fetchAtualizarCursoTecnico = async ({id, values}) => {
	const {data} = await api.put(`/cursos/tecnicos/${id}`, values);
	return data;
};

export const useAtualizarCursoTecnico = () => {
	const atualizarCursoTecnico = useCursos(state => state.atualizarCursoTecnico);

	const mutation = useMutation({mutationKey: ["cursos-tecnicos"], mutationFn: fetchAtualizarCursoTecnico,
		onSettled: (data, error, variables) => {
			if (error) {
				toast.error(error.message);
			} else {
				atualizarCursoTecnico(variables.id, data?.result);
				toast.success("Curso tecnico atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
