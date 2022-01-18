/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51KFCTpSFfqMXjb9Vu11eS4DZ2ZihIDmyIBVTG13hjrrMoUAIIrcAxqx8yCTcFGSWAINYVafXw9bAn8wsztPnG32C00eR0XNP7S'
);

export const bookTour = async tourId => {
  try {
    // 1) GET checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credict card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
