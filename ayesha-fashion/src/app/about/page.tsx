import Link from "next/link";
import { SITE_NAME } from "@/constants";
import { ArrowRight, Award, Users, ShoppingBag, Globe } from "lucide-react";

const stats = [
  { value: "12+", label: "Years of Excellence", icon: Award },
  { value: "50,000+", label: "Happy Customers", icon: Users },
  { value: "10,000+", label: "Luxury Products", icon: ShoppingBag },
  { value: "25+", label: "Countries Served", icon: Globe },
];

const values = [
  {
    title: "Uncompromising Quality",
    description: "Every piece in our collection is crafted from the finest materials, sourced from the most reputable suppliers around the world.",
  },
  {
    title: "Artisanal Craftsmanship",
    description: "We collaborate with master artisans who bring generations of expertise to every stitch, bead, and embellishment.",
  },
  {
    title: "Timeless Elegance",
    description: "Our designs transcend seasonal trends, creating pieces that remain sophisticated and relevant for years to come.",
  },
  {
    title: "Exceptional Service",
    description: "From personalized styling consultations to white-glove delivery, we ensure every interaction reflects the luxury we stand for.",
  },
];

const team = [
  { name: "Ayesha Khan", role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Sarah Ahmed", role: "Head of Design", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  { name: "Zoya Malik", role: "Chief Operating Officer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Fatima Ali", role: "Head of Marketing", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

const timeline = [
  { year: "2014", event: "AYESHA was founded with a vision to bring luxury fashion to the modern woman." },
  { year: "2016", event: "Launched our first flagship store in Lahore, showcasing our debut collection." },
  { year: "2018", event: "Expanded internationally, serving customers across 10 countries worldwide." },
  { year: "2020", event: "Introduced our sustainable luxury line, championing ethical fashion practices." },
  { year: "2022", event: "Opened our dedicated atelier, housing master artisans and custom design services." },
  { year: "2024", event: "Celebrated a decade of elegance with our landmark anniversary collection." },
  { year: "2026", event: "Continuing our legacy with innovative designs and global expansion." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block text-gold-light text-sm tracking-[0.3em] uppercase mb-4">Our Story</span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-tight">
              The Art of Luxury
            </h1>
            <div className="w-20 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Crafting timeless elegance for the discerning woman since 2014.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">Our Heritage</span>
              <h2 className="font-heading text-3xl md:text-4xl text-dark font-bold mt-3 mb-6">
                A Legacy of Elegance
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <div className="space-y-4 text-medium-gray leading-relaxed">
                <p>
                  Founded by Ayesha Khan in 2014, AYESHA was born from a singular vision — to create a fashion house
                  that celebrates the modern woman through unparalleled craftsmanship, luxurious fabrics, and timeless design.
                </p>
                <p>
                  What began as a small atelier in Lahore has grown into a globally recognized luxury brand,
                  beloved by women who appreciate the finer things in life. Each collection tells a story — of
                  heritage, of artistry, and of the enduring power of feminine elegance.
                </p>
                <p>
                  Today, AYESHA stands as a testament to the belief that true luxury is not just about what you
                  wear, but how it makes you feel. Every piece is designed to inspire confidence, grace, and
                  individuality.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80"
                  alt="AYESHA atelier"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-xs">
                <p className="font-heading text-gold text-4xl font-bold">12+</p>
                <p className="text-dark text-sm mt-1">Years of shaping luxury fashion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">Our Purpose</span>
              <h3 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-6">Mission</h3>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <p className="text-white/70 leading-relaxed text-lg">
                To empower women with luxury fashion that celebrates their individuality, elevates their
                confidence, and honors the artistry of traditional craftsmanship — all while embracing
                innovation and sustainability for a better tomorrow.
              </p>
            </div>
            <div>
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">Our Aspiration</span>
              <h3 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-6">Vision</h3>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <p className="text-white/70 leading-relaxed text-lg">
                To be the most revered luxury fashion house from Pakistan, known worldwide for our
                uncompromising quality, distinctive design, and commitment to empowering women through
                the art of dressing well.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">By the Numbers</span>
            <h2 className="font-heading text-3xl md:text-4xl text-dark font-bold mt-3">
              AYESHA in Numbers
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/5 border border-gold/20 mb-5 group-hover:bg-gold/10 transition-colors">
                  <stat.icon className="w-7 h-7 text-gold" />
                </div>
                <p className="font-heading text-3xl md:text-4xl text-dark font-bold mb-1">{stat.value}</p>
                <p className="text-medium-gray text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-off-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">What We Stand For</span>
            <h2 className="font-heading text-3xl md:text-4xl text-dark font-bold mt-3">
              Our Values
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg hover:border-gold/20 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors">
                  <div className="w-3 h-3 bg-gold rotate-45" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-dark mb-3">{value.title}</h3>
                <p className="text-medium-gray text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">Our Journey</span>
            <h2 className="font-heading text-3xl md:text-4xl text-dark font-bold mt-3">
              Brand Heritage
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold/20 -translate-x-1/2" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={item.year} className={`relative flex items-start gap-8 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gold border-4 border-off-white -translate-x-1/2 mt-1.5 z-10" />
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="font-heading text-2xl text-gold font-bold">{item.year}</span>
                    <p className="text-dark mt-1 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-off-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">Meet Our Team</span>
            <h2 className="font-heading text-3xl md:text-4xl text-dark font-bold mt-3">
              The Visionaries
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading text-lg font-semibold text-dark">{member.name}</h3>
                <p className="text-gold text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Experience the AYESHA Difference
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Discover a world where luxury meets artistry. Explore our collections and find pieces
            that speak to your soul.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3 rounded-lg font-medium hover:bg-gold-dark transition-colors"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
