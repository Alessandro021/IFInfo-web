import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useCalendario } from "@/src/store/useCalendario";
import { useAtualizarCalendario } from "@/src/queries/calendario/atualizarCalendario";

export function AtualizarCalendario({id, open, onClose}) {
	const fileInputRef = useRef();
	const pegarCalendarioPorId = useCalendario(state => state.pegarCalendarioPorId);
	pegarCalendarioPorId(id);
	const calendario = useCalendario(state => state.calendario);


	useEffect(() => {
		pegarCalendarioPorId(id);
	}, [id, pegarCalendarioPorId]);

	const [loading, setLoading] = useState(false);

	const formSchema = yup.object().shape({
		nome: yup.string().strict().optional().nonNullable().min(3),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: calendario?.nome,
			pdf: null,
		}
	});

	const {mutate, isError, isSuccess, status} = useAtualizarCalendario();
    

	const onSubmit = (values) => {
		// if (values.pdf && values.pdf !== calendario?.pdf && values.pdf[0] && values.pdf[0].type !== "application/pdf") {
		// 	alert("Por favor, carregue um arquivo PDF.");
		// 	return;
		// }
		setLoading(true);

		const formData = new FormData();
		for (const key in values) {
			if (key !== "pdf") {
				formData.append(key, values[key]);
			}
		}
		if (fileInputRef.current.files[0]) {
			if (fileInputRef.current.files[0].type !== "application/pdf") {
				alert("Por favor, carregue um arquivo PDF.");
				return;
			}
			
			formData.append("pdf", fileInputRef.current.files[0]);
		}

		mutate({id,  values: formData});

	};

	useEffect(() => {
		if(isError || isSuccess) {
			setLoading(false);
		}

		if(isSuccess) {
			onClose();
		}
	},[isError, isSuccess]);

	

	// if(loading){
	// 	return <p>Carregando...</p>;
	// }
	return (
		<Dialog open={open} onOpenChange={() => onClose()}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle >Editar calendário</DialogTitle>
					<DialogDescription>
                    Faça alterações em seu calendário aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Nome</FormLabel>
									<FormControl>
										<Input placeholder="Nome" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormItem className="flex flex-col">
							<FormLabel className="text-lg font-bold">Pdf</FormLabel>
							<FormControl className="border p-2 rounded-md text-sm">
								<input ref={fileInputRef} type="file" name="pdf" />
							</FormControl>
						</FormItem>

						<DialogFooter>
							<Button type="submit">Salvar</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}