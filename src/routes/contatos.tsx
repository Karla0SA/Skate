import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SkateLayout } from "@/components/SkateLayout";
import { useState } from "react";
import { z } from "zod";
import { sendContactToKSA } from "@/lib/ksa.functions";


export const Route = createFileRoute("/contatos")({
  head: () => ({
    meta: [
      { title: "Contatos — SKATE" },
      {
        name: "description",
        content: "Envie sua sugestão ou reclamação sobre o site SKATE.",
      },
    ],
  }),
  component: Contatos,
});

const schema = z.object({
  nome: z.string().trim().max(100).optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail")
    .max(255)
    .email("E-mail inválido"),
  anonimo: z.enum(["sim", "nao"], { message: "Selecione uma opção" }),
  mensagem: z
    .string()
    .trim()
    .min(5, "Escreva uma mensagem com pelo menos 5 caracteres")
    .max(2000, "Máximo 2000 caracteres"),
});

type Status = "idle" | "loading" | "success" | "error";

function Contatos() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");
  const sendToKSA = useServerFn(sendContactToKSA);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const fd = new FormData(e.currentTarget);

    // Honeypot anti-spam: bots costumam preencher esse campo escondido
    if ((fd.get("website") as string)?.length) {
      setStatus("success"); // finge sucesso, ignora silenciosamente
      return;
    }

    const data = {
      nome: (fd.get("nome") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      anonimo: fd.get("anonimo") as string,
      mensagem: (fd.get("mensagem") as string) ?? "",
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    const v = parsed.data;
    try {
      await sendToKSA({
        data: {
          nome: v.anonimo === "sim" ? "" : v.nome || "",
          email: v.email,
          anonimo: v.anonimo === "sim",
          mensagem: v.mensagem,
        },
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setServerError(
        "Não foi possível enviar sua mensagem agora. Tente novamente em instantes."
      );
    }
  }


  return (
    <SkateLayout>
      <h2>Contatos</h2>
      <p>
        Preencha o formulário abaixo e deixe sua sugestão ou reclamação sobre
        o site. Sua mensagem será encaminhada à nossa equipe.
      </p>

      {status === "success" && (
        <div className="skate-alert success" role="status">
          ✓ Mensagem enviada com sucesso. Obrigado pelo contato!
        </div>
      )}
      {status === "error" && (
        <div className="skate-alert error" role="alert">
          {serverError}
        </div>
      )}

      {status !== "success" && (
        <form className="skate-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot anti-spam (invisível para humanos) */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="skate-honeypot"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="nome">Seu nome (opcional):</label>
            <input id="nome" name="nome" type="text" maxLength={100} placeholder="Como podemos te chamar" />
            {errors.nome && <div className="skate-error">{errors.nome}</div>}
          </div>

          <div>
            <label htmlFor="email">E-mail:</label>
            <input id="email" name="email" type="email" maxLength={255} placeholder="voce@exemplo.com" required />
            {errors.email && <div className="skate-error">{errors.email}</div>}
          </div>


          <fieldset style={{ border: "none", padding: 0 }}>
            <legend style={{ fontWeight: 600, color: "#ffec70", marginBottom: "0.4rem" }}>
              Enviar de forma anônima?
            </legend>
            <div className="skate-radio-group">
              <label>
                <input type="radio" name="anonimo" value="sim" /> Sim
              </label>
              <label>
                <input type="radio" name="anonimo" value="nao" defaultChecked /> Não
              </label>
            </div>
            {errors.anonimo && <div className="skate-error">{errors.anonimo}</div>}
          </fieldset>

          <div>
            <label htmlFor="mensagem">Sua mensagem:</label>
            <textarea
              id="mensagem"
              name="mensagem"
              maxLength={2000}
              placeholder="Digite sua sugestão ou reclamação aqui"
              required
            />
            {errors.mensagem && <div className="skate-error">{errors.mensagem}</div>}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : "Enviar"}
            </button>
            <button type="reset" disabled={status === "loading"}>Apagar</button>
          </div>
        </form>
      )}

      <footer className="skate-footer">
        Agradecemos pela atenção, estaremos avaliando sua mensagem.
      </footer>
    </SkateLayout>
  );
}
