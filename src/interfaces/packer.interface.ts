import { IntDoc } from "./int-doc.type";

export type IPacker = {
    id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  password: string;
  internet_document: IntDoc[]
};
