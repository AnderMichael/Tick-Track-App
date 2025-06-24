import { Student } from "@/interfaces/administrative";
import React from "react";

interface CurrentStudentContextType {
  student: Student | null;
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>;
}

const CurrentStudentContext =
  React.createContext<CurrentStudentContextType | null>(null);

interface CurrentStudentProviderProps {
  children: React.ReactNode;
}

const CurrentStudentProvider: React.FC<CurrentStudentProviderProps> = ({
  children,
}) => {
  const [student, setStudent] = React.useState<Student | null>(null);

  return (
    <CurrentStudentContext.Provider value={{ student, setStudent }}>
      {children}
    </CurrentStudentContext.Provider>
  );
};

const useCurrentStudent = () => {
  const context = React.useContext(CurrentStudentContext);
  if (!context) {
    throw new Error(
      "useCurrentStudent must be used within a CurrentWorkProvider"
    );
  }
  return context;
};

export { CurrentStudentProvider, useCurrentStudent };
