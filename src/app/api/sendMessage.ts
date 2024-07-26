const handleSubmit = (title: string, event: FormData) => {
  const msgFinal = `Tenho interesse em adquirir o produto ${title}`;
  const whatsappLink = `https://wa.me/5519983069346?text=${encodeURIComponent(
    msgFinal
  )}`;

  // Redirecionando para o link
  window.location.href = whatsappLink;
};

export default handleSubmit;
