
import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

export function FirstStep(props) {
    let { first_name, last_name, telephone, mobileNumber, email, password, verifyPassword, role_id } = props.userInfo,
        { passwordMatch, step, validConfirmPasswordMessage, signupOptions } = props;

    return (
        <div className={step === 1 ? "show-form" : "hide-form"}>

            <Form onSubmit={(event) => props._showNextStep(props.firstStepFormValidator, event)}>

                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input type="text" placeholder="First Name"
                            value={first_name} name="first_name" onChange={props._handleInput}
                            className="signup-fields" />
                        {props.firstStepFormValidator.message('first_name', first_name, 'required')}
                    </Form.Field>

                    <Form.Field>
                        <Form.Input type="text" placeholder="Last Name"
                            value={last_name} name="last_name" onChange={props._handleInput}
                            className="signup-fields" />
                        {props.firstStepFormValidator.message('last_name', last_name, 'required')}
                    </Form.Field>

                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field >
                        <Form.Input type="email" placeholder="Email" className="signup-fields"
                            value={email} name="email" onChange={props._handleInput} />
                        {props.firstStepFormValidator.message('email', email, 'required')}
                    </Form.Field>
                    <Form.Field >
                        <Dropdown
                            selection
                            options={signupOptions}
                            onChange={(event, { value }) => props._handleDropdown(event, value)}
                            value={role_id}
                            // className="signup-fields"
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">

                    <Form.Field>
                        <Form.Input type="number" control='input' placeholder="Telephone Number" className="signup-fields no-arrow"
                            value={telephone} name="telephone" onChange={props._handleInput}
                        />
                        {props.firstStepFormValidator.message('telephone', telephone, 'required')}
                    </Form.Field>

                    <Form.Field>
                        <Form.Input type="number" control='input' placeholder="Mobile Number" className="signup-fields no-arrow"
                            value={mobileNumber} name="mobileNumber" onChange={props._handleInput}
                        />
                        {props.firstStepFormValidator.message('mobileNumber', mobileNumber, 'required')}
                    </Form.Field>
                </Form.Group>


                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input type="password" placeholder="Password" className="signup-fields"
                            value={password} name="password" onChange={props._handleInput} />
                        {props.firstStepFormValidator.message('password', password, 'required')}
                    </Form.Field>

                    <Form.Field>
                        <Form.Input type="password" placeholder="Password Verify" error={passwordMatch} className="signup-fields"
                            value={verifyPassword} name="verifyPassword" onChange={props._handleInput} />
                        {props.firstStepFormValidator.message('verifyPassword', verifyPassword, 'required')}

                        {
                            !passwordMatch && validConfirmPasswordMessage ?
                                <span className='password-warning srv-validation-message'>
                                    {validConfirmPasswordMessage}</span>
                                : ''
                        }
                    </Form.Field>
                </Form.Group>

                <div className="login-section">
                    <div className="login-btn">
                        <button type="submit" className="btn-login"  >Next</button>
                    </div>
                </div>

            </Form>
        </div>
    )
}