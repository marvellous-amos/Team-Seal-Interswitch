/**
 * NoBeScam — Food Vendor Extended Scenarios
 * 40 high-difficulty scenarios (levels 3–5)
 * All tagged businesses: ['food_vendor']
 */

export const foodScenarios = [
  {
    id: 1001,
    businesses: ["food_vendor"],
    text: "Hello! I'm the Event Director at Guaranty Trust Bank's annual staff gala. We host 800 employees every December at Eko Hotel. Your pepper soup was recommended by our last vendor. Can you quote for full catering — starter, main, dessert?",
    label: "safe",
    difficulty: 3,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "GTBank's annual staff gala is a real event. Large bank catering contracts are legitimate and lucrative. Always request the inquiry on official GTBank letterhead (@gtbank.com email) before proceeding.",
  },
  {
    id: 1002,
    businesses: ["food_vendor"],
    text: "From: vendor-onboarding@shoprite-ng.supply — Shoprite Nigeria is expanding its hot food section. Your brand was shortlisted. To proceed, complete vendor registration and pay ₦60,000 compliance fee to our accreditation partner. Ref: SRT-2024-VND.",
    label: "scam",
    difficulty: 3,
    category: "Supplier",
    misleadingBadge: true,
    explanation:
      "Shoprite vendor onboarding is done through official procurement portals with legal contracts — never through third-party compliance fees paid to bank accounts. The domain 'shoprite-ng.supply' is not Shoprite's official domain.",
  },
  {
    id: 1003,
    businesses: ["food_vendor"],
    text: "Hi, I manage food procurement for Transcorp Hilton Abuja. We're looking to feature a Nigerian street food vendor in our cultural dining experience — monthly residency, fully paid. Please send your NAFDAC number and food handler certification.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "Five-star hotels do feature local food vendors in cultural dining programmes. The request for NAFDAC number and food handler cert is genuine professional due diligence — not a scam indicator.",
  },
  {
    id: 1004,
    businesses: ["food_vendor"],
    text: "VERIFIED ✔ — Paystack Settlement Alert: ₦340,000 from bulk catering payment is on hold pending KYC update. Update your business details at: paystack-kyc-ng.com/update before 5pm today to avoid reversal.",
    label: "scam",
    difficulty: 3,
    category: "Payment Request",
    misleadingBadge: true,
    explanation:
      "Paystack's real domain is paystack.com. 'paystack-kyc-ng.com' is a fake phishing site. Paystack handles KYC updates exclusively through your official dashboard — never through external links sent via SMS.",
  },
  {
    id: 1005,
    businesses: ["food_vendor"],
    text: "Good morning! I'm sourcing traditional Nigerian soups — egusi, oha, bitterleaf — for a Nigerian restaurant chain we're opening in Accra, Ghana. We need weekly frozen supply. Can you package and ship? We cover logistics.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Cross-border food export to West Africa is a real and growing opportunity for Nigerian food vendors. The offer to cover logistics reduces your risk. Request their CAC equivalent and export paperwork before committing.",
  },
  {
    id: 1006,
    businesses: ["food_vendor"],
    text: "This is FirstMonie Agent (ID: FM-08XXXX). You have an unclaimed catering deposit of ₦180,000 in our system from an anonymous corporate client. To claim, provide your BVN and account number for transfer. Act fast — expires tonight.",
    label: "scam",
    difficulty: 3,
    category: "Bank",
    explanation:
      "No fintech holds unclaimed deposits waiting for your BVN. Real corporate clients pay directly to your account after a signed contract — there is no anonymous deposit mechanism.",
  },
  {
    id: 1007,
    businesses: ["food_vendor"],
    text: "Hello! I coordinate food vendor partnerships for the Lagos International Film Festival. We want a Nigerian food caterer for our 5-day event at Terra Kulture. 300 daily covers, full media exposure. No stall fee.",
    label: "safe",
    difficulty: 3,
    category: "Customer Message",
    explanation:
      "LIFF is a real annual Lagos festival. Terra Kulture is a real venue. No-fee partnerships at cultural events with media exposure are legitimate marketing opportunities for food vendors.",
  },
  {
    id: 1008,
    businesses: ["food_vendor"],
    text: "Dear Food Vendor, the Consumer Protection Council has received 3 complaints about your business. To avoid a formal investigation, pay ₦120,000 settlement to CPC Enforcement Account: 7089XXXXXX within 48 hours.",
    label: "scam",
    difficulty: 4,
    category: "Payment Request",
    explanation:
      "The Consumer Protection Council handles complaints through formal legal processes — they never collect settlement fees via bank transfer. Real CPC investigations involve written notices and formal hearings.",
  },
  {
    id: 1009,
    businesses: ["food_vendor"],
    text: "Hi! I'm Amaka from Food by Amaka Catering. I'm overbooked for a Christmas event — 400 guests in GRA Ikeja on December 23rd. Can I subcontract you for the main course? I'll handle client liaison, you focus on cooking. ₦250,000 fee.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Subcontracting between caterers is common and legitimate, especially during peak seasons. Get the agreement in writing and confirm the payment structure before cooking a single pot.",
  },
  {
    id: 1010,
    businesses: ["food_vendor"],
    text: "From: grants@nigerianfoodcouncil-msme.org — Nigerian Food Council is awarding ₦500,000 infrastructure grants to certified food vendors. Apply by sending your NAFDAC cert, CAC, and ₦15,000 application processing fee to our secretariat.",
    label: "scam",
    difficulty: 4,
    category: "Grant",
    explanation:
      "There is no 'Nigerian Food Council' with this mandate. Legitimate grants never charge application fees. The .org domain and vague body name are classic scam patterns for impersonating regulatory institutions.",
  },
  {
    id: 1011,
    businesses: ["food_vendor"],
    text: "Good afternoon. I'm the purchasing manager at Flour Mills Nigeria's Apapa factory. We feed 300 workers daily. Our current vendor is relocating. We need a replacement — Monday to Friday, breakfast and lunch. Are you NAFDAC-compliant?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "Flour Mills of Nigeria is a real public company with factories in Apapa. Factory catering contracts are substantial and legitimate. Verify through flourmills.com.ng before formal tender submission.",
  },
  {
    id: 1012,
    businesses: ["food_vendor"],
    text: "Hi! I noticed your catering business on LinkedIn. I run a corporate gifting company. We want to include local food hampers in our Q4 corporate gifts — 200 hampers, ₦15,000 each. Can you fulfil? We pay 30% upfront.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Corporate hamper contracts are a real revenue stream for food businesses. 30% upfront is standard for large custom orders. Verify the company on LinkedIn and CAC before accepting the deposit.",
  },
  {
    id: 1013,
    businesses: ["food_vendor"],
    text: "ALERT: Your NAFDAC food vendor license has expired. To renew online and avoid a ₦200,000 fine, visit: nafdac-renewal.com.ng/vendor and pay the ₦35,000 renewal fee using your BVN as reference.",
    label: "scam",
    difficulty: 4,
    category: "Bank",
    explanation:
      "NAFDAC renewals are done at nafdac.gov.ng or in person at NAFDAC offices — never through third-party .com.ng sites. Using BVN as a payment reference is a data harvesting tactic.",
  },
  {
    id: 1014,
    businesses: ["food_vendor"],
    text: "Hello! I represent a UK-based Nigerian diaspora food brand. We want to partner with a Lagos vendor to produce our signature jollof rice seasoning under our brand. We supply the recipe and packaging, you produce and ship. Interested in a trial run?",
    label: "safe",
    difficulty: 5,
    category: "Supplier",
    explanation:
      "White-label food production partnerships with diaspora brands are a legitimate and growing business model. Request a formal contract and verify the UK business registration before investing in production.",
  },
  {
    id: 1015,
    businesses: ["food_vendor"],
    text: "Your tomato paste supplier says the price increase to ₦8,500 per carton takes effect Monday. To lock in the old price of ₦5,200, transfer payment for 20 cartons now to their NEW account: 0987XXXXXX Access Bank.",
    label: "scam",
    difficulty: 4,
    category: "Supplier",
    explanation:
      "Account switching mid-relationship via informal message is one of the top MSME fraud techniques. Always call your supplier's known number directly to verify any new account details before payment.",
  },
  {
    id: 1016,
    businesses: ["food_vendor"],
    text: "Good day! I'm the food and beverage manager at Lagos Oriental Hotel. We want to add authentic Nigerian street food to our weekend brunch menu. We're looking for a local vendor partner — profit sharing, not a one-off gig. Interested?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "Hotel F&B partnerships are legitimate and prestigious for food vendors. Profit-sharing models are common in hotel vendor relationships. Verify through Lagos Oriental Hotel's official website before signing anything.",
  },
  {
    id: 1017,
    businesses: ["food_vendor"],
    text: "Hi! Congratulations — your food business was selected for the Google for Startups Nigeria cohort. To confirm your spot in the food tech track, pay a ₦45,000 cohort commitment fee to our programme coordinator.",
    label: "scam",
    difficulty: 4,
    category: "Grant",
    explanation:
      "Google for Startups programmes are completely free — they never charge cohort fees. Selections are announced through official Google channels. Any fee request from a 'Google programme' is fraud.",
  },
  {
    id: 1018,
    businesses: ["food_vendor"],
    text: "This is Nkechi from the NSIA-LMIS Food Entrepreneurs Fund. We're disbursing ₦300,000 no-interest loans to certified food vendors this quarter. Applications at nsia.gov.ng/food-fund. Deadline is end of month.",
    label: "safe",
    difficulty: 5,
    category: "Grant",
    explanation:
      "NSIA (nsia.gov.ng) is a real Nigerian sovereign investment authority that does run MSME support programmes. The .gov.ng domain is authentic. Verify by calling NSIA's published helpline before submitting documents.",
  },
  {
    id: 1019,
    businesses: ["food_vendor"],
    text: "From: foodsafety@lagos-health.ng — Lagos State Ministry of Health is conducting unannounced food safety raids this week. Your premises failed a prior inspection. Pay ₦75,000 compliance bond to avoid closure. Account: 3049XXXXXX.",
    label: "scam",
    difficulty: 4,
    category: "Bank",
    explanation:
      "Government compliance bonds are never collected via bank transfer to unnamed accounts. Lagos Ministry of Health uses formal enforcement letters — not SMS payment demands. This is extortion.",
  },
  {
    id: 1020,
    businesses: ["food_vendor"],
    text: "Hello! I coordinate vendor selection for the Alara Lagos concept store. We're curating a Nigerian food market every Saturday. We want authentic vendors only — no application fee. Just send your menu and a short bio to our events team.",
    label: "safe",
    difficulty: 3,
    category: "Customer Message",
    explanation:
      "Alara Lagos is a real premium lifestyle concept store. Their curated food markets are real events. No application fee and a menu + bio request is a legitimate vetting process.",
  },
  {
    id: 1021,
    businesses: ["food_vendor"],
    text: "IMPORTANT: Your PalmPay business wallet has been flagged for unusual inflows from catering payments. To avoid CBN AML freeze, call our compliance line immediately: 08XXXXXXXXXX and provide your transaction history.",
    label: "scam",
    difficulty: 4,
    category: "Bank",
    explanation:
      "PalmPay handles compliance through their app — never via outbound phone calls demanding transaction history. Providing your transaction history to unknown callers enables targeted fraud.",
  },
  {
    id: 1022,
    businesses: ["food_vendor"],
    text: "Hi! I'm a food procurement officer at the UK High Commission in Abuja. We host quarterly diplomatic dinners and want to feature authentic Nigerian cuisine. Interested in catering for 60 guests? We pay in advance, full contract provided.",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "Foreign missions in Abuja do hire Nigerian caterers for cultural events. Full advance payment with a contract is the correct procurement practice for diplomatic events. Verify through the UK High Commission's official Abuja website.",
  },
  {
    id: 1023,
    businesses: ["food_vendor"],
    text: "Your spice supplier from Kano: Due to flooding in our warehouse last week, we lost your last order. We are resending but need you to cover the ₦38,000 logistics cost to a new delivery account: 5049XXXXXX UBA. We'll deduct from your next invoice.",
    label: "scam",
    difficulty: 5,
    category: "Supplier",
    explanation:
      "Emergency resupply logistics scam. A real supplier absorbs warehouse losses and would not ask you to pay logistics to a new account via SMS. Call your supplier's known contact directly before any payment.",
  },
  {
    id: 1024,
    businesses: ["food_vendor"],
    text: "Hello, I supply vacuum packaging machines ideal for food vendors scaling to retail. Current model: ₦320,000. I can demo at your location this week. Based in Oregun Industrial Estate. Here's my CAC registration: RC-198XXXX.",
    label: "safe",
    difficulty: 3,
    category: "Supplier",
    explanation:
      "Legitimate equipment supplier with physical location and CAC number. Offering an in-person demo is a strong sign of legitimacy. Verify the RC number at cac.gov.ng before making any payment.",
  },
  {
    id: 1025,
    businesses: ["food_vendor"],
    text: "From: info@nigeriacateringboard.org — The Catering Board of Nigeria requires all commercial food vendors to register by December 31st. Registration fee: ₦28,000 via transfer to Account: 1099XXXXXX First Bank.",
    label: "scam",
    difficulty: 4,
    category: "Grant",
    explanation:
      "There is no 'Catering Board of Nigeria' with mandatory vendor registration. Legitimate regulatory bodies have .gov.ng domains and collect fees through official payment platforms — not bank transfers.",
  },
  {
    id: 1026,
    businesses: ["food_vendor"],
    text: "Hi! I run a food tech startup — we're building a last-mile delivery app for local caterers. We want to onboard 10 pilot vendors in Lagos. No commission for the first 6 months. Interested in being a launch partner?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Food delivery platform partnerships are a legitimate growth channel for caterers. Zero-commission launch partnerships are common for early-stage apps. Request their CAC registration and review their app before onboarding.",
  },
  {
    id: 1027,
    businesses: ["food_vendor"],
    text: "VERIFIED ✔ Interswitch Payment: A corporate client has initiated payment of ₦420,000 for a catering contract. The funds are pending your approval. To release, SMS your Interswitch merchant code and last 4 digits of your BVN to 09XXXXXXXXXX.",
    label: "scam",
    difficulty: 5,
    category: "Payment Request",
    misleadingBadge: true,
    explanation:
      "No payment platform requires you to SMS your BVN digits to receive money. Combining your merchant code with BVN digits gives fraudsters enough to impersonate you. Check your real Interswitch dashboard for any actual pending payments.",
  },
  {
    id: 1028,
    businesses: ["food_vendor"],
    text: "Good morning! I'm the F&B director at Radisson Blu Lagos. We're launching a Nigerian Street Food Pop-Up every Sunday. We want three rotating vendors — jollof rice, suya, and local drinks. 12-week contract, ₦80,000/Sunday. Interested?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "Radisson Blu Lagos does run food pop-up programmes. The 12-week contract with clear weekly payment is a professional structure. Verify through Radisson Blu's official Lagos number before signing.",
  },
  {
    id: 1029,
    businesses: ["food_vendor"],
    text: "This is the Access Bank SME desk. Your business qualifies for a ₦2M working capital loan with no collateral. To process, we need your last 6 months bank statements and a ₦20,000 commitment fee to our partner processing agent.",
    label: "scam",
    difficulty: 4,
    category: "Bank",
    explanation:
      "Legitimate bank loans never require upfront fees to a third-party processing agent. Access Bank SME loans are applied for directly at accessbankplc.com or at any branch — never via SMS with external fees.",
  },
  {
    id: 1030,
    businesses: ["food_vendor"],
    text: "Hello! I'm building Nigeria's first cloud kitchen network. I want to partner with 5 established caterers who will cook from a central facility in Lekki. I cover kitchen costs, you supply the food. Revenue split: 60/40 in your favour.",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    explanation:
      "Cloud kitchen partnerships are a real and growing business model in Lagos. A 60/40 revenue split in your favour is favourable. Request their facility licence and a formal partnership agreement before committing.",
  },
  {
    id: 1031,
    businesses: ["food_vendor"],
    text: "FINAL NOTICE: Nigerian Standards Organisation (SON) inspection revealed your packaged spice products lack mandatory SON certification. Pay ₦95,000 regularisation fee to SON Account: 2049XXXXXX or face a product recall.",
    label: "scam",
    difficulty: 4,
    category: "Bank",
    explanation:
      "SON (son.gov.ng) conducts inspections through formal letters and official processes — never SMS payment demands. Real SON enforcement involves written notices with official stamps, not personal bank accounts.",
  },
  {
    id: 1032,
    businesses: ["food_vendor"],
    text: "Hi! I'm a documentary filmmaker working on a Netflix Africa series about Nigerian street food culture. I'd love to film your kitchen and stall for 2 days. No cost to you. We credit your business and share the final episode.",
    label: "safe",
    difficulty: 3,
    category: "Customer Message",
    explanation:
      "Netflix Africa does produce local content about Nigerian food culture. A free filming request with business credit is a legitimate marketing opportunity. Verify the filmmaker's credentials and get a signed release form.",
  },
  {
    id: 1033,
    businesses: ["food_vendor"],
    text: "From: procurement@unilever.com.ng — Unilever Nigeria is sourcing local food vendors to trial our new Knorr Premium Seasoning in real catering settings. Selected vendors receive free seasoning stock worth ₦120,000. No fees required. Apply via the link in our email.",
    label: "safe",
    difficulty: 5,
    category: "Supplier",
    verifiedMerchant: true,
    explanation:
      "Unilever Nigeria does run product trial programmes with food vendors for their seasoning brands. The @unilever.com.ng domain is authentic. No-fee product trials are a legitimate B2B marketing strategy.",
  },
  {
    id: 1034,
    businesses: ["food_vendor"],
    text: "Hello! I represent an Abuja-based NGO running food security programmes. We need a Lagos-based caterer to supply 500 daily meal packs to a refugee camp in Benue for 30 days. We pay weekly, donor funds secured. Can you quote?",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    explanation:
      "NGO food supply contracts for humanitarian programmes are real and often well-funded. Weekly payment with donor funding secured is a legitimate structure. Request their NGO registration number and donor documentation before committing supply.",
  },
  {
    id: 1035,
    businesses: ["food_vendor"],
    text: "Your Konga seller account has received a dispute for a ₦68,000 catering deposit. Funds are frozen. Resolve by uploading your catering contract proof at: konga-seller-portal.net/dispute",
    label: "scam",
    difficulty: 4,
    category: "Payment Request",
    explanation:
      "Konga's real seller portal is seller.konga.com. The domain 'konga-seller-portal.net' is fraudulent. Log in directly to your real Konga dashboard to check any actual disputes.",
  },
  {
    id: 1036,
    businesses: ["food_vendor"],
    text: "Hi! I'm a procurement officer at TotalEnergies Nigeria. We're updating our approved vendor list for catering and refreshment services at our Ikoyi office. Please send your company profile, NAFDAC number and CAC certificate.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "TotalEnergies Nigeria does maintain approved vendor lists and requires NAFDAC certification for food vendors. Verify by calling TotalEnergies' official Lagos number before submitting documents.",
  },
  {
    id: 1037,
    businesses: ["food_vendor"],
    text: "DEBT RECOVERY: Sterling Bank Recovery Unit. You have an outstanding microfinance food vendor loan of ₦850,000. Legal action commences Monday unless you pay ₦200,000 today to: Account 8027XXXXXX. — Recovery Officer Folake",
    label: "scam",
    difficulty: 4,
    category: "Bank",
    explanation:
      "Legitimate bank debt recovery uses formal legal letters and court processes — never urgent SMS payment demands. Call Sterling Bank's official recovery department to verify any debt claims.",
  },
  {
    id: 1038,
    businesses: ["food_vendor"],
    text: "Hello! I'm building a WhatsApp-based food ordering platform for corporate clients in VI. I want to list your menu and handle all orders. You cook, I deliver. Commission is 15% per order. No upfront cost.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "WhatsApp-based food delivery platforms are a real and growing model in Lagos. 15% commission is competitive. Get the agreement in writing and start with a small trial before full commitment.",
  },
  {
    id: 1039,
    businesses: ["food_vendor"],
    text: "From: yinka.adeleke@mtn.com.ng — MTN Nigeria HR. We're hosting our end-of-year party for 500 staff on December 20th at our Marina HQ. We need full catering — 4 courses. Budget: ₦4,500 per head. Can you quote formally?",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "The @mtn.com.ng email domain is MTN Nigeria's authentic corporate domain. MTN does host large staff events and outsources catering. A formal quote request with per-head budget is professional procurement practice.",
  },
  {
    id: 1040,
    businesses: ["food_vendor"],
    text: "Hi! I found you through NAFDAC's vendor list. I want to distribute your packaged egusi and crayfish nationally through my logistics company. I cover distribution — you supply and invoice me monthly. Let's talk exclusivity.",
    label: "safe",
    difficulty: 5,
    category: "Supplier",
    explanation:
      "National distribution partnerships discovered through NAFDAC's vendor list are legitimate. Monthly invoicing is a standard B2B arrangement. Request their CAC, logistics licence and reference list of current suppliers before granting exclusivity.",
  },
];
