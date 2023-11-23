import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useServidoresAdministrativos } from "@/src/store/useServidoresAdministrativos";

const fetchBuscarServidoresAdministartivos = async () => {
	// TODO: refatora a query params de filtrar
	const {data} = await api.get("/servidor/administrativo?limite=200");
	return data;
};

export const useBuscarServidoresAdministrativos = () => {
	const pegarTodosServidoresAdministrativos = useServidoresAdministrativos(state => state.pegarTodosServidoresAdministrativos);

	const query = useQuery({queryKey: ["servidores-administartivos"], queryFn: fetchBuscarServidoresAdministartivos});

	useEffect(() => {
		if(query.status === "success"){
			pegarTodosServidoresAdministrativos(query.data?.result);
		}
    
	},[query.status]);
	return query;
};