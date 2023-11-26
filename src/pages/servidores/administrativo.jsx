import Error from "@/src/components/Error";
import Loading from "@/src/components/Loading";
import { CriarServidorAdministrativo } from "@/src/components/modal/servidoresAdministrativos/criarServidorAdministrativo";
import { colunasServidoresAdministrativos } from "@/src/components/tabela/colunas/servidoresAdministrativos";
import { DataTable } from "@/src/components/tabela/data-table";
import { useBuscarServidoresAdministrativos } from "@/src/queries/servidortesAdministrativos/buscarServidoresAdminstrativos";
import { useServidoresAdministrativos } from "@/src/store/useServidoresAdministrativos";
import { useState } from "react";



const ServidoresAdministrativo = () => {
	const {isLoading, status} = useBuscarServidoresAdministrativos();
	const administrativos = useServidoresAdministrativos(state => state.administrativos);

	const [abrirCriar, setAbrirCriar] = useState(false);
	const criarServidorAdministrativo = () => {
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
			<h2 className="text-center text-2xl font-bold">Servidores administrativos</h2>

			<DataTable columns={colunasServidoresAdministrativos} data={administrativos} 
				criar={() => criarServidorAdministrativo()} ComponenteCriarItem={CriarServidorAdministrativo} open={abrirCriar} onClose={() => setAbrirCriar(false)}
			/>  
		</div>
	);
};
 
export default ServidoresAdministrativo;