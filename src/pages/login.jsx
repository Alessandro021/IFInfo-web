import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();

		setEmail("");
		setPassword("");
	};
	return ( 
		<div className="flex h-screen justify-center items-center bg-slate-400">
			<Card>
				<form onSubmit={handleSubmit} className=" flex flex-col w-96 h-auto gap-10 p-8">
					<div className="grid w-full max-w-sm items-center gap-2 ">
						<Label htmlFor="email">Email</Label>
						<Input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="focus:outline-none focus:ring-0"/>
					</div>

					<div className="grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="email">Senha</Label>
						<div className="flex flex-row gap-4">
							<Input variant={"outline"} type={passwordVisible ? "text" : "password"} name="Senha" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
							{!passwordVisible && <button onClick={() => setPasswordVisible(current => !current)}><EyeIcon/></button>}
							{passwordVisible && <button onClick={() => setPasswordVisible(current => !current)}><EyeOffIcon/></button>}
						</div>
					</div>

					<Button type="submit" className="w-full max-w-sm">Entrar</Button>
				</form>
			</Card>
		</div>
	);
};
 
export default Login;