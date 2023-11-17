import { useBuscarCalendarios } from "@/src/queries/calendario/buscarCalendarios";
import { colunasCalendario } from "../../components/tabela/colunas/calendario";
import { DataTable } from "../../components/tabela/data-table";
import { useCalendario } from "@/src/store/useCalendario";

const Calendario = () => {
	const {isLoading, status} = useBuscarCalendarios();
	const calendarios = useCalendario(state => state.calendarios);
	
	if(isLoading) {
		return <p>Carregando...</p>;
	}
	
	if(status === "error") {
		return <p>Erro ao acessar api...</p>;
	}

	return ( 
		<div className="container mx-auto py-10">
			<DataTable columns={colunasCalendario} data={calendarios} />
		</div>
	);
};
 
export default Calendario;