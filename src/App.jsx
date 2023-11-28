import { useEffect } from "react";
import { Rotas } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUsuario } from "./store/useUsuario";

const App = () => {
	const deslogarUsuario = useUsuario(state => state.deslogarUsuario);
	useEffect(() => {
		// Listen for the 'unauthorized' event and log out the user when it's fired
		const logoutOnUnauthorized = () => deslogarUsuario();
		window.addEventListener("unauthorized", logoutOnUnauthorized);
		// Clean up the event listener when the component is unmounted
		return () => {
			window.removeEventListener("unauthorized", logoutOnUnauthorized);
		};
	}, [deslogarUsuario]);
	
	return (
		<>
			<Rotas />
			<ToastContainer autoClose={2600} position="top-center" className={"w-2/5"}/>
		</>

	);
};

export default App;
