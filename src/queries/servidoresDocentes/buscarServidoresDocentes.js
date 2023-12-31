import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useServidoresDocentes } from "@/src/store/useServidoresDocentes";


const fetchBuscarServidoresDocentes = async () => {
	const LIMITE = 200;
	const {data} = await api.get(`/servidor/docente?limite=${LIMITE}`);
	return data;
};

export const useBuscarServidoresDocentes = () => {
	const pegarTodosServidoresDocentes = useServidoresDocentes(state => state.pegarTodosServidoresDocentes);

	const query = useQuery({queryKey: ["servidores-docentes"], queryFn: fetchBuscarServidoresDocentes});

	useEffect(() => {
		if(query.status === "success"){
			pegarTodosServidoresDocentes(query.data?.result);
		}
    
	},[query.status]);
	return query;
};