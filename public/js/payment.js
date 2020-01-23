paypal.Button.render(
  {
    // Configure environment
    env: 'sandbox',
    client: {
      sandbox: 'demo_sandbox_client_id',
      production: 'demo_production_client_id',
    },
    // Customize button (optional)
    locale: 'en_US',
    style: {
      size: 'small',
      color: 'gold',
      shape: 'pill',
    },

    // Enable Pay Now checkout flow (optional)
    commit: true,
    // Set up a payment
    payment: function(data, actions) {
      return actions.payment.create({
        transactions: [
          {
            amount: {
              total: document.getElementById('amount').value,
              currency: 'USD',
            },
          },
        ],
      });
    },
    // Execute the payment
    onAuthorize: function(data, actions) {
      console.log(data);
      return actions.payment.execute().then(function() {
        // Show a confirmation message to the buyer

        var e = document.getElementById('exampleFormControlSelect1');
        var name = e.options[e.selectedIndex].value;

        var amt = document.getElementById('amount').value;

        console.log('Paid');
        window.alert('Donation received successfully');
      });
    },
  },
  '#paypal-button'
);
