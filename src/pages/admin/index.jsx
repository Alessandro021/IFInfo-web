import Error from "@/src/components/Error";
import Loading from "@/src/components/Loading";
import { CriarUsuario } from "@/src/components/modal/administrador/criarUsuario";
import { colunasAdministrador } from "@/src/components/tabela/colunas/administrador";
import { DataTable } from "@/src/components/tabela/data-table";
import { useBuscarUsuarios } from "@/src/queries/administrador/buscarUsuarios";
import { useAdministrador } from "@/src/store/useAdministrador";
import { useState } from "react";


const Administrador = () => {
	const {isLoading, status} = useBuscarUsuarios();
	const usuarios = useAdministrador(state => state.usuarios);

	const [abrirCriar, setAbrirCriar] = useState(false);
	const criarUsuario = () => {
		setAbrirCriar(true);
	};
	
	if(isLoading) {
		return <Loading />;
	}
	
	if(status === "error") {
		return <Error messagem={"Error ao acessar servidor."}/>;
	}

	return ( 
		<div className="container mx-auto py-10">
			<h2 className="text-center text-2xl font-bold">Area do administrador</h2>
			<DataTable columns={colunasAdministrador} data={usuarios} 
				criar={() => criarUsuario()} ComponenteCriarItem={CriarUsuario} open={abrirCriar} onClose={() => setAbrirCriar(false)} 
			/>  
		</div>
	);
};
 
export default Administrador;