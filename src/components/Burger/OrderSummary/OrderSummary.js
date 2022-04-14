import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../../components/UI/Button/Button";

class OrderSummary extends Component {
    //This could be be a functional component
    componentDidUpdate() {
        console.log("[OrderSummary] DidUpdate");
    }

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(
            igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: "capitalize" }}>
                            {igKey}
                        </span>
                        :{this.props.ingredients[igKey]}
                    </li>
                );
            }
        );

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>{ingredientsSummary}</ul>
                <p>
                    <strong>Total Price: {this.props.price}</strong>
                </p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>
                    CANCEL
                </Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>
                    CONTINUE
                </Button>
            </Aux>
        );
    }
}

export default OrderSummary;
