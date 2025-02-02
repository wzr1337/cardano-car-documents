import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import { useWallet } from '../hooks/useWallet'
import { useUser } from '../hooks/useUser'
import { useOrganization } from '../hooks/useOrganization'
import AssetList from './AssetList'
import TransactionItem from './TransactionItem'

const convertToAda = (lovelace) => {
  if (lovelace) {
    return lovelace / 1000000
  } else {
    return 0
  }
}

export default function WalletItem({ walletId }) {
  const { wallet, loading } = useWallet(walletId)
  const [user] = useUser()
  const { organization } = useOrganization(user?.organizationId)

  console.log(`[WalletItem()] fetching wallet Id: ${walletId}`)

  const enableTransactions =
    user &&
    (user.walletId == wallet?.id || organization?.walletId == wallet?.id)

  if (loading) {
    return (
      <Container className="align-items-center px-3 py-2 border mb-1">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  return (
    <>
      <Container className="align-items-center px-3 py-2 border mb-1">
        <Row className="align-items-center">
          <Link href={`/wallets/${wallet.address}`} passHref>
            <Col className="col-3">{wallet.address}</Col>
          </Link>
          <Col></Col>
          <Col className="col-2 text-end fw-bold">
            {convertToAda(wallet.amount ? wallet.amount[0].quantity : 0)} Ada
          </Col>
        </Row>
      </Container>
      {wallet.amount?.length > 1 && (
        <h2 className="fw-bold fs-3 my-4 text-center ">NFTs</h2>
      )}
      <AssetList assets={wallet.amount} />
      {enableTransactions && <TransactionItem walletId={walletId} />}
    </>
  )
}
