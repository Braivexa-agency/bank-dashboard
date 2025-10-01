import { Store } from '@tanstack/store'

export interface InformationSheet {
  id: number
  matricule: string
  nom: string
  prenom: string
  nationalId: string
  fatherName: string
  motherName: string
  spouseName: string
  dateOfBirth: string
  address: string
  gender: string
  maritalStatus: string
  numberOfChildren: number
  hireDate: string
  bankingExperience: string
  contractType: string
  socialSecurityNumber: string
  educationLevel: string
  diplomaType: string
  academicDiploma: string
  otherDiplomas: string
  currentPosition: string
  positionCode: string
  group: string
  activity: string
  classe: string
  echelon: string
  indice: string
  pbi: number
  structure: string
  reporting: string
  code: string
  structureType: string
  decisionType: string
  decisionNumber: string
  decisionDate: string
  effectiveDate: string
  positioning: string
  suspensionFrom: string
  suspensionTo: string
  lastDecision: string
  // Banking Experience specific fields
  affectation: string
  poste: string
  activite: string
  natureDecision: string
  refDecision: string
  dateDecision: string
  dateEffet: string
  chargeInterim: string
  // Non-Banking Experience specific fields
  entreprise: string
  lieuTravail: string
  posteOccupe: string
  du: string
  au: string
  duree: string
}

export interface BankExperience {
  id: number
  affectation: string
  poste: string
  activite: string
  classe: string
  echelon: string
  pbi: number
  natureDecision: string
  refDecision: string
  dateDecision: string
  dateEffet: string
  chargeInterim: string
}

export interface NonBankExperience {
  id: number
  entreprise: string
  lieuTravail: string
  posteOccupe: string
  du: string
  au: string
  duree: string
}

export interface DataState {
  informationSheets: InformationSheet[]
  bankExperiences: BankExperience[]
  nonBankExperiences: NonBankExperience[]
}

