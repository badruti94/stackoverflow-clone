import { useState } from 'react'
import { Form } from 'react-router-dom'
import { Button, Card, CardBody, FormGroup, Input, Label } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';
import SyntaxHighlighter from 'react-syntax-highlighter'
import Template from '../components/Template'
import { API, getConfig } from '../config/api'
import { SwalFire } from '../utils/SwalFire'


const CreateQuestionPage = () => {
    const navigate = useNavigate()
    const [dataForm, setDataForm] = useState({
        language: 'javascript',
        code: '',
        description: '',
    })

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const config = await getConfig()
            const result = await API.post('/questions', dataForm, config)

            SwalFire('success', result.data.message)

            navigate('/question')
        } catch (error) {
            SwalFire('error', error.response.data.message)
        }
    }

    return (
        <Template>
            <Card className='mx-auto' style={{ width: '70%' }} >
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="code">
                                Bahasa
                            </Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={{
                                    value: 'javascript',
                                    label: 'javascript',
                                }}
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="color"
                                options={SyntaxHighlighter.supportedLanguages.map(language => ({
                                    value: language,
                                    label: language,
                                }))}
                                onChange={e => setDataForm({
                                    ...dataForm,
                                    language: e.value
                                })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="code">
                                Code
                            </Label>
                            <Input
                                className='bg-dark text-light'
                                id="code"
                                name="code"
                                type="textarea"
                                rows={10}
                                value={dataForm.code}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="question">
                                Pertanyaan
                            </Label>
                            <Input
                                id="question"
                                name="description"
                                type="textarea"
                                rows={3}
                                value={dataForm.description}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button type='submit' >
                            Kirim Pertanyaan
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Template>
    )
}

export default CreateQuestionPage