export type SetStateFunction = React.Dispatch<React.SetStateAction<string>>;

export const handleNumericInput = (
  value: string,
  setState: SetStateFunction
) => {
  setState(value.replace(/[^0-9]/g, ''));
};
