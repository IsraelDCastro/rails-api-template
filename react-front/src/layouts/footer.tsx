export default function Footer() {
  return (
    <footer className="bg-slate-900 py-8 text-slate-200">
      <div className="mx-auto flex w-11/12 max-w-5xl flex-col gap-2 text-center text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} React Front Boilerplate. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4 text-xs uppercase tracking-wide text-slate-400">
          <a href="/about-us" className="hover:text-white">
            Sobre nosotros
          </a>
          <a href="/services" className="hover:text-white">
            Servicios
          </a>
          <a href="/contact-us" className="hover:text-white">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
