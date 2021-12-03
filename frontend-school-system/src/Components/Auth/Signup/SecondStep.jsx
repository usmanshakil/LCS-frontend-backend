
import React, { Component } from 'react';
import { Form, Icon } from 'semantic-ui-react';
import SignatureCanvas from 'react-signature-canvas';

class SecondStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
    }

    componentWillReceiveProps(props) {
        //
        if (this.state.step !== props.step) {
            this.setState({
                step: props.step
            }, () => {
                this.fitToContainer();
            })
        }
    }


    //set height and width of signature canvas
    fitToContainer = () => {
        //get element
        var canvas = document.querySelector('canvas');
        // Make it visually fill the positioned parent
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        // ...then set the internal size to match
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        return canvas
    }


    render() {
        let { comments } = this.props.userInfo,
            { signaturePad,
                isSignUpLoading,
                blankSignatureValidationMessage,
                firstCaptchaNumber,
                secondCaptchaNumber,
                getArithematicSymbol,
                isCaptchaAnswerMatch,
                captchaAnswer } = this.props,
            { step } = this.state;

        return (
            <div className={step === 2 ? "show-form" : "hide-form"}>
                <Form  >
                    <Form.Group>
                        <div className="w-100 flex">
                            <div className="w-50">
                                <span className="signature-label" onClick={this.props.clearSignature}>Signature (use your mouse or finger)<span className="color-red">*</span></span>
                            </div>
                            <div className="w-50">
                                <button type="button" className="btn-register" onClick={this.props.clearSignature} >Clear and Re-draw signature</button>
                            </div>
                        </div>
                    </Form.Group>

                    <Form.Group widths='equal' required>
                        <div className="scanvas" >
                            <SignatureCanvas penColor='gray' 
                                ref={signaturePad}
                                canvasProps={{
                                    className: 'sigCanvas'
                                }}
                            />
                        </div>
                    </Form.Group>

                    {
                        signaturePad && signaturePad.current && signaturePad.current.isEmpty() ?
                            <Form.Group>
                                <span className='password-warning srv-validation-message'>
                                    {blankSignatureValidationMessage}
                                </span>
                            </Form.Group>

                            :
                            ''
                    }

                    <Form.Group>
                        <Form.TextArea className="signup-fields signup-form-text-area" name="comments" value={comments} onChange={this.props.handleInput}
                            width={16}
                        />
                    </Form.Group>

                    <div className="w-100 captcha-code-section">
                        <div className="captcha-section">
                            <span className="captcha-number">{firstCaptchaNumber} {getArithematicSymbol} {secondCaptchaNumber} </span>
                        </div>
                        <div className="w-10">
                            <span className="equal-to-symbol">=</span>
                        </div>
                        <div className={`ui  input captcha-result ${isCaptchaAnswerMatch === false ? 'error' : ''}`}>
                            <input type="text" value={captchaAnswer} name="captchaAnswer" onChange={this.props.handleInput} />
                        </div>
                        <div className="w-10">
                            <button className="ui blue circular icon button reload-captcha" onClick={this.props.generateNewCaptcha} title="Generate new captcha">
                                <i aria-hidden="true" className="white repeat icon"></i>
                            </button>
                        </div>
                    </div>
                    {
                        isCaptchaAnswerMatch === false ?
                            <div className="fields">
                                <span className="password-warning srv-validation-message">Invalid captcha code. Please try again</span></div>
                            : ''
                    }
                    <div className="login-section">
                        <div className="login-btn">
                            <button type="button" onClick={this.props.showLoader} className="btn-login" disabled={isSignUpLoading}>{isSignUpLoading ? <Icon loading name='spinner' /> : 'Register'}  </button>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

export default SecondStep;