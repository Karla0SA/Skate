import { createFileRoute } from "@tanstack/react-router";
import { SkateLayout } from "@/components/SkateLayout";
import { useState } from "react";

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

function Contatos() {
  const [enviado, setEnviado] = useState(false);

  return (
    <SkateLayout>
      <h2>Contatos</h2>
      <p>
        Preencha o formulário abaixo e deixe sua sugestão ou reclamação sobre
        o site:
      </p>

      {enviado ? (
        <p role="status" style={{ color: "yellow" }}>
          Obrigado! Sua mensagem foi registrada. Avaliaremos seu retorno.
        </p>
      ) : (
        <form
          className="skate-form"
          method="post"
          action="mailto:karla.sts.amorim@gmail.com"
          onSubmit={() => setEnviado(true)}
        >
          <div>
            <label htmlFor="numero">Telefone para contato:</label>
            <input
              id="numero"
              type="tel"
              name="numero"
              inputMode="numeric"
              maxLength={11}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <fieldset style={{ border: "none", padding: 0 }}>
            <legend>Enviar de forma anônima?</legend>
            <div className="skate-radio-group">
              <label>
                <input type="radio" name="anonimo" value="sim" required /> Sim
              </label>
              <label>
                <input type="radio" name="anonimo" value="nao" /> Não
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="sugestao">Sua mensagem:</label>
            <textarea
              id="sugestao"
              name="sugestao"
              placeholder="Digite sua sugestão ou reclamação aqui"
              required
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button type="submit">Enviar</button>
            <button type="reset">Apagar</button>
          </div>
        </form>
      )}

      <footer className="skate-footer">
        Agradecemos pela atenção, estaremos avaliando sua mensagem.
      </footer>
    </SkateLayout>
  );
}
