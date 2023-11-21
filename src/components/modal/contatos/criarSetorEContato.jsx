import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useCriarSetorEContato } from "@/src/queries/contatos/criarSetorEContato";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { XIcon } from "lucide-react";
import ReactInputMask from "react-input-mask";

export function CriarSetorEContato({open, onClose}) {

	const [loading, setLoading] = useState(false);
	const [contatos, setContatos] = useState([{ email: "", nome: "", telefone: null }]);

	const {mutate, isError, isSuccess, status} = useCriarSetorEContato();

	const validarContato = yup.object().shape({
		email: yup.string().required().email().min(5),
		nome: yup.string().strict().required().min(5).nonNullable(),
		telefone: yup.string().transform(value => (value === "" ? null : value)).matches(/^\d{2} \d{4,5}-\d{4}$/, "Telefone deve ser no formato (99) 9999-9999 ou (99) 99999-9999").optional().nullable(),
	});

	const formSchema = yup.object().shape({
		setor: yup.string().strict().optional().nonNullable().min(3),
		contato: yup.array(validarContato).nonNullable().required(),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			setor: "",
		}
	});    

	const onSubmit = (values) => {
		setLoading(true);
		// console.log(values);
		mutate({values: values});
	};

	useEffect(() => {
		if(isError || isSuccess) {
			setLoading(false);
		}

		if(isSuccess) {
			onClose();
		}
	},[isError, isSuccess]);

	const removerContato = (index) => {
		const array = contatos.filter((_, indexItem) => indexItem !== index);
		form.setValue("contato", array);
		setContatos(array);
	};

	// if(loading){
	// 	return <p>Carregando...</p>;
	// }
	return (
		<Dialog open={open} onOpenChange={() => {onClose(); form.reset();}}>
			<DialogContent className="sm:max-w-screen-lg">
				<DialogHeader>
					<DialogTitle >Criar setor e contatos</DialogTitle>
					<DialogDescription>
                    Crie seu setor aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="setor"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Setor</FormLabel>
									<FormControl>
										<Input placeholder="Setor" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
													<FormLabel className="text-lg font-bold">Nome</FormLabel>
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
													<FormLabel className="text-lg font-bold">Email</FormLabel>
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
                        
						<DialogFooter>
							<Button onClick={() => setContatos([...contatos, { email: "", nome: "", telefone: "" }])}>  Adicionar contato </Button>
							<Button type="submit">Salvar</Button>
							
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>

		</Dialog>
	);
}
