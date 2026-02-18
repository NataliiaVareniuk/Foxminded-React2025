import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/utils/validation'

const defaultValues = {
  firstName: '',
  lastName:'',
  email: '',
  phone: '',
}

const useContactForm = (initialValues = defaultValues) => {
   const form = useForm({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })

   return form
}

export default useContactForm
