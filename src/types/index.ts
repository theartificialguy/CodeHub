import { Timestamp } from "firebase/firestore";

export interface ISnippet {
  id: string;
  code: string;
  extension: string;
  description: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}
