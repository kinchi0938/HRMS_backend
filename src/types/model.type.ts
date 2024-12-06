export interface IEmployee {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  housenumber: string;
  zipcode: number;
  city: string;
  country: string;
  role: string;
  admin: boolean;
  comments?: IComment[];
}

export interface IComment {
  username: string;
  text: string;
  createdAt: string;
  author: string;
}
