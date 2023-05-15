import { useQuery } from "@tanstack/react-query";
import { getPokemonInfoByName } from "../api";
import { useNavigate } from "react-router-dom";

interface PokeCardProps {
  name: string;
  url: string;
}

const PokeCard = ({ name }: PokeCardProps) => {
  const { data: allPokemonInfo } = useQuery({
    queryKey: ["pokemonInfoByName", name],
    queryFn: () => getPokemonInfoByName(name),
    staleTime: Infinity,
  });
  const navigate = useNavigate();

  const handleViewMoreClick = (id: number) => {
    navigate(`/pokemon/${id}`)
  };

  return (
    <div
      key={name}
      className="pokeCard flex flex-col flex-pokecard-21 rounded-lg cursor-pointer border border-solid border-gray-500 p-2"
    >
      <img
        src={allPokemonInfo?.sprites.other?.["official-artwork"].front_default as string}
        alt="Pokemon image"
      />
      <p className="text-center text-base font-bold mb-2">{name}</p>
      <p>Height: {allPokemonInfo?.height}</p>
      <p>Weight: {allPokemonInfo?.weight}</p>
      <p>Base Experience: {allPokemonInfo?.base_experience}</p>
      <button
        id="viewMoreBtn"
        onClick={() => handleViewMoreClick(allPokemonInfo?.id as number)}
        className="bg-red-600 text-yellow-200 w-1/2 p-1 mt-2 m-auto rounded-xl hidden"
      >
        View more
      </button>
    </div>
  );
};

export default PokeCard;
