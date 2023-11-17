import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useCalendario } from "@/src/store/useCalendario";

const buscarCalendarios = async () => {
	const {data} = await api.get("/calendario");
	return data;
};

export const useBuscarCalendarios = () => {
	const pegarTodosCalendarios = useCalendario(state => state.pegarTodosCalendarios);

	const query = useQuery({queryKey: ["calendario"], queryFn: buscarCalendarios});

	useEffect(() => {
		if(query.status === "success"){
			pegarTodosCalendarios(query.data?.result);
		}
    
	},[query.status]);
	return query;
};