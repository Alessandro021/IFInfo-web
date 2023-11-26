import Error from "@/src/components/Error";
import Loading from "@/src/components/Loading";
import { CriarSetorEContato } from "@/src/components/modal/contatos/criarSetorEContato";
import { colunasSetorEContatos } from "@/src/components/tabela/colunas/SetorEContatos";
import { DataTable } from "@/src/components/tabela/data-table";
import { useBuscarContatos } from "@/src/queries/contatos/buscarContatos";
import { useContatos } from "@/src/store/useContatos";
import { useState } from "react";

const Contatos = () => {
	const {isLoading, status} = useBuscarContatos();
	const contatos = useContatos(state => state.contatos);

	const [abrirCriar, setAbrirCriar] = useState(false);
	const criarSetorEContato = () => {
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
			<h2 className="text-center text-2xl font-bold">Contatos</h2>

			<DataTable columns={colunasSetorEContatos} data={contatos} criar={() => criarSetorEContato()} ComponenteCriarItem={CriarSetorEContato} 
				open={abrirCriar} onClose={() => setAbrirCriar(false)}  />  
		</div>
	);
};
 
export default Contatos;