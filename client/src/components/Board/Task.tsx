import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useBoard } from '../../context/useBoardContext';

interface IProps {
  title: string;
  columnId: string;
  taskId: string;
}

const Task = ({ title, columnId, taskId }: IProps): JSX.Element => {
  const { onTaskDeleteClick } = useBoard();
  return (
    <CardContent>
      <Card>
        <CardHeader
          title={title}
          action={
            <IconButton aria-label="delete" onClick={() => onTaskDeleteClick(columnId, taskId)}>
              <RemoveCircleIcon />
            </IconButton>
          }
        />
      </Card>
    </CardContent>
  );
};

export default Task;
