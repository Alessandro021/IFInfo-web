import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useHorarios } from "@/src/store/useHorarios";

const buscarHorarios = async () => {
	const {data} = await api.get("/horarios");
	return data;
};

export const useBuscarHorarios = () => {
	const pegarTodosHorarios = useHorarios(state => state.pegarTodosHorarios);

	const query = useQuery({queryKey: ["horario"], queryFn: buscarHorarios});

	useEffect(() => {
		if(query.status === "success"){
			pegarTodosHorarios(query.data?.result);
		}
    
	},[query.status]);
	return query;
};