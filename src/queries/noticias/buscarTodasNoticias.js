import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useNoticia } from "@/src/store/useNoticias";
import { useEffect } from "react";

const buscarNoticias = async () => {
	const {data} = await api.get("/noticias?limite=60&pagina=1");
	return data;
};

export const useBuscarNoticias = () => {
	const pegarToadaAsNoticias = useNoticia(state => state.pegarToadaAsNoticias);

	const query = useQuery({queryKey: ["noticias"], queryFn: buscarNoticias});

	useEffect(() => {
		if(query.status === "success"){
			pegarToadaAsNoticias(query.data?.result);
		}
		//TODO: FAZER TRATAMENTO DE ERROR
    
	},[query.status]);
	return query;
};