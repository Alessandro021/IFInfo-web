import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useHorarios } from "@/src/store/useHorarios";
import { useCursos } from "@/src/store/useCursos";

const fetchBuscarCursosTecnicos = async () => {
	const {data} = await api.get("/cursos/tecnicos");
	return data;
};

export const useBuscarCursosTecnicos = () => {
	const pegarTodosCursosTecnicos = useCursos(state => state.pegarTodosCursosTecnicos);

	const query = useQuery({queryKey: ["cursos-tecnicos"], queryFn: fetchBuscarCursosTecnicos});

	useEffect(() => {
		if(query.status === "success"){
			pegarTodosCursosTecnicos(query.data?.result);
		}
    
	},[query.status]);
	return query;
};