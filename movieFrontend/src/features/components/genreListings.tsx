import { useAuth } from "../hooks/use-Auth";
import { useGetGenres } from "../hooks/use-getGenres";
import { useRouter } from "@tanstack/react-router";

export function GenreListings() {
    const { data = [] } = useGetGenres();
    const router = useRouter();

    const { data: auth } = useAuth();
    console.log("genre", auth);

    function onClick(genreId: number, genreName: string) {
        console.log(genreId);
        router.navigate({
            to: `/movie/${genreId.toString()}/${genreName}`,
            params: { genreId: genreId.toString(), genreName },
          });
    }

    return (
        <div>
            <div className="text-4xl font-semibold text-center text-gray-800 mb-10">
                Please Select A Genre
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-5 mx-5">
                {data.map((item: any) => (
                    <div
                        key={item.id}
                        className="w-[300px] h-[400px] text-center flex flex-col items-center gap-4 bg-black rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                    >
                        <a href={`/movie/${item.id}/${item.name}`} onClick={() => onClick(item.id, item.name)}>
                            <img
                                className="w-full h-[350px] object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-70"
                                src={`src/assets/GenrePictures/${item.name}.jpg`}
                                alt={item.name}
                            />
                            <p className="text-4xl font-semibold text-white mb-2 ">{item.name}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
