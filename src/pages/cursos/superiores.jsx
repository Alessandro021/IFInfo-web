import { CriarCursoSuperior } from "@/src/components/modal/cursosSuperiores/criarCursoSuperior";
import { colunasCursosSuperiores } from "@/src/components/tabela/colunas/cursosSuperiores";
import { DataTable } from "@/src/components/tabela/data-table";
import { useBuscarCursosSuperiores } from "@/src/queries/cursosSuperiores/buscarCursosSuperiores";
import { useCursos } from "@/src/store/useCursos";
import { useState } from "react";

const CursosSuperiores = () => {
	const {isLoading, status} = useBuscarCursosSuperiores();
	const cursosSuperiores = useCursos(state => state.cursosSuperiores);

	const [abrirCriar, setAbrirCriar] = useState(false);
	const criarCursoSuperior = () => {
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
			<DataTable columns={colunasCursosSuperiores} data={cursosSuperiores}  
				criar={() => criarCursoSuperior()} ComponenteCriarItem={CriarCursoSuperior} open={abrirCriar} onClose={() => setAbrirCriar(false)}   
			/>
		</div>
	);
};
 
export default CursosSuperiores;