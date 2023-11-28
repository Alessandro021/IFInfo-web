/* eslint-disable no-undef */
import "../../utils/yup/index.js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useLogin } from "../../queries/usuario/login.js";
import Loading from "@/src/components/Loading.jsx";


const Login = () => {

	const [senhaVisivel, setSenhaVisivel] = useState(false);
	const {mutate, status} = useLogin();
	
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

	const onSubmit = (values) => {
		mutate({usuario: values});
	};
	return ( 
		<div className="flex h-[100vh] justify-center items-center bg-slate-400">
			<Card className="w-full sm:max-w-sm h-auto">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-10 p-8">
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
						<Button type="submit" disabled={status === "pending" ? true : false} className="w-full">
							{status === "pending" ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carregando... </> : "Entrar"}
						</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
};
 
export default Login;