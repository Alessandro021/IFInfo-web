import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlterarSenha } from "@/src/components/modal/usuario/alterarSenha";
import { AtualizUrusaurio } from "@/src/components/modal/usuario/atualizarUsuario";
import { useUsuario } from "@/src/store/useUsuario";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
	const user = useUsuario(state => state.user);
	const navigate = useNavigate();
	return ( 
		<div className="flex h-screen-minus-header justify-center items-center  bg-slate-100">
			<Card className="w-2/4 h-auto">
				<CardHeader>
					<CardTitle>Detalhes do usuario</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-8 p-8">
					<div className="flex flex-row gap-3 items-center">
						<h1 className="text-lg font-bold">Nome</h1>
						<div className="rounded-md border-2 px-2 py-1 w-full ">
							<span className="text-sm font-medium line-clamp-2">{user?.nome}</span>
						</div>
					</div>

					<div className="flex flex-row gap-3 items-center">
						<h1 className="text-lg font-bold">Email</h1>
						<div className="rounded-md border-2 px-2 py-1 w-full ">
							<span className="text-sm font-medium line-clamp-2">{user?.email}</span>
						</div>
					</div>		
	
				</CardContent>
				<CardFooter className="flex justify-between mt-8">
					<Button variant="outline" onClick={() => navigate("/")}>Voltar</Button>
					<div className="flex gap-4">
						<AlterarSenha />
						<AtualizUrusaurio />
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};
 
export default Perfil;