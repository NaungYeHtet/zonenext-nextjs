import { ReactNode } from "react";
import TranslateText from "./translate-text";
import { cn } from "../utils/helpers";

type FieldLabelProps = {
  children?: ReactNode;
  id: string;
  className?: string;
};

const FieldLabel = ({ children, id, className }: FieldLabelProps) => (
  <label
    className={cn("inline-block text-xs font-extrabold mb-1", className)}
    htmlFor={id}
  >
    {children}
  </label>
);

type ErrorMessageProps = {
  children?: string;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  if (!children) return null;

  return (
    <p className="text-red-500 text-sm mt-1" role="alert">
      <TranslateText>{children}</TranslateText>
    </p>
  );
};

type FieldWrapperProps = {
  children?: ReactNode;
  errorMsg?: string;
};

const FieldWrapper = ({ children, errorMsg }: FieldWrapperProps) => (
  <div
    className={cn("border-2 border-transparent", {
      "border-2 border-red-400 ": errorMsg,
    })}
  >
    {children}
  </div>
);

type FieldGroupProps = {
  children: ReactNode;
};

function FieldGroup({ children }: FieldGroupProps) {
  return <div className="w-full">{children}</div>;
}

FieldGroup.Label = FieldLabel;
FieldGroup.ErrorMessage = ErrorMessage;
FieldGroup.Wrapper = FieldWrapper;

export default FieldGroup;
