import { useEffect, useState } from 'react'
import Template from '../../components/Template'
import CardList from './CardList'
import { API } from '../../config/api'
import { useNavigate } from 'react-router-dom'
import { SwalFire } from '../../utils/SwalFire'
import { Button } from 'reactstrap'


const QuestionPage = () => {
    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const questionData = await API.get('/questions')

            setQuestions(questionData.data.data.question)
            setIsLoading(false)
        } catch (error) {
            SwalFire('error', error.response.data.message + '. Silahkan refresh halaman')
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const isLogin = localStorage.getItem('login')

    return (
        <Template>
            <div
                className="cardlist-wrapper mx-auto"
                style={{ marginBottom: 500, width: '70%' }}
            >
                <Button
                    color='primary'
                    className='mb-4'
                    onClick={() => navigate('/question/create')}
                    style={{ display: isLogin ? '' : 'none' }}
                >
                    <i className="fa fa-plus"></i> Buat Pertanyaan
                </Button>
                {isLoading && <CardList question={'Loading...'} />}
                {questions && questions.map(question =>
                    <CardList
                        key={question.id}
                        id={question.id}
                        question={question.description}
                    />
                )}
            </div>
        </Template>
    )
}

export default QuestionPage