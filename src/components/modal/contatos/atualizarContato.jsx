import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import ReactInputMask from "react-input-mask";
import { useAtualizarContato } from "@/src/queries/contatos/atualizarContato";
import { useContatos } from "@/src/store/useContatos";

export function AtualizarContato({open, onClose, idSetor, idContato}) {

	const pegarContatoPorId = useContatos(state => state.pegarContatoPorId);
	pegarContatoPorId(idSetor,idContato);

	const contato = useContatos(state => state.contato);

	const {mutate, isError, isSuccess, status} = useAtualizarContato();

	useEffect(() => {
		pegarContatoPorId(idSetor, idContato);
	}, [idSetor, idContato]);


	const [loading, setLoading] = useState(false);
	// const [contatos, setContatos] = useState([{ email: contato?.email, nome: contato?.nome, telefone: contato?.telefone||  null }]);

	const formSchema = yup.object().shape({
		email: yup.string().optional().email().min(5),
		nome: yup.string().strict().optional().min(5).nonNullable(),
		telefone: yup.string().transform(value => (value === "" ? null : value)).matches(/^\d{2} \d{4,5}-\d{4}$/, "Telefone deve ser no formato (99) 9999-9999 ou (99) 99999-9999").optional().nullable(),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: contato?.email,
			nome: contato?.nome,
			telefone: contato?.telefone
		}
	});
    
	const onSubmit = (values) => {
		setLoading(true);
		values.idContato = idContato; //passando o idContato para o objeto value que possui os contatos
		mutate({values: values, idSetor: contato?.setor_id});
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
		<Dialog open={open} onOpenChange={() => {onClose(); form.reset();}}>
			<DialogContent className="sm:max-w-screen-lg">
				<DialogHeader>
					<DialogTitle >Atualizar contato</DialogTitle>
					<DialogDescription>
                    Atualize seu contato aqui. Clique em salvar quando terminar.
					</DialogDescription>
				</DialogHeader>
				
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
						<Card className="grid grid-cols-3 gap-4 p-2 border-">
							<FormField
								control={form.control}
								name={"nome"}
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
								name={"email"}
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
								name={"telefone"}
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
						<DialogFooter>
							<Button type="submit">Salvar</Button>
							
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>

		</Dialog>
	);
}
