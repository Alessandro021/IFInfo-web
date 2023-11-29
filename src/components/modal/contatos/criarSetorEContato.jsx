import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useCriarSetorEContato } from "@/src/queries/contatos/criarSetorEContato";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, XIcon } from "lucide-react";
import ReactInputMask from "react-input-mask";

export function CriarSetorEContato({open, onClose}) {
	const [contatos, setContatos] = useState([{ email: "", nome: "", telefone: null }]);

	const {mutate, isSuccess, status} = useCriarSetorEContato();

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
		mutate({values: values});
		limparcontatos();
	};

	useEffect(() => {
		if(isSuccess) {
			onClose();
		}
	},[isSuccess]);

	const removerContato = (index) => {
		const array = contatos.filter((_, indexItem) => indexItem !== index);
		form.setValue("contato", array);
		setContatos(array);
	};

	const limparcontatos = () => {
		form.reset();
		setContatos([{ email: "", nome: "", telefone: "" }]);
	};
	const adicionarContato = () => {
		setContatos([...contatos, { email: "", nome: "", telefone: "" }]);
	};

	return (
		<Dialog open={open} onOpenChange={() => {onClose(); limparcontatos(); }}>
			<DialogContent className="sm:max-w-screen-lg max-h-[95vh] overflow-auto">
				<DialogHeader>
					<DialogTitle >Criar setor e contatos</DialogTitle>
					<DialogDescription>
                    Crie seu setor aqui. Clique em criar quando terminar.
					</DialogDescription>
				</DialogHeader>
				
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="setor"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Setor*</FormLabel>
									<FormControl>
										<Input placeholder="Setor" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <ScrollArea className="max-h-[25vw] py-2"> */}
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
						{/* </ScrollArea> */}

						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold ml-8"><span className="text-xl font-extrabold">*</span> obrigatorio</p>
							<div className="flex gap-4 mr-1 my-8">
								<Button onClick={() => adicionarContato()}>  Adicionar contato </Button>
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
