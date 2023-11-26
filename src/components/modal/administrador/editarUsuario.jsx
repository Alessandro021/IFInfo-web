import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useAdministrador } from "@/src/store/useAdministrador";
import { useEditarUsuario } from "@/src/queries/administrador/editarUsuario";

export function EditarUsuario({open, onClose, id}) {
	const [senhaVisivel, setSenhaVisivel] = useState(false);
	const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

	const pegarUsuarioPorId = useAdministrador(state => state.pegarUsuarioPorId);
	pegarUsuarioPorId(id);
	const usuario = useAdministrador(state => state.usuario);

	const {mutate, isError, isSuccess, status} = useEditarUsuario();


	const formSchema = yup.object().shape({
		nome: yup.string().strict().optional().nonNullable().min(3),
		email: yup.string().email().optional().nonNullable().min(6),
		senha: yup.string().transform(value => (value === "" ? "" : value)).test("min", "Deve ter pelo menos 8 caracteres", value => value === "" || value.length >= 8).optional(),
		confirmarSenha: yup.string().transform(value => (value === "" ? "" : value)).test("min", "Deve ter pelo menos 8 caracteres", value => value === "" || value.length >= 8).oneOf([yup.ref("senha"), ""], "As senhas devem coincidir").optional(),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			nome: usuario?.nome || "",
			email: usuario?.email || "",
			senha: "",
			confirmarSenha: ""
		}
	});

	const onSubmit = (values) => {
		if(!values?.senha){
			delete values?.senha;
			delete values?.confirmarSenha;
		}
		mutate({id: id, values: values});
	};

	useEffect(() => {
		if(isSuccess) {
			onClose();
			form.reset();
		}
	},[isSuccess]);

	return (
		<Dialog open={open} onOpenChange={() =>{ onClose();  form.reset();}}>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle >Editar usuario</DialogTitle>
					<DialogDescription>
                    Edite usuario aqui. Clique em criar quando terminar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                        
						<FormField
							control={form.control}
							name="email"
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
							name="senha"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold">Senha</FormLabel>
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
									<FormLabel className="text-lg font-bold">Confirmar senha</FormLabel>
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
						<DialogFooter>
							<Button type="submit" disabled={status === "pending" ? true : false}>
								{status === "pending" ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carregando...</>: "Salvar"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
