import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useStorage } from "../../useHooks/useStorage";
import { useUsuario } from "../../store/useUsuario";

const login = async (usuario) => {
	const {data} = await api.post("/entrar", usuario, {
		headers: { "Content-Type": "application/json" },
	});
	
	if(data){
		api.defaults.headers["Authorization"] = `Bearer ${data?.result?.accessToken}`;
	}

	return data;
};

export const useLogin = (usuario, isSubmitted) => {
	const {setUsuario} = useUsuario();
	const {salvar} = useStorage();
	const query =  useQuery({
		queryKey: ["login", usuario],
		queryFn: () => login(usuario),
		enabled: isSubmitted,
		// networkMode: "offlineFirst",
		retry: false,
		staleTime: 0,
		cacheTime: 0,
	});

	useEffect(() => {
		if(query.status === "success"){
			salvar(query.data?.result);
			setUsuario();
		}
	}, [query.data, query.status]);

	return query;
};