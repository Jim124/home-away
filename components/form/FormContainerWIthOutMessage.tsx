'use client';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
};
function FormContainerWIthOutMessage({
  action,
  children,
}: {
  action: any;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialState);
  return <form action={formAction}>{children}</form>;
}
export default FormContainerWIthOutMessage;
