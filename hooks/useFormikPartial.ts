import { FormikConfig, FormikHelpers, FormikValues, useFormik } from 'formik'
import { IFormik } from '../interfaces/libs/Iformik'
import { deepDiffValues } from '../utils/objects.utils'

export function useFormikPartial<Values extends FormikValues = FormikValues>(
  config: FormikConfig<Values>
): IFormik<Values> {
  let formik: IFormik<Values>
  const handleSubmitPartial = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const newValues = deepDiffValues(values, formik?.initialValues)
    config.onSubmit(newValues, formikHelpers)
  }

  formik = useFormik({ ...config, onSubmit: handleSubmitPartial })

  return formik
}
