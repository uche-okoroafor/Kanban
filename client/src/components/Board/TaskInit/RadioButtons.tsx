import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, red, orange, blue, purple, grey } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: orange[400],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const PurpleRadio = withStyles({
  root: {
    color: purple[400],
    '&$checked': {
      color: purple[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const GreyRadio = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export default function RadioButtons(): JSX.Element {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <React.Fragment>
      <div>
        <div>
          <Typography>Select Tag:</Typography>
        </div>
        <div>
          <GreenRadio
            checked={selectedValue === 'a'}
            onChange={handleChange}
            value="a"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'A' }}
          />
          <RedRadio
            checked={selectedValue === 'b'}
            onChange={handleChange}
            value="b"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'B' }}
          />
          <OrangeRadio
            checked={selectedValue === 'c'}
            onChange={handleChange}
            value="c"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'C' }}
          />
          <BlueRadio
            checked={selectedValue === 'd'}
            onChange={handleChange}
            value="d"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'D' }}
          />
          <PurpleRadio
            checked={selectedValue === 'e'}
            onChange={handleChange}
            value="e"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'E' }}
          />
          <GreyRadio
            checked={selectedValue === 'f'}
            onChange={handleChange}
            value="f"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'F' }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
