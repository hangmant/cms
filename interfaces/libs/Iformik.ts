import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  FormikErrors,
  FormikState,
  FormikTouched,
} from 'formik'

export interface IFormik<Values> {
  initialValues: Values
  initialErrors: FormikErrors<unknown>
  initialTouched: FormikTouched<unknown>
  initialStatus: any
  handleBlur: (eventOrString: any) => void | ((e: any) => void)
  handleChange: (
    eventOrPath: string | React.ChangeEvent<any>
  ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void)
  handleReset: (e: any) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  resetForm: (nextState?: Partial<FormikState<Values>> | undefined) => void
  setErrors: (errors: FormikErrors<Values>) => void
  setFormikState: (
    stateOrCb: FormikState<Values> | ((state: FormikState<Values>) => FormikState<Values>)
  ) => void
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean | undefined) => any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => any
  setFieldError: (field: string, value: string | undefined) => void
  setStatus: (status: any) => void
  setSubmitting: (isSubmitting: boolean) => void
  setTouched: (touched: FormikTouched<Values>, shouldValidate?: boolean | undefined) => any
  setValues: (values: Values, shouldValidate?: boolean | undefined) => any
  submitForm: () => Promise<void | undefined>
  validateForm: (values?: Values) => Promise<FormikErrors<Values>>
  validateField: (name: string) => Promise<void> | Promise<string | undefined>
  isValid: boolean
  dirty: boolean
  unregisterField: (name: string) => void
  registerField: (name: string, { validate }: any) => void
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>
  getFieldMeta: (name: string) => FieldMetaProps<any>
  getFieldHelpers: (name: string) => FieldHelperProps<any>
  validateOnBlur: boolean
  validateOnChange: boolean
  validateOnMount: boolean
  values: Values
  errors: FormikErrors<Values>
  touched: FormikTouched<Values>
  isSubmitting: boolean
  isValidating: boolean
  status?: any
  submitCount: number
}
