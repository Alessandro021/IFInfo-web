import Error from "@/src/components/Error";
import Loading from "@/src/components/Loading";
import { CriarServidorDocente } from "@/src/components/modal/servidoresDocentes/criarServidorDocente";
import { colunasServidoresDocentes } from "@/src/components/tabela/colunas/servidoresDocentes";
import { DataTable } from "@/src/components/tabela/data-table";
import { useBuscarServidoresDocentes } from "@/src/queries/servidoresDocentes/buscarServidoresDocentes";
import { useServidoresDocentes } from "@/src/store/useServidoresDocentes";
import { useState } from "react";

const ServidoresDocentes = () => {
	const {isLoading, status} = useBuscarServidoresDocentes();
	const docentes = useServidoresDocentes(state => state.docentes);

	const [abrirCriar, setAbrirCriar] = useState(false);
	const criarServidorDocente = () => {
		setAbrirCriar(true);
	};
	
	if(isLoading) {
		return <Loading />;
	}
	
	if(status === "error") {
		return <Error messagem={"Erro ao acessar servidor."}/>;
	}

	return ( 
		<div className="container mx-auto py-10">
			<h2 className="text-center text-2xl font-bold">Servidores docentes</h2>

			<DataTable columns={colunasServidoresDocentes} data={docentes} 
				criar={() => criarServidorDocente()} ComponenteCriarItem={CriarServidorDocente} open={abrirCriar} onClose={() => setAbrirCriar(false)}
			/>  
		</div>
	);
};
 
export default ServidoresDocentes;