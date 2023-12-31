import { colunasNoticias } from "../../components/tabela/colunas/noticias";
import { DataTable } from "../../components/tabela/data-table";
import { useNoticia } from "@/src/store/useNoticias";
import { useBuscarNoticias } from "@/src/queries/noticias/buscarTodasNoticias";
import Loading from "@/src/components/Loading";
import Error from "@/src/components/Error";

const Noticias = () => {
	const {isLoading, status} = useBuscarNoticias();
	const noticias = useNoticia(state => state.noticias);
	if(isLoading) {
		return <Loading />;
	}
	
	if(status === "error") {
		return <Error messagem="Error ao acessar servidor." />;
	}

	return ( 
		<div className="container mx-auto py-10">
			<h2 className="text-center text-2xl font-bold">Noticias</h2>
			<DataTable columns={colunasNoticias} data={noticias} />
		</div>
	);
};
 
export default Noticias;