import Error from "@/src/components/Error";
import Loading from "@/src/components/Loading";
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
		return <Loading />;
	}
	
	if(status === "error") {
		return <Error messagem={"Error ao acessar servidor."} />;
	}

	return ( 
		<div className="container mx-auto py-10">
			<h2 className="text-center text-2xl font-bold">Cursos superiores</h2>

			<DataTable columns={colunasCursosSuperiores} data={cursosSuperiores}  
				criar={() => criarCursoSuperior()} ComponenteCriarItem={CriarCursoSuperior} open={abrirCriar} onClose={() => setAbrirCriar(false)}   
			/>
		</div>
	);
};
 
export default CursosSuperiores;