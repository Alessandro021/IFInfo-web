import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useContatos } from "@/src/store/useContatos.js";


const fecthAtualizarSetor = async ({idSetor, values}) => {
	const {data} = await api.put(`/contato/setor/${idSetor}`, values);
	return data;
};

export const useAtualizarSetor = () => {
	const atualizarSetor = useContatos(state => state.atualizarSetor);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthAtualizarSetor,
		onSettled: (data, error, variables) => {
			if (error) {
				alert(error.message);
			} else {
				atualizarSetor(variables?.idSetor, data?.result);
				alert("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};
