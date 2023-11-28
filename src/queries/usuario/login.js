import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useStorage } from "../../useHooks/useStorage";
import { toast } from "react-toastify";
import { useBuscarUsuario } from "./buscarUsuario";

const fetchLogin = async ({usuario}) => {
	const {data} = await api.post("/entrar", usuario, {
		headers: { "Content-Type": "application/json" },
	});
	
	if(data){
		api.defaults.headers["Authorization"] = `Bearer ${data?.result?.accessToken}`;
	}

	return data;
};

export const useLogin = () => {
	const {refetch} = useBuscarUsuario();
	const {salvar} = useStorage();
	const mutation = useMutation({mutationKey: ["login"], mutationFn: fetchLogin,
		onSuccess: (data) => {
			salvar(data?.result);
			refetch();
		}, 
		onError: (error) => {
			if(error?.message === "Network Error") {
				toast.error("Sem conexão com o servidor");
			}

			if(error?.message !== "Network Error") {
				toast.error(error?.response?.data?.errors?.default);
			}
		}
	});

	return mutation;
};
