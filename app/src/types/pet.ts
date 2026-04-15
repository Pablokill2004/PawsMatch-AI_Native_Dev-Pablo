export interface Pet {
  id: number;
  name: string;
  bio: string;
}

export interface PetProfile extends Pet {
  imageUrl: string;
}

