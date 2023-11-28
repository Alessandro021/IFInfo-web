import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useContatos } from "@/src/store/useContatos.js";
import { toast } from "react-toastify";


const fetchAtualizarSetor = async ({idSetor, values}) => {
	const {data} = await api.put(`/contato/setor/${idSetor}`, values);
	return data;
};

export const useAtualizarSetor = () => {
	const atualizarSetor = useContatos(state => state.atualizarSetor);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fetchAtualizarSetor,
		onSettled: (data, error, variables) => {
			if (error) {
				if(data.message === "Request failed with status code 401"){
					return toast.error("Usuário não autorizado ou token expirado.");
				}
				toast.error(data.message);
			} else {
				atualizarSetor(variables?.idSetor, data?.result);
				toast.success("Contato atualizado com sucesso");
			}
		}    
	});

	return mutation;
};
