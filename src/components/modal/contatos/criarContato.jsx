import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, XIcon } from "lucide-react";
import ReactInputMask from "react-input-mask";
import { useCriarContato } from "@/src/queries/contatos/criarContato";

export function CriarContato({open, onClose, idSetor}) {
	const [contatos, setContatos] = useState([{ email: "", nome: "", telefone: ""}]);

	const {mutate, isError, isSuccess, status} = useCriarContato();

	const validarContato = yup.object().shape({
		email: yup.string().required().email().min(5),
		nome: yup.string().strict().required().min(5).nonNullable(),
		telefone: yup.string().transform(value => (value === "" ? null : value)).matches(/^\d{2} \d{4,5}-\d{4}$/, "Telefone deve ser no formato (99) 9999-9999 ou (99) 99999-9999").optional().nullable(),
	});

	const formSchema = yup.object().shape({
		contato: yup.array(validarContato).nonNullable().required(),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
	});

	const onSubmit = (values) => {
		values.idSetor = idSetor; //passando o idSetor para o objeto value que possui os contatos
		// console.log( values);
		mutate({values: values});
	};

	useEffect(() => {
		if(isSuccess) {
			onClose();
		}
	},[isError, isSuccess]);

	const removerContato = (index) => {
		const array = contatos.filter((_, indexItem) => indexItem !== index);
		form.setValue("contato", array);
		setContatos(array);
		//TODO: as vezes quando voce deleta e dpois faz o envio o telefone pode ficar null
	};
	return (
		<Dialog open={open} onOpenChange={() => {onClose(); form.reset();}}>
			<DialogContent className="sm:max-w-screen-lg">
				<DialogHeader>
					<DialogTitle >Criar contatos</DialogTitle>
					<DialogDescription>
                    Crie seu contatos aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<ScrollArea className="max-h-[25vw] py-2">
							<div className="flex flex-col gap-4 relative">
								{contatos.map((contato, index) => (
									<Card key={index} className="grid grid-cols-3 gap-4 p-2 border-">
										{contatos.length > 1  &&  <Button variant="link" size="icon" className="absolute right-5" onClick={() => removerContato(index)}><XIcon /></Button>}
										<FormField
											control={form.control}
											name={`contato[${index}].nome`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-lg font-bold">Nome*</FormLabel>
													<FormControl>
														<Input placeholder="Nome" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`contato[${index}].email`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-lg font-bold">Email*</FormLabel>
													<FormControl>
														<Input placeholder="Email" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`contato[${index}].telefone`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-lg font-bold">Telefone</FormLabel>
													<FormControl>
														<ReactInputMask mask={"99 9999-9999"}  {...field}>
															{(inputProps) => <Input placeholder="Telefone" {...inputProps} />}
														</ReactInputMask>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</Card>
                                
								))}
							</div>
						</ScrollArea>

						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold ml-8"><span className="text-xl font-extrabold">*</span> obrigatorio</p>
							<div className="flex gap-4 mr-1">
								<Button onClick={() => setContatos([...contatos, { email: "", nome: "", telefone: "" }])}>  Adicionar contato </Button>
								<Button type="submit" disabled={status === "pending" ? true : false}>
									{status === "pending" ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carregando...</>: "Criar"}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</DialogContent>

		</Dialog>
	);
}
