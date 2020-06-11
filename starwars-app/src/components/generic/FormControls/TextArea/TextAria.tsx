/* eslint-disable no-nested-ternary */
import React, { CSSProperties, useRef, useEffect } from 'react';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';


export type TextAreaProps = React.ComponentPropsWithRef<'textarea'> &
FormControlProps & {
  label?: React.ReactNode;
  errorMessage?: string;
  isToched?: boolean;
  fitContent?: boolean;
  resizeble?: boolean;
  formControlStyles?: CSSProperties;
  formControlClassName?: string;
  onEnterPress?: () => void;
};

function TextArea({
  name,
  label,
  placeholder,
  errorMessage,
  isToched, 
  resizeble,
  fitContent,
  style,
  value,
  onChange = () => {},
  formControlStyles,
  formControlClassName,
  onEnterPress,
  ...rest
}: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (fitContent && textAreaRef.current){
      const  { current } = textAreaRef;
      current.style.height = '1px';
      const { scrollHeight } = current;
      current.style.height = `calc(0.375rem + ${scrollHeight}px)`;
    }
  }, [fitContent, value]);

  const handleEnter = onEnterPress 
    ? (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if(e.keyCode === 13 && e.shiftKey === false){
        e.preventDefault();
        onEnterPress();
      }
    }
    : undefined;

  return (
    <Form.Group
      controlId={name}
      className={formControlClassName}
      style={formControlStyles}
    >
      {label && <Form.Label>{label}</Form.Label>}
      <FormControl
        as="textarea"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={textAreaRef as any}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        // style={!resizeble ? {  resizeble: 'none', ...style }: style}
        onKeyDown={handleEnter}
        className={
        isToched && !errorMessage
          ? 'is-valid'
          : isToched && !!errorMessage
            ? 'is-invalid'
            : undefined
    }
        {...rest}
      />
      {isToched && errorMessage && (
      <FormControl.Feedback type="invalid">
        {errorMessage}
      </FormControl.Feedback>
      )}
    </Form.Group>
  );
}
export default TextArea;