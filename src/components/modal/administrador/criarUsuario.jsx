import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useCriarUsuario } from "@/src/queries/administrador/criarUsuario";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function CriarUsuario({open, onClose}) {
	const [loading, setLoading] = useState(false);
	const [senhaVisivel, setSenhaVisivel] = useState(false);
	const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

	const {mutate, isError, isSuccess, status} = useCriarUsuario();


	const formSchema = yup.object().shape({
		nome: yup.string().strict().required().nonNullable().min(3),
		email: yup.string().email().required().nonNullable().min(6),
		senha: yup.string().required().nonNullable().min(8),
		confirmarSenha: yup.string().optional().nonNullable().min(8).oneOf([yup.ref("senha"), null], "As senhas devem coincidir"),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: "",
			email: "",
			senha: "",
			confirmarSenha: ""
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
			form.reset();
		}
	},[isError, isSuccess]);

	

	// if(loading){
	// 	return <p>Carregando...</p>;
	// }
	return (
		<Dialog open={open} onOpenChange={() =>{ onClose();  form.reset();}}>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle >Criar usuario</DialogTitle>
					<DialogDescription>
                    Crie um usuario para poder acessa o sistema aqui. Clique em criar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="nome"
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
							name="email"
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
							name="senha"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Senha*</FormLabel>
									<FormControl>
										<div className="flex flex-row gap-4">
											<Input {...field} type={senhaVisivel ? "text" : "password"} name="senha" placeholder="senha" />
											{!senhaVisivel && <button onClick={() => setSenhaVisivel(current => !current)}><EyeIcon/></button>}
											{senhaVisivel && <button onClick={() => setSenhaVisivel(current => !current)}><EyeOffIcon/></button>}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmarSenha"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Confirmar senha*</FormLabel>
									<FormControl>
										<div className="flex flex-row gap-4">
											<Input {...field} type={confirmarSenhaVisivel ? "text" : "password"} name="senha" placeholder="senha" />
											{!confirmarSenhaVisivel && <button onClick={() => setConfirmarSenhaVisivel(current => !current)}><EyeIcon/></button>}
											{confirmarSenhaVisivel && <button onClick={() => setConfirmarSenhaVisivel(current => !current)}><EyeOffIcon/></button>}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold ml-8"><span className="text-xl font-extrabold">*</span> obrigatorio</p>
							<Button type="submit">Criar</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
