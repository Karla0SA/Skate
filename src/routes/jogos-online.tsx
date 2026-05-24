import { createFileRoute } from "@tanstack/react-router";
import { SkateLayout } from "@/components/SkateLayout";

export const Route = createFileRoute("/jogos-online")({
  head: () => ({
    meta: [
      { title: "Jogos online de skate para mobile" },
      {
        name: "description",
        content:
          "Lista de jogos de skate para mobile: Subway Surfers, Touchgrind Skate 2 e True Skate.",
      },
    ],
  }),
  component: JogosOnline,
});

const jogos = [
  {
    nome: "Subway Surfers",
    img: "/img/subway.jpeg",
    desc:
      "Quem nunca jogou essa maravilha? Disponível na Play Store com mais de 1 bilhão de downloads e na App Store com avaliação 4,7 (Nº 1 em casual).",
  },
  {
    nome: "Touchgrind Skate 2",
    img: "/img/Touchgrind.jpeg",
    desc:
      "Com mais de 10 milhões de downloads na Play Store e disponível na App Store, oferece controle com dois dedos e tutoriais rápidos de manobras.",
  },
  {
    nome: "True Skate",
    img: "/img/skate.png",
    desc:
      "Considerado o mais realista por muitos. Disponível na Play Store e App Store; o valor de R$ 6,49 e compras no app explicam o número menor de downloads.",
  },
] as const;

function JogosOnline() {
  return (
    <SkateLayout>
      <h2>Jogos online</h2>
      <p>
        Existem vários jogos de skate online. Aqui separamos três opções
        mobile para você conhecer:
      </p>
      <ul className="skate-card-list">
        {jogos.map((j) => (
          <li key={j.nome} className="skate-card">
            <img src={j.img} alt={j.nome} loading="lazy" />
            <div className="skate-card-body">
              <div className="skate-card-title">{j.nome}</div>
              <p>{j.desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <footer className="skate-footer">
        <h3>Referências:</h3>
        <p>
          <a href="https://play.google.com/store/apps/details?id=se.illusionlabs.skate2" target="_blank" rel="noreferrer">
            Touchgrind Skate 2 na Play Store
          </a>
        </p>
      </footer>
    </SkateLayout>
  );
}
