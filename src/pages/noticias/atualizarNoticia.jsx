import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import noticias from "@/src/utils/objetoNoticias";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AtualizarNoticia = () => {
	const {id} = useParams();
	const noticia = noticias?.result.find(noticia => noticia.id === id);
	const textAreaRef = useRef(null);
	const navigate = useNavigate();

	const [titulo, setTitulo] = useState(noticia?.titulo);
	const [conteudo, setConteudo] = useState(noticia?.conteudo);
	const [data, setData] = useState(noticia?.data);
	const [hora, setHora]  = useState( noticia?.hora);
	const [imagem, setImagem] = useState( noticia?.url_foto);
	const [link, setLink] = useState( noticia?.link);
    
	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "auto";
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
		}
	},[noticia, conteudo]);

	const handleSubmit = (e) => {
		e.preventDefault();

	};
	return ( 
		<div className="flex h-auto justify-center p-8 bg-slate-100">
			<Card className="w-11/12 h-full">
				<CardHeader className="mt-10 ml-10">
					<CardTitle>Atualizar notícia</CardTitle>
				</CardHeader>
				<CardContent className="p-8">
					<form onSubmit={handleSubmit} className="flex flex-col gap-6">
						<div className="flex flex-row gap-4 items-center">
							<Label className="text-lg font-bold" >id:</Label>
							<Input disabled  type="text" name="id" value={noticia?.id} className="focus:outline-none w-auto focus:ring-0"/>
						</div>

						<div className="flex flex-row gap-4 items-center">
							<Label className="text-lg font-bold" >titulo:</Label>
							<Input type="titulo" name="titulo" placeholder="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} className="focus:outline-none focus:ring-0"/>
						</div>

						<div className="flex flex-row gap-4 items-start">
							<Label className="text-lg font-bold" >conteudo:</Label>
							<Textarea ref={textAreaRef} name="conteudo" className="rounded-md outline-none resize-none w-full overflow-hidden border-2 p-2 text-sm text-justify font-medium" value={conteudo} onChange={e => setConteudo(e.target.value)} />
						</div>

						<div className="flex gap-4">
							<div className="flex flex-row gap-4 items-start">
								<Label className="text-lg font-bold">data:</Label>
								<Input  type="text" name="data" placeholder="data" value={data} onChange={e => setData(e.target.value)} className="focus:outline-none w-auto focus:ring-0"/>
							</div>

							<div className="flex flex-row gap-4 items-start">
								<Label className="text-lg font-bold">hora:</Label>
								<Input  type="text" name="hora" placeholder="hora" value={hora} onChange={e => setHora(e.target.value)} className="focus:outline-none w-auto focus:ring-0"/>
							</div>
						</div>

						<div className="flex flex-row gap-4 items-center">
							<Label className="text-lg font-bold" >imagem:</Label>
							<Input type="url" name="imagem" value={imagem} onChange={e => setImagem(e.target.value)}  className="focus:outline-none focus:ring-0"/>
						</div>

						<div className="flex flex-row gap-4 items-center">
							<Label className="text-lg font-bold" >link:</Label>
							<Input type="url" name="link" value={link} onChange={e => setLink(e.target.value)}  className="focus:outline-none focus:ring-0"/>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" onClick={() => navigate("/")}>Voltar</Button>
					<Button>Atualizar</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
 
export default AtualizarNoticia;