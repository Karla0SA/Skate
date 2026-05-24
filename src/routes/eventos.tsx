import { createFileRoute } from "@tanstack/react-router";
import { SkateLayout } from "@/components/SkateLayout";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos de skate — nacionais e mundiais" },
      {
        name: "description",
        content:
          "Eventos brasileiros e mundiais de skate: LAB, Red Bull Skate Generation, Street League e Olimpíadas.",
      },
    ],
  }),
  component: Eventos,
});

function Eventos() {
  return (
    <SkateLayout>
      <h2>Eventos nacionais e mundiais</h2>

      <h3>Eventos brasileiros de skate</h3>
      <p>
        Nos eventos de skate, amadores e profissionais mostram suas manobras e
        habilidades. Conheça abaixo 4 eventos brasileiros:
      </p>

      <h4>Liga Amadora de Bowl (LAB)</h4>
      <p>
        Homologada pela CBSk, a primeira etapa ocorreu no Rio de Janeiro. O
        evento contempla as categorias feminino e amador. Etapas seguintes em
        São Paulo, Belo Horizonte e Florianópolis.
      </p>

      <h4>Red Bull Skate Generation</h4>
      <p>
        Reúne todas as categorias da cena de transição. Transmitido pela Red
        Bull TV, com equipes masculinas e femininas divididas em 6 categorias.
      </p>

      <h4>Campeonato Brasileiro Loterias Caixa Park Amador</h4>
      <p>
        Reuniu mais de 100 competidores entre Amador, Iniciante, Mirim e
        Feminino em Florianópolis, incluindo os 8 nomes da Seleção Brasileira
        Júnior de Skate Park. Critérios:
      </p>
      <ul className="skate-list">
        <li>Presença na Seleção Brasileira Júnior</li>
        <li>Ranking geral da Liga Amadora de Bowl (LAB)</li>
        <li>Ranking Catarinense 2021</li>
        <li>Ranking Paulista 2021</li>
        <li>Wild card para federações e associações filiadas à CBSk</li>
      </ul>

      <h4>Mini Ramp Pro Attack</h4>
      <p>Campeonato de minirrampa voltado para competidores profissionais.</p>

      <h3>Eventos mundiais de skate</h3>

      <h4>Street League Skateboarding</h4>
      <p>
        A Skate Liga de Rua acontece em Las Vegas. No{" "}
        <a
          className="skate-link"
          href="https://www.streetleague.com/pt"
          target="_blank"
          rel="noreferrer"
        >
          site oficial
        </a>{" "}
        é possível comprar ingressos e assistir online.
      </p>

      <h4>Skate nas Olimpíadas</h4>
      <p>
        Apesar do debate sobre seu status olímpico, o skate já participou de
        edições recentes — estreia em Tóquio 2020 e presença em Paris 2024, no
        famoso Parc Urbain La Concorde.
      </p>

      <footer className="skate-footer">
        <h3>Referências:</h3>
        <p>
          <a
            href="https://www.sessionstore.com.br/blog/4-eventos-brasileiros-de-skate-para-voce-participar"
            target="_blank"
            rel="noreferrer"
          >
            sessionstore.com.br — 4 eventos brasileiros de skate
          </a>
        </p>
      </footer>
    </SkateLayout>
  );
}
