import React from 'react';
import { Button, Input, Form, FormField, FormFieldset } from '@app/theme';

const Page = () => (
  <React.Fragment>
    <div style={{ padding: '2rem' }}>
      <Input id="test" value="TEST" label="Test" name="test" />
      <Input id="test" label="Test" name="test" />
      <Input id="test" label="Test" name="test" error="das ist ein Error" />
      <Input type="textarea" value="TEST" id="test" label="Test" name="test" />
      <Input
        type="select"
        id="test"
        value="TEST"
        label="Test"
        name="test"
        choices={{ hello: 'Hello', world: 'World' }}
      />
    </div>
    <Form onSubmit={v => console.log(v)}>
      <FormFieldset label="Fieldset">
        <FormField
          name="hallo"
          label="Hallo"
          component={Input}
          register={{ required: 'This field is required' }}
        />
      </FormFieldset>
      <button type="submit">Submit</button>
    </Form>
    {/*
      <Form onSubmit={v => console.log(v)}>
        <FormFieldset label="Fieldset">
          <FormField
            name="hallo"
            label="Hallo"
            component={InputText}
            data-test="TEST"
            placeholder="HELLO"
            register={{required: 'This field is required'}}
          />
          <FormField name="welt" label="Welt"/>
        </FormFieldset>
        <button type="submit">Submit</button>
      </Form>
    */}
    <Button>Hallo Welt</Button>
    <Button round>Hallo Welt</Button>
    <Button icon="mdi/heart" />
    <Button icon="mdi/heart" round />
    <Button icon="mdi/heart">Hallo Welt</Button>
    <Button round icon="mdi/heart">
      Hallo Welt
    </Button>
  </React.Fragment>
);

export default Page;
