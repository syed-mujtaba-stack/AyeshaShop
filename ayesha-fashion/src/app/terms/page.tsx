import { SITE_NAME } from "@/constants";

export default function TermsPage() {
  return (
    <>
      <section className="relative h-[35vh] md:h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block text-gold-light text-sm tracking-[0.3em] uppercase mb-4">Legal</span>
            <h1 className="font-heading text-4xl md:text-5xl text-white font-bold mb-4">
              Terms of Service
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
              Welcome to {SITE_NAME}. By accessing or using our website and services, you agree to be bound
              by these Terms of Service. Please read them carefully before making a purchase.
            </p>

            <Section title="Account Registration">
              <p>
                When you create an account with us, you must provide accurate, complete, and current
                information. You are responsible for maintaining the confidentiality of your account
                credentials and for all activities that occur under your account. Notify us immediately
                of any unauthorized use of your account.
              </p>
            </Section>

            <Section title="Products and Pricing">
              <p>
                All product descriptions, images, and pricing are subject to change without notice. We
                make every effort to display accurate information, but we do not warrant that product
                descriptions, colors, or other content are error-free. We reserve the right to modify
                or discontinue any product without prior notice.
              </p>
              <p className="mt-3">
                Prices are listed in Pakistani Rupees (PKR) and inclusive of applicable taxes unless
                stated otherwise. Promotional discounts and coupon codes are subject to specific terms
                and conditions and may not be combined with other offers.
              </p>
            </Section>

            <Section title="Order Acceptance and Cancellation">
              <p>
                We reserve the right to refuse or cancel any order. We may cancel orders due to:
                stock unavailability, inaccurate pricing, suspected fraudulent activity, or other
                legitimate reasons. If your order is cancelled after payment, we will issue a full
                refund to the original payment method.
              </p>
            </Section>

            <Section title="Intellectual Property">
              <p>
                All content on this website — including text, images, logos, designs, graphics, and
                software — is the property of {SITE_NAME} or its licensors and is protected by
                applicable intellectual property laws. You may not reproduce, distribute, modify, or
                create derivative works without our express written consent.
              </p>
            </Section>

            <Section title="User Conduct">
              <p>You agree not to:</p>
              <ul>
                <li>Use the site for any unlawful purpose or in violation of these terms</li>
                <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                <li>Upload malicious code or engage in any activity that disrupts the platform</li>
                <li>Impersonate any person or entity or provide false information</li>
              </ul>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                {SITE_NAME} shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages arising out of or relating to your use of our website or products.
                Our total liability for any claim arising from these terms shall not exceed the amount
                paid by you for the product giving rise to the claim.
              </p>
            </Section>

            <Section title="Governing Law">
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of
                Pakistan. Any disputes arising under these terms shall be subject to the exclusive
                jurisdiction of the courts of Lahore, Pakistan.
              </p>
            </Section>

            <Section title="Contact Information">
              <p>
                For any questions regarding these Terms of Service, please contact us at:
              </p>
              <p className="text-dark">
                {SITE_NAME}<br />
                Email: legal@ayesha-fashion.com<br />
                Phone: +92 300 1234567<br />
                Address: 42 Gulberg Main Boulevard, Lahore, Pakistan
              </p>
            </Section>

            <Section title="Changes to Terms">
              <p>
                We reserve the right to update these Terms of Service at any time. Changes will be
                effective immediately upon posting. Your continued use of the website after any
                modifications signifies your acceptance of the updated terms.
              </p>
            </Section>

            <div className="pt-6 border-t border-border">
              <p className="text-xs text-medium-gray">
                These terms were last updated on June 1, 2026.
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
