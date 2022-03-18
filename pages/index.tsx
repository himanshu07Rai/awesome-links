import Head from "next/head";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";

interface Pokemon {
  name: string;
  url: string;
}

export default function Home({ pokemons }: { pokemons: Pokemon[] }) {
  const [filter, setFilter] = useState("");

  console.log("pokemons");

  const filteredPokemons = useMemo(
    () =>
      pokemons.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  return (
    <div className={styles.main}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value.replaceAll(/\s/g, ""))}
          className={styles.search}
        />
      </div>
      <div className={styles.container}>
        {filteredPokemons.length ? (
          filteredPokemons.slice(0, 20).map((p) => (
            <div key={p.name} className={styles.image}>
              <img
                alt={p.name}
                src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${p.name}.png`}
              />
              <h2>{p.name.toUpperCase()}</h2>
            </div>
          ))
        ) : (
          <div>
            Nothing found
            {console.log("fsfs")}
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");

  const _pokemons = await res.json();

  return {
    props: {
      pokemons: _pokemons.results,
    },
  };
};
