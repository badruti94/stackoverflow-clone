import React, { useEffect, useState } from 'react'
import { Form, useNavigate, useParams } from 'react-router-dom'
import { Alert, Card, CardBody, Input } from 'reactstrap'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Template from '../components/Template'
import { API, getConfig } from '../config/api'
import { Button } from 'reactstrap'
import { SwalConfirm, SwalFire } from '../utils/SwalFire'


const ViewQuestionPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [question, setQuestion] = useState()
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState()
    const [isSolve, setIsSolve] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getDataQuestion = async () => {
        try {
            const questionData = await API.get(`/questions/${params.id}`)

            setQuestion(questionData.data.data.question)
            setIsLoading(false)
        } catch (error) {
            SwalFire('error', error.response.data.message)
        }
    }

    const getDataComments = async () => {
        try {
            const commentsData = await API.get(`/questions/${params.id}/comments`)

            setComments(commentsData.data.data.comments)
            setIsSolve(commentsData.data.data.isSolve)
            setIsLoading(false)
        } catch (error) {
            SwalFire('error', error.response.data.message)
        }
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault()

        try {
            const config = await getConfig()
            await API.post(`/questions/${params.id}/comments`, { comment }, config)
            setComment('')
            getDataComments()
        } catch (error) {
            SwalFire('error', error.response.data.message)
        }
    }

    useEffect(() => {
        getDataQuestion()
        getDataComments()
    }, [])

    const isBelongToUser = () => localStorage.getItem('username') === question?.user.username
    const isBelongToUserComment = (username) => localStorage.getItem('username') === username
    const isLogin = localStorage.getItem('login')

    const handleCommentSetTrue = async (id) => {
        try {
            const config = await getConfig()
            await API.patch(`/comments/${id}/solve-question`, { comment }, config)
            getDataComments()
        } catch (error) {
            SwalFire('error', error.response.data.message)
        }
    }

    const handleDeleteQuestion = async () => {
        const deleteQuestion = async () => {
            try {
                const config = await getConfig()
                await API.delete(`/questions/${params.id}`, config)
                navigate('/question')
            } catch (error) {
                SwalFire('error', error.response.data.message)
            }
        }
        SwalConfirm(deleteQuestion, 'Pertanyaanmu telah dihapus')
    }

    const handleDeleteComment = async (id) => {
        const deleteComment = async () => {
            try {
                const config = await getConfig()
                await API.delete(`/comments/${id}`, config)
                getDataComments()
            } catch (error) {
                SwalFire('error', error.response.data.message)
            }
        }
        SwalConfirm(deleteComment, 'Jawabanmu telah dihapus')
    }

    const Comment = (comment) => {
        return <Alert
            color={comment.solve ? 'primary' : ''}
            className={`border ${comment.solve ? '' : 'border-dark'}`}
        >
            <p>
                <span className='fw-bold' >{comment.user.username}</span>
                <span
                    className='ms-2 p-1 bg-danger rounded-2 text-light'
                    style={{
                        fontSize: 10,
                        cursor: 'pointer',
                        display: isBelongToUserComment(comment.user.username) ? '' : 'none'
                    }}
                    onClick={() => { handleDeleteComment(comment.id) }}
                >
                    <i className="fa fa-trash"></i>
                </span>
                <span
                    className='ms-2 p-1 bg-success rounded-2 text-light'
                    style={{
                        fontSize: 10,
                        cursor: 'pointer',
                        display: isBelongToUser() && !isSolve ? '' : 'none'
                    }}
                    onClick={() => { handleCommentSetTrue(comment.id) }}
                >
                    Jadikan jawaban benar
                </span>
                <br />
                {comment.comment}
            </p>
        </Alert>
    }

    return (
        <Template>
            <Card className='mx-auto mb-5'
                style={{ width: '85%' }}
            >
                <CardBody>
                    <div className='d-flex' >
                        <div className='fw-bold' >{question?.user.username}</div>
                        <div
                            className='ms-2 text-danger'
                            style={{
                                cursor: 'pointer',
                                display: isBelongToUser() ? '' : 'none'
                            }}
                            onClick={handleDeleteQuestion}
                        >
                            <i className="fa fa-trash"></i>
                        </div>
                    </div>
                    <div className='mb-4' >
                        <SyntaxHighlighter language={question?.language} style={dark}>
                            {question?.code}
                        </SyntaxHighlighter>
                    </div>
                    <div>
                        {question?.description}
                    </div>
                </CardBody>
            </Card>
            <Card
                className='mx-auto'
                style={{ width: '85%', marginBottom: 400 }}
            >
                <CardBody>
                    {comments && comments.map(comment =>
                        Comment(comment)
                    )}
                    <Alert
                        color=''
                        className='border border-dark'
                        style={{ display: isLogin ? '' : 'none' }}
                    >
                        <Form onSubmit={handleSubmitComment}>
                            <Input
                                id="comment"
                                name="comment"
                                type="textarea"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button className='mt-4' type='submit' >
                                Kirim Komentar
                            </Button>
                        </Form>
                    </Alert>
                </CardBody>
            </Card>
        </Template>
    )
}

export default ViewQuestionPage