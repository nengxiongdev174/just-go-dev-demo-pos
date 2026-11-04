import { type DemoUser } from "@/types/pos";

export interface LoginViewProps {
  onLogin: (user: DemoUser) => void;
}

