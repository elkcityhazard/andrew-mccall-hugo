export default class FormValidation {
    constructor(form, errors = []) {
        this.form = form
        this.errors = errors

        if (!this.form) {
            return null
        }


        this.events()
    }


    events() {
        if (!this.form || typeof this.form == "undefined" || this.form === null) {
            return null;
        }

        if (this.form) {
           const contactForm = document.getElementById(this.form)

           if (!contactForm) {
            return null
           }
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this))
        }

        
    }

    async handleFormSubmit(e) {

    	this.resetErrors()

        try {

            e.preventDefault();


            const formData = new FormData(document.getElementById(this.form))

            let email = formData.get('email')
            let message = formData.get('message')
            let password = formData.get("password")

            if (password !== "") throw new Error("invalid form data")

            email = this.validateEmail(email)

            message = this.validateMessage(message)


            if (this.errors.length > 0) {
            	
            	for (const v of this.errors) {
            		if (Object.prototype.hasOwnProperty.call(v, 'email')) {
            			const msg = document.createElement('p')
            			msg.innerText = v?.email
            			document.querySelector('input[name="email"] + .error').appendChild(msg)
            			document.querySelector('input[name="email"] + .error').classList.add('show-error')
            		}

            		if (Object.prototype.hasOwnProperty.call(v,'message')) {
            			const msg = document.createElement('p')
            			msg.innerText = v?.message
            			document.querySelector('textarea[name="message"] + .error').appendChild(msg)
            			document.querySelector('textarea[name="message"] + .error').classList.add('show-error')
            		}

            		
            	}

            	throw new Error("invalid data")
            }

            return document.createElement('form').submit.call(document.getElementById(this.form))


            

        } catch (err) {
            console.error(err.message)
            return err
        }
    }

    validateEmail(input) {

        if (input.trim().length == 0) {
            this.errors.push({
                email: "email cannot be empty"
            })
        }

        const validEmailPattern = input.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        
        if (!validEmailPattern) {
            this.errors.push({
                email: "invalid email"
            })
        }

        return input.trim().toLowerCase()
    };

    validateMessage(input) {

    	if (input.trim().length == 0) {
    		this.errors.push({
    			message: "invalid message length"
    		})
    	}

    	    return input.replaceAll('<', '&lt;')
    	    			.replaceAll('>', '&gt;')
    	    			.replaceAll('\"', '&quot;')
    	    			.replaceAll('\'', '&#39;')
    	    			.replaceAll('$', '&nbsp;')
    	    			.replaceAll('(', '&nbsp;')
    	    			.replaceAll(')', '&nbsp;')
    	    			.replaceAll('<?', '&nbsp')
    	    			.replaceAll('/', '&#x2F;')
    	    			.toLowerCase()


    }

    resetErrors() {
    	this.errors = new Array()
    	const formErrors = document.querySelectorAll('form .error')

    	for (const error of formErrors) {
    		error.classList.remove('show-error')
    		while (error.firstChild) {

    			error.lastChild.remove()
    		}
    		error.innerText = ""
    	}
    }

}