const initialDataState: DataState = {
  informationSheets: [
    {
      id: 1,
      matricule: "EMP001",
      nom: "Benali",
      prenom: "Ahmed",
      nationalId: "1234567890123",
      fatherName: "Mohamed Benali",
      motherName: "Aicha Benali",
      spouseName: "Fatima Benali",
      dateOfBirth: "1985-03-15",
      address: "123 Rue de la République, Algiers",
      gender: "M",
      maritalStatus: "Married",
      numberOfChildren: 2,
      hireDate: "2010-06-01",
      bankingExperience: "14 years",
      contractType: "Permanent",
      socialSecurityNumber: "SS123456789",
      educationLevel: "University",
      diplomaType: "Bachelor",
      academicDiploma: "Computer Science",
      otherDiplomas: "Project Management",
      currentPosition: "Senior Manager",
      positionCode: "SM001",
      group: "cadre",
      activity: "Operations",
      classe: "Executive",
      echelon: "12",
      indice: "850",
      pbi: 1,
      structure: "Head Office",
      reporting: "CEO",
      code: "HO001",
      structureType: "Administrative",
      decisionType: "Promotion",
      decisionNumber: "DEC-2023-001",
      decisionDate: "2023-01-15",
      effectiveDate: "2023-02-01",
      positioning: "Strategic",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Promotion to Senior Manager",
      // Banking Experience specific fields - HAS banking experience
      affectation: "Regional Directorate Algiers",
      poste: "Customer Advisor",
      activite: "Customer portfolio management",
      natureDecision: "Appointment",
      refDecision: "DR-2023-001",
      dateDecision: "2023-01-15",
      dateEffet: "2023-02-01",
      chargeInterim: "No",
      // Non-Banking Experience specific fields - HAS non-banking experience
      entreprise: "Tech Solutions Inc.",
      lieuTravail: "Algiers, Algeria",
      posteOccupe: "Software Developer",
      du: "2008-06-01",
      au: "2010-05-31",
      duree: "2 years",
    },
    {
      id: 2,
      matricule: "EMP002",
      nom: "Kaci",
      prenom: "Fatima",
      nationalId: "9876543210987",
      fatherName: "Ali Kaci",
      motherName: "Khadija Kaci",
      spouseName: "",
      dateOfBirth: "1990-07-22",
      address: "456 Avenue des Martyrs, Oran",
      gender: "F",
      maritalStatus: "Single",
      numberOfChildren: 0,
      hireDate: "2015-09-01",
      bankingExperience: "8 years",
      contractType: "Permanent",
      socialSecurityNumber: "SS987654321",
      educationLevel: "University",
      diplomaType: "Master",
      academicDiploma: "Business Administration",
      otherDiplomas: "Banking Operations",
      currentPosition: "Credit Analyst",
      positionCode: "CA002",
      group: "maitrise",
      activity: "Risk Assessment",
      classe: "Executive",
      echelon: "10",
      indice: "750",
      pbi: 1,
      structure: "Credit Department",
      reporting: "Credit Manager",
      code: "CD001",
      structureType: "Operational",
      decisionType: "Recruitment",
      decisionNumber: "DEC-2015-045",
      decisionDate: "2015-08-15",
      effectiveDate: "2015-09-01",
      positioning: "Analytical",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Hired as Credit Analyst",
      // Banking Experience specific fields - HAS banking experience
      affectation: "Credit Department",
      poste: "Credit Analyst",
      activite: "Credit analysis and risk assessment",
      natureDecision: "Recruitment",
      refDecision: "DR-2015-045",
      dateDecision: "2015-08-15",
      dateEffet: "2015-09-01",
      chargeInterim: "No",
      // Non-Banking Experience specific fields - HAS non-banking experience
      entreprise: "Digital Marketing Agency",
      lieuTravail: "Oran, Algeria",
      posteOccupe: "Marketing Specialist",
      du: "2013-06-01",
      au: "2015-08-31",
      duree: "2 years 3 months",
    },
    {
      id: 3,
      matricule: "EMP003",
      nom: "Ouali",
      prenom: "Karim",
      nationalId: "5555555555555",
      fatherName: "Hassan Ouali",
      motherName: "Nadia Ouali",
      spouseName: "",
      dateOfBirth: "1995-12-10",
      address: "789 Rue de la Paix, Constantine",
      gender: "M",
      maritalStatus: "Single",
      numberOfChildren: 0,
      hireDate: "2020-01-15",
      bankingExperience: "4 years",
      contractType: "Permanent",
      socialSecurityNumber: "SS555555555",
      educationLevel: "University",
      diplomaType: "Bachelor",
      academicDiploma: "Finance",
      otherDiplomas: "",
      currentPosition: "Junior Analyst",
      positionCode: "JA003",
      group: "execution",
      activity: "Data Analysis",
      classe: "Execution",
      echelon: "6",
      indice: "600",
      pbi: 0,
      structure: "Analysis Department",
      reporting: "Analysis Manager",
      code: "AD001",
      structureType: "Operational",
      decisionType: "Recruitment",
      decisionNumber: "DEC-2020-020",
      decisionDate: "2020-01-01",
      effectiveDate: "2020-01-15",
      positioning: "Technical",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Hired as Junior Analyst",
      // Banking Experience specific fields - HAS banking experience
      affectation: "Analysis Department",
      poste: "Junior Analyst",
      activite: "Data analysis and reporting",
      natureDecision: "Recruitment",
      refDecision: "DR-2020-020",
      dateDecision: "2020-01-01",
      dateEffet: "2020-01-15",
      chargeInterim: "No",
      // Non-Banking Experience specific fields - HAS non-banking experience
      entreprise: "Startup Tech",
      lieuTravail: "Constantine, Algeria",
      posteOccupe: "Junior Developer",
      du: "2018-06-01",
      au: "2019-12-31",
      duree: "1 year 6 months",
    },
    {
      id: 4,
      matricule: "EMP004",
      nom: "Boumediene",
      prenom: "Sara",
      nationalId: "1111111111111",
      fatherName: "Omar Boumediene",
      motherName: "Leila Boumediene",
      spouseName: "",
      dateOfBirth: "1992-05-18",
      address: "321 Boulevard Zirout Youcef, Algiers",
      gender: "F",
      maritalStatus: "Single",
      numberOfChildren: 0,
      hireDate: "2018-03-01",
      bankingExperience: "6 years",
      contractType: "Permanent",
      socialSecurityNumber: "SS111111111",
      educationLevel: "University",
      diplomaType: "Master",
      academicDiploma: "Economics",
      otherDiplomas: "Financial Analysis",
      currentPosition: "Risk Manager",
      positionCode: "RM004",
      group: "cadre",
      activity: "Risk Assessment",
      classe: "Executive",
      echelon: "11",
      indice: "800",
      pbi: 1,
      structure: "Risk Department",
      reporting: "Risk Director",
      code: "RD001",
      structureType: "Operational",
      decisionType: "Promotion",
      decisionNumber: "DEC-2023-015",
      decisionDate: "2023-03-01",
      effectiveDate: "2023-04-01",
      positioning: "Strategic",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Promotion to Risk Manager",
      // Banking Experience specific fields - HAS banking experience
      affectation: "Risk Management Division",
      poste: "Risk Manager",
      activite: "Credit risk assessment",
      natureDecision: "Promotion",
      refDecision: "DR-2023-015",
      dateDecision: "2023-03-01",
      dateEffet: "2023-04-01",
      chargeInterim: "No",
      // Non-Banking Experience specific fields - HAS non-banking experience
      entreprise: "Financial Consulting",
      lieuTravail: "Algiers, Algeria",
      posteOccupe: "Risk Analyst",
      du: "2015-03-01",
      au: "2018-02-28",
      duree: "2 years 11 months",
    },
    {
      id: 5,
      matricule: "EMP005",
      nom: "Taleb",
      prenom: "Yasmine",
      nationalId: "2222222222222",
      fatherName: "Mohamed Taleb",
      motherName: "Aicha Taleb",
      spouseName: "Karim Taleb",
      dateOfBirth: "1988-09-12",
      address: "654 Rue Didouche Mourad, Algiers",
      gender: "F",
      maritalStatus: "Married",
      numberOfChildren: 1,
      hireDate: "2012-04-01",
      bankingExperience: "12 years",
      contractType: "Permanent",
      socialSecurityNumber: "SS222222222",
      educationLevel: "University",
      diplomaType: "Master",
      academicDiploma: "Finance",
      otherDiplomas: "Risk Management",
      currentPosition: "Branch Manager",
      positionCode: "BM005",
      group: "cadre",
      activity: "Operations",
      classe: "Executive",
      echelon: "13",
      indice: "900",
      pbi: 1,
      structure: "Downtown Branch",
      reporting: "Regional Director",
      code: "DB001",
      structureType: "Operational",
      decisionType: "Promotion",
      decisionNumber: "DEC-2022-008",
      decisionDate: "2022-03-01",
      effectiveDate: "2022-04-01",
      positioning: "Strategic",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Promotion to Branch Manager",
      // Banking Experience specific fields - HAS banking experience
      affectation: "Downtown Branch",
      poste: "Branch Manager",
      activite: "Branch operations management",
      natureDecision: "Promotion",
      refDecision: "DR-2022-008",
      dateDecision: "2022-03-01",
      dateEffet: "2022-04-01",
      chargeInterim: "No",
      // Non-Banking Experience specific fields - HAS non-banking experience
      entreprise: "Real Estate Agency",
      lieuTravail: "Algiers, Algeria",
      posteOccupe: "Property Manager",
      du: "2010-01-01",
      au: "2012-03-31",
      duree: "2 years 3 months",
    },
    {
      id: 6,
      matricule: "EMP006",
      nom: "Mansouri",
      prenom: "Omar",
      nationalId: "3333333333333",
      fatherName: "Ali Mansouri",
      motherName: "Fatima Mansouri",
      spouseName: "",
      dateOfBirth: "1993-11-25",
      address: "987 Avenue Ben Boulaid, Constantine",
      gender: "M",
      maritalStatus: "Single",
      numberOfChildren: 0,
      hireDate: "2019-07-01",
      bankingExperience: "5 years",
      contractType: "Permanent",
      socialSecurityNumber: "SS333333333",
      educationLevel: "University",
      diplomaType: "Bachelor",
      academicDiploma: "Computer Science",
      otherDiplomas: "",
      currentPosition: "IT Specialist",
      positionCode: "IT006",
      group: "execution",
      activity: "System Administration",
      classe: "Execution",
      echelon: "7",
      indice: "650",
      pbi: 0,
      structure: "IT Department",
      reporting: "IT Manager",
      code: "IT001",
      structureType: "Support",
      decisionType: "Recruitment",
      decisionNumber: "DEC-2019-025",
      decisionDate: "2019-06-15",
      effectiveDate: "2019-07-01",
      positioning: "Technical",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Hired as IT Specialist",
      // Banking Experience specific fields - HAS banking experience
      affectation: "IT Department",
      poste: "IT Specialist",
      activite: "System administration and support",
      natureDecision: "Recruitment",
      refDecision: "DR-2019-025",
      dateDecision: "2019-06-15",
      dateEffet: "2019-07-01",
      chargeInterim: "No",
      // Non-Banking Experience specific fields - HAS non-banking experience
      entreprise: "Tech Startup",
      lieuTravail: "Constantine, Algeria",
      posteOccupe: "Software Engineer",
      du: "2017-01-01",
      au: "2019-06-30",
      duree: "2 years 6 months",
    },
    {
      id: 7,
      matricule: "EMP007",
      nom: "Cherif",
      prenom: "Nour",
      nationalId: "4444444444444",
      fatherName: "Ahmed Cherif",
      motherName: "Leila Cherif",
      spouseName: "",
      dateOfBirth: "1991-03-08",
      address: "321 Rue de la Liberté, Oran",
      gender: "F",
      maritalStatus: "Single",
      numberOfChildren: 0,
      hireDate: "2016-09-15",
      bankingExperience: "8 years",
      contractType: "Permanent",
      socialSecurityNumber: "SS444444444",
      educationLevel: "University",
      diplomaType: "Master",
      academicDiploma: "Economics",
      otherDiplomas: "Financial Analysis",
      currentPosition: "Financial Analyst",
      positionCode: "FA007",
      group: "maitrise",
      activity: "Financial Analysis",
      classe: "Executive",
      echelon: "9",
      indice: "700",
      pbi: 1,
      structure: "Finance Department",
      reporting: "Finance Manager",
      code: "FD001",
      structureType: "Operational",
      decisionType: "Recruitment",
      decisionNumber: "DEC-2016-030",
      decisionDate: "2016-08-15",
      effectiveDate: "2016-09-15",
      positioning: "Analytical",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Hired as Financial Analyst",
      // Banking Experience specific fields - HAS banking experience
      affectation: "Finance Department",
      poste: "Financial Analyst",
      activite: "Financial analysis and reporting",
      natureDecision: "Recruitment",
      refDecision: "DR-2016-030",
      dateDecision: "2016-08-15",
      dateEffet: "2016-09-15",
      chargeInterim: "No",
      // Non-Banking Experience specific fields - HAS non-banking experience
      entreprise: "Investment Firm",
      lieuTravail: "Oran, Algeria",
      posteOccupe: "Junior Analyst",
      du: "2014-09-01",
      au: "2016-08-31",
      duree: "2 years",
    },
    {
      id: 8,
      matricule: "EMP008",
      nom: "Boudjema",
      prenom: "Samir",
      nationalId: "5555555555555",
      fatherName: "Hassan Boudjema",
      motherName: "Khadija Boudjema",
      spouseName: "Aicha Boudjema",
      dateOfBirth: "1987-12-03",
      address: "147 Boulevard Mohamed V, Algiers",
      gender: "M",
      maritalStatus: "Married",
      numberOfChildren: 3,
      hireDate: "2011-02-01",
      bankingExperience: "13 years",
      contractType: "Permanent",
      socialSecurityNumber: "SS555555555",
      educationLevel: "University",
      diplomaType: "Bachelor",
      academicDiploma: "Business Administration",
      otherDiplomas: "Project Management",
      currentPosition: "Operations Manager",
      positionCode: "OM008",
      group: "maitrise",
      activity: "Operations Management",
      classe: "Executive",
      echelon: "11",
      indice: "780",
      pbi: 1,
      structure: "Operations Department",
      reporting: "Operations Director",
      code: "OD001",
      structureType: "Operational",
      decisionType: "Promotion",
      decisionNumber: "DEC-2021-012",
      decisionDate: "2021-05-01",
      effectiveDate: "2021-06-01",
      positioning: "Strategic",
      suspensionFrom: "",
      suspensionTo: "",
      lastDecision: "Promotion to Operations Manager",
      // Banking Experience specific fields - HAS banking experience
      affectation: "Operations Department",
      poste: "Operations Manager",
      activite: "Operations management and coordination",
      natureDecision: "Promotion",
      refDecision: "DR-2021-012",
      dateDecision: "2021-05-01",
      dateEffet: "2021-06-01",
      chargeInterim: "No",
      // Non-Banking Experience specific fields - HAS non-banking experience
      entreprise: "Construction Company",
      lieuTravail: "Algiers, Algeria",
      posteOccupe: "Project Coordinator",
      du: "2009-06-01",
      au: "2011-01-31",
      duree: "1 year 8 months",
    },
  ],
  bankExperiences: [
    {
      id: 1,
      affectation: "Regional Directorate Algiers",
      poste: "Customer Advisor",
      activite: "Customer portfolio management",
      classe: "Executive",
      echelon: "12",
      pbi: 1,
      natureDecision: "Appointment",
      refDecision: "DR-2023-001",
      dateDecision: "2023-01-15",
      dateEffet: "2023-02-01",
      chargeInterim: "No",
    },
    {
      id: 2,
      affectation: "Downtown Branch",
      poste: "Credit Officer",
      activite: "Credit analysis and approval",
      classe: "Executive",
      echelon: "10",
      pbi: 1,
      natureDecision: "Promotion",
      refDecision: "DR-2022-045",
      dateDecision: "2022-06-01",
      dateEffet: "2022-07-01",
      chargeInterim: "No",
    },
    {
      id: 3,
      affectation: "Hydra Branch",
      poste: "Teller",
      activite: "Daily banking operations",
      classe: "Execution",
      echelon: "8",
      pbi: 0,
      natureDecision: "Recruitment",
      refDecision: "DR-2020-012",
      dateDecision: "2020-03-01",
      dateEffet: "2020-04-01",
      chargeInterim: "No",
    },
    {
      id: 4,
      affectation: "Risk Management Division",
      poste: "Risk Manager",
      activite: "Credit risk assessment",
      classe: "Executive",
      echelon: "11",
      pbi: 1,
      natureDecision: "Promotion",
      refDecision: "DR-2023-015",
      dateDecision: "2023-03-01",
      dateEffet: "2023-04-01",
      chargeInterim: "No",
    },
  ],
  nonBankExperiences: [
    {
      id: 1,
      entreprise: "Tech Solutions Inc.",
      lieuTravail: "Algiers, Algeria",
      posteOccupe: "Software Developer",
      du: "2008-06-01",
      au: "2010-05-31",
      duree: "2 years",
    },
    {
      id: 2,
      entreprise: "Digital Marketing Agency",
      lieuTravail: "Oran, Algeria",
      posteOccupe: "Marketing Specialist",
      du: "2013-06-01",
      au: "2015-08-31",
      duree: "2 years 3 months",
    },
    {
      id: 3,
      entreprise: "Startup Tech",
      lieuTravail: "Constantine, Algeria",
      posteOccupe: "Junior Developer",
      du: "2018-06-01",
      au: "2019-12-31",
      duree: "1 year 6 months",
    },
  ],
}

