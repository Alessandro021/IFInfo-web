import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useEffect } from "react";
import { useContatos } from "@/src/store/useContatos";

const buscarContatos = async () => {
	const {data} = await api.get("/contato?limite=200");
	return data;
};

export const useBuscarContatos = () => {
	const pegarTodosContatos = useContatos(state => state.pegarTodosContatos);

	const query = useQuery({queryKey: ["contatos"], queryFn: buscarContatos});

	useEffect(() => {
		if(query.status === "success"){
			pegarTodosContatos(query.data?.result);
		}
    
	},[query.status]);
	return query;
};