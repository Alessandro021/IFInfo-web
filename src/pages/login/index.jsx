/* eslint-disable no-undef */
import "../../utils/yup/index.js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useLogin } from "@/src/queries/login.js";

const Login = () => {

	const [senhaVisivel, setSenhaVisivel] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [usuario, setUsuario] = useState(null);
	const {data, status, error} = useLogin(usuario, isSubmitted);
	
	const formSchema = yup.object().shape({
		email: yup.string().email().min(6).required(),
		senha: yup.string().min(8).required(),
	});

	const form = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: "",
			senha: "",
		},
	});

	useEffect(() => {
		if(error?.message === "Network Error") {
			alert("Sem conexão com o servidor");
			setIsSubmitted(false);
		}
		if(error?.message !== "Network Error" && status === "error") {
			alert(error?.response?.data?.errors?.default);
			setIsSubmitted(false);
			// console.log(error.response.data.errors.default);
		}
	}, [status]);

	const onSubmit = (values) => {
		setIsSubmitted(true);
		setUsuario(values);
	};
	return ( 
		<div className="flex h-screen justify-center items-center bg-slate-400">
			<Card>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col w-96 h-auto gap-10 p-8">
						<FormField 
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
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
									<FormLabel>Senha</FormLabel>
									<FormControl className="flex flex-row gap-4">
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
						<Button type="submit" className="w-full max-w-sm">Entrar</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
};
 
export default Login;