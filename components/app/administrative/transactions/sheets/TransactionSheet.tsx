import { Sheet } from "@/components/common";
import { formatDate, formatHourNumbers } from "@/helpers/common";
import React from "react";

interface Props {
  id: string;
  hours: number;
  date: string;
  administrative_name: string;
  student_name: string;
  comment_administrative: string;
  work_name: string;
  qualification_name: string;
}

const TransactionSheet = (fields: Props) => {
  const {
    id,
    hours,
    date,
    administrative_name,
    student_name,
    comment_administrative,
    work_name,
    qualification_name
  } = fields;

  return (
    <Sheet>
      <Sheet.Title>{work_name}</Sheet.Title>

      <Sheet.Field>
        <Sheet.Name>Nro Comprobante</Sheet.Name>
        <Sheet.Value>{id}</Sheet.Value>
      </Sheet.Field>

      <Sheet.Field>
        <Sheet.Name>Horas Depositadas</Sheet.Name>
        <Sheet.Value>+{formatHourNumbers(hours)} hrs</Sheet.Value>
      </Sheet.Field>

      <Sheet.Field>
        <Sheet.Name>Fecha de Pago</Sheet.Name>
        <Sheet.Value>{formatDate(date)}</Sheet.Value>
      </Sheet.Field>

      <Sheet.Field>
        <Sheet.Name>Calificación</Sheet.Name>
        <Sheet.Value>{qualification_name}</Sheet.Value>
      </Sheet.Field>

      <Sheet.Field>
        <Sheet.Value>Supervisor</Sheet.Value>
      </Sheet.Field>

      <Sheet.Field>
        <Sheet.Name>{administrative_name}</Sheet.Name>
      </Sheet.Field>

      <Sheet.Field>
        <Sheet.Value>Estudiante</Sheet.Value>
      </Sheet.Field>

      <Sheet.Field>
        <Sheet.Name>{student_name}</Sheet.Name>
      </Sheet.Field>

      <Sheet.Field>
        <Sheet.Value>Comentarios Supervisor</Sheet.Value>
      </Sheet.Field>
      <Sheet.Field>
        <Sheet.Name>{comment_administrative}</Sheet.Name>
      </Sheet.Field>
    </Sheet>
  );
};

export default TransactionSheet;
