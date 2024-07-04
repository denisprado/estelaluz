'use client'

import PageContainer from "@/components/PageContainer"
import { PageTitle } from "@/components/PageTitle"
import { FormEvent, Suspense, useState } from "react"

const Contato = ({ params }: { params: { product: string | '' } }) => {
	const [nome, setNome] = useState('')
	const [email, setEmail] = useState('')

	const [mensagem, setMensagem] = useState<string | ''>(decodeURIComponent(params.product))



	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const msgFinal = `Nome: ${nome} | Email: ${email} | Mensagem: ${mensagem}`;
		const whatsappLink = `https://wa.me/5519983069346?text=${encodeURIComponent(msgFinal)}`;

		// Redirecionando para o link
		window.location.href = whatsappLink;
	}

	return (
		<PageContainer>
			<PageTitle align="start" caps="">Contato</PageTitle>
			<div className="grid grid-cols-12 gap-8 w-full">
				<div className="col-span-6">
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-4  w-full h-full pb-10 ">
							<label className="form-control w-full ">
								<div className="label">
									<span className="font-semibold">Nome completo</span>
								</div><input
									type="text"
									className="input w-full  focus:border-secondary"
									onChange={(e) => setNome(e.target.value)}
									value={nome}
								/>
							</label>

							<label className="form-control w-full ">
								<div className="label">
									<span className="font-semibold">Email</span>
								</div><input
									type="email"
									className="input w-full  focus:border-secondary"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</label>
							<label className="form-control w-full ">
								<div className="label">
									<span className="font-semibold">Mensagem</span>
								</div>
								<textarea
									rows={10}
									className="text w-full  focus:border-secondary"
									onChange={(e) => setMensagem(e.target.value)}
									value={mensagem!}

								/>
							</label>

						</div>
						<button type="submit" className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-black dark:focus:ring-gray-800">
							Enviar mensagem
						</button>

					</form>
				</div>
			</div>
		</PageContainer >
	)
}

export default Contato