import { supabasePublic } from "@/lib/supabase/public";
import type {
  Aviso,
  Contacto,
  Hero,
  Parceria,
  Servico,
  ServicoSlug,
  SiteContent,
  Sobre,
} from "./types";

function assertRow<T>(row: T | null, label: string): T {
  if (!row) {
    throw new Error(`Conteúdo em falta na base de dados: ${label}`);
  }
  return row;
}

export async function getHero(): Promise<Hero> {
  const { data, error } = await supabasePublic
    .from("desportomais_hero")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  const row = assertRow(data, "desportomais_hero");
  return {
    kicker: row.kicker,
    headline: row.headline,
    subheadline: row.subheadline,
    ctaLabel: row.cta_label,
    ctaHref: row.cta_href,
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
  };
}

export async function getAviso(): Promise<Aviso> {
  const { data, error } = await supabasePublic
    .from("desportomais_aviso")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  const row = assertRow(data, "desportomais_aviso");
  return {
    ativo: row.ativo,
    titulo: row.titulo,
    texto: row.texto,
    linkLabel: row.link_label,
    linkHref: row.link_href,
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
  };
}

export async function getSobre(): Promise<Sobre> {
  const { data, error } = await supabasePublic
    .from("desportomais_sobre")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  const row = assertRow(data, "desportomais_sobre");
  return {
    titulo: row.titulo,
    textoDesportoMais: row.texto_desporto_mais,
    textoSalvaMais: row.texto_salva_mais,
    anoFundacao: row.ano_fundacao,
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
  };
}

export async function getServicos(): Promise<Servico[]> {
  const { data, error } = await supabasePublic
    .from("desportomais_servicos")
    .select("*")
    .order("ordem", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    slug: row.slug as ServicoSlug,
    titulo: row.titulo,
    resumo: row.resumo,
    pontos: row.pontos ?? [],
    objetivosTitulo: row.objetivos_titulo,
    objetivosPontos: row.objetivos_pontos ?? [],
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
  }));
}

export async function getParcerias(): Promise<Parceria[]> {
  const { data, error } = await supabasePublic
    .from("desportomais_parcerias")
    .select("*")
    .eq("publicado", true)
    .order("ordem", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    titulo: row.titulo,
    href: row.href,
    imageSrc: row.image_path,
    imageAlt: row.image_alt,
  }));
}

export async function getContacto(): Promise<Contacto> {
  const { data, error } = await supabasePublic
    .from("desportomais_contacto")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  const row = assertRow(data, "desportomais_contacto");
  return {
    moradaLinha1: row.morada_linha1,
    moradaLinha2: row.morada_linha2,
    moradaLinha3: row.morada_linha3,
    telefone: row.telefone,
    email: row.email,
    facebookUrl: row.facebook_url,
    googleMapsEmbedUrl: row.google_maps_url,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const [hero, aviso, sobre, servicos, parcerias, contacto] = await Promise.all([
    getHero(),
    getAviso(),
    getSobre(),
    getServicos(),
    getParcerias(),
    getContacto(),
  ]);

  return { hero, aviso, sobre, servicos, parcerias, contacto };
}
