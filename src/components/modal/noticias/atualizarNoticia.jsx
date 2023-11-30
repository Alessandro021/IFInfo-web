import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useEffect } from "react";
import { useNoticia } from "@/src/store/useNoticias";
import { useAtualizarNoticia } from "@/src/queries/noticias/atualizarNoticia";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

export function AtualizarNoticia({id, open, onClose}) {
	const pegarNoticiaPorId = useNoticia(state => state.pegarNoticiaPorId);
	const noticia = useNoticia(state => state.noticia);

	useEffect(() => {
		pegarNoticiaPorId(id);
	}, [id, pegarNoticiaPorId]);
	

	const {mutate, status, isSuccess} = useAtualizarNoticia();

	const formSchema = yup.object().shape({
		titulo: yup.string().min(3).optional(),
		hora: yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "O formato da hora deve ser hh:mm").min(3).optional(),
		data: yup.string().matches(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/, "O formato da data deve ser dd/mm/aa").min(3).optional(),
		link: yup.string().optional().url(),
		url_foto: yup.string().url().optional().nullable(),
		conteudo: yup.string().optional().min(20),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			id: noticia?.id,
			titulo: noticia?.titulo || "",
			conteudo: noticia?.conteudo?.trim() || "",
			hora: noticia?.hora || "",
			data: noticia?.data || "",
			link: noticia?.link || "",
			url_foto: noticia?.url_foto || "",
		},

	});

	useEffect(() => {
		form.reset({
			id: noticia?.id,
			titulo: noticia?.titulo || "",
			conteudo: noticia?.conteudo?.trim() || "",
			hora: noticia?.hora || "",
			data: noticia?.data || "",
			link: noticia?.link || "",
			url_foto: noticia?.url_foto || "",
		});
	}, [noticia, form]);


	const onSubmit = (values) => {

		for (let key in values) {
			if (values[key] === "") {
				values[key] = null;
			}
		}
		delete values.id;

		mutate({id: id, values: values});
	};

    
	useEffect(() => {
		if(isSuccess) {
			onClose();
		}
	},[isSuccess]);
	
	return (
		<Dialog open={open} onOpenChange={() => {onClose();}}>
			<DialogContent className="sm:max-w-screen-lg max-h-[95vh] overflow-auto p-8">
				<DialogHeader>
					<DialogTitle >Atualizar notícia</DialogTitle>
					<DialogDescription >Faça alterações na notícia aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Id</FormLabel>
									<FormControl>
										<Input placeholder="Id" {...field} disabled />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="titulo"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Titulo:</FormLabel>
									<FormControl>
										<Input placeholder="Titulo" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="conteudo"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Conteudo</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Conteudo da notícia" 
											className="border-2 h-96 p-4 text-sm text-justify font-medium"/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-8">
							<FormField
								control={form.control}
								name="data"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-lg font-bold">Data</FormLabel>
										<FormControl>
											<Input placeholder="Data" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="hora"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-lg font-bold">Hora</FormLabel>
										<FormControl>
											<Input placeholder="Hora" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="url_foto"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Imagem</FormLabel>
									<FormControl>
										<Input placeholder="URL da image" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="link"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Link da notícia</FormLabel>
									<FormControl>
										<Input placeholder="URL da notícia" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="flex justify-between mt-10">
							<Button type="submit" disabled={status === "pending" ? true : false} >
								{status === "pending" ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carregando...</>: "Salvar"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
