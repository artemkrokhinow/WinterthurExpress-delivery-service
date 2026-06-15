export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl min-h-screen">
      <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal mb-8">
        Terms of Service
      </h1>
      <div className="prose prose-lg prose-p:text-brand-charcoal/80 prose-headings:text-brand-charcoal max-w-none">
        <p className="mb-8 font-medium">Last updated: June 15, 2026</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
        <p className="mb-4">
          These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and WinterthurExpress GmbH ("we", "us", or "our"), concerning your access to and use of the Winterthur Express website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Services Provided</h2>
        <p className="mb-4">
          Winterthur Express provides a technology platform that enables users to arrange and schedule logistics, courier, and delivery services with independent third-party providers of such services ("Third Party Providers"). Unless otherwise agreed by Winterthur Express in a separate written agreement with you, the Services are made available solely for your personal, noncommercial use.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. User Registration</h2>
        <p className="mb-4">
          You may be required to register with the Site to access certain features. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Prohibited Items</h2>
        <p className="mb-4">
          You agree not to use our platform to request delivery of any prohibited items, including but not limited to: illegal substances, hazardous materials, firearms, explosives, live animals, highly fragile items without proper packaging, or any other items whose transportation is prohibited by Swiss law or local regulations.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Payment and Fees</h2>
        <p className="mb-4">
          You understand that use of the Services may result in charges to you for the services or goods you receive from a Third Party Provider ("Charges"). Winterthur Express will facilitate your payment of the applicable Charges on behalf of the Third Party Provider as such Third Party Provider's limited payment collection agent. Payment of the Charges in such manner shall be considered the same as payment made directly by you to the Third Party Provider.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Cargo Insurance & Liability</h2>
        <p className="mb-4">
          All deliveries booked through our platform are insured up to 10,000 CHF against damage, loss, or theft during transit. However, Winterthur Express shall not be liable for any indirect, incidental, special, exemplary, punitive, or consequential damages, including lost profits, lost data, personal injury, or property damage related to, in connection with, or otherwise resulting from any use of the services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed by and defined following the laws of Switzerland. WinterthurExpress GmbH and yourself irrevocably consent that the courts of Switzerland shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
        </p>
      </div>
    </div>
  );
}
