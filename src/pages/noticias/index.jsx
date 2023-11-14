import { useQuery } from "@tanstack/react-query";
import { colunasNoticias } from "../../components/tabela/colunas/noticias";
import { DataTable } from "../../components/tabela/data-table";

import api from "@/src/services/api";
import { useEffect } from "react";
import { useNoticia } from "@/src/store/useNoticias";

const Noticias = () => {
	const pegarToadaAsNoticias = useNoticia(state => state.pegarToadaAsNoticias);
	const noticias = useNoticia(state => state.noticias);

	const buscarNoticias = async () => {
		const {data} = await api.get("/noticias?limite=60&pagina=1");
		return data;
	};

	const {data, isLoading, status} = useQuery({queryKey: ["noticias"], queryFn: buscarNoticias});

	useEffect(() => {
		if(status === "success"){
			pegarToadaAsNoticias(data?.result);
			//TODO: FAZER TRATAMENTO DE ERROR
		}
	}, [data, status]);
	
	if (isLoading) {
		return <p>Carregando...</p>;
	}

	return ( 
		<div className="container mx-auto py-10">
			<DataTable columns={colunasNoticias} data={noticias} />
		</div>
	);
};
 
export default Noticias;