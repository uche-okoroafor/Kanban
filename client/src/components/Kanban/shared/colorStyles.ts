import { makeStyles, Theme } from '@material-ui/core';

export type ICardTagColorProps = {
  tagColor: string;
};

const useColorTagStyles = makeStyles<Theme, ICardTagColorProps>((theme) => {
  return {
    cardTagColor: (props: ICardTagColorProps) => {
      return {
        backgroundColor: props.tagColor,
        // theme.palette.tags['#EDAB1D'] ,
        border: props.tagColor === 'white' ? '1px solid lightgrey' : 'none',
      };
    },
  };
});

export default useColorTagStyles;
