import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import noticias from "@/src/utils/objetoNoticias";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerNoticia = () => {
	const {id} = useParams();
	const noticia = noticias?.result.find(noticia => noticia.id === id);
	const textAreaRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "auto";
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
		}
	},[noticia]);
	return ( 
		<div className="flex h-auto justify-center p-8 bg-slate-100">
			<Card className="w-11/12 h-full">
				<CardHeader>
					<CardTitle>Detalhes da notícia</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div>
						<h1 className="text-xl font-bold">id:</h1>
						<div className="rounded-md border-2 p-2 ">
							<span className="text-sm font-medium line-clamp-2">{noticia?.id}</span>
						</div>
					</div>
					<div>
						<h1 className="text-xl font-bold">Titulo:</h1>
						<div className="rounded-md border-2 p-2 ">
							<span className="text-sm font-medium line-clamp-2">{noticia?.titulo}</span>
						</div>
					</div>
					<div>
						<h1 className="text-xl font-bold">Contudo:</h1>
						<textarea ref={textAreaRef} className="rounded-md outline-none resize-none w-full overflow-hidden border-2 p-2 text-sm text-justify font-medium" value={noticia?.conteudo} readOnly />
					</div>

					<div className="flex gap-4">
						<div>
							<h1 className="text-xl font-bold">data:</h1>
							<div className="rounded-md w-auto border-2 px-4 py-2 ">
								<span className="text-sm text-justify font-medium">{noticia?.data}</span>
							</div>
						</div>

						<div>
							<h1 className="text-xl font-bold">hora:</h1>
							<div className="rounded-md w-auto border-2 px-4 py-2 ">
								<span className="text-sm text-justify font-medium">{noticia?.hora}</span>
							</div>
						</div>
					</div>

					<div>
						<h1 className="text-xl font-bold">imagem da notícia:</h1>
						{noticia?.url_foto ? (
							<div className="rounded-md w-[340px] border-2 p-2 ">
								<img className="w-80 h-96" src={noticia?.url_foto} alt={noticia?.titulo} />
							</div>
						) : (
							<span className="text-sm text-justify font-medium">Notícia sem imagem.</span>
						)}
					</div>

					<div>
						<h1 className="text-xl font-bold">link da notícia:</h1>
						<div className="rounded-md border-2 p-2 ">
							<a className="text-sm text-justify font-medium hover:text-sky-600" target="_blank" href={noticia?.link} rel="noreferrer">{noticia?.link}</a>
						</div>
					</div>
	
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" onClick={() => navigate("/")}>Voltar</Button>
					<Button onClick={() => navigate(`/atualizar/${id}`)}>Atualizar</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
 
export default VerNoticia;