import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/utils/validation'

const defaultValues = {
  address: '',
  extraAddress:'',
  city: '',
  phone: '',
}

const useShipmentForm = (initialValues = defaultValues) => {
   const form = useForm({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })

   return form
}

export default useShipmentForm