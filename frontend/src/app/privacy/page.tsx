export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl min-h-screen">
      <h1 className="text-4xl md:text-5xl font-black text-brand-charcoal mb-8">
        Privacy Policy
      </h1>
      <div className="prose prose-lg prose-p:text-brand-charcoal/80 prose-headings:text-brand-charcoal max-w-none">
        <p className="mb-8 font-medium">Last updated: June 15, 2026</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
        <p className="mb-4">
          WinterthurExpress GmbH ("we", "our", or "us") respects the privacy of our users ("user" or "you"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile applications, or engage with our courier and delivery services (collectively, the "Services").
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Collection of Your Information</h2>
        <p className="mb-4">
          We may collect information about you in a variety of ways. The information we may collect via the Site includes:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-brand-charcoal/80">
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
          <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. All financial information is stored by our payment processor (e.g., Stripe) and you are encouraged to review their privacy policy.</li>
          <li><strong>Location Data:</strong> To provide precise courier tracking, we may collect and process information about your actual location using GPS and other technologies.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Use of Your Information</h2>
        <p className="mb-4">
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-brand-charcoal/80">
          <li>Facilitate account creation and logon process.</li>
          <li>Process and manage your delivery orders, payments, and other transactions.</li>
          <li>Send you dispatch notifications, tracking updates, and delivery confirmations.</li>
          <li>Increase the efficiency and operation of the Site.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          <li>Protect against fraudulent transactions and monitor against theft.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Disclosure of Your Information</h2>
        <p className="mb-4">
          We may share information we have collected about you in certain situations. Your information may be disclosed to independent third-party couriers solely for the purpose of executing the delivery services you requested. We may also share your information with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf. We will not sell, rent, or trade your personal information to third parties.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Security of Your Information</h2>
        <p className="mb-4">
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
        <p className="mb-4">
          If you have questions or comments about this Privacy Policy, please contact us at:<br/>
          WinterthurExpress GmbH<br/>
          Technikumstrasse 9<br/>
          8400 Winterthur, Switzerland<br/>
          Email: privacy@winterthur-express.ch
        </p>
      </div>
    </div>
  );
}
