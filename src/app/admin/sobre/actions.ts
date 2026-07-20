"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadImageIfPresent } from "@/lib/content/upload-image";
import type { SectionFormState } from "@/lib/admin/form-state";

export async function updateSobreAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const imageUrl = await uploadImageIfPresent(formData.get("image") as File | null, "sobre");

    const { error } = await supabaseAdmin
      .from("desportomais_sobre")
      .update({
        titulo: String(formData.get("titulo") ?? ""),
        texto_desporto_mais: String(formData.get("texto_desporto_mais") ?? ""),
        texto_salva_mais: String(formData.get("texto_salva_mais") ?? ""),
        ano_fundacao: Number(formData.get("ano_fundacao")) || 2001,
        image_alt: String(formData.get("image_alt") ?? ""),
        ...(imageUrl ? { image_path: imageUrl } : {}),
      })
      .eq("id", 1);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/sobre");
  return { success: true };
}
