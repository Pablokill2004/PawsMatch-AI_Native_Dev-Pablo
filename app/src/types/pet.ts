export interface Pet {
  id: number;
  name: string;
  bio: string;
  type?: string;
  location?: string;
}

export interface PetProfile extends Pet {
  imageUrl: string;
}

