import { useState } from 'react';
import CardAttachmentPlugin from './CardAttachmentPlugin';
import { FormikHelpers } from 'formik';

interface Props {
  open: boolean;
  setDisplayAttachment: React.Dispatch<boolean>;
}

function CardAttachment({open, setDisplayAttachment}: Props): JSX.Element {
  const [file, setFile] = useState<{ [prop: string]: string | number }[] | null>(null);
  const handleSubmit = (
    { name, description }: { name: string; description: string },
    { setSubmitting }: FormikHelpers<{ name: string; description: string }>,
  ) => {
    setDisplayAttachment(false)
    setFile(null)
    //Send a request to the backend here
    //Validate file before sending
  };
  return <CardAttachmentPlugin handleSubmitCover={handleSubmit} onSetFile={setFile} file={file} open={open} setDisplayAttachment={setDisplayAttachment} />;
}

export default CardAttachment;
