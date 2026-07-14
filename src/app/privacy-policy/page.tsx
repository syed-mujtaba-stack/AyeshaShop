import { SITE_NAME } from "@/constants";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative h-[35vh] md:h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block text-gold-light text-sm tracking-[0.3em] uppercase mb-4">Legal</span>
            <h1 className="font-heading text-4xl md:text-5xl text-white font-bold mb-4">
              Privacy Policy
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
              At {SITE_NAME}, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or make a purchase.
            </p>

            <Section title="Information We Collect">
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number, shipping and billing address, and payment information when you place an order.</li>
                <li><strong>Account Information:</strong> Username, password, and profile preferences if you create an account.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring URLs.</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
              </ul>
            </Section>

            <Section title="How We Use Your Information">
              <p>We use your information to:</p>
              <ul>
                <li>Process and fulfill your orders, including sending order confirmations and shipping updates</li>
                <li>Communicate with you about your account, orders, and inquiries</li>
                <li>Send you marketing communications (with your consent) about new collections, exclusive offers, and events</li>
                <li>Improve our website, products, and customer experience</li>
                <li>Detect and prevent fraudulent transactions and ensure the security of our platform</li>
              </ul>
            </Section>

            <Section title="Payment Information">
              <p>
                We do not store full credit card details on our servers. All payment transactions are processed
                through secure, PCI-compliant payment gateways. Your payment information is encrypted and
                handled in accordance with industry standards.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience,
                analyze site traffic, and serve personalized content. You can control cookie preferences
                through your browser settings. Essential cookies are required for the website to function properly.
              </p>
            </Section>

            <Section title="Information Sharing">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your
                information with trusted service providers who assist us in operating our website, processing
                payments, delivering orders, and conducting business operations, provided they agree to keep
                your information confidential.
              </p>
            </Section>

            <Section title="Data Security">
              <p>
                We implement appropriate technical and organizational security measures to protect your
                personal information against unauthorized access, alteration, disclosure, or destruction.
                This includes SSL encryption, secure servers, and regular security audits.
              </p>
            </Section>

            <Section title="Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your data, subject to legal obligations</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw consent for marketing communications at any time</li>
                <li>Request data portability</li>
              </ul>
            </Section>

            <Section title="Contact Us">
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your data rights,
                please contact us at <span className="text-gold">privacy@ayesha-fashion.com</span> or
                write to us at:
              </p>
              <p className="text-dark">
                {SITE_NAME}<br />
                Dak Khana Ghulam, Chak Number 58 J.B<br />
                Tehsil Faisalabad Saddar, Zila Faisalabad
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material
                changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                We encourage you to review this policy periodically.
              </p>
            </Section>

            <div className="pt-6 border-t border-border">
              <p className="text-xs text-medium-gray">
                This policy was last updated on June 1, 2026, and applies to all interactions with {SITE_NAME}.
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
