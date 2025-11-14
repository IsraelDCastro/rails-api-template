import { useState } from "react";
import { ButtonUI, CheckboxUI, InputUI, PasswordInput } from "simplekit-react";
import { Seo } from "@/lib/seo";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isValid = email.length > 5 && password.length >= 6;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    // TODO: Reemplazar por llamada real a la API.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    // Manejar éxito/errores con SweetAlert o toasts.
    console.info({ email, remember });
  };

  return (
    <>
      <Seo
        title="Iniciar sesión"
        description="Accede a tu cuenta para gestionar módulos, tokens y configuraciones del starter."
        canonical="https://example.com/sign-in"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "https://example.com/" },
              { "@type": "ListItem", position: 2, name: "Iniciar sesión", item: "https://example.com/sign-in" }
            ]
          }
        ]}
      />
      <section className="flex justify-center py-8">
        <form onSubmit={handleSubmit} className="flex w-full flex-col space-y-6 md:w-8/12 lg:w-5/12">
          <h1 className="text-2xl">Iniciar sesión</h1>
          <InputUI
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            isRequired
          />
          <PasswordInput label="Contraseña" value={password} onChange={(value) => setPassword(value)} isRequired />
          <CheckboxUI label="Mantener sesión iniciada" isChecked={remember} onChange={() => setRemember((prev) => !prev)} />
          <ButtonUI type="submit" color="primary" isDisabled={!isValid || submitting} isLoading={submitting}>
            Entrar
          </ButtonUI>
        </form>
      </section>
    </>
  );
}
