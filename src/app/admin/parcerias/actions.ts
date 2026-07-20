"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadImageIfPresent } from "@/lib/content/upload-image";
import type { SectionFormState } from "@/lib/admin/form-state";

function readParceriaFields(formData: FormData) {
  return {
    titulo: String(formData.get("titulo") ?? ""),
    href: String(formData.get("href") ?? ""),
    image_alt: String(formData.get("image_alt") ?? ""),
  };
}

export async function createParceriaAction(
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  let newId: string | null = null;
  try {
    const { data, error } = await supabaseAdmin
      .from("desportomais_parcerias")
      .insert(readParceriaFields(formData))
      .select("id")
      .single();
    if (error) throw error;
    newId = data.id;

    const imageUrl = await uploadImageIfPresent(
      formData.get("image") as File | null,
      `parcerias/${newId}`
    );
    if (imageUrl) {
      const { error: imgError } = await supabaseAdmin
        .from("desportomais_parcerias")
        .update({ image_path: imageUrl })
        .eq("id", newId);
      if (imgError) throw imgError;
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao criar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/parcerias");
  redirect("/admin/parcerias");
}

export async function updateParceriaAction(
  id: string,
  _prevState: SectionFormState,
  formData: FormData
): Promise<SectionFormState> {
  await requireAdminSession();

  try {
    const imageUrl = await uploadImageIfPresent(
      formData.get("image") as File | null,
      `parcerias/${id}`
    );
    const { error } = await supabaseAdmin
      .from("desportomais_parcerias")
      .update({
        ...readParceriaFields(formData),
        ...(imageUrl ? { image_path: imageUrl } : {}),
      })
      .eq("id", id);
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao guardar." };
  }

  revalidatePath("/");
  revalidatePath("/admin/parcerias");
  return { success: true };
}

export async function deleteParceriaAction(id: string) {
  await requireAdminSession();
  const { error } = await supabaseAdmin.from("desportomais_parcerias").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/admin/parcerias");
}

export async function toggleParceriaPublicadoAction(id: string, publicado: boolean) {
  await requireAdminSession();
  const { error } = await supabaseAdmin
    .from("desportomais_parcerias")
    .update({ publicado })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/admin/parcerias");
}
