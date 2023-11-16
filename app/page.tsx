import Footer from "@/components/footer";
import Products from "../components/products";

export default function Home() {
  return (
    <>
      <main className="mx-auto min-h-screen flex flex-col container md:pt-16 p-6">
        <div className="flex-1">
          <Products />
        </div>
        <Footer />
      </main>
    </>
  );
}
