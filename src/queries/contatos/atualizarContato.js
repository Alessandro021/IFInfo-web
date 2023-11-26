import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useContatos } from "@/src/store/useContatos.js";
import { toast } from "react-toastify";


const fecthAtualizarContato = async ({idSetor, values}) => {
	const {data} = await api.put(`/contato/${idSetor}`, values);
	return data;
};

export const useAtualizarContato = () => {
	const atualizarContato = useContatos(state => state.atualizarContato);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthAtualizarContato,
		onSettled: (data, error, variables) => {
			if (error) {
				toast.error(error.message);
			} else {
				atualizarContato(variables?.idSetor, data?.result?.contato);
				toast.success("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};
