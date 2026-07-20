import { getSiteContent } from "@/lib/content/queries";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { AvisoBanner } from "@/components/landing/AvisoBanner";
import { QuemSomos } from "@/components/landing/QuemSomos";
import { Servicos } from "@/components/landing/Servicos";
import { Parcerias } from "@/components/landing/Parcerias";
import { Contacto } from "@/components/landing/Contacto";
import { PedidoContactoForm } from "@/components/landing/PedidoContactoForm";
import { Footer } from "@/components/landing/Footer";

export const revalidate = 60;

export default async function Home() {
  const siteContent = await getSiteContent();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero content={siteContent.hero} />
        <AvisoBanner aviso={siteContent.aviso} />
        <QuemSomos content={siteContent.sobre} />
        <Servicos servicos={siteContent.servicos} />
        <Parcerias parcerias={siteContent.parcerias} />
        <Contacto content={siteContent.contacto} />
        <PedidoContactoForm />
      </main>
      <Footer facebookUrl={siteContent.contacto.facebookUrl} />
    </div>
  );
}
