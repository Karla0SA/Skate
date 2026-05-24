import { createFileRoute, Link } from "@tanstack/react-router";
import { SkateLayout } from "@/components/SkateLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKATE — Jogos, copas e muito mais sobre o esporte" },
      {
        name: "description",
        content:
          "Site sobre skate: tipos de skate, jogos online para mobile, eventos nacionais e mundiais, e contato.",
      },
      { property: "og:title", content: "SKATE — Jogos, copas e muito mais sobre o esporte" },
      {
        property: "og:description",
        content:
          "Tipos de skate, jogos online, eventos mundiais e nacionais. Tudo sobre o esporte em um só lugar.",
      },
    ],
  }),
  component: HomePage,
});

const sections = [
  {
    to: "/tipos-de-skate",
    img: "/img/manobras-de-skate.jpeg",
    title: "Tipos de skate",
    desc: "Imagens, detalhes e suas características.",
  },
  {
    to: "/jogos-online",
    img: "/img/jogo.webp",
    title: "Jogos online para mobile",
    desc:
      "Jogos para Android e iPhone, pagos ou gratuitos, suas características e avaliações nas lojas online.",
  },
  {
    to: "/eventos",
    img: "/img/evento.jpg",
    title: "Eventos mundiais/nacionais",
    desc:
      "Desde eventos nacionais até mundiais, o famoso Street League e o esporte nas Olimpíadas.",
  },
  {
    to: "/contatos",
    img: "/img/site.jpg",
    title: "Contato",
    desc:
      "Preencha com seus dados e deixe um comentário ou sugestão sobre o nosso site.",
  },
] as const;

function HomePage() {
  return (
    <SkateLayout>
      <p>
        Aqui iremos falar sobre o esporte skate. Cada página aborda um assunto
        diferente relacionado ao skate: tipos, jogos online e eventos. Clique
        nos cards para acessar cada seção.
      </p>
      <ul className="skate-card-list">
        {sections.map((s) => (
          <li key={s.to} className="skate-card">
            <Link to={s.to} aria-label={s.title}>
              <img src={s.img} alt={s.title} loading="lazy" />
            </Link>
            <div className="skate-card-body">
              <div className="skate-card-title">
                <Link to={s.to} className="skate-link">
                  {s.title}
                </Link>
              </div>
              <p>{s.desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <footer className="skate-footer">
        <h3>Referências:</h3>
        <p>
          <a href="https://blog.sunsetskateshop.com.br" target="_blank" rel="noreferrer">
            blog.sunsetskateshop.com.br
          </a>
          {" · "}
          <a href="https://techtudo.globo.com" target="_blank" rel="noreferrer">
            techtudo.globo.com
          </a>
        </p>
      </footer>
    </SkateLayout>
  );
}