export const dataStore = new Store<DataState>(initialDataState)

export const dataActions = {
  setInformationSheets(sheets: InformationSheet[]) {
    dataStore.setState((s: DataState) => ({
      ...s,
      informationSheets: sheets,
    }))
  },
  addInformationSheet(sheet: InformationSheet) {
    dataStore.setState((s: DataState) => ({
      ...s,
      informationSheets: [...s.informationSheets, sheet],
    }))
  },
  updateInformationSheet(id: number, sheet: Partial<InformationSheet>) {
    dataStore.setState((s: DataState) => ({
      ...s,
      informationSheets: s.informationSheets.map(item => 
        item.id === id ? { ...item, ...sheet } : item
      ),
    }))
  },
  deleteInformationSheet(id: number) {
    dataStore.setState((s: DataState) => ({
      ...s,
      informationSheets: s.informationSheets.filter(item => item.id !== id),
    }))
  },
  setBankExperiences(experiences: BankExperience[]) {
    dataStore.setState((s: DataState) => ({
      ...s,
      bankExperiences: experiences,
    }))
  },
  addBankExperience(experience: BankExperience) {
    dataStore.setState((s: DataState) => ({
      ...s,
      bankExperiences: [...s.bankExperiences, experience],
    }))
  },
  updateBankExperience(id: number, experience: Partial<BankExperience>) {
    dataStore.setState((s: DataState) => ({
      ...s,
      bankExperiences: s.bankExperiences.map(item => 
        item.id === id ? { ...item, ...experience } : item
      ),
    }))
  },
  deleteBankExperience(id: number) {
    dataStore.setState((s: DataState) => ({
      ...s,
      bankExperiences: s.bankExperiences.filter(item => item.id !== id),
    }))
  },
  setNonBankExperiences(experiences: NonBankExperience[]) {
    dataStore.setState((s: DataState) => ({
      ...s,
      nonBankExperiences: experiences,
    }))
  },
  addNonBankExperience(experience: NonBankExperience) {
    dataStore.setState((s: DataState) => ({
      ...s,
      nonBankExperiences: [...s.nonBankExperiences, experience],
    }))
  },
  updateNonBankExperience(id: number, experience: Partial<NonBankExperience>) {
    dataStore.setState((s: DataState) => ({
      ...s,
      nonBankExperiences: s.nonBankExperiences.map(item => 
        item.id === id ? { ...item, ...experience } : item
      ),
    }))
  },
  deleteNonBankExperience(id: number) {
    dataStore.setState((s: DataState) => ({
      ...s,
      nonBankExperiences: s.nonBankExperiences.filter(item => item.id !== id),
    }))
  },
}
