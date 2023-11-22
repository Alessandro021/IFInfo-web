import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useCursos } from "@/src/store/useCursos.js";


const fetchAtualizarCursoTecnico = async ({id, values}) => {
	const {data} = await api.put(`/cursos/tecnicos/${id}`, values);
	return data;
};

export const useAtualizarCursoTecnico = () => {
	const atualizarCursoTecnico = useCursos(state => state.atualizarCursoTecnico);

	const mutation = useMutation({mutationKey: ["cursos-tecnicos"], mutationFn: fetchAtualizarCursoTecnico,
		onSettled: (data, error, variables) => {
			if (error) {
				alert(error.message);
			} else {
				atualizarCursoTecnico(variables.id, data?.result);
				alert("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};
