import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/Header";
import Noticias from "./pages/noticias";
import Login from "./pages/login";
import Cursos from "./pages/cursos";
import Horarios from "./pages/horarios";
import Contatos from "./pages/contatos";
import Servidores from "./pages/servidores";
const App = () => {
	const logado =false;
	return (
		<BrowserRouter>
			{logado && <Header />}
			<Routes>
				<Route  path="/" element={logado ? <Noticias /> : <Navigate to={"/login"} /> } />
				<Route  path="/cursos" element={logado ? <Cursos /> : <Navigate to={"/login"} /> } />
				<Route  path="/horarios" element={logado ? <Horarios /> : <Navigate to={"/login"} /> } />
				<Route  path="/contatos" element={logado ? <Contatos /> : <Navigate to={"/login"} /> } />
				<Route  path="/servidores" element={logado ? <Servidores /> : <Navigate to={"/login"} /> } />
				<Route  path="/login" element={!logado ? <Login /> : <Navigate to={"/"} /> } />
				
			</Routes>
		</BrowserRouter>
	);
};

export default App;
