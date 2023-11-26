import Error from "@/src/components/Error";
import Loading from "@/src/components/Loading";
import { CriarCursoTecnico } from "@/src/components/modal/cursosTecnicos/criarCursoTecnico";
import { colunasCursosTecnicos } from "@/src/components/tabela/colunas/cursosTecnicos";
import { DataTable } from "@/src/components/tabela/data-table";
import { useBuscarCursosTecnicos } from "@/src/queries/cursosTecnicos/buscarCursosTecnicos";
import { useCursos } from "@/src/store/useCursos";
import { useState } from "react";

const CursosTecnicos = () => {
	const {isLoading, status} = useBuscarCursosTecnicos();
	const cursosTecnicos = useCursos(state => state.cursosTecnicos);

	const [abrirCriar, setAbrirCriar] = useState(false);
	const criarCursoTecnico = () => {
		setAbrirCriar(true);
	};
	
	if(isLoading) {
		return <Loading />;
	}
	
	if(status === "error") {
		return <Error messagem={"Erro ao acessar api."}/>;
	}

	return ( 
		<div className="container mx-auto py-10">
			<h2 className="text-center text-2xl font-bold">Cursos tecnicos</h2>

			<DataTable columns={colunasCursosTecnicos} data={cursosTecnicos}  criar={() => criarCursoTecnico()} 
				ComponenteCriarItem={CriarCursoTecnico} open={abrirCriar} onClose={() => setAbrirCriar(false)}   />
		</div>
	);
};
 
export default CursosTecnicos;