import { VehiclePlan, FaqItem } from '../types.ts';

export const VEHICLE_PLANS: VehiclePlan[] = [
  {
    id: 'corolla-camry-05-06',
    name: '2005–2006 Toyota Corolla/Camry',
    totalCostFormatted: '₦10,000,000',
    depositFormatted: '₦3,000,000',
    monthlyFormatted: '₦300,000',
    totalCost: 10000000,
    deposit: 3000000,
    monthlyPayment: 300000,
    paymentPeriodMonths: 24,
    registrationCostFormatted: '₦120,000',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1V5bDOOlmv8keTc0smYpdCsSfbY0IIkTsTepEMBG1NdS_XRh1PZkNClzEXhONJQV1jN66qRfDS_5SEkohlz7VI6rHy1CemSbRNf64uYifp-VsHWqx9OdhfPKkwi8_KIo3PCJ1U9DgKfGOlyatL32gMPQhO6KNYCg5-w4FplG3n00I1qFdZt6MuoVibuEPGn74Rnu_5ZelMZNEKQc1QWSvZjTT576O7JDvv65eUf_o93b3XBBoj6H0ReIyU',
    tag: 'Available via Croyance Lease',
  },
  {
    id: 'corolla-07-08',
    name: '2007–2008 Toyota Corolla',
    totalCostFormatted: '₦11,000,000',
    depositFormatted: '₦3,300,000',
    monthlyFormatted: '₦325,000',
    totalCost: 11000000,
    deposit: 3300000,
    monthlyPayment: 325000,
    paymentPeriodMonths: 24,
    registrationCostFormatted: '₦120,000',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1Wud1l9mnF0_jjKeaq63eltQ1a-I_R_foFKmimd2HKRMcUOc4glfyX9frrK0LxRLmqIcfYPglTz7y-r38nlfkjBNC6p8humUi06dryEXNeVBSEJhw7maKT4vEIf99EYoV__pJugDM88tJikdb8c9RxO_xWP6A5luoiSGU1cqky0tbfnaf4_gjZsLFVn0P0onHmB4FVuZEkedkgy4hH2L_HGXBnLxp7-rcO_N3kN5yOtFYA_3cnBOyqPUE4',
    tag: 'Available via Croyance Lease',
  },
  {
    id: 'corolla-09-10',
    name: '2009–2010 Toyota Corolla',
    totalCostFormatted: '₦12,000,000',
    depositFormatted: '₦3,600,000',
    monthlyFormatted: '₦350,000',
    totalCost: 12000000,
    deposit: 3600000,
    monthlyPayment: 350000,
    paymentPeriodMonths: 24,
    registrationCostFormatted: '₦120,000',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1V5bDOOlmv8keTc0smYpdCsSfbY0IIkTsTepEMBG1NdS_XRh1PZkNClzEXhONJQV1jN66qRfDS_5SEkohlz7VI6rHy1CemSbRNf64uYifp-VsHWqx9OdhfPKkwi8_KIo3PCJ1U9DgKfGOlyatL32gMPQhO6KNYCg5-w4FplG3n00I1qFdZt6MuoVibuEPGn74Rnu_5ZelMZNEKQc1QWSvZjTT576O7JDvv65eUf_o93b3XBBoj6H0ReIyU',
    tag: 'Available via Croyance Lease',
  },
  {
    id: 'corolla-11-13',
    name: '2011–2013 Toyota Corolla',
    totalCostFormatted: '₦13,000,000',
    depositFormatted: '₦3,900,000',
    monthlyFormatted: '₦380,000',
    totalCost: 13000000,
    deposit: 3900000,
    monthlyPayment: 380000,
    paymentPeriodMonths: 24,
    registrationCostFormatted: '₦120,000',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1Wud1l9mnF0_jjKeaq63eltQ1a-I_R_foFKmimd2HKRMcUOc4glfyX9frrK0LxRLmqIcfYPglTz7y-r38nlfkjBNC6p8humUi06dryEXNeVBSEJhw7maKT4vEIf99EYoV__pJugDM88tJikdb8c9RxO_xWP6A5luoiSGU1cqky0tbfnaf4_gjZsLFVn0P0onHmB4FVuZEkedkgy4hH2L_HGXBnLxp7-rcO_N3kN5yOtFYA_3cnBOyqPUE4',
    tag: 'Available via Croyance Lease',
  },
];

export const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1Ua9DwqBCwbBAV3yfHYECU0wtJqT7sTCOQyyE_1eVIYM-c5LNkLCQ6C_Yz7WkjoL6eItEN0rmPeQRVKi6X0J3KBNUf-yJs7iIwO34EPRf-7UbiVfF8lgvmq2KpSwl6uDh95XlGpNWfwU4XxY0mnc-Xk9NogJESgCYsjhosybHomL2IdjhDPdWwNpp0Bz7dPA28REoumrB3doxSAmb2MzhusOZdi6WFrb11TKnVFBIuN0MWtSTQ5pE52';

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: 'What is the Lease-to-Own Program?',
    answer:
      'The Croyance Lease-to-Own program is an asset-financing structure designed for Nigerian executives and entrepreneurs. It allows you to select a verified vehicle, pay a 30% equity contribution deposit, and spread the balance over a fixed 24-month term via structured monthly repayments. Upon fulfillment of all monthly installments, full legal vehicle ownership and title transfer documents are handed over to you.',
  },
  {
    id: 2,
    question: 'How much deposit is required?',
    answer:
      'A minimum equity deposit of 30% of the total vehicle valuation is required for all tiers. For example, on a ₦10,000,000 Toyota Corolla/Camry, the 30% deposit is ₦3,000,000. On a ₦13,000,000 vehicle, the deposit is ₦3,900,000.',
  },
  {
    id: 3,
    question: 'How long is the payment period?',
    answer:
      'The payment period for all listed vehicles is strictly 24 months (two years). Monthly payments remain fixed throughout the entire tenure, protecting you against inflation and foreign exchange adjustments.',
  },
  {
    id: 4,
    question: 'What vehicles are currently available?',
    answer:
      'Our active inventory currently comprises four key high-reliability tiers: 2005–2006 Toyota Corolla/Camry, 2007–2008 Toyota Corolla, 2009–2010 Toyota Corolla, and 2011–2013 Toyota Corolla. Each vehicle undergoes our 120-point mechanical assessment prior to handoff.',
  },
  {
    id: 5,
    question: 'What documents do I need to provide?',
    answer:
      "Applicants must supply: (1) Valid Means of ID (NIN, Passport, or Voter's Card), (2) Valid FRSC Driver's Licence, (3) Recent NEPA/utility bill showing proof of residence, and (4) Valid Guarantor Identification.",
  },
  {
    id: 6,
    question: 'How soon should I have the deposit available?',
    answer:
      'You must have the 30% deposit available within 7 business days of submitting your application. Because vehicle allocations are limited and highly demanded, unverified reservations without deposit readiness are automatically released back to the general inventory pool after 7 business days.',
  },
  {
    id: 7,
    question: 'Where is your head office located and how can I reach you directly?',
    answer:
      'Our new head office is located at 43B, Church Street, Agbelekale Abule-Egba, Lagos State, Nigeria. You can reach our direct telephone line at +234 903 236 0163, message our support on WhatsApp at 07062343398, or visit our official corporate homepage at https://croyancegroup.com/.',
  },
];
