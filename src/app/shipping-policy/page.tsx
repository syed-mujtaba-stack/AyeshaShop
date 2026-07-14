import { SITE_NAME, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/constants";

export default function ShippingPolicyPage() {
  return (
    <>
      <section className="relative h-[35vh] md:h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block text-gold-light text-sm tracking-[0.3em] uppercase mb-4">Policies</span>
            <h1 className="font-heading text-4xl md:text-5xl text-white font-bold mb-4">
              Shipping Policy
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-white/70 text-lg">Last updated: June 1, 2026</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-12 space-y-8">
            <p className="text-medium-gray leading-relaxed">
              At {SITE_NAME}, we strive to deliver your luxury pieces with the care and efficiency they deserve.
              Below you will find our complete shipping policy.
            </p>

            <Section title="Shipping Destinations">
              <p>
                We currently ship to all cities in Pakistan and to over 25 countries worldwide. If your
                location is not available at checkout, please contact our customer service team for assistance.
              </p>
            </Section>

            <Section title="Domestic Shipping (Pakistan)">
              <h3 className="text-dark font-medium mt-4 mb-2">Standard Delivery</h3>
              <ul>
                <li>Free shipping on all orders above PKR {FREE_SHIPPING_THRESHOLD.toLocaleString()}</li>
                <li>Orders under PKR {FREE_SHIPPING_THRESHOLD.toLocaleString()}: A flat rate of PKR {SHIPPING_COST} applies</li>
                <li>Delivery time: 3–5 business days within major cities</li>
                <li>Delivery time: 5–7 business days for other locations</li>
              </ul>
              <h3 className="text-dark font-medium mt-4 mb-2">Express Delivery</h3>
              <ul>
                <li>Available at an additional cost of PKR 500</li>
                <li>Delivery time: 1–2 business days within major cities</li>
                <li>Must be placed before 2 PM for same-day dispatch</li>
              </ul>
            </Section>

            <Section title="International Shipping">
              <ul>
                <li>Standard international shipping: PKR 2,500 flat rate</li>
                <li>Delivery time: 7–14 business days depending on destination</li>
                <li>Express international shipping: PKR 5,000</li>
                <li>Delivery time: 4–7 business days</li>
                <li>Customs duties, taxes, and import fees are the responsibility of the customer</li>
              </ul>
            </Section>

            <Section title="Order Processing">
              <p>
                Orders are processed within 1–2 business days after payment confirmation. During peak
                seasons (holiday periods, sales events), processing may take up to 3–4 business days.
                You will receive a confirmation email once your order has been dispatched, along with
                a tracking number.
              </p>
            </Section>

            <Section title="Tracking Your Order">
              <p>
                Once shipped, you will receive an email with a tracking number and a link to track your
                package. You can also track your order by logging into your account and visiting the
                Orders section. For international shipments, tracking updates may be limited depending
                on the destination country&apos;s postal service.
              </p>
            </Section>

            <Section title="Delivery Issues">
              <p>
                If your package is lost, damaged, or delayed, please contact our customer service team
                within 7 days of the expected delivery date. We will work with the courier to resolve
                the issue and ensure your satisfaction.
              </p>
            </Section>

            <Section title="Shipping Restrictions">
              <p>
                Some items may be subject to shipping restrictions due to size, weight, or regulatory
                requirements. These will be clearly indicated on the product page. We are unable to
                ship to PO boxes for certain international destinations.
              </p>
            </Section>

            <div className="pt-6 border-t border-border">
              <p className="text-xs text-medium-gray">
                This policy was last updated on June 1, 2026. For any shipping-related inquiries,
                please contact us at ayeshabeautysaloon26@gmail.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-heading text-2xl text-dark font-semibold mb-4">{title}</h2>
      <div className="text-medium-gray leading-relaxed space-y-3 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-medium-gray [&_strong]:text-dark">
        {children}
      </div>
    </div>
  );
}
