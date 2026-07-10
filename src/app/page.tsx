import { HeroSlider } from "@/components/home/HeroSlider";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { TrendingProducts } from "@/components/home/TrendingProducts";
import { JewelryShowcase } from "@/components/home/JewelryShowcase";
import { LuxuryCollections } from "@/components/home/LuxuryCollections";
import { NewArrivalsSection } from "@/components/home/NewArrivals";
import { BeautyEdit } from "@/components/home/BeautyEdit";
import { Bestsellers } from "@/components/home/Bestsellers";
import { BrandSlider } from "@/components/home/BrandSlider";
import { TestimonialsSection } from "@/components/home/Testimonials";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedCategories />
      <TrendingProducts />
      <JewelryShowcase />
      <LuxuryCollections />
      <NewArrivalsSection />
      <BeautyEdit />
      <Bestsellers />
      <BrandSlider />
      <TestimonialsSection />
      <InstagramGallery />
      <NewsletterSection />
    </>
  );
}
