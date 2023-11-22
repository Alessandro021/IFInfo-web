import { useParams } from "react-router-dom";

const Servidores = () => {
	let { servidor } = useParams();
	return ( 
		<div>Servidores = {servidor}</div>
	);
};
 
export default Servidores;