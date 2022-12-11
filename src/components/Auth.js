import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Template from '../components/Template'
import { API } from '../config/api'
import { SwalFire } from '../utils/SwalFire'


const Auth = ({ type }) => {
    const navigate = useNavigate()
    const [dataForm, setDataForm] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        const isLogin = localStorage.getItem('login')
        if (isLogin) {
            navigate('/')
        }
    }, [])

    const handleChange = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const endpoint = type === 'login' ? 'auth/login' : 'auth/register'
            const result = await API.post(endpoint, dataForm)

            if (type === 'login') {
                localStorage.setItem('login', true)
                localStorage.setItem('username', result.data.data.user.username)
                localStorage.setItem('token', result.data.data.token)
            }
            navigate(type === 'login' ? '/' : '/login')
        } catch (error) {
            SwalFire('error', error.response.data.message)
        }
    }

    return (
        <Template>
            <Card className='mx-auto'
                style={{
                    width: '40%',
                    marginTop: 80,
                    marginBottom: 300
                }}
            >
                <CardBody>
                    <Form onSubmit={handleSubmit} >
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={dataForm.username}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={dataForm.password}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button type='submit' >
                            {type === 'login' ? 'Login' : 'Register'}
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Template>
    )
}

export default Auth