import { CriarHorario } from "@/src/components/modal/horario/criarHorario";
import { DataTable } from "../../components/tabela/data-table";
import { colunasHorarios } from "@/src/components/tabela/colunas/horarios";
import { useBuscarHorarios } from "@/src/queries/horarios/buscarHorarios";
import { useHorarios } from "@/src/store/useHorarios";
import { useState } from "react";
import Loading from "@/src/components/Loading";
import Error from "@/src/components/Error";

const Horarios = () => {
	const {isLoading, status} = useBuscarHorarios();
	const horarios = useHorarios(state => state.horarios);

	const [abrirCriar, setAbrirCriar] = useState(false);
	const criarHorario = () => {
		setAbrirCriar(true);
	};
	
	if(isLoading) {
		return <Loading />;
	}
	
	if(status === "error") {
		return <Error messagem={"Error ao acessar servidor."} />;
	}

	return ( 
		<div className="container mx-auto py-10">
			<h2 className="text-center text-2xl font-bold">Horarios das turmas</h2>

			<DataTable columns={colunasHorarios} data={horarios} criar={() => criarHorario()} ComponenteCriarItem={CriarHorario} open={abrirCriar} onClose={() => setAbrirCriar(false)} /> 
		</div>
	);
};
 
export default Horarios;