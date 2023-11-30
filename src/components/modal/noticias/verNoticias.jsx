import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { useNoticia } from "@/src/store/useNoticias";
import { useNavigate } from "react-router-dom";
import { AtualizarNoticia } from "./atualizarNoticia";

export function VerNoticias({id, open, onClose}) {
	const [atualizarNoticia, setAtualizarNoticia] = useState(false);

	const pegarNoticiaPorId = useNoticia(state => state.pegarNoticiaPorId);
	pegarNoticiaPorId(id);

	const noticia = useNoticia(state => state.noticia);

	const textAreaRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "auto";
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
		}
	},[noticia]);

	const verNoticia = () => {
		setAtualizarNoticia(true);
	};


	return (
		<>
			<Dialog open={open} onOpenChange={() => {onClose();}}>
				<DialogContent className="sm:max-w-screen-lg max-h-[95vh] overflow-auto p-8">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold mb-1">Detalhes da notícia</DialogTitle>
						<DialogDescription className="text-base">Veja todos os dados dessa notícia
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-6">
						<div>
							<h1 className="text-xl font-bold">id:</h1>
							<div className="rounded-md border-2 p-2 ">
								<span className="text-sm font-medium line-clamp-2">{noticia?.id}</span>
							</div>
						</div>
						<div>
							<h1 className="text-xl font-bold">Titulo</h1>
							<div className="rounded-md border-2 p-2 ">
								<span className="text-sm font-medium line-clamp-2">{noticia?.titulo}</span>
							</div>
						</div>
						<div>
							<h1 className="text-xl font-bold">Contudo</h1>
							<textarea ref={textAreaRef} className="rounded-md outline-none resize-none w-full overflow-hidden border-2 p-2 text-sm text-justify font-medium" value={noticia?.conteudo} readOnly />
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<h1 className="text-xl font-bold">Data</h1>
								<div className="rounded-md w-auto border-2 px-4 py-2 ">
									<span className="text-sm text-justify font-medium">{noticia?.data}</span>
								</div>
							</div>

							<div>
								<h1 className="text-xl font-bold">Hora</h1>
								<div className="rounded-md w-auto border-2 px-4 py-2 ">
									<span className="text-sm text-justify font-medium">{noticia?.hora}</span>
								</div>
							</div>
						</div>

						<div>
							<h1 className="text-xl font-bold">Link da foto</h1>
							<div className="rounded-md border-2 p-2 ">
								{noticia?.url_foto ? (
									<a className="text-sm text-justify font-medium hover:text-sky-600" target="_blank" href={noticia?.url_foto} rel="noreferrer">{noticia?.url_foto}</a>
								): (
									<span className="text-sm text-justify font-medium">Notícia sem foto.</span>
								)}
							</div>
						</div>

						<div>
							<h1 className="text-xl font-bold">Link da notícia</h1>
							<div className="rounded-md border-2 p-2 ">
								<a className="text-sm text-justify font-medium hover:text-sky-600" target="_blank" href={noticia?.link} rel="noreferrer">{noticia?.link}</a>
							</div>
						</div>
	
					</div>
					<div className="flex justify-end mt-8">
						<Button onClick={() => verNoticia()}>Atualizar</Button>
					</div>
				</DialogContent>
			</Dialog>

			{atualizarNoticia && (<AtualizarNoticia open={atualizarNoticia} id={id} onClose={() => setAtualizarNoticia(false)}/>)}
		</>
	);
}
