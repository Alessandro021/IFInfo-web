import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useStorage } from "@/src/useHooks/useStorage";
import { useUsuario } from "@/src/store/useUsuario";


const fetchBuscarUsuario = async () => {
	const { pegar } = useStorage();
	const token = JSON.parse(pegar());
	if(token && token?.accessToken){
		try {
			const { data } = await api.get("/usuario", {
				headers: {"Authorization": `Bearer ${token?.accessToken}`}
			});
			return data;
		} catch (error) {
			return "ERROR_TOKEN_OU_API";
		}
	} else {
		return "ERROR_TOKEN_OU_API"; //houve um erro ao pegar token
	}
};

export const useBuscarUsuario = () => {
	const setUser = useUsuario(state => state.setUser);

	const query = useQuery({queryKey: ["usuario"], queryFn: fetchBuscarUsuario,staleTime: 0, retryOnMount: 0});

	useEffect(() => {
		if(query.status === "success" && query.data?.result){
			setUser(query.data?.result, true, false);
		} else if(query.status === "error") {
			setUser(null, false, false);
		} else if(query.data === "ERROR_TOKEN_OU_API") {
			setUser(null, false, false);
		}
	},[query.status, query.data]);


	return query;
};