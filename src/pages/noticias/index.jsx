import { colunasNoticias } from "../../components/tabela/colunas/noticias";
import { DataTable } from "../../components/tabela/data-table";
import { useNoticia } from "@/src/store/useNoticias";
import { useBuscarNoticias } from "@/src/queries/noticias/buscarTodasNoticias";

const Noticias = () => {
	const {isLoading} = useBuscarNoticias();
	const noticias = useNoticia(state => state.noticias);
	
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