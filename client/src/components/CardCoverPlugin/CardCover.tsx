import { useState } from 'react';
import CardCoverPlugin from './CardCoverPlugin';
import { FormikHelpers } from 'formik';

interface Props {
  open: boolean;
  setDisplayCover: React.Dispatch<boolean>;
}

function CardCover({open, setDisplayCover}: Props) {
  const [file, setFile] = useState<{ [prop: string]: string | number } | null>(null);
  const handleSubmit = (
    { name, description }: { name: string; description: string },
    { setSubmitting }: FormikHelpers<{ name: string; description: string }>,
  ) => {
    setDisplayCover(false)
    setFile(null)
    // We can send a request to the backend here
  };
  return <CardCoverPlugin handleSubmitCover={handleSubmit} onSetFile={setFile} file={file} open={open} setDisplayCover={setDisplayCover} />;
}

export default CardCover;
