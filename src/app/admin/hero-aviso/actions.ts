"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadImageIfPresent } from "@/lib/content/upload-image";
import type { SectionFormState } from "@/lib/admin/form-state";

export async function updateHeroAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const imageUrl = await uploadImageIfPresent(formData.get("image") as File | null, "hero");

    const { error } = await supabaseAdmin
      .from("desportomais_hero")
      .update({
        kicker: String(formData.get("kicker") ?? ""),
        headline: String(formData.get("headline") ?? ""),
        subheadline: String(formData.get("subheadline") ?? ""),
        cta_label: String(formData.get("cta_label") ?? ""),
        cta_href: String(formData.get("cta_href") ?? ""),
        image_alt: String(formData.get("image_alt") ?? ""),
        ...(imageUrl ? { image_path: imageUrl } : {}),
      })
      .eq("id", 1);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-aviso");
  return { success: true };
}

export async function updateAvisoAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const imageUrl = await uploadImageIfPresent(formData.get("image") as File | null, "aviso");

    const { error } = await supabaseAdmin
      .from("desportomais_aviso")
      .update({
        ativo: formData.get("ativo") === "on",
        titulo: String(formData.get("titulo") ?? ""),
        texto: String(formData.get("texto") ?? ""),
        link_label: String(formData.get("link_label") ?? ""),
        link_href: String(formData.get("link_href") ?? ""),
        image_alt: String(formData.get("image_alt") ?? ""),
        ...(imageUrl ? { image_path: imageUrl } : {}),
      })
      .eq("id", 1);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-aviso");
  return { success: true };
}
