export type Hero = {
  kicker: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

export type Aviso = {
  ativo: boolean;
  titulo: string;
  texto: string;
  linkLabel: string;
  linkHref: string;
  imageSrc: string;
  imageAlt: string;
};

export type Sobre = {
  titulo: string;
  textoDesportoMais: string;
  textoSalvaMais: string;
  anoFundacao: number;
  imageSrc: string;
  imageAlt: string;
};

export type ServicoSlug = "desporto-mais" | "salva-mais";

export type Servico = {
  slug: ServicoSlug;
  titulo: string;
  resumo: string;
  pontos: string[];
  objetivosTitulo: string;
  objetivosPontos: string[];
  imageSrc: string;
  imageAlt: string;
};

export type Parceria = {
  id: string;
  titulo: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type Contacto = {
  moradaLinha1: string;
  moradaLinha2: string;
  moradaLinha3: string;
  telefone: string;
  email: string;
  facebookUrl: string;
  googleMapsEmbedUrl: string;
};

export type SiteContent = {
  hero: Hero;
  aviso: Aviso;
  sobre: Sobre;
  servicos: Servico[];
  parcerias: Parceria[];
  contacto: Contacto;
};
