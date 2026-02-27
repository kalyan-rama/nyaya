// src/data/legalData.js

export const OFFICES = {
  labour:[
    {icon:'👷',name:'Labour Commissioner',addr:'Tank Bund Road, Hyderabad 500001',phone:'040-23214567',hours:'Mon–Sat 10AM–5PM',dist:'2.1 km',desc:'Salary disputes, PF, working hours',lat:17.4126,lng:78.4670},
    {icon:'⚖️',name:'Labour Court',addr:'Saifabad, Hyderabad 500004',phone:'040-23230081',hours:'Mon–Fri 10AM–5PM',dist:'3.4 km',desc:'Formal labour dispute proceedings',lat:17.4102,lng:78.4714}
  ],
  consumer:[
    {icon:'🛒',name:'District Consumer Forum',addr:'Himayatnagar, Hyderabad 500029',phone:'040-27661234',hours:'Mon–Fri 10AM–5PM',dist:'1.8 km',desc:'Defective products, service complaints',lat:17.4062,lng:78.4691},
    {icon:'📱',name:'Consumer Helpline',addr:'consumerhelpline.gov.in',phone:'1800-11-4000',hours:'24/7',dist:'Online',desc:'FREE — fastest resolution',lat:null,lng:null}
  ],
  women:[
    {icon:'👩',name:"Women's Police Station",addr:'Begumpet, Hyderabad 500016',phone:'040-27901234',hours:'24/7',dist:'1.5 km',desc:'Domestic violence, harassment',lat:17.4449,lng:78.4643},
    {icon:'💚',name:'Sakhi One Stop Centre',addr:'KPHB Colony, Hyderabad',phone:'181',hours:'24/7',dist:'2.8 km',desc:'Medical, legal & counselling support',lat:17.4916,lng:78.3930}
  ],
  cyber:[
    {icon:'💻',name:'Cyber Crime Cell',addr:'Banjara Hills, Hyderabad 500034',phone:'040-27852020',hours:'Mon–Sat 9AM–6PM',dist:'3.2 km',desc:'Online fraud, identity theft',lat:17.4125,lng:78.4480},
    {icon:'🌐',name:'Cyber Crime Portal',addr:'cybercrime.gov.in',phone:'1930',hours:'24/7',dist:'Online',desc:'Report online — immediate action',lat:null,lng:null}
  ],
  tenant:[
    {icon:'🏠',name:'Rent Control Court',addr:'City Civil Court, Hyderabad',phone:'040-27560123',hours:'Mon–Fri 10AM–5PM',dist:'2.6 km',desc:'Eviction, deposit, rent disputes',lat:17.3850,lng:78.4867},
    {icon:'⚖️',name:'Legal Services Authority',addr:'District Court, Nampally',phone:'040-23567890',hours:'Mon–Sat 10AM–5PM',dist:'1.9 km',desc:'FREE legal aid for tenants',lat:17.3810,lng:78.4740}
  ],
  legal:[
    {icon:'⚖️',name:'District Legal Services Authority',addr:'District Court Complex, Nampally',phone:'040-23214233',hours:'Mon–Sat 10AM–5PM',dist:'1.9 km',desc:'FREE lawyer — Article 39A (income < ₹3L)',lat:17.3810,lng:78.4740},
    {icon:'📞',name:'National Legal Aid Helpline',addr:'Available all states',phone:'15100',hours:'24/7, All languages',dist:'Nationwide',desc:'FREE legal consultation — call now',lat:null,lng:null}
  ]
};

