export interface Heroes {
    id: number;
    localized_name: string;
    primary_attr: string;
    attack_type: string;
    img: string;
  }
  
export type Filter = "primary_attr" | "attack_type";
  
export type Sort =  "asc"|"decs" ;
  