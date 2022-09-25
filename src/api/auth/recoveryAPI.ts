import {instance} from '../instance';


type responseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
    error: string
}

export const recoverAPI = {
    requestLink(email: string) {
        return instance.post<responseType>('/auth/forgot', {
            email: email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="padding: 15px">
Перейдите по ссылке для восстановления пароля:
<a href='http://localhost:3000/#/new_password/$token$'>Ссылка</a>
</div>`
        })
    },

    setNewPassword(password: string, token: string) {
        return instance.post<responseType>('/auth/set-new-password', {
            password: password,
            resetPasswordToken: token
        })
    }

}