import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useAdministrador } from "@/src/store/useAdministrador";

const fetchBuscarUsusarios = async () => {
	const {data} = await api.get("/admin/usuario");
	return data;
};

export const useBuscarUsuarios = () => {
	const pegarTodosUsuarios = useAdministrador(state => state.pegarTodosUsuarios);

	const query = useQuery({queryKey: ["administardor"], queryFn: fetchBuscarUsusarios});

	useEffect(() => {
		if(query.status === "success"){
			pegarTodosUsuarios(query.data?.result);
		}
    
	},[query.status]);
	return query;
};