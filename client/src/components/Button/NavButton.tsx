import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import useStlyes from './useStyles';

interface NavButtonProps {
  icon: React.ReactNode;
  title: string;
  to: string;
}

/**
 * Handles page navigation in the navigation bar.
 * @component
 * @param NavButtonProps
 * @returns {JSX.Element}
 */
export default function NavButton({ icon, title, to }: NavButtonProps): JSX.Element {
  const classes = useStlyes();
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Button className={classes.navButton} variant="outlined" size="large" startIcon={icon}>
        {title}
      </Button>
    </Link>
  );
}
