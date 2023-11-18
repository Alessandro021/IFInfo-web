import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { useStorage } from "../../useHooks/useStorage";
import { useUsuario } from "../../store/useUsuario";

const fecthLogin = async ({usuario}) => {
	const {data} = await api.post("/entrar", usuario, {
		headers: { "Content-Type": "application/json" },
	});
	
	if(data){
		api.defaults.headers["Authorization"] = `Bearer ${data?.result?.accessToken}`;
	}

	return data;
};

export const useLogin = () => {
	const setUsuario = useUsuario(state => state.setUsuario);
	const {salvar} = useStorage();
	const mutation = useMutation({mutationKey: ["login"], mutationFn: fecthLogin,
		onSuccess: (data) => {
			salvar(data?.result);
			setUsuario();
		}, 
		onError: (error) => {
			if(error?.message === "Network Error") {
				alert("Sem conexão com o servidor");
			}

			if(error?.message !== "Network Error") {
				
				alert(error?.response?.data?.errors?.default);
			}
		}
	});

	return mutation;
};
