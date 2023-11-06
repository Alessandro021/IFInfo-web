/* eslint-disable no-mixed-spaces-and-tabs */
// import { columns } from "../components/tabela/colunas/colunas";
import { colunasNoticias } from "../components/tabela/colunas/noticias";
import { DataTable } from "../components/tabela/data-table";
import noticias from "../utils/objetoNoticias";

// function getData() {
// 	return [
// 	  	{
// 			id: "728ed52f",
// 			amount: 100,
// 			status: "pending",
// 			email: "m@example.com",
// 	  	},
// 		{
// 			id: "489e1d42",
// 			amount: 125,
// 			status: "processing",
// 			email: "example@gmail.com",
// 		},
// 	];
// }

const Noticias = () => {
	// const data = getData();
	const data = noticias.result;
	return ( 
		<div className="container mx-auto py-10">
			<DataTable columns={colunasNoticias} data={data} />
		</div>
	);
};
 
export default Noticias;