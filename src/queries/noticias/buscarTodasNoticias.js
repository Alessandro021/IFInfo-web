import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useNoticia } from "@/src/store/useNoticias";
import { useEffect } from "react";

const buscarNoticias = async () => {
	const {data} = await api.get("/noticias?limite=60&pagina=1");
	return data;
};

export const useBuscarNoticias = () => {
	const pegarTodasNoticias = useNoticia(state => state.pegarTodasNoticias);

	const query = useQuery({queryKey: ["noticias"], queryFn: buscarNoticias});

	useEffect(() => {
		if(query.status === "success"){
			pegarTodasNoticias(query?.data?.result);
		}
	},[query.status, query.data]);

	return query;
};