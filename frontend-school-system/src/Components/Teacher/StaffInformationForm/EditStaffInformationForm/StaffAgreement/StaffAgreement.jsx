import React, { Component } from "react";
import { Form } from "semantic-ui-react";
// import SignatureCanvas from "react-signature-canvas";

class StaffAgreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignatureVisible: true,
      isFormLoading: false,
      blankSignatureValidationMessage: ""
    };
  }

  // save Signature in state
  getSignature = (modalName, nextModalName, allEvent) => {
    let { staff_hiring_form } = this.props,
      { staff_handbook_waiver_detail } = staff_hiring_form,
      { has_teacher_signature } = staff_handbook_waiver_detail;

    if (has_teacher_signature === "true") {
      this.setState(
        {
          isSignatureVisible: true,
          blankSignatureValidationMessage: ""
        },
        () => {
          this.props._showLoader(
            modalName,
            nextModalName,
            staff_handbook_waiver_detail
          );
          // this.props._saveFormDetail(modalName,nextModalName,staff_handbook_waiver_detail)
        }
      );
    } else {
      this.setState({
        isSignatureVisible: false,
        blankSignatureValidationMessage: "Please check the signature checkbox"
      });
    }
  };

  render() {
    let { isSignatureVisible, blankSignatureValidationMessage } = this.state,
      { staff_hiring_form, editType, teacherSignature } = this.props,
      { staff_handbook_waiver_detail } = staff_hiring_form,
      {
        has_employee_agreed,
        has_teacher_signature
      } = staff_handbook_waiver_detail,
      nextformName = editType === "editForm" ? "view-staff-info" : "home";

    return (
      <Form
        onSubmit={event =>
          this.getSignature("staff_handbook_waiver_detail", nextformName, event)
        }
      >
        <Form.Group widths="equal">
          <Form.Field>
            <h4>Staff Handbook Waiver</h4>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <div className="ui checkbox">
              <input
                type="checkbox"
                name="has_employee_agreed"
                value={has_employee_agreed}
                checked={has_employee_agreed === "false" ? false : true}
                onClick={event =>
                  this.props._handleCheckBox(
                    "staff_handbook_waiver_detail",
                    event
                  )
                }
                disabled={editType === "editForm" ? true : false}
              />
              <label>
                I have received and read the Little Children Schoolhouse
                Childcare Handbook. In consideration of the Little Children
                Schoolhouse Inc. employer, hiring me as an employee, I agree
                that I will not disclose or use at any time, expect as part of
                my employment with the employer, any confidential information
                relating to the business of employ. This includes, but is not
                limited to, employer’s sales and profit figures, students/family
                list, relationship with contractors, customers or suppliers and
                opportunities for new or developing business. I acknowledge the
                unique and confidential nature of this information and the
                irreparable harm that will be caused to employer if I violate
                this agreement. Disclosure of such information may terminate my
                employment with Little Children Schoolhouse.
              </label>
            </div>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <div className="field ">
            <div className="ui checkbox">
              <input
                type="checkbox"
                name="has_teacher_signature"
                value={has_teacher_signature}
                checked={has_teacher_signature === "true" ? true : false}
                onChange={event =>
                  this.props._handleCheckBox(
                    "staff_handbook_waiver_detail",
                    event
                  )
                }
                disabled={editType === "editForm" ? true : false}
              />
              <label>Use signature as in teacher profile</label>
            </div>
          </div>
        </Form.Group>
        {has_teacher_signature === "true" ? (
          <Form.Group width="equal">
            <Form.Field width="16">
              <label>Signature</label>
              <div className={`w-100 `}>
                <img
                  src={`${teacherSignature}?t=${+new Date().getTime()}`}
                  alt="teacher-signature"
                  className={`view-signature-image  signature-boundary`}
                />
                <div></div>
              </div>
            </Form.Field>
          </Form.Group>
        ) : (
          ""
        )}

        {isSignatureVisible === false ? (
          has_teacher_signature === "true" ? (
            ""
          ) : (
            <Form.Group widths="equal">
              <Form.Field>
                <span className="password-warning srv-validation-message">
                  {blankSignatureValidationMessage}
                </span>
              </Form.Field>
            </Form.Group>
          )
        ) : (
          ""
        )}
        <div className="equal width fields">
          <div className="field">
            <button
              type="submit"
              className="ui positive button"
              disabled={editType === "editForm" ? true : false}
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    );
  }
}

export default StaffAgreement;
