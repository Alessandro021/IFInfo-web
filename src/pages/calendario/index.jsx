import { useBuscarCalendarios } from "@/src/queries/calendario/buscarCalendarios";
import { colunasCalendario } from "../../components/tabela/colunas/calendario";
import { DataTable } from "../../components/tabela/data-table";
import { useCalendario } from "@/src/store/useCalendario";
import { CriarCalendario } from "@/src/components/modal/calendario/criarCalendario";
import { useState } from "react";
import Loading from "@/src/components/Loading";
import Error from "@/src/components/Error";

const Calendario = () => {
	const {isLoading, status} = useBuscarCalendarios();
	const calendarios = useCalendario(state => state.calendarios);

	const [abrirCriar, setAbrirCriar] = useState(false);
	const criarCalendario = () => {
		setAbrirCriar(true);
	};
	
	if(isLoading) {
		return <Loading />;
	}
	
	if(status === "error") {
		return <Error messagem={"Erro ao acessar servidor"} />;
	}

	return ( 
		<div className="container mx-auto py-10">
			<h2 className="text-center text-2xl font-bold">Calendarios</h2>

			<DataTable columns={colunasCalendario} data={calendarios} criar={() => criarCalendario()} ComponenteCriarItem={CriarCalendario} open={abrirCriar} onClose={() => setAbrirCriar(false)}  />
		</div>
	);
};
 
export default Calendario;