import { IntDoc } from "../hooks/usePacker";

export type IPacker = {
    id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  password: string;
  internet_document: IntDoc[]
};
