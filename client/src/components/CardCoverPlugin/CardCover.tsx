import { useState } from 'react';
import CardCoverPlugin from './CardCoverPlugin';
import { FormikHelpers } from 'formik';
function CardCover() {
  const [file, setFile] = useState<{ [prop: string]: string | number } | null>(null);
  const handleSubmit = (
    { name, description }: { name: string; description: string },
    { setSubmitting }: FormikHelpers<{ name: string; description: string }>,
  ) => {
    console.log(name);
    console.log(description);
    console.log(file);
  };
  return <CardCoverPlugin handleSubmitCover={handleSubmit} onSetFile={setFile} file={file} />;
}

export default CardCover;
