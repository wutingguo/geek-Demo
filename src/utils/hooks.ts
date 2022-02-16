import { RootState } from '@/types/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useInitState = <T extends keyof RootState>(
  action: () => void,
  stateName: T
) => {
  const state = useSelector((state: RootState) => state[stateName])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action())
  }, [dispatch, action])
  return state
}
