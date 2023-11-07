import { colunasNoticias } from "../../components/tabela/colunas/noticias";
import { DataTable } from "../../components/tabela/data-table";
import noticias from "../../utils/objetoNoticias";

const Noticias = () => {
	const data = noticias?.result;
	return ( 
		<div className="container mx-auto py-10">
			<DataTable columns={colunasNoticias} data={data} />
		</div>
	);
};
 
export default Noticias;