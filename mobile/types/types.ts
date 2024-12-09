import { TextInputProps } from "react-native";

export interface NoteType {
  title: string;
  summary: string;
  date: string;
}

export interface InputFieldProps extends TextInputProps {
  label: string;
  label2: string;
  icon?: any;
  icon2?: any;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}
