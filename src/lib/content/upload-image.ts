import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Sobe uma imagem para o bucket site-media (pasta desportomais/) e devolve
 * o URL público. Devolve null se não vier nenhum ficheiro (caso em que o
 * chamador deve manter o image_path atual).
 */
export async function uploadImageIfPresent(
  file: File | null,
  folder: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Formato de imagem não suportado. Usa JPEG, PNG ou WebP.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Imagem demasiado grande (máx. 5MB).");
  }

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `desportomais/${folder}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabaseAdmin.storage.from("site-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabaseAdmin.storage.from("site-media").getPublicUrl(path);
  return data.publicUrl;
}
