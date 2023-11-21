import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useContatos } from "@/src/store/useContatos.js";


const fecthAtualizarContato = async ({idSetor, values}) => {
	const {data} = await api.put(`/contato/${idSetor}`, values);
	return data;
};

export const useAtualizarContato = () => {
	const atualizarContato = useContatos(state => state.atualizarContato);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthAtualizarContato,
		onSettled: (data, error, variables) => {
			if (error) {
				alert(error.message);
			} else {
				console.log(data);
				atualizarContato(variables?.idSetor, data?.result?.contato);
				alert("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};
