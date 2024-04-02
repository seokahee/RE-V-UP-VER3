import { ChangeEvent, useCallback, useState } from "react";

interface initialFormType {
  [key: string]: unknown;
}

const useInput = <T extends initialFormType>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);

  const onChange = useCallback(
    (
      e:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLSelectElement>
        | ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setForm((preForm) => ({ ...preForm, [name]: value }));
    },
    []
  );
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return { form, setForm, onChange, reset };
};

export default useInput;
