import api from "../../services/api.js";
import { useMutation } from "@tanstack/react-query";
import { useContatos } from "@/src/store/useContatos.js";
import { toast } from "react-toastify";


const fetchAtualizarContato = async ({idSetor, values}) => {
	const {data} = await api.put(`/contato/${idSetor}`, values);
	return data;
};

export const useAtualizarContato = () => {
	const atualizarContato = useContatos(state => state.atualizarContato);

	const mutation = useMutation({mutationKey: ["contato"], mutationFn: fetchAtualizarContato,
		onSettled: (data, error, variables) => {
			if (error) {
				if(data.message === "Request failed with status code 401"){
					return toast.error("Usuário não autorizado ou token expirado.");
				}
				toast.error(data.message);
			} else {
				atualizarContato(variables?.idSetor, data?.result?.contato);
				toast.success("Update realizado com sucesso");
			}
		}    
	});

	return mutation;
};
