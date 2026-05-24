import { createFileRoute } from "@tanstack/react-router";
import { SkateLayout } from "@/components/SkateLayout";

export const Route = createFileRoute("/tipos-de-skate")({
  head: () => ({
    meta: [
      { title: "Tipos de skate — Street, Longboard e Cruiser" },
      {
        name: "description",
        content:
          "Conheça os tipos de skate: street, longboard e cruiser, suas características e usos.",
      },
    ],
  }),
  component: TiposDeSkate,
});

function TiposDeSkate() {
  return (
    <SkateLayout>
      <h2>Tipos de skate</h2>
      <p>
        Entre as modalidades que costumam estar nos campeonatos pelo mundo estão{" "}
        <strong>street</strong> e <strong>park</strong>. O street é disputado em
        uma pista que simula a rua, com obstáculos como bancos, corrimões e
        escadas. O park acontece em uma pista que parece uma piscina, com
        elementos do street e obstáculos que interagem entre si, permitindo
        encadear manobras.
      </p>
      <p>
        O esporte tem ainda outras modalidades, como vertical, downhill e
        slalom — cada uma exige um skate diferente. De forma simplificada,
        shapes mais estreitos favorecem manobras; mais largos dão estabilidade
        e velocidade. Quanto maior a roda, mais estabilidade; quanto mais dura,
        mais velocidade.
      </p>

      <h4>Street</h4>
      <figure className="skate-figure">
        <img src="/img/skate tradicional.webp" alt="Skate de street tradicional" loading="lazy" />
      </figure>
      <p>
        O street é o skate mais tradicional. Com shape mais fino e rodas
        menores e mais duras, é ideal para manobras em corrimões, bancos e
        escadas.
      </p>

      <h4>Longboard</h4>
      <figure className="skate-figure large">
        <img src="/img/Longboard.jpg" alt="Skate longboard" loading="lazy" />
      </figure>
      <p>
        O longboard é comprido, com rodas grandes que ajudam a atingir maiores
        velocidades com bastante estabilidade. Muito usado em downhill, em que
        os skatistas descem ladeiras e curvam apoiando as mãos no chão.
      </p>

      <h4>Cruiser</h4>
      <figure className="skate-figure large">
        <img src="/img/Cruiser.webp" alt="Skate cruiser" loading="lazy" />
      </figure>
      <p>
        Os cruisers são indicados para passeios no asfalto, especialmente em
        vias urbanas com superfícies irregulares. Têm rodas maiores, que dão
        estabilidade, mas dificultam manobras.
      </p>

      <footer className="skate-footer">
        <h3>Referências:</h3>
        <p>
          <a href="https://www.netshoes.com.br/blog/esportes/post/conheca-os-diferentes-tipos-de-skate-2" target="_blank" rel="noreferrer">
            netshoes.com.br — Conheça os diferentes tipos de skate
          </a>
          <br />
          <a href="https://www.angelsurfshop.com.br" target="_blank" rel="noreferrer">
            angelsurfshop.com.br
          </a>
        </p>
      </footer>
    </SkateLayout>
  );
}
