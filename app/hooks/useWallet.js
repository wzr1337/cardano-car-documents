import useSWR from 'swr'

export const fetcher = (url) => fetch(url).then((r) => r.json())

export function useWallet(id) {
  console.log(`[useWallet(id)] fetching: /api/wallets/${id}`)
  const { data, error } = useSWR(`/api/wallets/${id}`, fetcher)
  console.log(`[useWallet(id)] { data, error }: ${JSON.stringify(data)}, ${error}`)
  return {
    wallet: data,
    loading: !error && !data,
    error,
  }
}
