import { CountryState, useCountryStore } from '@/stores/useCountryStore'
import { COUNTRIES } from '@/constants/rssQueryParams'

describe('useCountryStore', () => {
  const initialState: CountryState = useCountryStore.getInitialState()

  beforeEach(() => {
    useCountryStore.setState({ ...initialState })
  })

  test('국가를 선택하면 countryCode 상태가 변경된다.', () => {
    const { setCountryCode } = useCountryStore.getState()
    for (let i = 0; i < COUNTRIES.length; i++) {
      const target = COUNTRIES[i].code
      setCountryCode(target)
      const { countryCode } = useCountryStore.getState()
      expect(countryCode).toBe(target)
    }
  })

  test(`setCountryCode에 유효하지 않는 값(undefined)이 들어오면 초기 상태인 'kr'이 유지된다.`, () => {
    const { setCountryCode } = useCountryStore.getState()
    setCountryCode(undefined as any)
    const { countryCode } = useCountryStore.getState()
    expect(countryCode).toBe('kr')
  })
})