export const LETTERS = {
  fir:{
    title:'FIR Complaint Letter',
    titleKey:'firTitle',
    body:`To,
The Superintendent of Police,
[Your District], [Your State]

Subject: Complaint for Refusal to Register FIR

Respected Sir/Madam,

I, [Your Full Name], [Your Address], on [Date] visited [Police Station Name] to register an FIR regarding [Brief Description].

Despite my requests, the police refused to register the FIR. This violates Section 154 CrPC — police are LEGALLY BOUND to register FIR for cognizable offences.

I request you to:
1. Direct the police station to register my FIR
2. Take action against responsible officers
3. Provide me a copy of the registered FIR

If no action within 48 hours, I will approach the Magistrate under Section 156(3) CrPC.

[Your Name] | [Date] | [Contact]`
  },
  salary:{
    title:'Salary Non-Payment Complaint',
    body:`To,
The Labour Commissioner,
[District / State]

Subject: Non-Payment of Wages — Payment of Wages Act 1936

Respected Sir/Madam,

I, [Your Name], worked as [Designation] at [Company Name, Address] from [Joining Date].

My monthly salary of Rs. [Amount] has NOT been paid for [Number] months ([Period]). Total dues: Rs. [Amount].

Despite repeated requests, the employer refuses to pay. This violates the Payment of Wages Act 1936.

I request:
1. Issue notice to employer immediately
2. Direct full payment with compensation
3. Take penal action

Enclosures: Appointment letter / Salary slips / WhatsApp proof / ID proof

[Your Name] | [Date] | [Contact]`
  },
  consumer:{
    title:'Consumer Forum Complaint',
    body:`To,
The President,
District Consumer Forum, [District], [State]

Subject: Consumer Complaint Under Consumer Protection Act 2019

Complainant: [Name, Address, Contact, Email]
Opposite Party: [Company Name, Address]

Facts:
1. On [Date], I purchased [Product/Service] for Rs. [Amount]
2. The product was defective: [Describe problem]
3. I requested refund/replacement on [Date]
4. Company refused without valid reason

Relief Claimed:
1. Full refund of Rs. [Amount]
2. Compensation of Rs. [Amount] for harassment
3. Cost of litigation

Documents: Invoice / Product photos / Email communication

[Your Name] | [Date]`
  },
  eviction:{
    title:'Illegal Eviction Complaint',
    body:`To,
The Rent Controller,
[District Court], [City]

Subject: Complaint Against Illegal Eviction

Complainant: [Name, Address, Contact]
Respondent: [Landlord Name, Address]

I am tenant at [Address] since [Date] paying Rs. [Rent]/month.

My landlord is attempting illegal eviction by:
[Describe specific act — no notice / cutting electricity / threats]

Under the Rent Control Act, eviction requires:
- 30+ days written notice
- Court order
- Valid legal ground

Relief Sought:
1. Stay on eviction
2. Restore utilities if cut
3. Damages and compensation

[Your Name] | [Date]`
  },
  rti:{
    title:'RTI Application',
    body:`To,
The Public Information Officer,
[Government Department],
[Address]

Subject: Application Under RTI Act 2005, Section 6(1)

I, [Name, Address, Contact, Email] request:

1. [Specific Question — be clear and exact]
2. [Second question if needed]

I enclose Rs. 10/- (court fee stamp / IPO) as prescribed fee.

Please provide information within 30 days.
If unsatisfied, I will file First Appeal under Section 19(1).

[Your Name] | [Date]`
  },
  harass:{
    title:'Workplace Harassment (POSH)',
    body:`To,
The Chairperson, Internal Complaints Committee,
[Company Name, Address]

Subject: Formal Complaint Under POSH Act 2013

I, [Name, Designation, Employee ID], file formal complaint against [Respondent Name, Designation].

Date of Incident: [Date]
Location: [Place]
Description: [Describe exactly what happened]
Witnesses: [Names if any]
Evidence: [Screenshots / Emails / Other]

Impact: [How it affected your work/wellbeing]

I request the ICC to:
1. Conduct prompt and fair inquiry
2. Take appropriate action
3. Maintain my confidentiality
4. Protect me from retaliation

[POSH Act requires ICC to complete inquiry in 60 days]

[Your Name] | [Date]`
  }
};

