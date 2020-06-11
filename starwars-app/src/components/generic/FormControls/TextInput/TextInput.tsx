/* eslint-disable no-nested-ternary */
import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> &
FormControlProps & {
  // icon?: IconDefinition;
  labelName?: React.ReactNode;
  errorMessage?: string;
  isTouched?: boolean;
};
function TextInput({
  type = 'text',
  name,
  labelName,
  placeholder,
  errorMessage,
  isTouched,
  value,
  ...rest
}: TextInputProps) {
  return (
    <Form.Group controlId={name}>
      {labelName && <Form.Label>{labelName}</Form.Label>}
      <FormControl
        type={type}
        name={name}
        value={value ?? ''}
        placeholder={placeholder}
        className={
          isTouched && !errorMessage
            ? 'is-valid'
            : isTouched && !!errorMessage
              ? 'is-invalid'
              : undefined
        }
        {...rest}
      />

      {isTouched && errorMessage && (
        <FormControl.Feedback type="invalid">
          {errorMessage}
        </FormControl.Feedback>
      )}
    </Form.Group>
  );
}

export default TextInput;
