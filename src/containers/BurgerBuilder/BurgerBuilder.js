import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {...}
    // }
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIgredients();
    }

    updatePurchasableState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHander = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    };

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? (
            <p>ingredients can't be loaded</p>
        ) : (
            <Spinner />
        );

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchasableState(
                            this.props.ings
                        )}
                        ordered={this.purchaseHander}
                        price={this.props.price}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price.toFixed(2)}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                />
            );
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                    {/* <Spinner /> */}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: ingName =>
            dispatch(actions.removeIngredient(ingName)),
        onInitIgredients: () => dispatch(actions.initIgredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
