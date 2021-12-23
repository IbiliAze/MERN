import axios from 'axios';
import { Button, ButtonGroup, AccordionHeader, AccordionBody, ListGroup, ListGroupItem } from 'reactstrap';

function HomePage({ thing, deleteThing }) {
  // Helper functions
  const req = async command => {
    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_ORIGIN_URL}/api/connection`,
      data: {
        ...thing,
        command,
      },
    });
  };

  // onClick functions
  const onDeleteClick = e => deleteThing(thing._id);
  const onTestClick = e => req('dir');
  const onSleepClick = e => req('shutdown /h');
  const onRestartClick = e => req(thing.os === 'Windows' ? 'shutdown -t 0 -r -f' : 'sudo reboot');
  const onShutdownClick = e => req(thing.os === 'Windows' ? 'shutdown /s /t 1' : 'sudo shutdown');

  // JSX
  return (
    <>
      <AccordionHeader targetId={thing._id}>{thing.thingName}</AccordionHeader>
      <AccordionBody accordionId={thing._id}>
        <ListGroup>
          <ListGroupItem>OS: {thing.os}</ListGroupItem>
          <ListGroupItem>SSH Port: {thing.sshPort}</ListGroupItem>
          <ListGroupItem>{thing.description}</ListGroupItem>
        </ListGroup>
        <hr />
        <Button onClick={onTestClick} color='success' size='sm'>
          Test
        </Button>{' '}
        <ButtonGroup>
          <Button onClick={onSleepClick} outline color='primary' size='sm'>
            Sleep
          </Button>
          <Button onClick={onRestartClick} outline color='primary' size='sm'>
            Restart
          </Button>
          <Button onClick={onShutdownClick} outline color='primary' size='sm'>
            Shutdown
          </Button>
        </ButtonGroup>
        <br />
        <hr />
        <Button onClick={onDeleteClick} color='danger' size='sm'>
          Delete
        </Button>
      </AccordionBody>
    </>
  );
}

export default HomePage;
