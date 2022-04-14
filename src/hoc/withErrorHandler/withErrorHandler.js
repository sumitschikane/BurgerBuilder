import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        constructor(props) {
            super(props);
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState({ error: error.message });
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={
                            this.state.error ? this.errorConfirmedHandler : null
                        }
                    >
                        {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
};

export default withErrorHandler;
