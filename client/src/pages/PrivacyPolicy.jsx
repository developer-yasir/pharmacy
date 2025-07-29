import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Privacy Policy</h1>
      <div className="card p-4 shadow-sm">
        <p><strong>Effective Date: July 30, 2025</strong></p>

        <p>This Privacy Policy describes how Pharmacy App collects, uses, and discloses your personal information when you use our website.</p>

        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us, such as your name (username), email address (optional), shipping address, and payment information when you place an order or subscribe to our newsletter. We also collect information about your interactions with our website, such as products viewed and items added to your cart, which are stored locally in your browser's localStorage.</p>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders.</li>
          <li>Provide customer support.</li>
          <li>Improve our website and services.</li>
          <li>Send you newsletters and promotional communications (if you subscribe).</li>
          <li>Maintain your shopping cart, wishlist, and recently viewed products locally.</li>
        </ul>

        <h2>Data Storage (LocalStorage)</h2>
        <p>Please note that this application primarily uses your browser's <code>localStorage</code> for data storage. This means your data is stored directly on your device and is not transferred to a central server. If you clear your browser's data or use a different browser/device, your locally stored information (including orders, cart, and profile) will be lost.</p>

        <h2>Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at info@pharmacyapp.com.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
