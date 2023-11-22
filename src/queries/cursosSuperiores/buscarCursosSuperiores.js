import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useCursos } from "@/src/store/useCursos";

const fetchBuscarCursosSuperiores = async () => {
	const {data} = await api.get("/cursos/superiores");
	return data;
};

export const useBuscarCursosSuperiores = () => {
	const pegarTodosCursosSuperiores = useCursos(state => state.pegarTodosCursosSuperiores);

	const query = useQuery({queryKey: ["cursos-superiores"], queryFn: fetchBuscarCursosSuperiores});

	useEffect(() => {
		if(query.status === "success"){
			pegarTodosCursosSuperiores(query.data?.result);
		}
    
	},[query.status]);
	return query;
};