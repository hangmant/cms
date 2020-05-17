import { useQuery } from '@apollo/react-hooks'
import { GET_COUNTRIES } from '../queries'

export function useGetCountries() {
  const { data, loading } = useQuery(GET_COUNTRIES)

  return {
    countries: data?.countries || [],
    loading,
  }
}
