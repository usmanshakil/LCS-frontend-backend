import React from "react";
import { Container, Grid, Button } from "semantic-ui-react";

//routing to edit detail page
function openEditDetailPage(event, props) {
  props.history.push({
    pathname: `/edit-assigned-class`,
    state: { classInfo: props.location.state.classInfo[0] }
  });
}
//routing to edit detail page
function openHomePage(event, props) {
  props.history.push({ pathname: "/home" });
}
export function ViewClass(props) {
  if (props.location.state === undefined) {
    return (
      <Container className="main-layout-height mt-5rem">
        <div className="description text-center">
          <i className="huge icons">
            <i aria-hidden="true" className="red circle outline big icon"></i>
            <i aria-hidden="true" className="red exclamation icon"></i>
          </i>
          <p className="modal-descripion">Something went wrong</p>
        </div>
        <div className="w-100 text-center mt-5rem">
          <button
            className="ui green button"
            onClick={event => openHomePage(event, props)}
          >
            Go Back
          </button>
        </div>
      </Container>
    );
  } else {
    let { classInfo, loginUserInfo } = props.location.state,
      { id } = classInfo[0];

    return (
      <Container className="main-layout-height mt-5rem">
        <h2>Details</h2>
        {loginUserInfo.role_id === 2 ? (
          <Button onClick={event => openEditDetailPage(event, props)}>
            Edit Details
          </Button>
        ) : (
          ""
        )}
        {classInfo.map((value, index) => {
          return (
            <div
              className={`theme-${loginUserInfo.role_id}-border view-current-class`}
            >
              <Grid style={{margin:0}}>
                <Grid.Row key={index} columns="equal">
                  <Grid.Column>
                    <strong>Class name:</strong>{" "}
                    <span className="ml-5">{value.class_name}</span>
                  </Grid.Column>
                  <Grid.Column>
                    <strong>Class age:</strong>{" "}
                    <span className="ml-5">{value.class_age} </span>
                  </Grid.Column>
                  <Grid.Column>
                    <strong>Room #:</strong>{" "}
                    <span className="ml-5">{value.room} </span>
                  </Grid.Column>
                  <Grid.Column>
                    <strong>Location:</strong>{" "}
                    <span className="ml-5">{value.location} </span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row key={id} index={index} columns="equal">
                  {value.teachers.length
                    ? value.teachers.map((data, id) => {
                        let fullName =
                          data.user.first_name + " " + data.user.last_name;
                        return (
                          <Grid.Column>
                            <strong> {`Teacher ${id + 1}`}:</strong>
                            <span className="ml-5">{fullName}</span>
                          </Grid.Column>
                        );
                      })
                    : ""}
                </Grid.Row>
                {value.children.length ? <Grid.Row style={{margin:0}}><strong>{`Students`}:</strong></Grid.Row> : ""}

                {value.children.length
                  ? value.children.map((data, id) => {
                      const fullName =
                        data.first_name + " " + data.last_name + " -" + data.id;
                      return (
                        <Grid.Row key={id} index={index} columns="equal">
                          <span className="ml-5">{fullName}</span>
                        </Grid.Row>
                      );
                    })
                  : ""}
              </Grid>
            </div>
          );
        })}
      </Container>
    );
  }
}
