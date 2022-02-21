import { makeStyles } from '@material-ui/core/styles';
import image from '../../Images/background.jpg';

const useStyles = makeStyles(() => ({
  backgroundImg: {
    background: `linear-gradient( rgb(18,58,64,0.3) 100%, rgb(18,58,64,0.3)100%),url(${image})`,
    backgroundRepeat: ' no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
  },
}));

export default useStyles;
