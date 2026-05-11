export type Message = {
  id: string;
  recipientRole:
    | "Nurse"
    | "Doctor"
    | "Healthcare Assistant"
    | "Porter"
    | "Cleaner"
    | "Receptionist"
    | "Pharmacist";
  hospitalName: string;
  city: string;
  body: string;
  fromLabel: string;
  createdAt: string;
};

export type CountryStatus = "available" | "coming-soon";

export type LocationData = {
  countries: Record<string, { status: CountryStatus }>;
  stats: {
    hospitals: number;
    practices: number;
    staff: number;
    populationReach: number;
  };
  partners: Array<{
    name: string;
    logo: string;
  }>;
};

export type Charity = {
  id: string;
  name: string;
  logo: string;
  bgColor?: string;
  url?: string;
};
