import "../index.css";
class Form {
    formID: string;
    form: HTMLFormElement
    constructor(formID:string="") {
        this.formID = formID
        this.form = document.getElementById(formID) as HTMLFormElement
        this.events();
    }


    events():void {
        if (!this.form || !this.formID) return null
        this.form.addEventListener('submit', async (e:SubmitEvent) => {
            try {
            await this.handleOnFormSubmit(e)
            } catch (err) {
                throw new Error(err)
            }
        })
    }

    handleClearErrorMsgs() {

        let errorList:NodeList|[]

        errorList = this.form.querySelectorAll('small[data-id*="error"]') ?? []

        if (errorList.length) {
            errorList.forEach((el:HTMLElement) => el.textContent = "")
        }
    }

    async handleOnFormSubmit(e:SubmitEvent): Promise<void> {
        e.preventDefault()
        this.handleClearErrorMsgs()
        try {
            const formData = new FormData(this.form)

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

            if (resp.statusText != "OK") {
                const data = await resp.json()
                const {email = "", message = ""} = data?.data
                const {error_message = ""} = data
                    var emailField:HTMLInputElement
                    var msgField:HTMLTextAreaElement
                    var inputList:any[]

                    emailField = this.form.querySelector('input[name="email"]')
                    emailField.value = email

                    msgField = this.form.querySelector('textarea[name="message"]')
                    msgField.textContent = message

                    inputList = [emailField, msgField]

                    for (let i = 0; i < inputList.length; i++) {
                        let formControl = inputList[i]?.closest('.form-control');
                        if (formControl) formControl.querySelector('small[data-id*="error"]').textContent = error_message
                    }
                return
            }

            location.assign('/success')
            return

        } catch (err) {
            console.error(err.message)
            throw new Error(err)
        }
    }

}


export { Form }
