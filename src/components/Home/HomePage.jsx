import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";

function HomePage() {
  return (
    <div>
      <HeroSection
        title='Buy iPhone 14 Pro'
        subtitle='Experience the power of the latest iPhone 14 with our most Pro camera ever.'
        link='/products/64f81ad83fbac72fb1e2cb45'
        image={iphone}
      />

      <FeaturedProducts />

      <HeroSection
        title='Buy Mac Mini'
        subtitle='Experience the power of the latest M chipset to perform your every task sealessly.'
        link='/products/64f81ad93fbac72fb1e2cb4d'
        image={mac}
      />
    </div>
  );
}

export default HomePage;
