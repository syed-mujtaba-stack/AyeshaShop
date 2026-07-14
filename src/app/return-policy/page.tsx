import { SITE_NAME } from "@/constants";

export default function ReturnPolicyPage() {
  return (
    <>
      <section className="relative h-[35vh] md:h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block text-gold-light text-sm tracking-[0.3em] uppercase mb-4">Policies</span>
            <h1 className="font-heading text-4xl md:text-5xl text-white font-bold mb-4">
              Return & Exchange Policy
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
              At {SITE_NAME}, we want you to be completely satisfied with your purchase. If for any reason
              you are not happy with your order, we are here to help.
            </p>

            <Section title="Return Window">
              <p>
                We accept returns within <strong>14 days</strong> of the delivery date. Returns requested
                after this period will not be accepted. The item must be unworn, unwashed, and in its
                original condition with all tags attached.
              </p>
            </Section>

            <Section title="Conditions for Returns">
              <p>To be eligible for a return, the following conditions must be met:</p>
              <ul>
                <li>Item must be unworn and unwashed</li>
                <li>All original tags, labels, and packaging must be intact</li>
                <li>Item must not show any signs of wear, damage, or alteration</li>
                <li>Footwear must be returned in the original shoebox without signs of wear on the soles</li>
                <li>Beauty products must be unopened and unused</li>
                <li>Intimate apparel cannot be returned for hygiene reasons</li>
              </ul>
            </Section>

            <Section title="Non-Returnable Items">
              <p>The following items cannot be returned or exchanged:</p>
              <ul>
                <li>Custom-made, personalized, or altered items</li>
                <li>Lingerie, swimwear, and hosiery (for hygiene reasons)</li>
                <li>Fine jewelry with engraved or customized details</li>
                <li>Gift cards</li>
                <li>Items marked as final sale</li>
                <li>Beauty products that have been opened or used</li>
              </ul>
            </Section>

            <Section title="How to Initiate a Return">
              <p>To initiate a return, please follow these steps:</p>
              <ul>
                <li>Log into your account and visit the Orders section, or contact our customer service team</li>
                <li>Provide your order number and the item(s) you wish to return</li>
                <li>Our team will provide you with a return authorization number and shipping instructions</li>
                <li>Pack the item securely in its original packaging with all tags attached</li>
                <li>Ship the item to the address provided by our team</li>
              </ul>
            </Section>

            <Section title="Refund Processing">
              <p>
                Once we receive your returned item and inspect it, we will notify you of the status.
                If the return is approved, your refund will be processed to the original payment method
                within <strong>5–7 business days</strong>. Please note that original shipping charges
                are non-refundable unless the return is due to our error.
              </p>
            </Section>

            <Section title="Exchanges">
              <p>
                We offer one free size exchange within 14 days of delivery, subject to stock availability.
                If you would like to exchange for a different size, please contact our customer service
                team to arrange the exchange. If the desired size is not available, a full refund will
                be issued.
              </p>
            </Section>

            <Section title="Damaged or Incorrect Items">
              <p>
                If you receive a damaged, defective, or incorrect item, please contact us within
                48 hours of delivery. We will arrange for a free pickup and replacement or full refund.
                Please include photographs of the damage or defect when contacting us.
              </p>
            </Section>

            <Section title="International Returns">
              <p>
                International customers are responsible for return shipping costs. We recommend using a
                trackable shipping method. Please ensure the customs declaration states &quot;Returned Goods&quot;
                to avoid additional customs charges. Original customs duties and taxes are non-refundable.
              </p>
            </Section>

            <div className="pt-6 border-t border-border">
              <p className="text-xs text-medium-gray">
                This policy was last updated on June 1, 2026. For any return-related inquiries, please
                contact us at ayeshabeautysaloon26@gmail.com or call +92 337 6031141.
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
