import { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';
import CardAttachmentDropzone from './CardAttachmentDropzone';

interface Props {
  handleSubmitCover: (
    {
      name,
      description,
    }: {
      name: string;
      description: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      name: string;
      description: string;
    }>,
  ) => void;
  onSetFile: (acceptableFile: { [props: string]: string | number }[] | null) => void;
  file: { [props: string]: string | number }[] | null;
  open: boolean;
  setDisplayAttachment: React.Dispatch<boolean>;
}

export default function CardAttachmentPlugin({
  handleSubmitCover,
  onSetFile,
  file,
  open,
  setDisplayAttachment,
}: Props): JSX.Element {
  const handleClose = () => {
    setDisplayAttachment(false);
    onSetFile(null)
  };
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalBox}>
        <Formik
          initialValues={{
            name: '',
            description: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            file: Yup.object(),
            description: Yup.string().required('Description is required'),
          })}
          onSubmit={handleSubmitCover}
        >
          {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Typography variant="h5">Add Attachments</Typography>
              <TextField
                id="name"
                margin="normal"
                fullWidth
                name="name"
                variant="outlined"
                label="Name"
                helperText={touched.name ? errors.name : ''}
                error={touched.name && Boolean(errors.name)}
                value={values.name}
                onChange={handleChange}
              />
              <TextField
                multiline
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                name="description"
                helperText={touched.description ? errors.description : ''}
                error={touched.description && Boolean(errors.description)}
                value={values.description}
                onChange={handleChange}
              />
              <CardAttachmentDropzone onSetFile={onSetFile} file={file} />
              <Box>
                <Button type="submit" size="large" variant="contained" color="primary" fullWidth>
                  UPLOAD ATTACHMENTS
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
