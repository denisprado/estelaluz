'use client'

import { FormEvent, useState } from "react"

const Agendar = () => {
	const [nome, setNome] = useState('')
	const [email, setEmail] = useState('')
	const [mensagem, setMensagem] = useState('')

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const msgFinal = `Nome: ${nome} | Email: ${email} | Mensagem: ${mensagem}`;
		const whatsappLink = `https://wa.me/5519983069346?text=${encodeURIComponent(msgFinal)}`;

		// Redirecionando para o link
		window.location.href = whatsappLink;
	}

	return (
		<div className="w-full flex flex-col items-center justify-center mt-8">
			<div className="container w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3">
				<h2 className=" text-4xl pb-4">Entre em contato</h2>
				<div className="py-10 w-full  pb-32">
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-4 relative w-full h-full pb-10 ">
							<label className="form-control w-full ">
								<div className="label">
									<span className="font-semibold">Nome completo</span>
								</div><input
									type="text"
									className="input w-full bg-primary border-secondary focus:border-secondary"
									onChange={(e) => setNome(e.target.value)}
									value={nome}
								/>
							</label>

							<label className="form-control w-full ">
								<div className="label">
									<span className="font-semibold">Email</span>
								</div><input
									type="email"
									className="input w-full bg-primary border-secondary focus:border-secondary"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</label>
							<label className="form-control w-full ">
								<div className="label">
									<span className="font-semibold">Mensagem</span>
								</div><textarea
									className="text w-full bg-primary border-secondary focus:border-secondary"
									onChange={(e) => setMensagem(e.target.value)}
									value={mensagem}
								/>
							</label>

						</div>
						<button type="submit" className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-black dark:focus:ring-gray-800">Enviar agendamento</button>

					</form>
				</div>
			</div >
		</div >
	)
}

export default Agendar