import React from 'react';

function FAQ() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Frequently Asked Questions</h1>
      <div className="accordion" id="faqAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              What payment methods do you accept?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Stripe.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              How long does delivery take?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Standard delivery usually takes 3-5 business days. Express options are available for faster delivery.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Can I return a product?
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Yes, you can return most products within 30 days of purchase, provided they are unopened and in their original packaging. Please see our full return policy for details.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Is my personal information safe?
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Absolutely. We use industry-standard encryption and security measures to protect your personal and payment information. We do not share your data with third parties.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
