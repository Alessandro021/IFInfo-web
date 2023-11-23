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
		return <p>Carregando...</p>;
	}
	
	if(status === "error") {
		return <p>Erro ao acessar api...</p>;
	}

	return ( 
		<div className="container mx-auto py-10">
			<DataTable columns={colunasServidoresAdministrativos} data={administrativos} 
				criar={() => criarServidorAdministrativo()} ComponenteCriarItem={CriarServidorAdministrativo} open={abrirCriar} onClose={() => setAbrirCriar(false)}
			/>  
		</div>
	);
};
 
export default ServidoresAdministrativo;