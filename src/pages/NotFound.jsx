import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
export const NotFound = () => {
  return (
    <div className="w-2/3 mx-auto mt-3 flex flex-col min-h-[98vh]">
      <Header />
      <main className="p-4 flex-grow">
        <div className="text-center text-3xl flex flex-col align-middle justify-center">
          <span>Something goes wrong!</span>
          <Link to={-1} className="text-underline">
            Назад
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};
