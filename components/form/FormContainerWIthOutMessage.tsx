'use client';

function FormContainerWIthOutMessage({
  action,
  children,
}: {
  action: any;
  children: React.ReactNode;
}) {
  return <form action={action}>{children}</form>;
}
export default FormContainerWIthOutMessage;
