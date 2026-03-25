/**
 * NoBeScam — Sportswear Brand Extended Scenarios
 * 40 high-difficulty scenarios (levels 3–5)
 * All tagged businesses: ['sportswear']
 */

export const sportswearScenarios = [
  {
    id: 2001,
    businesses: ["sportswear"],
    text: "Hello! I'm the kit manager for Remo Stars FC. We just got promoted to the NPFL and need a full kit sponsor — jerseys, shorts, socks for 35 players plus 10 technical staff. Budget is ₦1.8M. Interested in a partnership?",
    label: "safe",
    difficulty: 3,
    category: "Customer Message",
    explanation:
      "NPFL (Nigerian Professional Football League) kit partnerships are real and lucrative for local sportswear brands. Request the club's CAC registration and a formal sponsorship brief before committing to production.",
  },
  {
    id: 2002,
    businesses: ["sportswear"],
    text: "VERIFIED ✔ — Adidas Nigeria Partnership Programme: Your brand has been shortlisted for our 'Made in Nigeria' initiative. To confirm participation and receive your starter kit worth ₦500,000, pay a ₦50,000 partnership activation fee to our Nigerian coordinator.",
    label: "scam",
    difficulty: 3,
    category: "Supplier",
    misleadingBadge: true,
    explanation:
      "Adidas partnership programmes are applied for through adidas.com/ng — they never charge activation fees via SMS. The 'Made in Nigeria' initiative framing makes this scam particularly convincing for local brands.",
  },
  {
    id: 2003,
    businesses: ["sportswear"],
    text: "Hi! I coordinate sportswear procurement for the Lagos State Ministry of Youth and Sports. We're equipping 12 state sports academies — 600 students need full kits. This is a formal tender. Can you collect tender documents at the Ministry?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Lagos State Ministry procurement through formal tender documents collected in person is a legitimate and safe process. Government tenders require you to visit their offices — not pay fees online.",
  },
  {
    id: 2004,
    businesses: ["sportswear"],
    text: "From: partnerships@puma-africa.com — Puma Africa is scouting authentic Nigerian streetwear brands for our Lagos pop-up collab. We'll feature 3 brands. No fee — we provide the retail space, you supply 50 pieces. Send your lookbook.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    verifiedMerchant: true,
    verificationQuery: "Neem",
    explanation:
      "Puma Africa does run local brand collaboration events. The @puma-africa.com email format is consistent with their regional operations. No-fee supply partnerships with retail space provided are legitimate brand-building opportunities. Verify through Puma's official Africa social channels.",
  },
  {
    id: 2005,
    businesses: ["sportswear"],
    text: "Hello! I run a fitness influencer agency — we represent 15 Nigerian fitness creators with combined reach of 2M followers. We want to partner your brand for a 3-month ambassador programme. We manage all content, you supply product only.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Influencer agency partnerships are legitimate marketing arrangements for sportswear brands. Product-only agreements with agency-managed content are standard. Ask for their portfolio, creator handles, and a formal agreement before shipping stock.",
  },
  {
    id: 2006,
    businesses: ["sportswear"],
    text: "Your wholesale fabric order from Guangzhou has arrived at Apapa port. Customs clearance requires a ₦78,000 duty payment. Transfer to our clearing agent account: 4082XXXXXX GTB (Agent: Chief Okeke) before Thursday or the consignment returns.",
    label: "scam",
    difficulty: 4,
    category: "Payment Request",
    verificationQuery: "Neem",
    explanation:
      "If you placed no order, this is fraud. If you did, your real clearing agent will have a signed contract with their official business account — not a personal account. Always verify clearance fees through your agent's known contact.",
  },
  {
    id: 2007,
    businesses: ["sportswear"],
    text: "Hi! I'm a production coordinator for Big Brother Naija. We want to outfit the housemates for the sports challenge episode — 20 custom branded sets. We pay on delivery. Can you produce in 10 days?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "Big Brother Naija does source custom sportswear for challenge episodes. Payment on delivery is a buyer-friendly arrangement. Verify by calling MultiChoice Nigeria's official production contact before starting production.",
  },
  {
    id: 2008,
    businesses: ["sportswear"],
    text: "URGENT: Your registered trademark 'NAIJA KICKS' is being contested by a foreign brand. To protect your registration, pay ₦85,000 legal protection fee to Nigerian IP Attorneys Network Account: 2087XXXXXX within 7 days.",
    label: "scam",
    difficulty: 4,
    category: "Payment Request",
    explanation:
      "Trademark disputes go through the Trademarks Registry at the Commercial Law Department — never via SMS fee demands. Real IP attorneys send formal legal letters on firm letterhead, not WhatsApp messages.",
  },
  {
    id: 2009,
    businesses: ["sportswear"],
    text: "Good day! I coordinate kit procurement for the Nigeria U-20 Women's Football Team. NWFL is looking for a local manufacturer for our training kits — 35 players, 3 sets each. Government contract, payment through NFF Finance.",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    explanation:
      "NFF (Nigeria Football Federation) does source training kits from local manufacturers. Government contract payment through NFF Finance is the legitimate channel. Verify through nff.com.ng before investing in production.",
  },
  {
    id: 2010,
    businesses: ["sportswear"],
    text: "Hello! I manage a chain of 8 gym franchises across Lagos and Abuja. I want to brand all my gyms with a consistent sportswear line — branded towels, shirts, shorts for members. Monthly reorder. Can we discuss a supply agreement?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Gym franchise merchandise contracts are a recurring revenue stream for sportswear brands. A monthly reorder arrangement is excellent for cash flow. Request a formal purchase order and verify their gym locations before committing.",
  },
  {
    id: 2011,
    businesses: ["sportswear"],
    text: "From: store-support@jumia-seller-ng.com — Your Jumia seller account received a chargeback dispute of ₦95,000. Funds are on hold. Resolve by submitting delivery proof at: jumia-dispute-ng.com/resolve by end of business today.",
    label: "scam",
    difficulty: 4,
    category: "Payment Request",
    explanation:
      "Jumia's real seller portal is seller.jumia.com.ng. Both 'jumia-seller-ng.com' and 'jumia-dispute-ng.com' are fraudulent lookalike domains. Always log in directly through the real Jumia Seller Center.",
  },
  {
    id: 2012,
    businesses: ["sportswear"],
    text: "Hi! I'm setting up a sports equipment franchise in Kano. I want to stock your branded sportswear as my primary apparel line. I'll order 500 units monthly. Can we discuss territory exclusivity for Kano State?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Northern Nigeria distribution is a legitimate market for Lagos-based sportswear brands. Territory exclusivity agreements are standard in franchise arrangements. Get legal counsel before granting any exclusivity rights.",
  },
  {
    id: 2013,
    businesses: ["sportswear"],
    text: "VERIFIED ✔ Access Bank SME: Your sportswear business qualifies for our Export Expansion Grant Facility — ₦3M at 9% p.a. To fast-track, pay a ₦35,000 file opening fee to our partner agency Account: 5082XXXXXX.",
    label: "scam",
    difficulty: 4,
    category: "Bank",
    misleadingBadge: true,
    explanation:
      "Legitimate bank loan facilities never require upfront file opening fees to external agencies. Access Bank SME products are applied for directly at accessbankplc.com or any branch — never via SMS payment demands.",
  },
  {
    id: 2014,
    businesses: ["sportswear"],
    text: "Hello! I'm sourcing authentic Nigerian sportswear for my online boutique in the UK. I want 100 mixed pieces per month — jersey, shorts and tracksuits. I pay in GBP via Wise. Can you quote in GBP?",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    explanation:
      "Export sales to Nigerian diaspora boutiques in the UK are a real opportunity. Payment via Wise (formerly TransferWise) is a legitimate cross-border payment method. Verify the buyer's UK business registration before large production runs.",
  },
  {
    id: 2015,
    businesses: ["sportswear"],
    text: "Your polyester supplier from Aba says: Due to new import duties, prices increase by 40% from next week. To maintain your current price, prepay for 6 months supply — ₦480,000 to Account: 7049XXXXXX GTB immediately.",
    label: "scam",
    difficulty: 5,
    category: "Supplier",
    explanation:
      "Urgency-based prepayment scams are common with suppliers. Even if a price increase is real, legitimate suppliers send formal notice letters and offer payment plans — not urgent bank transfer demands for 6-month prepayments.",
  },
  {
    id: 2016,
    businesses: ["sportswear"],
    text: "Hi! I run a corporate wellness programme for 3 Lagos tech companies — Flutterwave, Andela, and Paystack. We want branded workout gear for 250 employees across all three. Annual contract. Can you handle this scale?",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "Corporate wellness gear contracts for tech companies are a real market. The named companies are verifiable. Ask for their corporate email addresses for formal communication and confirm through each company's official HR contact.",
  },
  {
    id: 2017,
    businesses: ["sportswear"],
    text: "Good morning! I'm a sourcing manager for Sports Direct Nigeria. We're opening 3 new stores in Lagos and want to feature Nigerian-made brands in a dedicated local section. Can you supply 300 units per style? Full payment on delivery.",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "Sports Direct Nigeria is a real retail chain. Full payment on delivery is a buyer-friendly arrangement that protects you. Verify through Sports Direct's official Nigerian store contacts before committing to production.",
  },
  {
    id: 2018,
    businesses: ["sportswear"],
    text: "From: africa@underarmour.com — Under Armour Africa is launching a 'Next Generation African Brand' programme. Your brand has been nominated. Participation requires a ₦100,000 brand development deposit to our Lagos facilitator.",
    label: "scam",
    difficulty: 4,
    category: "Supplier",
    explanation:
      "Under Armour Africa programmes are managed through their official website — they never collect brand development deposits via SMS. The legitimate africa@underarmour.com domain is real but easily spoofed.",
  },
  {
    id: 2019,
    businesses: ["sportswear"],
    text: "Hello! I represent a group of 12 Lagos amateur football clubs. We've pooled funds to order custom kits for the upcoming FA Cup qualifiers. Combined order: 350 jerseys across 12 designs. Can you handle this? 50% deposit, 50% on delivery.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Amateur football club kit orders are a core revenue stream for sportswear brands. A 50/50 deposit structure is standard for large custom orders. Get individual order forms from each club and a group coordinator agreement.",
  },
  {
    id: 2020,
    businesses: ["sportswear"],
    text: "Hi! I'm an NFF-licensed sports agent. I represent 8 NPFL players who want to launch personal merchandise lines — branded jerseys and lifestyle wear. I handle the players, you produce. 30% margin to you per unit. Interested?",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    explanation:
      "Athlete merchandise partnerships are legitimate and growing in Nigerian football. 30% margin is fair for a manufacturing partner. Request the agent's NFF licence number and formal agreements with each player before production.",
  },
  {
    id: 2021,
    businesses: ["sportswear"],
    text: "ALERT: Your Instagram business account @naijasportswear has been reported for selling counterfeit goods. To prevent permanent removal, pay ₦25,000 'Meta Compliance Fee' to our verification team: 0813XXXXXXX via Opay.",
    label: "scam",
    difficulty: 3,
    category: "Payment Request",
    explanation:
      "Meta/Instagram has no local Nigerian compliance teams collecting fees via OPay. Instagram account issues are resolved exclusively through Facebook's official Help Center — never through payment to phone numbers.",
  },
  {
    id: 2022,
    businesses: ["sportswear"],
    text: "Good day! I manage procurement for a private secondary school group — 6 schools in Lagos. We need school sports uniforms for 1,800 students across all schools. Annual supply contract. We pay per delivery, per school.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Multi-school uniform contracts are substantial and legitimate. Per-delivery payment per school is a fair arrangement that manages cash flow on both sides. Request formal tender documents from the school group management.",
  },
  {
    id: 2023,
    businesses: ["sportswear"],
    text: "From: export@naijatextile-board.ng — The Nigerian Textile Export Board has approved your application for an export subsidy of ₦850,000. To receive, pay a ₦45,000 export documentation fee to our processing account: 4028XXXXXX.",
    label: "scam",
    difficulty: 4,
    category: "Grant",
    explanation:
      "There is no 'Nigerian Textile Export Board' with this mandate. Legitimate export subsidies are managed by the Nigerian Export Promotion Council (NEPC) at nepc.gov.ng — never through .ng commercial domains with documentation fees.",
  },
  {
    id: 2024,
    businesses: ["sportswear"],
    text: "Hi! I manage a boxing gym in Surulere with 60 registered boxers. I want to kit all my athletes in a consistent branded look — shorts, vests, robes. Can you produce custom boxing gear? I'll order quarterly.",
    label: "safe",
    difficulty: 3,
    category: "Customer Message",
    explanation:
      "Combat sports gym merchandise is a niche but legitimate market for sportswear producers with custom manufacturing capability. Quarterly orders provide stable revenue. Request a signed purchase order.",
  },
  {
    id: 2025,
    businesses: ["sportswear"],
    text: "Hello, I'm Chukwuemeka from a Lagos-based private equity fund. We invest in consumer brands. Your sportswear brand caught our attention. We'd like to discuss a ₦15M equity investment — 20% stake. Can we meet?",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    explanation:
      "Nigerian private equity firms do invest in consumer and fashion brands at this scale. An equity conversation is legitimate if followed by formal term sheets and legal due diligence. Never share financial statements before verifying the fund through their registered office.",
  },
  {
    id: 2026,
    businesses: ["sportswear"],
    text: "IMPORTANT NOTICE: The Standards Organisation of Nigeria (SON) has flagged your sportswear products for textile standard violations. Pay ₦65,000 regularisation fee to son-compliance.ng/pay to avoid product seizure.",
    label: "scam",
    difficulty: 4,
    category: "Bank",
    explanation:
      "SON conducts inspections through formal letters and physical visits — never via SMS payment links. Their official website is son.gov.ng, not 'son-compliance.ng'. Real violations result in written enforcement notices.",
  },
  {
    id: 2027,
    businesses: ["sportswear"],
    text: "Hi! I'm the brand manager for a new Nigerian energy drink launching in Q1. We want a co-branded limited edition sportswear line for our launch campaign — 500 units. We pay full production cost upfront. Interested?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Co-branded launch merchandise with full upfront payment is an excellent low-risk partnership. Verify the brand's company registration, review their marketing materials, and get the agreement in writing before starting production.",
  },
  {
    id: 2028,
    businesses: ["sportswear"],
    text: "From: supplier@aba-textiles-coop.com — Our Aba textile cooperative is offering an exclusive deal: 10,000 metres of premium sports fabric at ₦320/metre (market rate ₦580). Pay 70% upfront to lock in the price. Offer valid 24 hours.",
    label: "scam",
    difficulty: 4,
    category: "Supplier",
    explanation:
      "A 45% discount on fabric with 70% upfront payment and a 24-hour deadline is a high-pressure scam. Legitimate supplier discounts are offered with payment terms, physical inspection, and sample verification — not time-pressured bulk prepayments.",
  },
  {
    id: 2029,
    businesses: ["sportswear"],
    text: "Good afternoon! I'm a buyer for Edgars South Africa. We're expanding into Nigeria and want to source from local sportswear manufacturers for our Lagos stores. Looking for 500–1,000 units per style. Factory visit required. Interested?",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    verifiedMerchant: true,
    explanation:
      "Edgars South Africa is a real retail chain with expansion plans in West Africa. Factory visits are standard in retail manufacturing relationships. Verify through Edgars' official South African or Nigerian contact before allowing a visit.",
  },
  {
    id: 2030,
    businesses: ["sportswear"],
    text: "Hi! I manage youth sports programmes for a Lagos-based NGO funded by the Ford Foundation. We're equipping 300 underprivileged youth with sports kits. We have donor funds ready. Can you quote for 300 complete kits at a social enterprise price?",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "NGO sports kit procurement with donor funding is a legitimate social enterprise opportunity. Request the NGO's CAC registration, their Ford Foundation grant letter, and a formal purchase order before producing.",
  },
  {
    id: 2031,
    businesses: ["sportswear"],
    text: "VERIFIED ✔ Your Paystack account has earned ₦780,000 in store sales this month. Due to a system upgrade, payouts are delayed by 72 hours. To expedite, pay a ₦15,000 priority processing fee to our support team via OPay.",
    label: "scam",
    difficulty: 3,
    category: "Payment Request",
    misleadingBadge: true,
    explanation:
      "Paystack never charges fees to expedite payouts. All settlement delays are communicated through your official Paystack dashboard — not SMS messages requesting OPay transfers.",
  },
  {
    id: 2032,
    businesses: ["sportswear"],
    text: "Hello! I represent the Lagos State chapter of a professional athletics association. We're hosting our annual National Athletics Championships. We need official branded apparel for 200 athletes and officials. Government-funded event, purchase order provided.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Athletics association championships are real and funded through sports budgets. A purchase order from a government-affiliated organisation is the correct procurement method. Verify the association's registration before producing.",
  },
  {
    id: 2033,
    businesses: ["sportswear"],
    text: "Good morning! I'm the operations manager at a luxury gym chain — 4 locations in Ikoyi and Victoria Island. We want to exclusively brand our gym floor, reception and outdoor fitness area with one sportswear partner. Annual contract worth ₦3M. Interested?",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    explanation:
      "Luxury gym branding partnerships are high-value contracts for sportswear brands. An annual contract is excellent for revenue stability. Visit all 4 gym locations, verify their company registration, and engage a lawyer for the contract.",
  },
  {
    id: 2034,
    businesses: ["sportswear"],
    text: "From: nigeriancottonboard@grants.ng — The Nigerian Cotton Board is awarding ₦400,000 grants to local textile manufacturers. To apply, submit your CAC cert and pay a ₦18,000 processing levy to Board Account: 3028XXXXXX GTB.",
    label: "scam",
    difficulty: 4,
    category: "Grant",
    explanation:
      "Grants never require application processing fees paid to bank accounts. The Nigerian Cotton Development Authority uses official government channels — not .ng commercial domains. Verify through the Federal Ministry of Agriculture.",
  },
  {
    id: 2035,
    businesses: ["sportswear"],
    text: "Hi! I'm a costume designer for a Nollywood production company. We're shooting a sports drama series — 10 episodes. We need 50 custom sportswear sets across 4 lead character costumes. Full payment before start of production.",
    label: "safe",
    difficulty: 4,
    category: "Customer Message",
    explanation:
      "Nollywood production costume procurement is a real market. Full prepayment before production is ideal for the manufacturer. Request the production company's CAC number and verify their portfolio before creating custom designs.",
  },
  {
    id: 2036,
    businesses: ["sportswear"],
    text: "ALERT: Your trademark application for 'NAIJA SPORTSWEAR' filed at the Commercial Law Department has been contested. Pay ₦120,000 opposition defence fee to Attorney Femi Adegoke, Account: 0987XXXXXX First Bank, within 5 days.",
    label: "scam",
    difficulty: 5,
    category: "Payment Request",
    explanation:
      "Trademark opposition proceedings are handled through official written correspondence from the Trademarks Registry — never via SMS. Real IP attorneys are engaged through formal retainer agreements, not payment to personal bank accounts.",
  },
  {
    id: 2037,
    businesses: ["sportswear"],
    text: "Hello! I coordinate NYSC sportswear procurement for the Lagos State Orientation Camp. We need 3,000 NYSC-branded sports kits for next batch. This is a government contract — payment from NYSC Abuja treasury within 90 days of delivery. Interested?",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    explanation:
      "NYSC does procure sportswear for orientation camps. 90-day government payment cycles are standard for federal contracts. Verify through NYSC Lagos State Coordinator's official contact and get a formal LPO (Local Purchase Order) before producing.",
  },
  {
    id: 2038,
    businesses: ["sportswear"],
    text: "Good day. I'm a buyer from a major Chinese sports brand doing market research in Nigeria. We want to license your brand name for our West Africa expansion. We pay ₦5M for a 3-year brand licence. Send your account details to process the advance.",
    label: "scam",
    difficulty: 5,
    category: "Payment Request",
    explanation:
      "Brand licensing advances of ₦5M do not arrive via WhatsApp. Legitimate international licensing deals involve lawyers, formal licence agreements, and due diligence — never spontaneous payment requests to your account details.",
  },
  {
    id: 2039,
    businesses: ["sportswear"],
    text: "Hi! I manage a CrossFit affiliate gym in Port Harcourt. We're launching a gym merchandise line — branded hoodies, leggings and tanks. I want a local manufacturer to produce 200 units of each. I visit Lagos monthly. Can we meet?",
    label: "safe",
    difficulty: 3,
    category: "Customer Message",
    explanation:
      "Gym merchandise lines are a real revenue stream for sportswear manufacturers. Monthly Lagos visits show genuine business intent. Offering to meet in person before committing is a sign of a legitimate buyer.",
  },
  {
    id: 2040,
    businesses: ["sportswear"],
    text: "From: hello@getfitnaija.com — GetFit Naija has 85,000 active users on our fitness app. We want to launch a co-branded sportswear collection sold through our app. Revenue share: 60% to you on each sale. No upfront investment from you.",
    label: "safe",
    difficulty: 5,
    category: "Customer Message",
    explanation:
      "App-based sportswear partnerships are a growing model. 60% revenue share with no upfront cost is favourable. Verify the app's real user numbers, their company registration, and get a formal revenue share agreement before producing stock.",
  },
];
