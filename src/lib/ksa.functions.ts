import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  nome: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().max(255).optional().or(z.literal("")),
  anonimo: z.boolean(),
  mensagem: z.string().trim().min(1, "Mensagem é obrigatória").max(2000),
});

export const sendContactToKSA = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const parsed = inputSchema.parse(data);
    if (parsed.email && parsed.email.length > 0) {
      const emailOk = z.string().email().safeParse(parsed.email).success;
      if (!emailOk) throw new Error("E-mail inválido");
    }
    return parsed;
  })
  .handler(async ({ data }) => {
    const baseUrl = process.env.KSA_BASE_URL;
    const apiKey = process.env.KSA_API_KEY;
    const timestamp = new Date().toISOString();
    const origem = "Tudo Sobre Skate";

    if (!baseUrl || !apiKey) {
      console.error(JSON.stringify({
        origem, status: "config_error",
        error: "KSA_BASE_URL ou KSA_API_KEY ausente", timestamp,
      }));
      throw new Error("Configuração da Central KSA ausente");
    }

    const payload = {
      site_origem: origem,
      url_origem: "https://tudosobreskate.lovable.app/",
      tipo: "Contato",
      assunto: "Mensagem enviada pelo formulário do Tudo Sobre Skate",
      nome: data.anonimo || !data.nome ? "Anônimo" : data.nome,
      email: data.email && data.email.length > 0 ? data.email : "Não informado",
      anonimo: data.anonimo,
      mensagem: data.mensagem,
      data_hora: timestamp,
    };

    const endpoint = `${baseUrl.replace(/\/$/, "")}/api/public/messages`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });

      console.log(JSON.stringify({
        origem, status: res.ok ? "success" : "http_error",
        httpStatus: res.status, timestamp,
      }));

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.error(JSON.stringify({
          origem, status: "ksa_rejected", httpStatus: res.status,
          error: errText.slice(0, 200), timestamp,
        }));
        throw new Error(`Central KSA retornou ${res.status}`);
      }

      return { ok: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(JSON.stringify({
        origem, status: "fetch_error",
        error: message.slice(0, 200), timestamp,
      }));
      throw new Error("Falha ao enviar para a Central KSA");
    }
  });
