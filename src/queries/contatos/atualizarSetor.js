import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useContatos } from "@/src/store/useContatos.js";
import { toast } from "react-toastify";


const fecthAtualizarSetor = async ({idSetor, values}) => {
	const {data} = await api.put(`/contato/setor/${idSetor}`, values);
	return data;
};

export const useAtualizarSetor = () => {
	const atualizarSetor = useContatos(state => state.atualizarSetor);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fecthAtualizarSetor,
		onSettled: (data, error, variables) => {
			if (error) {
				toast.error(error.message);
			} else {
				atualizarSetor(variables?.idSetor, data?.result);
				toast.success("Contato atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
