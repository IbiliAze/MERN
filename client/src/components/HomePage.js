import { useState } from 'react';
import { connect } from 'react-redux';
import {
  Input,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Button,
  UncontrolledAccordion,
  AccordionItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import Thing from './Thing';
import { postThing, deleteThing } from '../actions/things';

function HomePage({ things, postThing, deleteThing }) {
  // State
  const [inputs, setInputs] = useState({
    thingName: '',
  });
  const [modal, setModal] = useState(false);

  // Toggle functions
  const toggleModal = () => setModal(!modal);

  // onChange functions
  const onInputsChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });

  // onClick functions
  const onSaveClick = e => {
    e.preventDefault();

    postThing({
      thingName: inputs.thingName,
    });
    toggleModal();
  };

  // JSX
  return (
    <>
      <h2>Remote Machine Access</h2>
      <hr />

      <Button color='primary' onClick={toggleModal}>
        Add thing
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add a new thing</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Thing Name</Label>
                  <Input
                    required
                    type='text'
                    name='thingName'
                    value={inputs.thingName}
                    onChange={onInputsChange}
                    placeholder='Thing Name'
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button type='submit' onClick={onSaveClick} color='primary'>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <hr />

      <div>
        <Scrollbars style={{ height: 'calc(100vh - 36.63px - 8px - 40px - 38px - 2px - 64px)' }}>
          <UncontrolledAccordion defaultOpen='1'>
            {things.map(thing => (
              <AccordionItem key={thing._id}>
                <Thing thing={thing} deleteThing={deleteThing} />
              </AccordionItem>
            ))}
          </UncontrolledAccordion>
        </Scrollbars>
      </div>
    </>
  );
}

const mapStateToProps = state => ({ message: state.message, things: state.things.things });

export default connect(mapStateToProps, { postThing, deleteThing })(HomePage);
