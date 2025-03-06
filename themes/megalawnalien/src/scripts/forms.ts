import "./forms.css";
import "../index.css";

class Form {
    formID: string;
    form: HTMLFormElement
    constructor(formID:string="") {
        this.formID = formID
        this.form = document.getElementById(formID) as HTMLFormElement
        this.events();
    }


    events():Function {
        if (!this.form || !this.formID) return null
            console.log(this.form)
        this.form.addEventListener('submit', this.handleOnFormSubmit.bind(this))
        this.form.addEventListener('formdata', this.handleOnFormData.bind(this))
    }

    handleClearErrorMsgs() {

        let errorList:NodeList|[]

        errorList = this.form.querySelectorAll('small[data-id*="error"]') ?? []

        if (errorList.length) {
            errorList.forEach((el:HTMLElement) => el.textContent = "")
        }
    }

    handleOnFormSubmit(e:Event) {
        e.preventDefault()
        this.handleClearErrorMsgs()
        const fd = new FormData(e.target as HTMLFormElement)
    }


async handleOnFormData(e:FormDataEvent) {
        try {
            const formData = e.formData

            if (!formData) return 

            const email = formData.get("email")
            const message = formData.get("message")
            const phoneNumber = formData.get("phone_number")

            const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:8675" : "https://contact.andrew-mccall.com"


            const resp = await fetch(baseUrl+"/api/v1/andrew-mccall/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify({
                    email,
                    message,
                    phone_number: phoneNumber,
                })
            })
            const data = await resp.json()
            switch (resp.statusText) {
                case "OK":
                    const parent = this.form.parentElement
                    this.form.remove()
                    const msg = "Thank you for contacting me. I look forward to responding to your inquiry"
                    const pEl = document.createElement('p')
                    pEl.textContent = msg
                    parent.appendChild(pEl)
                break;
                default:
                const {email, message} = data.data
                const {error_message} = data
                    var emailField:HTMLInputElement
                    var msgField:HTMLTextAreaElement
                    var inputList:any[]


                    emailField = this.form.querySelector('input[name="email"]')
                    emailField.value = email


                    msgField = this.form.querySelector('textarea[name="message"]')
                    msgField.textContent = message

                    inputList = [emailField, msgField]

                    for (let i = 0; i < inputList.length; i++) {
                        let formControl:HTMLElement = inputList[i].closest('.form-control')
                        formControl.querySelector('small[data-id*="error"]').textContent = error_message
                    }


            }


        } catch (err) {
            console.error(err.message)
            throw new Error(err)
        }
    }
}


export { Form }