export const RIGHTS_DATA = {
  police:{title:'Police Rights ⚖️',items:[
    {h:'Know Reason for Arrest',p:'Police MUST tell you WHY you are being arrested. Arrest without stating reason is unconstitutional.',lr:'Article 22, Constitution'},
    {h:'Right to a Lawyer Immediately',p:'You can demand to meet a lawyer BEFORE answering any questions. Police cannot deny this right.',lr:'Article 22(1); Legal Services Authorities Act 1987'},
    {h:'Magistrate Within 24 Hours',p:'After arrest, you MUST be produced before a Magistrate within 24 hours.',lr:'Article 22(2); CrPC Section 57'},
    {h:'Cannot Be Forced to Confess',p:'You have the right against self-incrimination. No confession under force is valid.',lr:'Article 20(3), Constitution'},
    {h:'Police MUST Register FIR',p:'For serious offences, police MUST file your FIR. Refusal is punishable.',lr:'CrPC Section 154, 156(3)'},
    {h:'Right to Bail for Minor Offences',p:'For bailable offences, police MUST grant bail when you request it.',lr:'CrPC Section 436'}
  ]},
  labour:{title:'Labour Rights 💼',items:[
    {h:'Salary Must Be Paid on Time',p:'Salary must be paid within 7 days after the wage period ends.',lr:'Payment of Wages Act 1936'},
    {h:'Minimum Wage Is Your Right',p:'Paying below the state minimum wage is a criminal offence.',lr:'Minimum Wages Act 1948'},
    {h:'Maximum 9 Hours/Day, 48 Hours/Week',p:'You cannot be made to work more than 9 hours a day. Overtime MUST be paid at double rate.',lr:'Factories Act 1948, Section 51'},
    {h:'Maternity Leave — 26 Weeks Paid',p:'Women employees are entitled to 26 weeks of fully paid maternity leave.',lr:'Maternity Benefit Act 1961'},
    {h:'Provident Fund is Mandatory',p:'For firms with 20+ employees, employer must contribute 12% of basic salary to PF.',lr:'EPF Act 1952'},
    {h:'ESI — Free Medical Treatment',p:'Workers earning below ₹21,000/month get free medical treatment under ESIC.',lr:'ESI Act 1948'}
  ]},
  tenant:{title:'Tenant Rights 🏠',items:[
    {h:'Cannot Be Evicted Without Notice',p:'Landlord must give minimum 15–30 days written advance notice.',lr:'Rent Control Acts (State-specific)'},
    {h:'Only Court Can Order Eviction',p:'Landlord CANNOT forcibly remove you, cut electricity/water, or change locks.',lr:'IPC Section 441'},
    {h:'Security Deposit Must Be Returned',p:'Your deposit must be returned within 30 days after you vacate.',lr:'Model Tenancy Act 2021'},
    {h:'Rent Cannot Be Raised Without Notice',p:'Rent increase requires advance notice per state rules.',lr:'State Rent Control Acts'},
    {h:'Landlord Must Do Major Repairs',p:"Structural repairs, roof leaks, major plumbing issues are the landlord's responsibility.",lr:'Transfer of Property Act 1882'}
  ]},
  women:{title:"Women's Rights 👩",items:[
    {h:'Domestic Violence Protection',p:'Physical, emotional, sexual and economic abuse at home is a crime. Protection Order in 24 hours.',lr:'DV Act 2005'},
    {h:'Workplace Harassment — POSH Act',p:'Every company with 10+ employees MUST have an ICC. File complaint within 3 months.',lr:'POSH Act 2013'},
    {h:'Equal Pay for Equal Work',p:'You must receive the same salary as a male colleague doing the same work.',lr:'Equal Remuneration Act 1976'},
    {h:'Equal Property Inheritance',p:'Daughters have the same right as sons to inherit ancestral property.',lr:'Hindu Succession (Amendment) Act 2005'},
    {h:'Complain at Any Police Station',p:'A woman can file a complaint at ANY police station, regardless of where incident happened.',lr:'BNSS Section 173A'}
  ]},
  farmer:{title:'Farmer Rights 🌾',items:[
    {h:'Fair Compensation for Land Taken',p:'If government acquires your land, you must receive 2x the market value for rural land.',lr:'LARR Act 2013'},
    {h:'Crop Insurance Protection',p:'If you have a crop loan, bank must enroll you in PM Fasal Bima Yojana.',lr:'PM Fasal Bima Yojana'},
    {h:'No Bonded Labour',p:'Any forced work or debt bondage in agriculture is a serious criminal offence.',lr:'Bonded Labour (Abolition) Act 1976'},
    {h:'Kisan Credit Card — Cannot Be Refused',p:'Eligible farmers have the right to apply for KCC. Banks cannot arbitrarily deny.',lr:'RBI KCC Guidelines'},
    {h:'MSP Protection',p:'Government announces minimum support prices for 23 crops. Middlemen forcing you to sell below MSP can be reported.',lr:'CACP Guidelines'}
  ]},
  student:{title:'Student Rights 🎓',items:[
    {h:'No Donation/Capitation Fee Allowed',p:'No college or school can ask for donation or capitation fee for admission.',lr:'Supreme Court — PA Inamdar 2005'},
    {h:'Anti-Ragging — Zero Tolerance',p:'Ragging is a criminal offence. Helpline: 1800-180-5522.',lr:'UGC Anti-Ragging Regulations 2009'},
    {h:'Right to Appeal Exam Results',p:'You can apply for re-evaluation of answer sheets.',lr:'UGC Regulations; RTI Act 2005'},
    {h:'Government Scholarship is Your Right',p:'Eligible SC/ST/OBC/minority students must receive government scholarships.',lr:'National Scholarship Portal Guidelines'},
    {h:'Fee Refund on Cancellation',p:'If you cancel admission before the course starts, most of your fees must be refunded.',lr:'UGC Fee Refund Regulations 2018'}
  ]},
  consumer:{title:'Consumer Rights 🛒',items:[
    {h:'Defective Product = Full Refund',p:'For a defective product under warranty, you are entitled to full refund OR replacement.',lr:'Consumer Protection Act 2019, Section 34'},
    {h:'File FREE Online Complaint',p:'Go to consumerhelpline.gov.in or e-DAAKHIL portal. No lawyer needed.',lr:'Consumer Protection Act 2019'},
    {h:'Compensation for Harassment',p:'You can claim compensation for mental agony, time wasted, and financial loss.',lr:'Consumer Protection Act 2019, Section 35'},
    {h:'Bank/Insurance/Hospital Deficiency',p:'Service deficiency by banks, insurance companies, and hospitals is also covered.',lr:'Consumer Protection Act 2019'},
    {h:'E-Commerce Accountability',p:'Online platforms are responsible for fake or defective products.',lr:'Consumer Protection (E-Commerce) Rules 2020'}
  ]},
  cyber:{title:'Cyber Rights 💻',items:[
    {h:'Report Fraud Immediately',p:'Report cyber fraud at cybercrime.gov.in or call 1930 immediately.',lr:'IT Act 2000; Cybercrime Portal'},
    {h:'Online Harassment Is a Crime',p:'Threats, fake profiles, morphed images, online defamation — all are criminal offences.',lr:'IT Act Section 66A; IPC 354D'},
    {h:'Right to Data Privacy',p:'No one can collect or share your personal data without your consent.',lr:'Digital Personal Data Protection Act 2023'},
    {h:'SIM Swap Fraud Compensation',p:'If you lost money due to SIM swap and reported quickly, your bank must compensate you.',lr:'RBI Cybersecurity Framework'},
    {h:'Identity Theft Is Criminal',p:'Creating fake accounts using your name/photos is punishable with up to 3 years imprisonment.',lr:'IT Act 2000, Section 66C'}
  ]}
};
