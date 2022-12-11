import { Card, CardBody } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const CardList = ({id, question}) => {
  const navigate = useNavigate()

  return (
    <Card
      className='mx-auto mb-4'
      style={{ cursor: 'pointer' }}
      onClick={()=> navigate(`/question/${id}`)}
    >
      <CardBody>
        {question}
      </CardBody>
    </Card>
  )
}

export default CardList