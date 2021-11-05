import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from './RadioButtons'
import Input from './InputField'
import { Box } from '@material-ui/core';

interface IProps {
  title: string;
  columnId: string;
  taskId: string;
}

const Task = ({  }: IProps): JSX.Element => {
  return (
    <CardContent>
      <Card >
        <Box pt={2} pb={2} pl={2} ml={'auto'} pr={2} mr={'auto'}>
          <div>
            <Input />
          </div>
          <div>
            <Radio />
          </div>
        </Box>
      </Card>
    </CardContent>
  );
};

export default Task;
